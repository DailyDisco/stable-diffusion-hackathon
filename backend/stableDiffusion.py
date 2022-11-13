import torch
import os
import replicate
from dotenv import load_dotenv
from flask import Flask, abort, request
from flask_cors import CORS
import webbrowser

# flask is a web framework for python that allows us to create a web server and handle requests from the frontend to the backend 
app = Flask(__name__)
CORS(app, supports_credentials=True)

# initiate .env
load_dotenv()
replicate.api_key = os.getenv("REPLICATE_API_KEY")

# this can be ran in a function as a python script
model = replicate.models.get("stability-ai/stable-diffusion")
output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
print(output_url)
webbrowser.open(output_url)


@app.route('/generateImage', methods=['POST', 'GET'])
def generate_whisper_mp3():
    # this next block of code can be just a py script that takes in a prompt and returns an image
    # model is set to the stable diffusion model
    model = replicate.models.get("stability-ai/stable-diffusion")
    
    # output_url is the url to the image
    # model.predict takes in a prompt and returns a list of urls
    # you can change the prompt to whatever you want
    output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
    # print the url to the image
    print(output_url)
    # open the url to the image
    webbrowser.open(output_url)
    # return the url to the image for the API frontend connection
    return {'output_url': output_url}
    
