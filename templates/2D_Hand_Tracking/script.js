import {
	  HandLandmarker,
	  FilesetResolver
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

var canvas = document.getElementById("canvas"); 
var cw = canvas.clientWidth; 
var ch = canvas.clientHeight;
canvas.width = cw; 
canvas.height = ch; 

const pen = canvas.getContext("2d"); 

// Access Camera

const video = document.getElementById("video");

const stream = await navigator.mediaDevices.getUserMedia({
	    video: true
});

video.srcObject = stream;

await video.play();

// Hand tracking

const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
);

const handLandmarker =
    await HandLandmarker.createFromOptions(
        vision,
        {
            baseOptions: {
                modelAssetPath:
                    "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
            },
            runningMode: "VIDEO",
            numhands: 2
        }
    );

// Render 

function render() {
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	pen.drawImage(
		video,
		0,
		0,
		canvas.width,
		canvas.height
	);

	const results = handLandmarker.detectForVideo(
		    video,
		    performance.now()
	);

	if (results.landmarks) {

		for (const hand of results.landmarks) {

			for (const point of hand) {

				pen.beginPath();

				pen.arc(
					point.x * canvas.width,
					point.y * canvas.height,
					5,
					0,
					Math.PI * 2
				);

				pen.fill();
			}
		}
	}

	requestAnimationFrame(render);
}

render();
