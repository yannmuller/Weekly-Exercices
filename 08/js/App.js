import Camera from "./Camera.js";
import Grid from "./Grid.js";
import HandDetector from "./HandDetector.js";

// module
export default class App {
  constructor() {
    console.log("App is running");
    this.cam = new Camera();
    this.HandDetector = new HandDetector(this.cam.video);
    this.grid = new Grid(this.);
  }
}
