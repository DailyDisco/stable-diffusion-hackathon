import torch
import os
import ast
# .env
from dotenv import load_dotenv
# replicate AI image generator
import replicate
# opens a browser window
import webbrowser
# flask api
from flask import Flask, abort, request
from flask_cors import CORS
# sentiment
from sentiment import Reader
import spacy 
import text2emotion as te
from musicPrompting import mubertPrompt
# music generation
from music import get_track_by_tags
import httpx
import json
import time
import logging

# flask is a web framework for python that allows us to create a web server and handle requests from the frontend to the backend
app = Flask(__name__)
CORS(app, supports_credentials=True)

logging.basicConfig(level=logging.DEBUG)

# initiate .env
load_dotenv()
replicate.api_key = os.getenv("REPLICATE_API_KEY")

# api endpoint sentiment analysis
@app.route('/generate_sentiment', methods=['POST'])
def generate_prompts():
    # takes in route and title
    reader = Reader("books/alice_wonderland.txt", "Alice in Wonderland", tags=["dreamy","funky","psychedelic trance / psytrance"])
    chunks = reader.get_chunks(perc=0.02)

    image_prompts = list()
    audio_prompts = list()
    for chunk in chunks:
        image_prompts.append(reader.generate_image_prompt(chunk))
        audio_prompts.append(reader.tags + reader.generate_audio_prompt(chunk))

    # "audio":audio_prompt
    prompt_dict = {
        "image_prompts": image_prompts, 
        "audio_prompts": audio_prompts,
    }
    return json.dumps(prompt_dict)
    
# returns a url to an image
# api endpoint image generation
@app.route('/generate_image', methods=['POST', 'GET'])
def generate_image():
    # get the text from the request
    # model is set to the stable diffusion model
    model = replicate.models.get("stability-ai/stable-diffusion")
    # output_url is the url to the image
    output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
    # print the url to the image
    print(output_url)
    # open the url to the image
    webbrowser.open(output_url)
    # return the url to the image for the API frontend connection
    return {'output_url': output_url}
    
# api endpoint for music generation
# returns a url to a music file
@app.route('/generate_music', methods=['POST', 'GET'])
def generate_music():
    music = get_track_by_tags("Happy")
    return music


# generate the prompts for the music generation once
@app.route('/generate_chunks', methods=['GET'])
def generate_chunks():
    # takes in route and title
    reader = Reader("books/alice_wonderland.txt", "Alice in Wonderland", tags=["dreamy","funky","psychedelic trance / psytrance"])
    chunks = reader.get_chunks(perc=0.02)

    image_prompts = list()
    audio_prompts = list()
    time.sleep(3)
    for chunk in chunks:
        image_prompts.append(reader.generate_image_prompt(chunk))
        time.sleep(3)
        audio_prompts.append(reader.tags + reader.generate_audio_prompt(chunk))
    # "audio":audio_prompt
    prompt_dict = {
        "image_prompts": image_prompts, 
        "audio_prompts": audio_prompts,
        "title": reader.book_title,
    }
    return prompt_dict

def queryReplicate(title, image_prompt, audio_prompt):
    # model is set to the stable diffusion model
    model = replicate.models.get("stability-ai/stable-diffusion")
    input_str = "Create a detailed, modern style illustration, with beautiful faces, from the book: " + title  + " using the following text: " + image_prompt
    # output_url is the url to the image
    output_url = model.predict(prompt=input_str)[0]
    time.sleep(3)

    # print the url to the image
    app.logger.info('Replicate output URL', output_url)
    # open the url to the image
    webbrowser.open(output_url)
    music = get_track_by_tags(audio_prompt)
    url_dict = {
        'output_url': output_url,
        'music_url': music
    } 
    # return the url to the image for the API frontend connection
    return url_dict

# api endpoint for images and music generation
# returns a url to an image and a url to a music file
@app.route('/generate_image_and_music', methods=['POST', 'GET'])
def generate_image_and_music():
    if request.method == "POST":
        # Parse formData from request body as JSON
        data = request.get_json()
        #print(request)
        #print(data)
        #print(type(data))
        #with open('data.json', 'r') as outfile:
        #    dictData = outfile.read()
        #    print(dictData)
            
            
        #app.logger.info('This is info output', data)
        audio_prompt = data['audio_prompt']
        print(audio_prompt)
        image_prompt = data['image_prompt']
        print(image_prompt)
        title = data['title']
        print(title)
        # Log data
        #app.logger.info('This is info output', title, image_prompt, audio_prompt)
        url_dict = queryReplicate(title, image_prompt, audio_prompt)
        # webbrowser.open(output_url)
        return json.dumps(url_dict)
    else:
        return "This is a POST request only"


@app.route('/generate_book', methods=['POST', 'GET'])
def generate_book():
    reader = Reader("books/alice_wonderland.txt", "Alice in Wonderland", tags=["dreamy","funky","psychedelic trance / psytrance"])
    chunks = reader.get_chunks(perc=0.02)

    #image_prompts = list()
    #audio_prompts = list()
    image_urls = list()
    audio_urls = list()

    for chunk in chunks:

        url_dict = queryReplicate(reader.title, reader.generate_image_prompt(chunk), reader.tags + reader.generate_audio_prompt(chunk))
        time.sleep(3)

        audio_urls.append(url_dict["music_url"])

        image_urls.append(url_dict["output_url"])

    allObject = {"chunks":chunks, "audio": audio_urls, "image":image_urls}

    return json.dumps(allObject)