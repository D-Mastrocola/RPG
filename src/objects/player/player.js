class Player {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.moveSpeed = 4;
    this.dir = createVector(0, 1);
    this.inputs = {
      w: false,
      a: false,
      s: false,
      d: false,
    };
    this.size = 30;
    this.canAttack = true;
    this.isAttacking = false;
    this.objects = [];
    this.sprites = {
      up: loadImage('./src/objects/player/sprites/up.png'),
      left: loadImage('./src/objects/player/sprites/left.png'),
      right: loadImage('./src/objects/player/sprites/right.png'),
      down: loadImage('./src/objects/player/sprites/down.png'),
      upLeft: loadImage('./src/objects/player/sprites/upDiagonalLeft.png'),
      upRight: loadImage('./src/objects/player/sprites/upDiagonalRight.png'),
      downLeft: loadImage('./src/objects/player/sprites/downDiagonalLeft.png'),
      downRight: loadImage('./src/objects/player/sprites/downDiagonalRight.png')
    }
    this.currentSprite = this.sprites.right;
  }
  attack() {
    this.setVel();
    if (this.canAttack) {
      this.isAttacking = true;
      this.canAttack = false;
      console.log("attack");
      let attack = new swordAttack(this.pos.x + this.dir.x * this.size, this.pos.y + this.dir.y * this.size);
      this.objects.push(attack);
    }
  }
  setSprite() {
    if(this.vel.y < 0) {
      this.currentSprite = this.sprites.up;
      if(this.vel.x > 0) this.currentSprite = this.sprites.upRight;
      if(this.vel.x < 0) this.currentSprite = this.sprites.upLeft;
    } else if(this.vel.y > 0) {
      this.currentSprite = this.sprites.down;
      if(this.vel.x > 0) this.currentSprite = this.sprites.downRight;
      if(this.vel.x < 0) this.currentSprite = this.sprites.downLeft;
    } else if(this.vel.x > 0) {
      this.currentSprite = this.sprites.right;
    } else if(this.vel.x < 0) {
      this.currentSprite = this.sprites.left;
    }
  }
  setVel() {
    this.vel.set(0, 0);
    let inputs = this.inputs;
    if (inputs.w === true) this.vel.add(0, -this.moveSpeed);
    if (inputs.a === true) this.vel.add(-this.moveSpeed, 0);
    if (inputs.s === true) this.vel.add(0, this.moveSpeed);
    if (inputs.d === true) this.vel.add(this.moveSpeed, 0);

    this.vel.setMag(this.moveSpeed);
    if(!this.isAttacking) this.setSprite();
  }
  draw() {
    fill(255);
    noStroke();
    //rect(this.pos.x, this.pos.y, this.size, this.size);
    image(this.currentSprite, this.pos.x, this.pos.y)
  }
  update() {
    if(this.vel.mag() !== 0) {
      this.dir = this.vel.copy().normalize();
    }
    this.setVel();
    this.pos.add(this.vel);
    this.draw();
    this.canAttack = true;
    this.isAttacking = false;
    for(let i = 0; i < this.objects.length; i++) this.objects[i].update(this.vel);
  }
}
