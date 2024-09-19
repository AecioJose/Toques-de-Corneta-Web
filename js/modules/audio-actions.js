import { wrapper } from "./draw-bars.js"

let audio = new AudioControler(); //USING AUDIO CONTROLER

function getFileName(string) {
    let index = string.lastIndexOf("/")
    return string.substring(index + 1).toLowerCase()
}

export function playTone(audioPath) {
    audio.initialize()
    if (!audio.paused()) {
        console.log("Is Playing");
        return;
    } else if (getFileName(audio.src()) === getFileName(audioPath) && audio.paused()) {
        //console.log(`Play! src is ${audioPath}`);
        audio.currentTime(0);
        audio.play();
        return;
    }

    audio.src(audioPath);
}

audio.addEventListener('loadeddata', (event) => {
    event.target.play()
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        audio.pause();
    }
});

wrapper(audio)