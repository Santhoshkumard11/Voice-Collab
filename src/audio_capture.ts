import { MediaRecorder, register } from "extendable-media-recorder";


const stream = new navigator.mediaDevices.getUserMedia({ audio: true });
const mediaRecoder = new MediaRecorder(stream);

DEEPGRAM_API_KEY = "";
const { Deepgram } = require("@deepgram/sdk");

const deepgram = new Deepgram(DEEPGRAM_API_KEY);

const deepgramLive = deepgram.transcription.live({
  punctuate: true,
  // additional options
})(async () => {
  // Get the port a worker which can encode WAV files.
  const port = await connect();
  // Register this port with the MediaRecorder.
  await register(port);
  // Request a MediaStream with an audio track.
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: true,
  });
  // Create a MediaRecorder instance with the newly obtained MediaStream.
  const mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: "audio/wav",
  });

  // Kick off the recording.
  mediaRecorder.start(250);

  mediaRecorder.addEventListener("dataavailable", ({ data }) => {
    // The data variable now holds a refrence to a Blob with the WAV file.
  });

  // Stop the recording after a second.
  setTimeout(() => mediaRecorder.stop(), 1000);
})();
