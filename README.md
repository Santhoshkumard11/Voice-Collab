# Voice Collab 🔊 👨‍💻👩‍💻
[![](https://vsmarketplacebadge.apphb.com/version-short/sandy-codes-py.voice-collab.svg)](https://marketplace.visualstudio.com/items?itemName=sandy-codes-py.voice-collab)
[![](https://vsmarketplacebadge.apphb.com/rating-short/sandy-codes-py.voice-collab.svg)](https://marketplace.visualstudio.com/items?itemName=sandy-codes-py.voice-collab) 
[![Build Status](https://dev.azure.com/sandy-codes-py/Voice-Collab/_apis/build/status/Voice-Collab?branchName=main)](https://dev.azure.com/sandy-codes-py/Voice-Collab/_build/latest?definitionId=1&branchName=main)
![](https://vsmarketplacebadge.apphb.com/installs/sandy-codes-py.voice-collab.svg)
[![License: MIT ](https://img.shields.io/github/license/mashape/apistatus.svg)](/LICENSE)


## Let's harness the power of voice to collaborate and interact with your code and the people you work with

<p align="center"><img src="/media/voice-collab-gif.gif" alt="GIF" width="800" /></p>

## 🔥 What it can do?

- ▶ Start your **Azure DevOps** build with voice command
- 📞 Call a person on Microsoft Teams
- 🗣 Open Microsoft Teams Chat of a person
- 📩 Open Outlook of a person 
- 🔁 Get total pipeline runs
- 😅 Crack a programmer joke
- 📝 Tell a funny programmer story
- 🤖 Chat with Sandy (Powered By **OpenAI's GPT-3 model**)
- 👾 Generate code (Powered by **OpenAI's Codex model**)
- 🔒 Lock Screen
- More Coming soon!

## ⚙ Setup the environment - Windows
- `Python 3.7 and above`
- `node ^12`
- Once your install the extension, hit Ctrl+r to open RUN and type `%USERPROFILE%\.vscode\extensions`
- Search for sandy-codes-py voice collab extension
- Open a Powershell/command prompt inside the extension folder and `npm install`
- This will install all the node modules required
- inside the same folder create a python virtual environment `py -m venv venv`
- activate the environment and install the requirements `venv/Scripts/pip install -r requirements.txt`
- Start VS Code again, you should see a 🔇stopped icon in the status bar and a notification if the setup was successful ✅
- Check the Developer tools for error and logging info
- The Microsoft Team call and outlook email option will use your `default browser`, change this from the system settings if you want then to open up in other browsers
- You need internet connectivity to get the live transcription from Google

Create `.env` file inside `python_scripts` folder
1. PERSONAL_ACCESS_TOKEN = "<paste your key>"
2. OPENAI_API_KEY = "<paste your key>"

Once you've set all the above them your good to go


## 📌 FAQ
- The speech recognition is done with **Google's free speech to text API** - get a paid API for smoother experience
- Install PyAudio as `pipwin install pyaudio`, but first install pipwin as `pip install pipwin` - This is not needed but just in case
- Open developer tools from Help> Toggle Developer Tools in VS Code to see the logs

## 💡 License

This project is released under the MIT license.