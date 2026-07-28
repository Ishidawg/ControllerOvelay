console.log("Gamepad viewer, by Ishidaw");

let mainGamepad = undefined;

// Text html for debuggin
const d_btn_top = document.querySelector(".top");
const d_btn_down = document.querySelector(".down");
const d_btn_left = document.querySelector(".left");
const d_btn_right = document.querySelector(".right");

const d_btn_select = document.querySelector(".select");
const d_btn_start = document.querySelector(".start");
const d_btn_home = document.querySelector(".home");

const d_btn_a = document.querySelector(".a");
const d_btn_b = document.querySelector(".b");
const d_btn_x = document.querySelector(".x");
const d_btn_y = document.querySelector(".y");

const d_btn_lb = document.querySelector(".lb");
const d_btn_lt = document.querySelector(".lt");
const d_btn_rb = document.querySelector(".rb");
const d_btn_rt = document.querySelector(".rt");

const d_btn_ls = document.querySelector(".ls");
const d_btn_rs = document.querySelector(".rs");

const d_left_axis = document.querySelector(".left-axis");
const d_right_axis = document.querySelector(".right-axis");

// Actual controller related tags
const btn_top = document.querySelector(".c_top");
const btn_down = document.querySelector(".c_down");
const btn_left = document.querySelector(".c_left");
const btn_right = document.querySelector(".c_right");

const btn_select = document.querySelector(".c_select");
const btn_start = document.querySelector(".c_start");
const btn_home = document.querySelector(".c_home");

const btn_a = document.querySelector(".c_a");
const btn_b = document.querySelector(".c_b");
const btn_x = document.querySelector(".c_x");
const btn_y = document.querySelector(".c_y");

const btn_lb = document.querySelector(".c_lb");
const btn_lt = document.querySelector(".c_lt");
const btn_rb = document.querySelector(".c_rb");
const btn_rt = document.querySelector(".c_rt");

const btn_ls = document.querySelector(".c_ls");
const btn_rs = document.querySelector(".c_rs");

// const left_axis = document.querySelector(".left-axis");
// const right_axis = document.querySelector(".right-axis");

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

  mainGamepad = navigator.getGamepads()[0];
  console.log(mainGamepad);

  requestAnimationFrame(gamepadInputs);
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

  const D_UP = mainGamepad.buttons[12].value;
  const D_DOWN = mainGamepad.buttons[13].value;
  const D_LEFT = mainGamepad.buttons[14].value;
  const D_RIGHT = mainGamepad.buttons[15].value;

  const F_A = mainGamepad.buttons[0].value;
  const F_B = mainGamepad.buttons[1].value;
  const F_X = mainGamepad.buttons[2].value;
  const F_Y = mainGamepad.buttons[3].value;

  const LB = mainGamepad.buttons[4].value;
  const LT = mainGamepad.buttons[6].value;
  const RB = mainGamepad.buttons[5].value;
  const RT = mainGamepad.buttons[7].value;

  const SELECT = mainGamepad.buttons[8].value;
  const START = mainGamepad.buttons[9].value;
  // const HOME = mainGamepad.buttons[16].value; It's a button that I don't whant to register activity

  const LS = mainGamepad.buttons[10].value;
  const RS = mainGamepad.buttons[11].value;

  const LEFT_STICK = new Float32Array(mainGamepad.axes.slice(0, 2));
  const RIGHT_STICK = new Float32Array(mainGamepad.axes.slice(-2));

  // Actual controller functions
  pressedControllerButton(btn_top, D_UP, true);
  pressedControllerButton(btn_down, D_DOWN, true);
  pressedControllerButton(btn_left, D_LEFT, true);
  pressedControllerButton(btn_right, D_RIGHT, true);

  pressedControllerButton(btn_a, F_A);
  pressedControllerButton(btn_b, F_B);
  pressedControllerButton(btn_x, F_X);
  pressedControllerButton(btn_y, F_Y);

  pressedControllerButton(btn_lb, LB);
  pressedControllerButton(btn_rb, RB);
  useRangedMechanism(btn_lt, LT);
  useRangedMechanism(btn_rt, RT);

  pressedControllerButton(btn_select, SELECT, true);
  pressedControllerButton(btn_start, START, true);
  // pressedControllerButton(btn_home, HOME, true); It's a button that I don't whant to register activity

  pressedControllerButton(btn_ls, LS);
  pressedControllerButton(btn_rs, RS);

  useRangedMechanism(btn_ls, LEFT_STICK);
  useRangedMechanism(btn_rs, RIGHT_STICK);

  // Debug functions
  pressedButton(d_btn_top, D_UP);
  pressedButton(d_btn_down, D_DOWN);
  pressedButton(d_btn_left, D_LEFT);
  pressedButton(d_btn_right, D_RIGHT);

  pressedButton(d_btn_a, F_A);
  pressedButton(d_btn_b, F_B);
  pressedButton(d_btn_x, F_X);
  pressedButton(d_btn_y, F_Y);

  pressedButton(d_btn_lb, LB);
  pressedButton(d_btn_rt, LT);
  pressedButton(d_btn_rb, RB);
  pressedButton(d_btn_rt, RT);

  pressedButton(d_btn_select, SELECT);
  pressedButton(d_btn_start, START);
  // pressedButton(d_btn_home, HOME); It's a button that I don't whant to register activity

  pressedButton(d_btn_ls, LS);
  pressedButton(d_btn_rs, RS);

  moveAxis(d_left_axis, LEFT_STICK);
  moveAxis(d_right_axis, RIGHT_STICK);

  // Debug
  // debugConsole()
  requestAnimationFrame(gamepadInputs);
  console.log("request");
}

