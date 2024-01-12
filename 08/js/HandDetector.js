import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

export default class HandDetector {
  constructor(videoElement) {
    this.videoElement = videoElement;
    console.log("HandDetector is running");
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.createHandLandmarker();
  }

  // async > wait to get the result (start by downloading the assets and then run the code)
  // temps d'attente à l'intérieur de la fonction
  async createHandLandmarker() {
    const vision = await FilesetResolver.forVisionTasks("./tasks/wasm");

    this._handLandmarker = await HandLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `./tasks/hand_landmarker.task`,
        delegate: "GPU",
      },
      runningMode: "VIDEO", // this.runningMode, (en temps réel)
      numHands: 2,
    });

    this.detect();
  }

  detect() {
    let startTimeMs = performance.now();

    const results = this._handLandmarker.detectForVideo(
      this.videoElement,
      startTimeMs
    );

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (results.landmarks.length > 0) {
      console.log(results.landmarks);
      results.landmarks.forEach((pointsDeLaMain) => {
        drawLandmarks(this.ctx, pointsDeLaMain, { color: "red", radius: 5 });
      });
    }

    requestAnimationFrame(this.detect.bind(this));
  }
}
