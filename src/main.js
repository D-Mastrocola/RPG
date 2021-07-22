let player;
function setup() {
  createCanvas(600, 600);
  player = new Player(20, 20);
  background(51);
}
function draw() {
  background(51);
  player.update();
}

document.addEventListener("keydown", function (e) {
  let key = e.keyCode;
  if (key === 87) {
    //Keydown W
    player.inputs.w = true;
  } else if (key === 65) {
    //Keydown W
    player.inputs.a = true;
  } else if (key === 83) {
    //Keydown W
    player.inputs.s = true;
  } else if (key === 68) {
    //Keydown W
    player.inputs.d = true;
  } else if (key === 32) {
    //Keyup space
    player.attack();
  }
});
document.addEventListener("keyup", function (e) {
  let key = e.keyCode;
  if (key === 87) {
    //Keyup W
    player.inputs.w = false;
  } else if (key === 65) {
    //Keyup W
    player.inputs.a = false;
  } else if (key === 83) {
    //Keyup W
    player.inputs.s = false;
  } else if (key === 68) {
    //Keyup W
    player.inputs.d = false;
  } else if (key === 32) {
    //Keyup space
    player.canAttack = true;
  }
});
