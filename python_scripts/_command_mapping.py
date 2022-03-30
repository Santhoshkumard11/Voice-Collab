# this file has all the commands and mapping that the voice recognizer is able to pick up and do some action

from _constants import MSFT_ACCOUNT_NAME_LIST

# this list contains all the details about a command
COMMAND_DETAILS: dict = {
    1: {
        "method_name": "trigger_pipeline_run",
        "description": "Triggering Azure DevOps pipeline",
        "success_message": "Successfully triggered pipeline build",
        "failure_message": "Failed to trigger build pipeline",
        "add_args": False,
        "args": [],
        "kargs": {},
        "speak_args": True,
    },
    2: {
        "method_name": "create_requirement_file",
        "description": "create the requirements.txt file",
        "args": ["pip freeze > requirements.txt"],
        "kargs": {},
        "success_message": "Successfully created requirements file",
        "failure_message": "Failed to create requirements file",
        "add_args": False,
        "speak_args": True,
    },
    3: {
        "method_name": "get_total_pipeline_runs",
        "description": "get all pipeline runs count",
        "success_message": "There are a total of {} pipeline runs",
        "failure_message": "Failed to get the pipeline runs",
        "add_args": False,
        "speak_args": True,
        "args": [],
        "kargs": {},
    },
    4: {
        "method_name": "call_on_teams",
        "description": "call someone on teams",
        "add_args": True,
        "args": [],
        "kargs": {},
    },
    5: {
        "method_name": "open_mail",
        "description": "mail someone on Outlook",
        "add_args": True,
        "args": [],
        "kargs": {},
    },
    6: {
        "method_name": "open_teams_chat",
        "description": "Open up someones teams chat",
        "add_args": True,
        "args": [],
        "kargs": {},
    },
    7: {
        "method_name": "show_help",
        "description": "Speak out 5 commands you can use",
        "add_args": False,
        "args": [""],
        "kargs": {},
    },
    8: {
        "method_name": "show_help",
        "description": "Speak out all the commands you can use",
        "add_args": False,
        "args": ["all"],
        "kargs": {},
    },
    9: {
        "method_name": "push_code",
        "description": "Push the code to remote",
        "success_message": "Successfully pushed the code to remote",
        "failure_message": "Failed to push the code to remote",
        "add_args": False,
        "args": [],
        "kargs": {},
    },
    10: {
        "method_name": "temp_commit_lock_screen",
        "description": "Commit code and lock the screen",
        "success_message": "Successfully commted the code",
        "failure_message": "Failed to commit the code",
        "add_args": False,
        "args": [],
        "kargs": {},
    },
    11: {
        "method_name": "lock_screen",
        "description": "Lock the screen",
        "success_message": "Locked the screen",
        "failure_message": "Failed to lock the screen",
        "add_args": False,
        "args": [],
        "kargs": {},
    },
    12: {
        "method_name": "crack_joke",
        "description": "crack a random programmer joke",
        "success_message": "{}",
        "speak_args": True,
        "add_args": False,
        "args": [],
        "kargs": {},
    },
    13: {
        "method_name": "tell_a_story",
        "description": "Narrate a random programmer story",
        "success_message": "{}",
        "failure_message": "{}",
        "speak_args": True,
        "add_args": False,
        "args": [],
        "kargs": {},
    },
    14: {
        "method_name": "get_chatbot_response",
        "description": "Chat with sandy",
        "success_message": "{}",
        "failure_message": "{}",
        "speak_args": True,
        "add_args": True,
        "args": [],
        "kargs": {},
    },
    15: {
        "method_name": "generate_code",
        "description": "Generate Python code",
        "success_message": "{}",
        "failure_message": "{}",
        "speak_args": False,
        "add_args": True,
        "send_code": True,
        "args": [],
        "kargs": {},
    },
}

# these are the commands or keyboards that the recognizer picks up and matches them with the command details
COMMAND_MAPPINGS: dict = {
    1: ["start build", "trigger pipeline build"],
    2: ["create requirements.txt", "create requirements file"],
    3: ["get total pipeline runs"],
    4: [],  # dynamic addition calling someone
    5: [],  # dynamic addition open email
    6: [],  # dynamic addition open teams chat
    7: ["show help", "help", "what are the commands I can use"],
    8: ["help more", "list all the commands I can use"],
    9: ["git push", "push code"],
    10: ["taking a break", "break time"],
    11: ["lock screen"],
    12: ["crack a joke", "joke about programmers", "make me feel better"],
    13: ["tell a story", "story time"],
    14: ["hey sandy", "sandy"],
    15: ["hey codex", "codex", "hey codecs", "codecs", "cortex"],
}


def add_msft_account_to_commands():
    """adding users to the command mapping list"""

    for account in MSFT_ACCOUNT_NAME_LIST:
        name = account.get("name")

        COMMAND_MAPPINGS.get(4).append(f"call {name.lower()}")
        COMMAND_MAPPINGS.get(5).append(f"mail {name.lower()}")
        COMMAND_MAPPINGS.get(6).append(f"open {name.lower()}'s chat")


add_msft_account_to_commands()
