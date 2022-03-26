COMMAND_DETAILS: dict = {
    1: {
        "method_name": "trigger_pipeline_run",
        "description": "Triggering Azure DevOps pipeline ",
    },
    2: {
        "method_name": "execute_on_shell",
        "args": ["pip freeze > requirements.txt"],
        "kargs": {},
        "success_message": "Successfully created requirements file",
        "failure_message": "Failed to create requirements file",
    },
    3: {
        "method_name": "get_total_pipeline_runs",
        "description": "Triggering Azure DevOps pipeline ",
    },
}

COMMAND_MAPPINGS: dict = {
    1: ["start build", "trigger build pipeline"],
    2: ["create requirements.txt", "create requirements"],
    3: ["get total pipeline runs", ""],
}

# Microsoft Accounts
MSFT_ACCOUNT_NAME_LIST: list = [
    {"name": "Grace", "id": "", "email": ""},
    {"name": "Jack", "id": "", "email": ""},
    {"name": "Adam", "id": "", "email": ""},
    {"name": "Emily", "id": "", "email": ""},
]


def add_msft_account_to_commands():

    # adding members for
    for account in MSFT_ACCOUNT_NAME_LIST:
        name = account.get("name")
        COMMAND_MAPPINGS[f"call {name}"] = "initiate_teams_call"
        COMMAND_MAPPINGS[f"mail {name}"] = "initiate_a_mail"


add_msft_account_to_commands()
