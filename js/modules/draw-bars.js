export function wrapper(audio) {

    createCanvas(65, 35, ".monitorPFL")
    let w = 16
    let h = HEIGHT
    let x = WIDTH / 6 - 5
    let bh = 5 //Value for incline bar

    strokeWeight(1)

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
        let yL = map(
            arrayMedia(audio.getByteFrequencyDataL()),
            255 - bh, -(bh/2 + 1),
            0, HEIGHT
        )
        let hueL = map(yL, 0, HEIGHT, 30, 130)
        fill(gradient(x, yL, w, h, hueL))
        create3DBar(x, Math.abs(yL), w, h)
        stroke("#ffffff")

        let yR = map(
            arrayMedia(audio.getByteFrequencyDataR()),
            255 - bh, -(bh/2 + 1),
            0, HEIGHT
        )
        let hueR = map(yR, 0, HEIGHT, 30, 130)
        fill(gradient(x * 6, yR, w, h, hueR))
        create3DBar(x * 6, Math.abs(yR), w, h)
        stroke("#ffffff")
        requestAnimationFrame(draw)
    }

    addEventListener("DOMContentLoaded", () => {
        // Draw Bars
        draw()
    })
}