// I know LB and RB are bumpers, and not buttons
// Also, on buttons, I toggle a css class or apply a filter.
function pressedControllerButton(htmlButton, gamepadButton, toggle = false) {
  if (!toggle) {
    htmlButton.style.filter = gamepadButton > 0 ? "invert(100%)" : "invert(0%)";
  } else {
    gamepadButton > 0 ? htmlButton.classList.remove("hidden") : htmlButton.classList.add("hidden")
  }
}

// Used for triggers and analog axis
function useRangedMechanism(htmlButton, gamepadMechanism) {
  if (gamepadMechanism instanceof Float32Array) {
    htmlButton.style.transform = `translate(${gamepadMechanism[0]}em, ${gamepadMechanism[1]}em)`;
  } else {
    htmlButton.style.filter = `invert(${gamepadMechanism * 100}%)`;
  }
}

function pressedButton(htmlButton, gamepadButton) {
  if (gamepadButton > 0) {
    htmlButton.style.color = "#FA0000";
  } else {
    htmlButton.style.color = "#000";
  }
}

function moveAxis(htmlAxis, gamepadAxis) {
  htmlAxis.innerHTML = `H: ${Number(gamepadAxis[0]).toFixed(2)} | V: ${Number(gamepadAxis[1]).toFixed(2)}`;
}

function debugConsole() {
  console.log(mainGamepad.axes);

  console.log(mainGamepad.buttons[12].value); // D-UP
  console.log(mainGamepad.buttons[13].value); // D-DOWN
  console.log(mainGamepad.buttons[14].value); // D-LEFT
  console.log(mainGamepad.buttons[15].value); // D-RIGHT

  console.log(mainGamepad.buttons[0].value); // A
  console.log(mainGamepad.buttons[1].value); // B
  console.log(mainGamepad.buttons[2].value); // X
  console.log(mainGamepad.buttons[3].value); // Y

  console.log(mainGamepad.buttons[5].value); // RB
  console.log(mainGamepad.buttons[7].value); // RT
  console.log(mainGamepad.buttons[4].value); // LB
  console.log(mainGamepad.buttons[6].value); // LT

  console.log(mainGamepad.buttons[8].value); // SELECT
  console.log(mainGamepad.buttons[9].value); // START
  console.log(mainGamepad.buttons[16].value); // HOME

  console.log(mainGamepad.buttons[10].value); // T_LS
  console.log(mainGamepad.buttons[11].value); // T_RS

  console.log([mainGamepad.axes[0], mainGamepad.axes[1]]); // LS (left, right)
  console.log([mainGamepad.axes[2], mainGamepad.axes[3]]); // RS (left, right)
}

