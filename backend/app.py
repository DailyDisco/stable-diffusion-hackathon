import torch
import os
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

# flask is a web framework for python that allows us to create a web server and handle requests from the frontend to the backend
app = Flask(__name__)
CORS(app, supports_credentials=True)

# initiate .env
load_dotenv()
replicate.api_key = os.getenv("REPLICATE_API_KEY")

# api endpoint sentiment analysis
@app.route('/generate_sentiment', methods=['POST'])
def generate_prompts():
    # takes in route and title
    reader = Reader("books/alice_wonderland.txt", "Alice in Wonderland", tags=["dreamy","funky","psychedelic trance / psytrance"])
    chunks = reader.get_chunks(perc=0.05)

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
@app.route('/generate_chunks', methods=['POST', 'GET'])
def generate_chunks():
    # takes in route and title
    reader = Reader("books/alice_wonderland.txt", "Alice in Wonderland", tags=["dreamy","funky","psychedelic trance / psytrance"])
    chunks = reader.get_chunks(perc=0.05)

    image_prompts = list()
    audio_prompts = list()
    for chunk in chunks:
        image_prompts.append(reader.generate_image_prompt(chunk))
        audio_prompts.append(reader.tags + reader.generate_audio_prompt(chunk))
    # "audio":audio_prompt
    prompt_dict = {
        "image_prompts": image_prompts, 
        "audio_prompts": audio_prompts,
        "title": reader.book_title,
    }
    return prompt_dict

# api endpoint for images and music generation
# returns a url to an image and a url to a music file
@app.route('/generate_image_and_music', methods=['POST', 'GET'])
def generate_image_and_music(image_prompt, audio_prompt, title):
    # takes in route and title

    model = replicate.models.get("stability-ai/stable-diffusion")
    input_str = "Make an award winning illustration from the book " + title  + " using the following text: " + image_prompt
    output_url = model.predict(prompt=input_str)[0]
    music = get_track_by_tags(audio_prompt)
    print(music)
    print(output_url)
    url_dict = {
        'output_url': output_url,
        'music_url': music
    }   
        
    # webbrowser.open(output_url)
    return json.dumps(url_dict)