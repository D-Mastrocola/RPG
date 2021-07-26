class Rupee {
    constructor(x, y, value) {
        this.pos = createVector(x, y);
        this.value = value;
        this.sprite = loadImage('./src/objects/rupee/rupees.png')
        this.size = {
            x: 16,
            y: 32
        }
    } 
    draw() {
        if(this.value === 1) {
            image(this.sprite, this.pos.x, this.pos.y, this.size.x, this.size.y, 0, 0, this.size.x, this.size.y)
        } else {
            image(this.sprite, this.pos.x, this.pos.y, this.size.x, this.size.y, this.size.x, 0, this.size.x, this.size.y)
        }
    }
    update() {
        this.draw()
    }
}