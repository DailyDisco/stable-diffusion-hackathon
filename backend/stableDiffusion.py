import torch
import os
import replicate
from dotenv import load_dotenv
from flask import Flask, abort, request
from flask_cors import CORS
import webbrowser

app = Flask(__name__)
CORS(app, supports_credentials=True)


load_dotenv()
replicate.api_key = os.getenv("REPLICATE_API_KEY")

model = replicate.models.get("stability-ai/stable-diffusion")
output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
print(output_url)
webbrowser.open(output_url)


@app.route('/generateImage', methods=['POST', 'GET'])
def generate_whisper_mp3():
    model = replicate.models.get("stability-ai/stable-diffusion")
    output_url = model.predict(prompt="electric sheep, neon, synthwave")[0]
    print(output_url)
    webbrowser.open(output_url)
    return {'output_url': output_url}
    
