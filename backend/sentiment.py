import spacy 
import text2emotion as te
# Found about text2emotion here: https://towardsdatascience.com/text2emotion-python-package-to-detect-emotions-from-textual-data-b2e7b7ce1153
# Will use, maybe will enhance it with synonym. Also, Today, the average sentence length is between 15 and 20 words. https://becomeawritertoday.com/average-sentence-length/

# Loads spacy english core
nlp = spacy.load('en_core_web_sm')

#TODOs: 

#1 - Cleaning text (Lemmatize, remove stop words, remove \n \r \t artifacts)
#2 - Add synonyms for music, to enrich prompt


# Apparently the avg silent reading adult reads between 238 words per minute (wpm) and 260 wpm. 
# source: https://psyarxiv.com/xynwg/, maybe take that into account for generation rates.

class Reader:
    """
    Standard Reader class, has functions for text reading and preprocessing
    """

    def __init__(self, book_path, book_title):
        """
        Initializes class
        """
        # At this point book_path variables are looking like 'backend/books/{book_name}.txt' (I'm running from main folder)
        self.book_path = book_path
        self.book_title = book_title
        self.book = None
        self.processed_book = None
        self.chunks = None
    

    def save_book(self, book_path=None):
        """
        Saves book
        """
        if book_path is None:
            book_path = self.book_path
        self.book = open(book_path).read()
        return self.book

    def process_book(self, book=None):
        """
        Processes book using SpaCy boilerplate nlp function
        """
        # For now, returns the chunk, let's see if it this is good enough?
        if book is None:
            book = self.book
        self.processed_book = nlp(book)
        return self.processed_book


    def generate_image_prompt(self, text_chunk):
        """
        Based more literally on the text
        """
        self.image_prompt = text_chunk

        return text_chunk

    def generate_audio_prompt(self, text_chunk):
        """
        Based on text emotion and mood. 
        Essentially, extracts two biggest emotion values from get_emotion().
        """

        emotion_dict = te.get_emotion(text_chunk)

        two_max_values = sorted(emotion_dict.values())[-2:]

        emotion_str = ""
        for value in two_max_values:
            for key in emotion_dict.keys():
                if emotion_dict[key] == value:
                    emotion_str += key + " "
        return emotion_str

    def get_chunks(self, spm=16, wps=20):
        """
        spm: sentences per minute approx 250/15
        wps: words per sentence

        Will build  chunks of text based on average reading speed, so we can generate images as reader progresses through text, on average. 
        """
        if self.book is None:
            book = self.save_book()
        if self.processed_book is None:
            processed_book = self.process_book(book=book)

        sentences = list(processed_book.sents)

        chunks = list()
        # First chunk should be book title
        chunks.append(self.book_title)

        current_chunk = ""
        for sentence in sentences:
            current_chunk += str(sentence)
            if len(current_chunk)>spm*wps:
                chunks.append(current_chunk.replace('\n', ' '))
                current_chunk = ""

        self.chunks = chunks

        return chunks

    def get_prompts_from_chunks(self, chunks=None):

        if chunks is None:
            chunks = self.get_chunks()

        for chunk in chunks:
            audio_prompt = self.generate_audio_prompt(chunk)
            image_prompt = self.generate_image_prompt(chunk)
            yield (image_prompt, audio_prompt)









        

        

        

