import os
import webbrowser


def execute_on_shell(command_text: str):
    os.system(command_text)


def open_browser(url: str):
    webbrowser.open(url, new=2, autoraise=True)


def create_requirements():
    execute_on_shell("pip freeze > requirements.txt")


def open_teams_chat(email: str):
    url_teams_chat = f"https://teams.microsoft.com/l/chat/0/0?users={email}"
    open_browser(url_teams_chat)


def call_on_teams(email: str):
    url_call_on_teams = f"https://teams.microsoft.com/l/call/0/0?users={email}"
    open_browser(url_call_on_teams)


def open_mail(email: str):
    url_mail_people = f"mailto:{email}"
    open_browser(url_mail_people)


def create_requirement_file(command_text: str):
    try:
        execute_on_shell(command_text)
    except:
        pass

    return True
