import os
import requests
import json
import logging

# from urllib.request import pathname2url
from pprint import pprint

ORGANIZATION = "sandy-codes-py"
PROJECT = "Voice-Collab"
PIPELINE_ID = 1
TEAM = "Voice-Collab%20Team"

# GET_RUNS_URL = "https://dev.azure.com/sandy-codes-py/Voice-Collab/_apis/pipelines/1/runs?api-version=7.1-preview.1"


def send_post_request(url: str, data={}):
    return requests.post(
        url,
        data=json.dumps(data),
        headers={"Content-Type": "application/json"},
        auth=("", os.getenv("PERSONAL_ACCESS_TOKEN")),
    )


def send_get_request(url: str):
    return requests.get(url, auth=("", os.getenv("PERSONAL_ACCESS_TOKEN")))


def trigger_pipeline_run():
    """Trigger the pipeline in Azure Devops

    Returns:
        bool, str: state and info
    """

    URL = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/pipelines/{PIPELINE_ID}/runs?api-version=7.1-preview.1"

    response = send_post_request(URL)

    if response.status_code == 200:
        logging.info("Build started successfully")
        return True, ""
    else:
        return False, ""


def total_backlog_items():
    url = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/{TEAM}/_apis/work/backlogs?api-version=6.0-preview.1"
    print(url)
    result = send_get_request(url)

    result = json.loads(result.text)
    pprint(result)

    print(len(result.items()))


# not working
def get_total_work_items():
    url = "https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/wit/workitems?api-version=6.0"
    print(url)
    result = send_get_request(url)

    result = json.loads(result.text)
    pprint(result)

    print(len(result.items()))


def get_total_pipeline_runs():
    url = f"https://dev.azure.com/{ORGANIZATION}/{PROJECT}/_apis/pipelines/{PIPELINE_ID}/runs?api-version=6.0-preview.1"
    print(url)
    result = send_get_request(url)

    result = json.loads(result.text)
    total_count = result.get("count")
    print(total_count)

    return total_count


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
