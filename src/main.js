let player;
function setup() {
  createCanvas(600, 600);
  player = new Player(20, 100);
  background(51);
}
function draw() {
  background(51);
  player.update();
}

document.addEventListener("keydown", function (e) {
  let key = e.keyCode;
  //        w            a           s              d
  if (key === 87 || key === 65 || key === 83 || key === 68) {
    for (let i = 0; i < player.inputs.length; i++) {
      if (player.inputs[i] === key) return;
    }
    player.inputs.unshift(key);
  } else if (key === 32) {
    //Keydown space
    player.attack();
  }
});
document.addEventListener("keyup", function (e) {
  let key = e.keyCode;
  //        w            a           s              d
  if (key === 87 || key === 65 || key === 83 || key === 68) {
    for (let i = 0; i < player.inputs.length; i++) {
      if (player.inputs[i] === key) {
        player.inputs.splice(i, 1);
      }
    }
  } else if (key === 32) {
    //Keyup space
    player.canAttack = true;
  }
});
