# Voice Collab 🔊 👨‍💻👩‍💻 🦻
---
[![](https://vsmarketplacebadge.apphb.com/version-short/sandy-codes-py.voice-collab.svg)](https://marketplace.visualstudio.com/items?itemName=sandy-codes-py.voice-collab)
[![](https://vsmarketplacebadge.apphb.com/rating-short/sandy-codes-py.voice-collab.svg)](https://marketplace.visualstudio.com/items?itemName=sandy-codes-py.voice-collab) 
[![Build Status](https://dev.azure.com/sandy-codes-py/Voice-Collab/_apis/build/status/Voice-Collab?branchName=main)](https://dev.azure.com/sandy-codes-py/Voice-Collab/_build/latest?definitionId=1&branchName=main)
![](https://vsmarketplacebadge.apphb.com/installs/sandy-codes-py.voice-collab.svg)
[![License: MIT ](https://img.shields.io/github/license/mashape/apistatus.svg)](/LICENSE)

## Let's harness the power of voice to collaborate and interact with your code and the people you work with

<p align="center">
<img src="media/voice-collab-gif.gif" alt="GIF" width="800" />
</p>

## 🔥 What it can do? (everything with just voice)

- ▶ Trigger your **Azure DevOps** pipeline build
- 📞 Call a person on Microsoft Teams
- 🗣 Open Microsoft Teams Chat of a person
- 📩 Open Outlook of a person 
- 🔁 Get total pipeline runs
- 😅 Crack a programmer joke
- 📝 Tell a funny programmer story
- 🤖 Chat with Sandy (Powered By **OpenAI's GPT-3 model**) - Optional
- 👾 Generate code (Powered by **OpenAI's Codex model**) - Optional
- 🔒 Lock Screen
- More Coming soon!

## ⚙ Setup the environment - Windows
- Requires - `Python 3.7 and above`
- Requires - `node ^12`
- Once you install the extension, hit `Ctrl+r` to open RUN and type `%USERPROFILE%\.vscode\extensions`
- Search for sandy-codes-py voice collab extension
- Open a Powershell/command prompt inside the extension folder and execute `npm install` - this will install all the node modules required
- Inside the same folder create a python virtual environment `py -m venv venv`
- Activate the environment and install the requirements `venv/Scripts/pip install -r requirements.txt`
- The Microsoft Team call,chat and outlook email option will use your `default browser`, change this from the system settings if you want to open up in another browser
- Create `.env` file inside `python_scripts` folder with the following variables to make the API's work
    - PERSONAL_ACCESS_TOKEN = "<paste your key>" # Azure DevOps token
    - OPENAI_API_KEY = "<paste your key>"
- You need **internet connectivity** to get the speech transcription from `Google's API`
- Restart VS Code, you should see a 🔇stopped icon in the status bar and a success notification if the setup was successful ✅

Read the [FAQ](#faq) below for possible issues you might face and how to `add your own custom commands`
Once you've set all the above them your good to go 🏁


## 🤔 How to Use
- Once the setup is done, open up the developer tools if you want to see the actual working of the extension (Help> Toggle Developer Tools)
- Open the Command Palette `(Ctrl+Shift+P)`, type `Voice Collab :`
- You should see the list of commands you can use, select `Start Recognizer server`, this will start the Python server which will accept the WebSocket connection on local host port `8001`
- Open the Command Palette `(Ctrl+Shift+P)`, type `voice collab: connect to server`, this establishes a WebSocket connection from the extension to the local Python server 

### Now start speaking out the below commands to trigger the respective actions 🔊


## 🦾 Commands to invoke
|    Description                             |      Trigger phrases                                                                                                                                             |
| -------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Triggering Azure DevOps pipeline		     | say - start build or trigger pipeline build                                                                                                                      |
| Create the requirements.txt file           | say - create requirements.txt or create requirements file                                                                                                        |
| Get all Azure DevOps pipeline runs count	 | say - get total pipeline runs                                                                                                                                    |
| Call someone on Microsoft Teams 	         | say - call megan (this name could any name from `MSFT_ACCOUNT_NAME_LIST` list in `_constants.py` file)                                                           |
| Email someone on Outlook	                 | say - email megan                                                                                                                                                |
| Open up someone's Microsoft Teams Chat     | say - open megan's chat                                                                                                                                          |
| Speak out 5 commands you can use           | say - show help or  help or what are the commands I can use                                                                                                      |
| Speak out all the commands you can use     | say - help more or list all the commands I can use                                                                                                               |
| Push the code to remote                    | say - git push or push code (still in progress)                                                                                                                  |
| Commit code and lock the screen            | say - taking a break or break time                                                                                                                               |
| Lock the user screen                       | say - lock screen                                                                                                                                                |
| Crack a random programmer joke             | say - crack a joke or joke about programmers or make me feel better                                                                                              |
| Narrate a random programmer story          | say - tell a story or story time                                                                                                                                 |
| Chat with Sandy                            | say - hey sandy or sandy and then say the phrase you wanna ask Example: Am I the best programmer in the world?                                                   |
| Generate code                              | say - hey codex or codex and then say what you want Example: Create a Python class with name Employee, Create a Python dictionary with country and it's capitals |


## 💻 List of commands available in the Command Palette `(Ctrl+Shift+P)`
|    Commands                             |	                                 Description                                         |
| --------------------------------------- | ------------------------------------------------------------------------------------ |
| Voice Collab: Notification		      | This will send in a test notification to check if the extension runs without errors  |
| Voice Collab: Start Recognizer Server   | Start the Python server that will accept WebSocket connections on port 8001          |
| Voice Collab: Connect to server		  | Establish a WebSocket connection with the locally hosted Python server on port 8001  |
| Voice Collab: Stop Voice Recognizer	  | Terminate the Python server                                                          |
| Voice Collab: Disconnect from server	  | Close the WebSocket connection with the Python server                                |
| Voice Collab: Setup virtual Environment | Create the virtual environment for the PIP packages for the server to run            |
| Voice Collab: Install requirements      | Install all the PIP packages needed for the Python server                            |


## 📌FAQ
- How to install PyAudio?
    - Install PyAudio as `pipwin install pyaudio`, but first install pipwin as `pip install pipwin` - This is not needed but just in case
- How to add more people into the system?
    - You can add more people from your org into the `MSFT_ACCOUNT_NAME_LIST` in `_constants.py` file
- How to add your own commands?
    - Add a new item to `COMMAND_DETAILS` dict in `_command_mapping.py` file with the following details
        - method_name - Name of the method that you'll have to create in `_helper.py` file, 
        - description - A description of the command (this will be used when you ask for help)
        - success_message - This will be spoken out if the method returns true
        - failure_message - This wil be spoken out if the method returns false
        - add_args - This is used if you want to pass any args to the method
        - args - This is passed all the time to the method
        - kargs - This is passed all the time to the method
        - speak_args - If set to true then it speaks out the return string from the method
    - Add the number os phrases with which this method should be triggered in `COMMAND_MAPPINGS` dict in `_command_mapping.py` file, the key should match the key in the  `COMMAND_DETAILS` dict 
- Open developer tools from Help> Toggle Developer Tools in VS Code to see the logs
- The speech recognition is done with **Google's free speech to text API** - get a paid API for a smoother experience
- Raise an issue if you're unable to resolve it yourself

## 💡 License

This project is released under the MIT license.