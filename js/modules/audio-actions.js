let audio = new Audio();

function getFileName(string) {
    let index = string.lastIndexOf("/")
    return string.substring(index + 1).toLowerCase()
}

export function playTone(audioPath) {
    if (!audio.paused) {
        console.log("Is Playing");
        return;
    } else if (getFileName(audio.src) === getFileName(audioPath) && audio.paused) {
        //console.log(`Play! src is ${audioPath}`);
        audio.currentTime = 0;
        audio.play();
        return;
    }

    audio.src = audioPath;
}

audio.addEventListener('canplay', (event) => {
    event.target.play()
})

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        audio.pause();
    }
});