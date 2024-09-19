const fileElement = document.querySelector("#file");
const volumeControl = document.querySelector('#volume');
const pannerControl = document.querySelector('#panner');
const timeControl = document.querySelector('#time');
const audioControler = new AudioControler()
let x, y, w, h;

createCanvas(150, 300, "#canvas-area")

w = 30
h = HEIGHT
y = HEIGHT - 5
x = WIDTH / 6

strokeWeight(0.3)

audioControler.addEventListener("loadeddata", (e) => {
    timeControl.max = e.target.duration
    e.target.play()
})

audioControler.addEventListener("timeupdate", (e) => {
    timeControl.value = e.target.currentTime
})

fileElement.addEventListener("change", (e) => {
    audioControler.initialize()
    audioControler.src(URL.createObjectURL(e.target.files[0]))
})

volumeControl.addEventListener(
    "input",
    (event) => {
        audioControler.setVol(event.target.value)
    },
    false
);

pannerControl.addEventListener(
    "input",
    (event) => {
        audioControler.setPan(event.target.value)
    },
    false
);

timeControl.addEventListener("input", (e) => {
    audioControler.currentTime(e.target.value)
})

function playOrpause() {
    if (audioControler.paused()) {
        audioControler.play()
    } else {
        audioControler.pause()
    }
}

//DEBUG FUNCTION
function init() {
    audioControler.initialize()
    audioControler.src("sounds/nefex.m4a")
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
    //background("#ffffff");
    backgroundClear()
    fill("#2510E7")
    create3DBar(x,
        Math.abs(
            map(
                arrayMedia(audioControler.getByteFrequencyDataL()),
                255 - 10, -5,
                0, HEIGHT
            )), w, h)
    canvasCtx.stroke()

    fill("#E72210")
    create3DBar(x * 3,
        Math.abs(
            map(
                arrayMedia(audioControler.getByteFrequencyDataR()),
                255 - 10, -5,
                0, HEIGHT
            )), w, h)

    stroke("#ffffff")
    requestAnimationFrame(draw)
}

draw()