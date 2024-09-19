class AudioControler {
    constructor() {
        this.audioElement = new Audio()
        this.audioElement.crossOrigin = "anonymous"
        this.vol = {
            min: 0,
            max: 2,
            default: 1
        }
        this.pan = {
            min: -1,
            max: 1,
            default: 0
        }
        this.initialized = false
    }

    initialize() {
        if (!this.initialized) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
            this.source = this.audioCtx.createMediaElementSource(this.audioElement)
            this.splitter = this.audioCtx.createChannelSplitter(2)

            this.leftChannel = this.audioCtx.createAnalyser()
            this.rightChannel = this.audioCtx.createAnalyser()
            this.leftChannel.fftSize = 32
            this.rightChannel.fftSize = 32

            this.leftDataArray = new Uint8Array(this.leftChannel.frequencyBinCount)
            this.rightDataArray = new Uint8Array(this.rightChannel.frequencyBinCount)

            this.gainNode = new GainNode(this.audioCtx)
            this.gainNode.gain.value = this.vol.default

            this.panner = new StereoPannerNode(this.audioCtx, {
                pan: this.pan.default
            })

            this.connect()
            this.initialized = true
        }
    }

    connect() {
        this.source.connect(this.gainNode)
        this.gainNode.connect(this.panner)
        this.panner.connect(this.splitter)
        this.panner.connect(this.audioCtx.destination)

        this.splitter.connect(this.leftChannel, 0, 0)
        this.splitter.connect(this.rightChannel, 1, 0)
    }

    audioContextSuspended() {
        if (this.audioCtx.state === "suspended") {
            this.audioCtx.resume();
        }
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
      
    /* AUDIO FUNCTIONS */
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

    paused() {
        return this.audioElement.paused
    }

    src(filePath) {
        if (filePath) {
            this.audioElement.src = filePath
        } else {
            return this.audioElement.src
        }
    }

    currentTime(value) {
        if (value) {
            this.audioElement.currentTime = value
        }
    }

    addEventListener(...args) {
        this.audioElement.addEventListener(...args)
    }
    /* =============== */

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