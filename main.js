console.log("Gamepad viewer, by Ishidaw");

let mainGamepad = undefined;

const btn_top = document.querySelector(".top");
const btn_down = document.querySelector(".down");
const btn_left = document.querySelector(".left");
const btn_right = document.querySelector(".right");

const btn_select = document.querySelector(".select");
const btn_start = document.querySelector(".start");
const btn_home = document.querySelector(".home");

const btn_a = document.querySelector(".a");
const btn_b = document.querySelector(".b");
const btn_x = document.querySelector(".x");
const btn_y = document.querySelector(".y");

const btn_lb = document.querySelector(".lb");
const btn_lt = document.querySelector(".lt");
const btn_rb = document.querySelector(".rb");
const btn_rt = document.querySelector(".rt");

const btn_ls = document.querySelector(".ls");
const btn_rs = document.querySelector(".rs");

const left_axis = document.querySelector(".left-axis")
const right_axis = document.querySelector(".right-axis")

// Trigger gamepad connected event
window.addEventListener("gamepadconnected", (gamepad) => {
  gamepadConnected(gamepad);
});

// Trigger gamepad disconnected event
window.addEventListener("gamepaddisconnected", (gamepad) => {
  gamepadDisconnected(gamepad);
});

function gamepadConnected(gamepadObj) {
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gamepadObj.gamepad.index,
    gamepadObj.gamepad.id,
    gamepadObj.gamepad.buttons.length,
    gamepadObj.gamepad.axes.length,
  );

  mainGamepad = navigator.getGamepads()[0]
  console.log(mainGamepad)

}

function gamepadDisconnected(gamepadObj) {
  console.log(
    "Gamepad disconnected from index %d: %s",
    gamepadObj.gamepad.index,
    gamepadObj.gamepad.id,
  );

  mainGamepad = undefined;
}


// Inputs notes:
// - buttons range [0..1], where triggers may be in the range, but buttons should be one or another
// - axes range [-1.. 1]. 
// - LEFT   = -1
// - CENTER = 0
// - RIGHT  = 1
// LS [0, 1]
// RS [2, 3]
function gamepadInputs() {
  if (!mainGamepad) return;

  const D_UP = mainGamepad.buttons[12].value
  const D_DOWN = mainGamepad.buttons[13].value
  const D_LEFT = mainGamepad.buttons[14].value
  const D_RIGHT = mainGamepad.buttons[15].value

  const F_A = mainGamepad.buttons[0].value
  const F_B = mainGamepad.buttons[1].value
  const F_X = mainGamepad.buttons[2].value
  const F_Y = mainGamepad.buttons[3].value

  const LB = mainGamepad.buttons[4].value
  const LT = mainGamepad.buttons[6].value
  const RB = mainGamepad.buttons[5].value
  const RT = mainGamepad.buttons[7].value

  const SELECT = mainGamepad.buttons[8].value
  const START = mainGamepad.buttons[9].value
  const HOME = mainGamepad.buttons[16].value

  const LS = mainGamepad.buttons[10].value
  const RS = mainGamepad.buttons[11].value

  // Check performance
  const LEFT_STICK = new Float32Array(mainGamepad.axes.slice(0, 2));
  const RIGHT_STICK = new Float32Array(mainGamepad.axes.slice(-2));

  pressedButton(btn_top, D_UP)
  pressedButton(btn_down, D_DOWN)
  pressedButton(btn_left, D_LEFT)
  pressedButton(btn_right, D_RIGHT)

  pressedButton(btn_a, F_A)
  pressedButton(btn_b, F_B)
  pressedButton(btn_x, F_X)
  pressedButton(btn_y, F_Y)

  pressedButton(btn_lb, LB)
  pressedButton(btn_rt, LT)
  pressedButton(btn_rb, RB)
  pressedButton(btn_rt, RT)

  pressedButton(btn_select, SELECT)
  pressedButton(btn_start, START)
  pressedButton(btn_home, HOME)

  pressedButton(btn_ls, LS)
  pressedButton(btn_rs, RS)

  // Debug
  // debugConsole()
}

function pressedButton(htmlButton, gamepadButton) {
  if (gamepadButton > 0) {
    htmlButton.style.color = "#FA0000"
  } else {
    htmlButton.style.color = "#000"
  }
}

function debugConsole() {
  console.log(mainGamepad.axes);

  console.log(mainGamepad.buttons[12].value) // D-UP
  console.log(mainGamepad.buttons[13].value) // D-DOWN
  console.log(mainGamepad.buttons[14].value) // D-LEFT
  console.log(mainGamepad.buttons[15].value) // D-RIGHT

  console.log(mainGamepad.buttons[0].value) // A
  console.log(mainGamepad.buttons[1].value) // B
  console.log(mainGamepad.buttons[2].value) // X
  console.log(mainGamepad.buttons[3].value) // Y

  console.log(mainGamepad.buttons[5].value) // RB
  console.log(mainGamepad.buttons[7].value) // RT
  console.log(mainGamepad.buttons[4].value) // LB
  console.log(mainGamepad.buttons[6].value) // LT

  console.log(mainGamepad.buttons[8].value) // SELECT
  console.log(mainGamepad.buttons[9].value) // START
  console.log(mainGamepad.buttons[16].value) // HOME

  console.log(mainGamepad.buttons[10].value) // T_LS
  console.log(mainGamepad.buttons[11].value) // T_RS

  console.log([mainGamepad.axes[0], mainGamepad.axes[1]]) // LS (left, right)
  console.log([mainGamepad.axes[2], mainGamepad.axes[3]]) // RS (left, right)
}


// 24 FPS
setInterval(() => {
  gamepadInputs()
}, 41.66)
