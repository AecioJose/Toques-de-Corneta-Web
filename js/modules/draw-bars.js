export function wrapper(audio) {

    createCanvas(100, 115, ".monitorPFL")
    let w = 30
    let h = HEIGHT
    let xL = 1
    let xR = WIDTH / 2 + xL
    let bh = 6 //Value for incline bar
    let minHB = (bh + 4) * -2

    strokeWeight(1)

    function create3DBar(xx, yy, ww, hh, bh) {
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
            arrayMedia(audio.getByteFrequencyDataL()), 255 - minHB + 5, minHB, 0, HEIGHT
        )
        let hueL = map(yL, 0, HEIGHT, 10, 130)
        fill(gradient(xL, yL, w, h, hueL))
        create3DBar(xL, Math.abs(yL), w, h, bh)
        stroke("#00000046")

        let yR = map(
            arrayMedia(audio.getByteFrequencyDataR()), 255 - minHB + 5, minHB, 0, HEIGHT
        )
        let hueR = map(yR, 0, HEIGHT, 10, 130)
        fill(gradient(xR, yR, w, h, hueR))
        create3DBar(xR, Math.abs(yR), w, h, bh)
        stroke("#00000046")
        requestAnimationFrame(draw)
    }

    addEventListener("DOMContentLoaded", () => {
        // Draw Bars
        draw()
    })
}