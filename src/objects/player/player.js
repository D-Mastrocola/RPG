class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.moveSpeed = 4;
    this.dir = createVector(0, 1);
    this.inputs = [];
    this.size = 32;
    this.canAttack = true;
    this.isAttacking = false;
    this.objects = [];
    this.attackObj = "";
    this.spriteFrame = 0;
    this.lastFrameChange = millis();
    this.sprite = loadImage("./src/objects/player/sprites/player_movement.png");
    this.spriteIndexes = {
      up: [3, 0, 1],
      left: [2, 0, 1],
      right: [1, 0, 1],
      down: [0, 0, 1],
    };
    this.currentSprite = this.spriteIndexes.right;
  }
  attack() {
    this.setVel();
    this.isAttacking = true;
    if (this.canAttack) {
      this.canAttack = false;
      console.log("attack");
      let attack = new swordAttack(
        this.pos.x + this.dir.x * this.size,
        this.pos.y + this.dir.y * this.size
      );
      this.attackObj = attack;
    }
  }
  setSprite() {
    if (this.vel.y < 0) {
      this.currentSprite = this.spriteIndexes.up;
      this.dir.set(0, -1);
    } else if (this.vel.y > 0) {
      this.currentSprite = this.spriteIndexes.down;
      this.dir.set(0, 1);
    } else if (this.vel.x > 0) {
      this.currentSprite = this.spriteIndexes.right;
      this.dir.set(1, 0);
    } else if (this.vel.x < 0) {
      this.currentSprite = this.spriteIndexes.left;
      this.dir.set(-1, 0);
    }
  }
  setVel() {
    this.vel.set(0, 0);
    let lastKey = this.inputs[0];

    if (lastKey === 87) this.vel.y = -1;
    if (lastKey === 65) this.vel.x = -1;
    if (lastKey === 83) this.vel.y = 1;
    if (lastKey === 68) this.vel.x = 1;

    this.vel.setMag(this.moveSpeed);
    if (!this.isAttacking) this.setSprite();
  }
  draw() {
    fill(255);
    noStroke();
    //rect(this.pos.x, this.pos.y, this.size, this.size);
    image(
      this.sprite,
      this.pos.x,
      this.pos.y,
      this.size,
      this.size,
      this.currentSprite[1] * this.size + this.spriteFrame * this.size,
      this.currentSprite[0] * this.size,
      this.size,
      this.size
    );
  }
  update() {
    this.setVel();
    this.pos.add(this.vel);
    this.draw();

    for (let i = 0; i < this.objects.length; i++)
      this.objects[i].update(this.vel);

    if (this.attackObj !== "") {
      this.attackObj.update(this.vel);
    }
    if (millis() - this.lastFrameChange > 125) {
      this.lastFrameChange = millis();
      this.spriteFrame++;
    }

    if (this.spriteFrame > this.currentSprite[2] || this.vel.mag() === 0)
      this.spriteFrame = 0;

    console.log(this.spriteFrame + "\n" + this.currentSprite);
  }
}
