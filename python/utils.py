import logging
import coloredlogs
import sys
import os
from _command_mapping import COMMAND_MAPPINGS, COMMAND_DETAILS
from _helper import create_requirements
from azure import get_total_pipeline_runs
import pyttsx3
from typing import Callable

engine: pyttsx3.Engine = pyttsx3.init()


def speak_out(text: str):
    """Speak out things from the text

    Args:
        text (str): text to be spoken
    """

    engine.say(text)
    engine.runAndWait()


def setup_logging():
    """setting up logging configuration"""

    coloredlogs.install(milliseconds=True)
    coloredlogs.install(
        fmt="%(asctime)s,%(msecs)03d %(hostname)s %(name)s[%(process)d] | %(levelname)s | %(message)s"
    )

    loghandler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
    loghandler.setFormatter(formatter)
    logging.basicConfig(level=logging.DEBUG, handlers=[loghandler])
    logging.info("Starting to log things..")


def advanced_command_matching():
    """User some sort of algo/flow to match the recognized text with the commands we already have"""
    pass


def get_command_details(recognized_text: str):
    for command_id, search_string_list in COMMAND_MAPPINGS.items():
        for search_string in search_string_list:
            if search_string.find(recognized_text) != -1:
                return COMMAND_DETAILS.get(command_id)


def execute_command(recognized_text: str):
    """Get the recognized text and execute the corresponding command

    Args:
        text (str): recognized text
    """
    command_info: dict = get_command_details(recognized_text)

    # return  if nothing matches the commands we have
    if not command_info:
        return

    method_name: Callable = globals()[command_info.get("method_name")]
    state: bool = method_name(*command_info.get("args"), **command_info.get("kargs"))

    text_to_speak = (
        command_info.get("success_message")
        if state
        else command_info.get("failure_message")
    )

    # speak out if there is any message for that command
    if text_to_speak:
        speak_out(text_to_speak)
