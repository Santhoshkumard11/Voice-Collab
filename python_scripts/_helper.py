import os
import webbrowser
import logging
import inspect
import ctypes
import random
from _constants import PROGRAMMER_STROY, PROGREAMMER_MEME
from azure import send_post_request


def current_method_name():
    return inspect.stack()[1][3]


def execute_on_shell(command_text: str):
    os.system(command_text)


def open_browser(url: str):
    webbrowser.open(url, new=2, autoraise=True)


def open_teams_chat(email: str):
    url_teams_chat = f"https://teams.microsoft.com/l/chat/0/0?users={email}"
    command_success = True
    try:
        open_browser(url_teams_chat)
    except Exception:
        logging.exception(f"func | {current_method_name()} | See the below error")
        command_success = False

    return command_success, ""


def call_on_teams(email: str):
    url_call_on_teams = f"https://teams.microsoft.com/l/call/0/0?users={email}"
    command_success = True
    try:
        open_browser(url_call_on_teams)
    except Exception:
        logging.exception(f"func | {current_method_name()} | See the below error")
        command_success = False

    return command_success, ""


def open_mail(email: str):
    url_mail_people = f"mailto:{email}"
    command_success = True
    try:
        open_browser(url_mail_people)
    except Exception:
        logging.exception(f"func | {current_method_name()} | See the below error")
        command_success = False

    return command_success, ""


def create_requirement_file(command_text: str):
    command_success = True
    try:
        execute_on_shell(command_text)
    except Exception:
        logging.exception(
            f"func | {current_method_name()} | Error while trying to create requirements.txt files."
        )
        command_success = False

    return command_success, ""


def commit_code():
    os.system("git commit -am will it edit later")


def push_code():
    os.system("git push")


def lock_screen():
    ctypes.windll.user32.LockWorkStation()


def temp_commit_lock_screen():
    commit_code()
    lock_screen()


def send_email(email_id: str):
    url = "https://graph.microsoft.com/v1.0/me/sendMail"
    email_template = {
        "message": {
            "subject": "",
            "body": {"contentType": "Text", "content": ""},
            "toRecipients": [{"emailAddress": {"address": ""}}],
        }
    }

    response = send_post_request(url, email_template, "graph_api")


def crack_joke():
    choice = random.randint(0, len(PROGREAMMER_MEME) - 1)
    return True, [PROGREAMMER_MEME[choice]]


def tell_a_story():
    choice = random.randint(0, len(PROGRAMMER_STROY) - 1)

    return True, [PROGRAMMER_STROY[choice]]
