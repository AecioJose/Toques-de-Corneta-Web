class AudioControler {
    constructor() {
        this.audioElement = new Audio()
        this.audioCtx = null
        this.track = null
        this.gainNode = null
        this.panner = null
        this.analyser = null
        this.bufferLength = null
        this.dataArray = null
        this.splitter = null
        this.leftChannel = null 
        this.rightChannel = null
        this.leftDataArray = null
        this.rightDataArray = null
        this.vol = { min: 0, max: 2, default: 1 }
        this.pan = { min: -1, max: 1, default: 0 }
        this.initialized = false
        //step = 0.01
        //-1 left / 1 right
    }

    initialize() {
        if (!this.initialized) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
            this.track = new MediaElementAudioSourceNode(this.audioCtx, { mediaElement: this.audioElement })
            this.gainNode = new GainNode(this.audioCtx)
            this.gainNode.gain.value = this.vol.default
            this.panner = new StereoPannerNode(this.audioCtx, { pan: this.pan.default })
            this.analyser = this.audioCtx.createAnalyser()
            this.analyser.fftSize = 2048
            this.splitter = this.audioCtx.createChannelSplitter(2)
            this.leftChannel = this.audioCtx.createAnalyser()
            this.leftChannel.fftSize = 2048
            this.rightChannel = this.audioCtx.createAnalyser()
            this.rightChannel.fftSize = 2048
            this.bufferLength = this.analyser.frequencyBinCount
            this.dataArray = new Uint8Array(this.bufferLength)
            this.leftDataArray = new Uint8Array(this.leftChannel.frequencyBinCount)
            this.rightDataArray = new Uint8Array(this.rightChannel.frequencyBinCount)
            this.connect()
            this.initialized = true
        }
    }

    connect() {
        // this.track.connect(this.analyser).connect(this.gainNode).connect(this.panner).connect(this.audioCtx.destination)
        this.track.connect(this.analyser)
        this.analyser.connect(this.gainNode)
        this.gainNode.connect(this.panner)
        this.panner.connect(this.audioCtx.destination)
        // this.track.connect(this.gainNode);
        // this.gainNode.connect(this.splitter)
        // this.splitter.connect(this.leftChannel, 0); // Canal esquerdo
        // this.splitter.connect(this.rightChannel, 1); // Canal direito
        // this.leftChannel.connect(this.panner);
        // this.rightChannel.connect(this.panner);
        // this.panner.connect(this.audioCtx.destination);

    }

    setSource(audioPath) {
        if (audioPath) {
            this.audioElement.src = audioPath
        }
    }

    audioContextSuspended() {
        if (this.audioCtx.state === "suspended") {
            this.audioCtx.resume();
        }
    }

    getByteFrequencyData() {
        if (!this.initialized) return [] 
        this.analyser.getByteFrequencyData(this.dataArray)
        return this.dataArray
    }

    getByteFrequencyDataR() {
        if (!this.initialized) return []
       this.rightChannel.getByteFrequencyData(this.rightDataArray)
       return this.rightDataArray 
    }

    getByteFrequencyDataL() {
        if (!this.initialized) return []
       this.leftChannel.getByteFrequencyData(this.leftDataArray)
       return this.leftDataArray 
    }

    play() {
        if (!this.initialized) return

        this.audioContextSuspended()
        if (this.audioElement.paused) {
            this.audioElement.play()
        }
    }

    pause() {
        if (!this.initialized) return

        this.audioContextSuspended()
        if (!this.audioElement.paused) {
            this.audioElement.pause()
        }
    }

    setVol(volValue) {
        if (volValue && this.initialized) {
            if (volValue > this.vol.max || volValue < this.vol.min) {
                return
            }

            this.gainNode.gain.value = volValue
        }
    }

    setPan(panValue) {
        if (panValue && this.initialized) {
            if (panValue < this.pan.min || panValue > this.pan.max) {
                return
            }

            this.panner.pan.value = panValue
        }
    }
}