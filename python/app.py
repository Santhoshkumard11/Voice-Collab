import logging
import speech_recognition as sr
import asyncio
import websockets
import json
from utils import setup_logging, execute_command


# Initialize the recognizer
recognizer_obj: sr.Recognizer = sr.Recognizer()


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

                if recognized_text.find("stop command mode") is not -1:
                    logging.info("Exiting - user command")
                    await ws.close(3002, "user command - closing connection")
                    await ws.wait_closed()
                    exit()

                execute_command(recognized_text)

                if recognized_text:
                    payload = json.dumps({"message": recognized_text})
                    await ws.send(payload)

        except KeyboardInterrupt:
            logging.warning("Exiting from keyboard interrupt")
            await ws.close(3001, "User command - Keyboard Interrupt")
            await ws.wait_closed()
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
