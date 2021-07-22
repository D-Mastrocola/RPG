class swordAttack{
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.size = 30;
    }
    draw() {
        fill(255, 0, 0);
        rect(this.pos.x, this.pos.y, this.size, this.size)
    }
    update() {
        this.draw();
    }
}