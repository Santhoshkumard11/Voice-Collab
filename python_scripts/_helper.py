import os
import webbrowser
import logging
import inspect
import ctypes
import random
import openai
from _constants import (
    PROGRAMMER_STROY,
    PROGREAMMER_MEME,
    STR_TO_REMOVE_FROM_CHATBOT_RESPONSE,
    STR_TO_REMOVE_FROM_CODEX_RESPONSE,
)
from dotenv import load_dotenv

load_dotenv()

temp_email_template = None
BOT_INITIALIZE_COMMANDS = [
    "hey sandy",
    "sandy",
    "hey codex",
    "codex",
    "hey codecs",
    "codecs",
    "cortex ",
]

openai.api_key = os.getenv("OPENAI_API_KEY")


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
    # since we're not sure where the path of the git folder is we execute this in Typescript
    # os.system("git push")
    return True, []


def lock_screen():
    ctypes.windll.user32.LockWorkStation()
    return True, []


def temp_commit_lock_screen():
    commit_code()
    lock_screen()


def create_email(email_id: str, subject: str, content: str):
    global temp_email_template

    temp_email_template = {
        "message": {
            "subject": subject,
            "body": {"contentType": "Text", "content": content},
            "toRecipients": [{"emailAddress": {"address": email_id}}],
        }
    }

    with open("temp_email.txt", "w") as file:
        file.write(f"Subject - {subject}.\n")
        file.write(f"Body - {content}.\n")
        file.write(f"Email ID - {email_id}.\n")


def narrate_create_email():
    global temp_email_template

    subject = f"Subject - {temp_email_template.get('message').get('subject')}."
    body = f"Body - {temp_email_template.get('message').get('body').get('content')}."
    email_id = f"""Email address -  {temp_email_template.get('message').get(
        'toRecipients'
    )[0].get('emailAddress')}."""

    return f"Draft email, {subject} {body} {email_id}"


def delete_email_content():
    global temp_email_template

    temp_email_template = None


def send_email():
    from utils import send_post_request

    global temp_email_template
    url = "https://graph.microsoft.com/v1.0/me/sendMail"
    if not temp_email_template:
        return False, "Create an email to send"

    response = send_post_request(url, temp_email_template, "graph_api")


def crack_joke():
    choice = random.randint(0, len(PROGREAMMER_MEME) - 1)
    return True, [PROGREAMMER_MEME[choice]]


def tell_a_story():
    choice = random.randint(0, len(PROGRAMMER_STROY) - 1)

    return True, [PROGRAMMER_STROY[choice]]


def replace_substring(text, mapping_dict: dict):
    for search_string, replace_string in mapping_dict.items():
        text = text.replace(search_string, replace_string)

    return text


def cleanse_recognized_text(uncleaned_text: str, phrases: list):

    for phrase in phrases:
        cleansed_text = uncleaned_text.replace(phrase, "")
        cleansed_text = cleansed_text.strip()
    return cleansed_text


def cleanse_openai_response(uncleaned_text: str, clean_type="chatbot"):
    if clean_type == "chatbot":
        return replace_substring(uncleaned_text, STR_TO_REMOVE_FROM_CHATBOT_RESPONSE)

    if clean_type == "codex":
        uncleaned_text = uncleaned_text[uncleaned_text.find("\n") + 1 :]
        return "\n" + replace_substring(
            uncleaned_text, STR_TO_REMOVE_FROM_CODEX_RESPONSE
        )


def get_chatbot_response(recognized_text: str):

    request_status, response_text = False, ""

    clean_recognized_text = cleanse_recognized_text(
        recognized_text, BOT_INITIALIZE_COMMANDS
    )

    clean_recognized_text += " ?\n"

    try:
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=clean_recognized_text,
            temperature=0.9,
            max_tokens=24,
            top_p=0.9,
            frequency_penalty=0.54,
            presence_penalty=0.67,
        )
    except Exception:
        logging.exception(
            f"func | {current_method_name()} | Error while trying to call the openai API"
        )

    if response:
        request_status = True
        logging.info(response)
        response_text = response["choices"][0]["text"]
        response_text = cleanse_openai_response(response_text)
        logging.info(f"OpenAI API - {response_text}")

    return request_status, [response_text]


def generate_code(recognized_text):
    request_status, response_text = False, ""

    clean_recognized_text = cleanse_recognized_text(
        recognized_text, BOT_INITIALIZE_COMMANDS
    )
    clean_recognized_text += "."
    try:
        response = openai.Completion.create(
            engine="code-davinci-002",
            prompt=clean_recognized_text,
            temperature=0.19,
            max_tokens=120,
            top_p=0.27,
            frequency_penalty=0.45,
            presence_penalty=0.31,
        )
    except Exception:
        logging.exception(
            f"func | {current_method_name()} | Error while trying to call the openai API"
        )

    if response:
        request_status = True
        logging.info(response)
        response_text = response["choices"][0]["text"]
        response_text = cleanse_openai_response(response_text, clean_type="codex")
        logging.info(f"OpenAI API - {response_text}")

    return request_status, [response_text]
