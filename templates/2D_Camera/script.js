
var canvas = document.getElementById("canvas"); 
canvas.width = canvas.clientWidth; 
canvas.height =  canvas.clientHeight;

const pen = canvas.getContext("2d"); 

// Access Camera
    
const video = document.getElementById("video");

const stream = await navigator.mediaDevices.getUserMedia({
	    video: true
});

video.srcObject = stream;

await video.play();

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

	requestAnimationFrame(render);
}

render();
