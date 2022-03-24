import logging
import speech_recognition as sr
import pyttsx3
import asyncio
import websockets
import json
from utils import setup_logging


# Initialize the recognizer
recognizer_obj: sr.Recognizer = sr.Recognizer()
engine: pyttsx3.Engine = pyttsx3.init()


def speak_out(text: str):
    """Speak out things from the text

    Args:
        text (str): text to be spoken
    """

    engine.say(text)
    engine.runAndWait()


async def sender(ws: websockets):

    while True:
        try:
            with sr.Microphone() as audio_source:

                recognizer_obj.adjust_for_ambient_noise(audio_source, duration=0.5)

                # listens for the user's input
                audio_input = recognizer_obj.listen(audio_source)

                # Using google to recognize audio
                recognized_text = recognizer_obj.recognize_google(audio_input).lower()

                logging.info(f"Recognized text - {recognized_text}")

                if recognized_text.find("stop transcription") is not -1:
                    logging.info("Exiting - user command")
                    await ws.send("closing connection - user command")
                    ws.close()
                    exit()

                if recognized_text:
                    payload = json.dumps({"message": recognized_text})
                    await ws.send(payload)

        except KeyboardInterrupt:
            logging.warning("Exiting from keyboard interrupt")
            ws.close()
            exit()

        except sr.RequestError:
            logging.exception("Could not request results")

        except sr.UnknownValueError:
            logging.warning("Can't detect what you said!!")

        except Exception:
            logging.exception("A error occurred")


async def handler(ws):
    while True:
        received = await ws.recv()
        logging.info(f"extention - {received}")
        await sender(ws)


async def main():

    setup_logging()

    async with websockets.serve(handler, "localhost", 8001):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
