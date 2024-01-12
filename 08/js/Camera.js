export default class Camera {
  constructor() {
    console.log("Camera is running");
    this.video = document.createElement("video");
    this.video.width = window.innerWidth;
    this.video.height = window.innerHeight;
    document.body.appendChild(this.video);

    this.initWebcam();
  }

  // accès à la caméra du navigateur/ ordinateur
  initWebcam() {
    // fullscreen webcam stream
    const constraints = {
      video: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      this.video.srcObject = stream;
      this.video.play();
    });
  }
}
