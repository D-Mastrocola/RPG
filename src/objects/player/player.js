class Player {
  constructor(x, y) {
    this.maxHealth = 3;
    this.health = this.maxHealth;
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
    this.attackDownSprite = loadImage(
      "./src/objects/player/sprites/player_attack_down.png"
    );
    this.attackRightSprite = loadImage(
      "./src/objects/player/sprites/player_attack_right.png"
    );
    this.attackLeftSprite = loadImage(
      "./src/objects/player/sprites/player_attack_left.png"
    );
    this.attackUpSprite = loadImage(
      "./src/objects/player/sprites/player_attack_up.png"
    );
    this.spriteIndexes = {
      up: [3, 0, 1],
      left: [2, 0, 1],
      right: [1, 0, 1],
      down: [0, 0, 1],
      attackDown: [
        0,
        3,
        { x: 32, y: 54 },
        { x: 0, y: 0 },
        this.attackDownSprite,
      ],
      attackRight: [
        0,
        3,
        { x: 58, y: 32 },
        { x: 0, y: 0 },
        this.attackRightSprite,
      ],
      attackLeft: [
        0,
        3,
        { x: 58, y: 32 },
        { x: -26, y: 0 },
        this.attackLeftSprite,
      ],
      attackUp: [0, 3, { x: 32, y: 54 }, { x: 0, y: -23 }, this.attackUpSprite],
    };
    this.currentSprite = this.spriteIndexes.right;
    this.currentAttackSprite = this.spriteIndexes.attackRight;
  }
  attack() {
    this.vel.set(0, 0);
    this.isAttacking = true;
    if (this.canAttack) {
      this.spriteFrame = 0;
      this.lastFrameChange = millis();
      this.canAttack = false;
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
      this.currentAttackSprite = this.spriteIndexes.attackUp;
      this.dir.set(0, -1);
    } else if (this.vel.y > 0) {
      this.currentSprite = this.spriteIndexes.down;
      this.currentAttackSprite = this.spriteIndexes.attackDown;
      this.dir.set(0, 1);
    } else if (this.vel.x > 0) {
      this.currentSprite = this.spriteIndexes.right;
      this.currentAttackSprite = this.spriteIndexes.attackRight;
      this.dir.set(1, 0);
    } else if (this.vel.x < 0) {
      this.currentSprite = this.spriteIndexes.left;
      this.currentAttackSprite = this.spriteIndexes.attackLeft;
      this.dir.set(-1, 0);
    }
  }
  setVel() {
    if (!this.isAttacking) {
      this.vel.set(0, 0);
      let lastKey = this.inputs[0];

      if (lastKey === 87) this.vel.y = -1;
      if (lastKey === 65) this.vel.x = -1;
      if (lastKey === 83) this.vel.y = 1;
      if (lastKey === 68) this.vel.x = 1;

      this.vel.setMag(this.moveSpeed);
      this.setSprite();
    }
  }
  draw() {
    fill(255);
    noStroke();
    if (this.isAttacking) {
      image(
        this.currentAttackSprite[4],
        this.pos.x + this.currentAttackSprite[3].x,
        this.pos.y + this.currentAttackSprite[3].y,
        this.currentAttackSprite[2].x,
        this.currentAttackSprite[2].y,
        this.currentAttackSprite[2].x * this.spriteFrame,
        0,
        this.currentAttackSprite[2].x,
        this.currentAttackSprite[2].y
      );
    } else {
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

    //draw health
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(2);
    for (let i = 0; i < floor(this.health); i++) {
      rect(22 * i + 22, 20, 20, 20);
    }
    rect(
      22 * ceil(this.health),
      20,
      15 * (this.health - floor(this.health)),
      20
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

    if (this.isAttacking) {
      if (this.spriteFrame > 3) this.spriteFrame = 0;
    } else if (
      this.spriteFrame > this.currentSprite[2] ||
      this.vel.mag() === 0
    ) {
      this.spriteFrame = 0;
    }
  }
}
