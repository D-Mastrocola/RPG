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
    this.objects = [];
  }
  attack() {
    if (this.canAttack) {
      this.canAttack = false;
      console.log("attack");
      let attack = new swordAttack(this.pos.x + this.dir.x * this.size, this.pos.y + this.dir.y * this.size);
      this.objects.push(attack);

    }
  }
  setVel() {
    let inputs = this.inputs;
    if (inputs.w === true) this.vel.add(0, -this.moveSpeed);
    if (inputs.a === true) this.vel.add(-this.moveSpeed, 0);
    if (inputs.s === true) this.vel.add(0, this.moveSpeed);
    if (inputs.d === true) this.vel.add(this.moveSpeed, 0);

    this.vel.setMag(this.moveSpeed);
  }
  draw() {
    fill(255);
    noStroke();
    rect(this.pos.x, this.pos.y, this.size, this.size);
  }
  update() {
    if(this.vel.mag() !== 0) {
      this.dir = this.vel.copy().normalize();
    }
    this.vel.set(0, 0);
    this.setVel();
    this.pos.add(this.vel);
    this.draw();

    for(let i = 0; i < this.objects.length; i++) this.objects[i].update();
  }
}
