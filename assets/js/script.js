var video1 = document.getElementById("video1");
var video2 = document.getElementById("video2");


var faceCanvas1 = document.getElementById("faceCanvas1");
var faceCanvas2 = document.getElementById("faceCanvas2");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]);





 function activateSuret(video,faceCanvas){
  setTimeout(()=>{
    var canvas =  faceapi.createCanvasFromMedia(video);
    faceCanvas.append(canvas);
    var displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      var detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      var resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      //faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      //faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    }, 100);
  },3000) 
  

}


video1.addEventListener("play",()=>{
  activateSuret(video1,faceCanvas1);
})

video2.addEventListener("play",()=>{
  activateSuret(video2,faceCanvas2);
})