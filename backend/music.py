import httpx
import json
import time

tag_mapping = {}
tag_mapping['Happy'] = ['happy', 'joyful', 'happy hardcore', 'pumped', 'peaceful']
tag_mapping['Angry'] = ['angry', 'aggressive']
tag_mapping['Surprise'] = ['special', 'horror']
tag_mapping['Sad'] = ['sad', 'scary', 'happy hardcore']
tag_mapping['Fear'] = ['scary', 'horror', 'witch house', 'spooky']

# api token
pat = "dHRtLjE3MzY2NDM0LjQ5NTFmNjQyOGU4MzE3MmE0ZjM5ZGUwNWQ1YjNhYjEwZDU4NTYwYjguMS4z.6c7f361ceab8611f41c6007fa013a5e33c9189419ee5cf329899ccff5489876a"

# def tag_processing(emotions): # this tags input the emotion string crated - audio prompt
#   tags = []
#   for emotion in emotions.split(' ')[0:-1]:
#     tags.extend(tag_mapping[emotion])
#   return tags  

# can we make this fade in or fade out later?
def get_track_by_tags(emotions, duration=45, maxit=20, autoplay=False, loop=True): # generates mp3 file
  tags = []
  for emotion in emotions.split(","):
    # .rstrip()'.split(' ')
    tags.extend(tag_mapping.get(emotion, [emotion])) 
  print(tags)
  if loop:
    mode = "loop"
  else:
    mode = "track"
  r = httpx.post('https://api-b2b.mubert.com/v2/RecordTrackTTM', 
      json={
          "method":"RecordTrackTTM",
          "params": {
              "pat": pat, 
              "duration": duration,
              "tags": tags,
              "mode": mode
          }
      })

  rdata = json.loads(r.text)
  assert rdata['status'] == 1, rdata['error']['text']
  trackurl = rdata['data']['tasks'][0]['download_link'] # can be used to download the mp3 file.
  print(trackurl)
  return trackurl

  # print('Generating track ', end='')
  # for i in range(maxit):
  #     r = httpx.get(trackurl) # downloading the mp3 file
  #     if r.status_code == 200:
  #         #display(Audio(trackurl, autoplay=autoplay))
  #         print("audio creation succesful")
  #         print(trackurl)
  #         return trackurl
  #         break
  #     time.sleep(1)
  #     print('.', end='')