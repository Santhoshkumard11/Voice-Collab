import pyaudio
import coloredlogs
import logging
import sys

SAMPLE_RATE = 16000
FRAMES_PER_BUFFER = 3200

API_ENDPOINT = f"wss://api.assemblyai.com/v2/realtime/ws?sample_rate={SAMPLE_RATE}"

# setting up the audio client for getting the audio input
audio_client = pyaudio.PyAudio()

audio_stream = audio_client.open(
    frames_per_buffer=FRAMES_PER_BUFFER,
    rate=SAMPLE_RATE,
    format=pyaudio.paInt16,
    channels=1,
    input=True,
)


# setting up logging
coloredlogs.install(milliseconds=True)
coloredlogs.install(
    fmt="%(asctime)s,%(msecs)03d %(hostname)s %(name)s[%(process)d] | %(levelname)s | %(message)s"
)

loghandler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter("%(asctime)s | %(levelname)s | %(message)s")
loghandler.setFormatter(formatter)
logging.basicConfig(level=logging.DEBUG, handlers=[loghandler])


logging.info("Starting to log things..")
