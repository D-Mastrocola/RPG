class swordAttack {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.size = 30;
    this.createdTime = millis();
    this.length = 500;
  }
  draw() {
    fill(255, 0, 0);
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
  update(playerVel) {
    let currentTime = millis();
    if (currentTime - this.createdTime < this.length) {
      this.pos.add(playerVel);
      this.draw();
      player.isAttacking = true;
      player.canAttack = false;
    }
  }
}
