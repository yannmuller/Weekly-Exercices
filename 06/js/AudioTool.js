class AudioTool {
  constructor() {
    this.audioFile = "audio/jingle-bells.mp3";
    this.audio = new Audio(this.audioFile);
    this.isPlaying = false;
  }

  initAudioContext() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    this.initBroadcast();
    this.setupAnalyser();
  }

  initBroadcast() {
    this.source = this.audioContext.createMediaElementSource(this.audio);
  }

  setupAnalyser() {
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    //expliquer
    this.analyser.fftSize = 2048;
    //expliquer
    this.bufferLength = this.analyser.frequencyBinCount;
    //tableau de data (2 type)
    this.dataFrequency = new Uint8Array(this.bufferLength);
    this.dataFloatFrequency = new Float32Array(this.bufferLength);
    this.dataWave = new Uint8Array(this.bufferLength);
  }

  updateWaveForm() {
    if (this.audioContext) this.analyser.getByteTimeDomainData(this.dataWave);
  }
  updateFrequency() {
    if (this.audioContext)
      this.analyser.getByteFrequencyData(this.dataFrequency);
  }
  updatedFloatFrequency() {
    if (this.audioContext)
      this.analyser.getFloatFrequencyData(this.dataFloatFrequency);
  }

  play(mouse) {
    if (this.isPlaying === false) {
      if (!this.audioContext) {
        this.initAudioContext();
      }
      this.audio.play();
      this.isPlaying = true;
    } else {
      // this.audio.pause();
      // this.isPlaying = false;
      let timeToStart =
        (mouse.clientX / window.innerWidth) * this.audio.duration;
      this.audio.currentTime = timeToStart;
    }
  }
}
