const canvas = document.getElementById('canvas');
const fileElement = document.querySelector("#file");
const canvasCtx = canvas.getContext('2d');
const audioControler = new AudioControler()
let x, y, w, h

w = 30
h = canvas.height
y = canvas.height - 5
x = canvas.width/6

canvasCtx.lineWidth = 0.3
canvasCtx.strokeStyle = "#ffffff"

audioControler.addEventListener("loadeddata", (e) => {
    e.target.play()
})

fileElement.addEventListener("change", (e) => {
    audioControler.initialize()
    audioControler.src(URL.createObjectURL(e.target.files[0]))
})

function playOrpause() {
    if (audioControler.paused()) {
        audioControler.play()
    } else {
        audioControler.pause()
    }
}

function init() {
    audioControler.initialize()
    audioControler.src("audio.mp3")
}

function background(color) {
    fill(color)
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height)
}

function fill(color) {
    canvasCtx.fillStyle = color
}

function vertex(x, y) {
    canvasCtx.lineTo(x, y)
}

function beginShape() {
    canvasCtx.beginPath()
}

function endShape() {
    canvasCtx.closePath()
    canvasCtx.fill()
}

function create3DBar(xx, yy, ww, hh) {
    beginShape()
    vertex(xx, yy)
    vertex(xx, hh)
    vertex(xx + ww, hh)
    vertex(xx + ww + ww / 2, hh - 10)
    vertex(xx + ww + ww / 2, yy - 10)
    vertex(xx + ww / 2, yy - 10)
    vertex(xx, yy)
    vertex(xx + ww, yy)
    vertex(xx + ww + ww / 2, yy - 10)
    vertex(xx + ww, yy)
    vertex(xx + ww, hh)
    vertex(xx + ww, yy)
    endShape()
}

function draw() {
    //background("#ffffff46");
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
    fill("#2510E7")
    create3DBar(x,
        Math.abs(
            map(
                getMedia(audioControler.getByteFrequencyDataL()),
                255 - 10, -5,
                0, canvas.height
            )), w, h)
    canvasCtx.stroke()

    fill("#E72210")
    create3DBar(x * 3,
        Math.abs(
            map(
                getMedia(audioControler.getByteFrequencyDataR()),
                255 - 10, -5,
                0, canvas.height
            )), w, h)

    canvasCtx.stroke()
    requestAnimationFrame(draw)
}

/* Math Functions */


function getMedia(dataarray) {
    if (dataarray.length === 0) {
        return 0
    }

    const sum = dataarray.reduce((acc, num) => acc + num, 0);

    return sum / dataarray.length;
}

function map (n, start1, stop1, start2, stop2, withinBounds) {
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

/*================*/

draw()
