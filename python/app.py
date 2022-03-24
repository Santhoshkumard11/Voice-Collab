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
recognizer_obj = sr.Recognizer()
engine = pyttsx3.init()

setup_logging()
