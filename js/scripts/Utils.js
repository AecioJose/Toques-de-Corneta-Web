/*
Importante: 

A função createCanvas é o ponto inicial para a manipulação do canvas. As seguintes funções e variáveis dependem da chamada prévia de createCanvas para funcionar corretamente:

- fill: Define a cor de preenchimento para formas.
- stroke: Define a cor da borda das formas.
- strokeWeight: Ajusta a espessura da borda.
- background: Define a cor de fundo do canvas.
- backgroundClear: Limpa o canvas.
- vertex: Adiciona um ponto ao caminho atual de uma forma.
- beginShape: Inicia um novo caminho de forma.
- endShape: Finaliza o caminho da forma desenhada.
- WIDTH: Armazena a largura do canvas.
- HEIGHT: Armazena a altura do canvas.

Certifique-se de chamar createCanvas antes de utilizar essas funções e variáveis!
*/


Window.prototype.AudioControler = class AudioControler {
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

Window.prototype.map = function (n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2
    if (!withinBounds) {
        return newval
    }
    if (start2 < stop2) {
        return Math.max(Math.min(newval, stop2), start2)
    } else {
        return Math.max(Math.min(newval, start2), stop2)
    }
}

Window.prototype.arrayMedia = function (dataarray) {
    if (dataarray.length === 0) {
        return 0
    }

    const sum = dataarray.reduce((acc, num) => acc + num, 0);

    return sum / dataarray.length;
}

Window.prototype.createCanvas = function (width=300, height=300, parent="body") {
    let canvas = this.document.createElement('canvas')
    this.canvasCtx = canvas.getContext("2d")

    canvas.width = width
    canvas.height = height

    this.WIDTH = width
    this.HEIGHT = height

    this.document.querySelector(parent).appendChild(canvas)
} 

Window.prototype.fill = function (color) {
    this.canvasCtx.fillStyle = color
}

Window.prototype.stroke = function (color="#000000") {
    this.canvasCtx.strokeStyle = color
    this.canvasCtx.stroke()
}

Window.prototype.strokeWeight = function (weight=1) {
    this.canvasCtx.lineWidth = weight
}

Window.prototype.background = function (color) {
    this.fill(color)
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT)
}

Window.prototype.gradient = function (x, y, w, h, hue) {
	const grad = this.canvasCtx.createLinearGradient(x, y, x + w, y + h);
     grad.addColorStop(0, `hsl(${hue}, 100%, 50%)`);
     grad.addColorStop(1, "hsl(130, 100%, 50%)");
    return grad
}

Window.prototype.backgroundClear = function () {
    this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
}

Window.prototype.vertex = function (x, y) {
    this.canvasCtx.lineTo(x, y)
}

Window.prototype.beginShape = function () {
    this.canvasCtx.beginPath()
}

Window.prototype.endShape = function () {
    this.canvasCtx.closePath()
    this.canvasCtx.fill()
}