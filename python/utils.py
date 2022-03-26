import logging
import coloredlogs
import sys
from _command_mapping import COMMAND_MAPPINGS, COMMAND_DETAILS, MSFT_ACCOUNT_NAME_LIST
from _helper import create_requirements, open_mail, call_on_teams, open_teams_chat
from azure import get_total_pipeline_runs, trigger_pipeline_run
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


def get_persons_email(recognized_text: str):
    """Return the persons email address from the recognized text

    Args:
        recognized_tex (str): recognized text

    Returns:
        str: email address of the person
    """

    for account in MSFT_ACCOUNT_NAME_LIST:
        if recognized_text.find(account.get("name")) != -1:
            return account.get("email")


def get_command_details(recognized_text: str):
    """Try mapping the recognized text with one of the command in the mapping list

    Args:
        recognized_text (str): recognized test from user

    Returns:
        dict: information about the command matched or None if nothing is matched
    """
    for command_id, search_string_list in COMMAND_MAPPINGS.items():
        for search_string in search_string_list:
            if search_string.find(recognized_text) != -1:
                command_info = COMMAND_DETAILS.get(command_id)
                if command_info.get("add_args"):
                    email_id = get_persons_email(recognized_text)
                    if not email_id:
                        return
                    command_info["args"] = email_id

                return command_info


def execute_command(recognized_text: str):
    """Get the recognized text and execute the corresponding command

    Args:
        text (str): recognized text
    """
    try:
        command_info: dict = get_command_details(recognized_text)

        # return  if nothing matches the commands we have
        if not command_info:
            logging.info("No match found!")
            return

        method_name_str = command_info.get("method_name")
        logging.info(f"Match found - {method_name_str}")

        method_name: Callable = globals()[method_name_str]
        state: bool = method_name(
            *command_info.get("args"), **command_info.get("kargs")
        )

        text_to_speak = (
            command_info.get("success_message")
            if state
            else command_info.get("failure_message")
        )

        # speak out if there is any message for that command
        if text_to_speak:
            speak_out(text_to_speak)
    except Exception:
        logging.exception("An error occurred while trying to execute command")
