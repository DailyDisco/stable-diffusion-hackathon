FROM python:3.10-slim

WORKDIR /python-docker

COPY requirements.txt requirements.txt
RUN apt-get update && apt-get install git -y
RUN pip3 install -r requirements.txt
RUN apt-get install -y ffmpeg
# RUN python3 -m nltk.download omw-1.4
RUN python3 -m nltk.downloader omw-1.4
# RUN python3 -m omw-1.4
RUN [ "python3", "-c", "import nltk; nltk.download('omw-1.4')" ]

COPY . .

EXPOSE 5000

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]