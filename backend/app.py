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
from .musicPrompting import mubertPrompt
# music generation
from music import get_track_by_tags
import httpx
import json
import time

app = Flask(__name__)
CORS(app, supports_credentials=True)

#
load_dotenv()
replicate.api_key = os.getenv("REPLICATE_API_KEY")

# api endpoint sentiment analysis
@app.route('/generate_sentiment, methods=['POST'])
def generate_prompts(chunk):
    # takes in route and title
    #reader = Reader(book_route, book_title)
    #chunks = reader.get_chunk()
    #title = chunk[0]
    reader = Reader()
    image_prompt = reader.generate_image_prompt(chunk)
    audio_prompt = mubertPrompt(current_chunk)

    prompt_dict = {
        "image":image_prompt, 
        "audio":audio_prompt}
    return prompt_dict
    
# returns a url to an image
# api endpoint image generation
@app.route('/generate_image, methods=['POST', 'GET'])
def generate_image():
    # get the text from the request
    model = replicate.models.get("stability-ai/stable-diffusion")
    output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
    print(output_url)
    webbrowser.open(output_url)
    return {'output_url': output_url}
    
# api endpoint for music generation
# returns a url to a music file
@app.route('/generate_music', methods=['POST', 'GET'])
def generate_music():

# api endpoint for images and music generation
# returns a url to an image and a url to a music file
@app.route('/generate_image_and_music', methods=['POST', 'GET'])
def generate_image_and_music(chunk):
    
     # takes in route and title
    #reader = Reader(book_route, book_title)
    #chunks = reader.get_chunk()
    #title = chunk[0]
    reader = Reader()
    image_prompt = reader.generate_image_prompt(chunk)
    audio_prompt = mubertPrompt(current_chunk)

    prompt_dict = {
        "image":image_prompt, 
        "audio":audio_prompt}
    return prompt_dict

    model = replicate.models.get("stability-ai/stable-diffusion")
    output_url = model.predict(prompt=image_prompt)[0]
    
    print(output_url)
    webbrowser.open(output_url)
    return {'output_url': output_url}