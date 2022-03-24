import coloredlogs
import logging
import sys
import speech_recognition as sr
import pyttsx3


def setup_logging():
    # setting up logging
    coloredlogs.install(milliseconds=True)
    coloredlogs.install(
        fmt="%(asctime)s,%(msecs)03d %(hostname)s %(name)s[%(process)d] | %(levelname)s | %(message)s"
    )

    loghandler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
    loghandler.setFormatter(formatter)
    logging.basicConfig(level=logging.DEBUG, handlers=[loghandler])
    logging.info("Starting to log things..")


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


def main():

    setup_logging()
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
                    break

        except KeyboardInterrupt:
            logging.warn("Exiting from keyboard interrupt")

        except sr.RequestError:
            logging.exception("Could not request results")

        except sr.UnknownValueError:
            logging.exception("unknown error occurred")

        except Exception:
            logging.exception("A error occurred")


if __name__ == "__main__":
    main()
