# stable-diffusion-hackathon

## How to run
 <img src='stable-diffusion-hackathon/ezgif.com-gif-maker.gif' alt='stable diffusion pic' ></img>

### Backend - Start the API server

cd into backend directory
make sure you have python3 installed
make sure you have docker installed
docker build -t backend .
docker run -p 5000:5000 backend

### Frontend - Start the React app

cd into frontend directory
run 'npm install' in the terminal
run 'npm run start' in the terminal

## How to use

As you read the book stable diffusion will generate pictures for the book you're reading, and play music based on the sentiment of the page's text. This allows for a more immersive reading experience.

You can 'swipe' left or right to turn the pages in the book. You can also use the buttons on the bottom to turn the pages.
