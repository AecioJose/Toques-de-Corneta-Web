// let audio = new AudioControler();

// function getFileName(string) {
//     let index = string.lastIndexOf("/")
//     return string.substring(index + 1).toLowerCase()
// }

// function playTone(audioPath) {
//     if (!audio.paused()) {
//         console.log("Is Playing");
//         return;
//     } else if (getFileName(audio.src()) === getFileName(audioPath) && audio.paused()) {
//         //console.log(`Play! src is ${audioPath}`);
//         audio.setCurrentTime(0);
//         audio.play();
//         return;
//     }

//     audio.src(audioPath);
// }

// audio.addEventListener('canplay', (event) => {
//     event.target.play()
// })

// document.addEventListener('keydown', (e) => {
//     if (e.code === 'Space') {
//         e.preventDefault();
//         audio.pause();
//     }
// });

console.clear();


let audioCtx;
const audioControler = new AudioControler()

const audioElement = document.querySelector("audio");
const fileElement = document.querySelector("#file");
const volumeControl = document.querySelector('#volume');
const pannerControl = document.querySelector('#panner');


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

function playpause() {
    if (audioControler.paused()) {
        audioControler.play()
    } else {
        audioControler.pause()
    }
}

const analyserCanvas = document.getElementById('analyserCanvas');
const canvasCtxAnalyser = analyserCanvas.getContext('2d');

const lineOld = { l: canvas.height, r: canvas.height }
const lineh = 3
const dec = 0.8

function draw() {
    canvasCtx.fillStyle = '#000000';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
    const dataL = audioControler.getByteFrequencyDataL()
    const dataR = audioControler.getByteFrequencyDataR()

    let L = audioControler.getMedia(dataL)
    let R = audioControler.getMedia(dataR)

    let Lh = audioControler.map(R, 0, 255, 0, canvas.height)
    let Rh = audioControler.map(L, 0, 255, 0, canvas.height)

    canvasCtx.fillStyle = "#ffffff"
    canvasCtx.fillRect(
        90,
        lineOld.l - lineh,
        30,
        lineh)
    let grad = canvasCtx.createLinearGradient(90, canvas.height - Lh, 30, canvas.height)
    grad.addColorStop(0, `hsl(${audioControler.map(L, 0, 255, 130, 0)}, 100%, 50%)`)
    grad.addColorStop(1, "hsl(120,100%,50%)")
    canvasCtx.fillStyle = grad
    canvasCtx.fillRect(
        90,
        canvas.height - Lh,
        30,
        canvas.height)
    if (canvas.height - Lh < lineOld.l) {
        lineOld.l = canvas.height - (Lh + lineh)
    }

    canvasCtx.fillStyle = "#ffffff"
    canvasCtx.fillRect(
        30,
        lineOld.r - lineh,
        30,
        lineh)
    canvasCtx.fillStyle = "rgb(49,255,9)"
    canvasCtx.fillRect(
        30,
        canvas.height - Rh,
        30,
        canvas.height)
    if (canvas.height - Rh < lineOld.r) {
        lineOld.r = canvas.height - (Rh + lineh)
    }


    if (lineOld.l < canvas.height) {
        if ((canvas.height - Lh) - lineOld.l > 40 || canvas.height - Lh == 0) {
            lineOld.l += dec * 3
        } else {
            lineOld.l += dec
        }
    }
    if (lineOld.r < canvas.height) {//lineOld.r += dec
        if ((canvas.height - Rh) - lineOld.r > 40 || canvas.height - Rh == 0) {
            lineOld.r += dec * 3
        } else {
            lineOld.r += dec
        }
    }

    requestAnimationFrame(draw)
}

draw()