import os

DOMAIN_NAME = os.getenv("DOMAIN_NAME")

COMMAND_DETAILS: dict = {
    1: {
        "method_name": "trigger_pipeline_run",
        "description": "Triggering Azure DevOps pipeline",
        "success_message": "Successfully triggered pipeline build",
        "failure_message": "Failed to trigger build pipeline",
        "add_args": False,
        "args": [],
        "kargs": {},
    },
    2: {
        "method_name": "create_requirement_file",
        "description": "create the requirements.txt file",
        "args": ["pip freeze > requirements.txt"],
        "kargs": {},
        "success_message": "Successfully created requirements file",
        "failure_message": "Failed to create requirements file",
        "add_args": False,
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
        "description": "help",
        "add_args": False,
        "args": [""],
        "kargs": {},
    },
    8: {
        "method_name": "show_help",
        "description": "help",
        "add_args": False,
        "args": ["all"],
        "kargs": {},
    },
}

COMMAND_MAPPINGS: dict = {
    1: ["start build", "trigger build pipeline"],
    2: ["create requirements.txt", "create requirements file"],
    3: ["get total pipeline runs"],
    4: [],  # dynamic addition
    5: [],  # dynamic addition
    6: [],  # dynamic addition
    7: ["show help", "help", "what are the commands I can use"],
    8: ["help more", "list all the commands I can use"],
}

# Microsoft Accounts
MSFT_ACCOUNT_NAME_LIST: list = [
    {
        "name": "Alex",
        "id": "329420-2384932-234832-24324",
        "email": f"AlexW{DOMAIN_NAME}",
    },
    {
        "name": "Grady",
        "id": "4985739-485692-958749-6847989",
        "email": f"GradyA{DOMAIN_NAME}",
    },
    {
        "name": "Megan",
        "id": "84898795-238779-9457-459964",
        "email": f"MeganB{DOMAIN_NAME}",
    },
]


def add_msft_account_to_commands():

    # adding members to the mapping list
    for account in MSFT_ACCOUNT_NAME_LIST:
        name = account.get("name")

        COMMAND_MAPPINGS.get(4).append(f"call {name.lower()}")
        COMMAND_MAPPINGS.get(5).append(f"mail {name.lower()}")
        COMMAND_MAPPINGS.get(6).append(f"open {name.lower()}'s chat")


add_msft_account_to_commands()

# TODO: add other general chit chat stuff to the commands
