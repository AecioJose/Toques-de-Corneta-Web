export function wrapper(audio) {

    createCanvas(150, 150, ".monitorPFL")

    let w = 30
    let h = HEIGHT
    let x = WIDTH / 6
    let bh = 6 //Value for incline bar

    strokeWeight(0.3)

    function create3DBar(xx, yy, ww, hh) {
        beginShape()
        vertex(xx, yy)
        vertex(xx, hh)
        vertex(xx + ww, hh)
        vertex(xx + ww + ww / 2, hh - bh)
        vertex(xx + ww + ww / 2, yy - bh)
        vertex(xx + ww / 2, yy - bh)
        vertex(xx, yy)
        vertex(xx + ww, yy)
        vertex(xx + ww + ww / 2, yy - bh)
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
                    arrayMedia(audio.getByteFrequencyDataL()),
                    255 - bh, -(bh/2),
                    0, HEIGHT
                )), w, h)
        stroke("#ffffff")

        fill("#E72210")
        create3DBar(x * 3,
            Math.abs(
                map(
                    arrayMedia(audio.getByteFrequencyDataR()),
                    255 - bh, -(bh/2),
                    0, HEIGHT
                )), w, h)

        stroke("#ffffff")
        requestAnimationFrame(draw)
    }

    addEventListener("DOMContentLoaded", () => {
        // Draw Bars
        draw()
    })
}