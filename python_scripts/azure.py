import os
import requests
import json
import logging
import inspect

ORGANIZATION = "sandy-codes-py"
PROJECT = "Voice-Collab"
PIPELINE_ID = 1
TEAM = "Voice-Collab%20Team"

# GET_RUNS_URL = "https://dev.azure.com/sandy-codes-py/Voice-Collab/_apis/pipelines/1/runs?api-version=7.1-preview.1"


def current_method_name():
    return inspect.stack()[1][3]


def send_post_request(url: str, data={}, api_name="DevOps"):
    """Send a POST request to a URL and return the data

    Args:
        url (str): URL of the API
        data (dict, optional): data to be sent in json. Defaults to {}.
        api_name (str, optional): the name of the api you want to call

    Returns:
        response: response from the request
    """

    if api_name == "graph_api":
        return requests.post(
            url,
            data=json.dumps(data),
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer " + os.getenv("GRAPH_API_TOKEN"),
            },
        )
    else:
        return requests.post(
            url,
            data=json.dumps(data),
            headers={"Content-Type": "application/json"},
            auth=("", os.getenv("PERSONAL_ACCESS_TOKEN")),
        )


def send_get_request(url: str):
    """Send in a GET request

    Args:
        url (str): URL of the API

    Returns:
        response: response from the GET request
    """
    return requests.get(url, auth=("", os.getenv("PERSONAL_ACCESS_TOKEN")))


def trigger_pipeline_run():
    """Trigger the pipeline in Azure Devops

    Returns:
        bool, str: state and info
    """

    URL = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/pipelines/{PIPELINE_ID}/runs?api-version=7.1-preview.1"
    command_success = True
    try:
        response = send_post_request(URL)

        if response.status_code == 200:
            logging.info("Build started successfully")
        else:
            command_success = False
    except Exception:
        logging.exception(f"func | {current_method_name()} | See the below error")
        command_success = False

    return command_success, ""


def total_backlog_items():
    url = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/{TEAM}/_apis/work/backlogs?api-version=6.0-preview.1"
    print(url)
    result = send_get_request(url)

    result = json.loads(result.text)

    print(len(result.items()))


# not working
def get_total_work_items():
    url = "https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/wit/workitems?api-version=6.0"
    print(url)
    result = send_get_request(url)

    result = json.loads(result.text)

    print(len(result.items()))


def get_total_pipeline_runs():
    """Count the total builds of a pipeline

    Returns:
        bool, list[int]: the state of the response and the count of builds
    """
    command_success = True
    url = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/pipelines/{PIPELINE_ID}/runs?api-version=6.0-preview.1"
    try:
        result = send_get_request(url)

        result = json.loads(result.text)
        total_count = result.get("count")

    except Exception:
        logging.exception(f"func | {current_method_name()} | See the below error")
        command_success = False

    return command_success, [total_count]


def get_others_tickets():
    pass


def get_my_tickets():
    pass


def get_completed_tickets():
    pass


def get_sprint_time_left():
    pass


def last_pipeline_run_id(pipeline_list: list):
    pass


def last_pipeline_status():

    pipeline_list = get_total_pipeline_runs()

    run_id = last_pipeline_run_id(pipeline_list)

    url = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/pipelines/{PIPELINE_ID}/runs/{run_id}?api-version=6.0-preview.1"

    send_get_request(url)


# def get_high_important_mails():
#     url = "https://graph.microsoft.com/v1.0/me/messages?$filter=importance eq 'high'"


# def get_mentioned_emails():
#     url = "https://graph.microsoft.com/beta/me/messages?$filter=mentionsPreview/isMentioned eq true&$select=subject,sender,receivedDateTime"
