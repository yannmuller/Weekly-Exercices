class AudioTool {
  constructor() {
    this.audioFile = "audio/track.mp3";
    this.audio = new Audio(this.audioFile);
    this.isPlaying = false;
  }

  // initalisation du contexte audio (comme pour dessiner sur le canvas)
  initAudioContext() {
    this.audioContext = new (window.AudioContext() ||
      window.webkitAudioContext)();
    this.initBroadcast();
    this.setupAnalyser();
  }

  initBroadcast() {
    this.source = this.audioContext.createMediaElementSource(this.audio);
  }

  //types d'analyse sur le son, différentes boites à outils
  setupAnalyser() {
    this.analyser = this.audioContext.createAnalyser();
    this.source.connect(this.analyer);
    this.analyser.connect(this.audioContext.destination);
    console.log(this.audioContext.destination);

    // algorithme fast fourrier transform (lien entre fréquence audio et une traduction mathématique)
    // spectre de fréquence (analyse de la fréquence du son), méthode de calcul
    this.analyser.fftSize = 2048;

    // bufferLength: nombre de données que l'on va récupérer
    this.bufferLength = this.analyer.frequencyBinCount;

    // tableau de données récupérées (analyse de 3 éléments: fréquence, amplitude, temps)
    this.dataFrequency = new Uint8Array(this.bufferLength); //(0-255)
    this.dataFloatFrequency = new Float32Array(this.bufferLength); //(0-1)
    this.dataWave = new Uint8Array(this.bufferLength); //(0-255)
  }

  updateWaveForm() {
    if (this.)
    this.analyser.getByteTimeDomainData(this.dataWave);
  }

  updateFrequency() {
    this.analyser.getByteTimeDomainData(this.dataFrequency);
  }

  updateFloatFrequency() {
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
      //   this.audio.pause();
      //   this.isPlaying = false;

      //permet de déplacer la tête de lecture par rapport à la longueur de la fenêtre
      let timeToStart =
        (mouse.clientX / window.innerWidth) * this.audio.duration;
      this.audio.currentTime = timeToStart;
    }
  }
}
