console.log("Gamepad viewer, by Ishidaw");

let mainGamepad = undefined;

// Text html for debuggin
const debugController = {
  top: document.querySelector(".debug_top"),
  down: document.querySelector(".debug_down"),
  left: document.querySelector(".debug_left"),
  right: document.querySelector(".debug_right"),
  select: document.querySelector(".debug_select"),
  start: document.querySelector(".debug_start"),
  home: document.querySelector(".debug_home"),
  a: document.querySelector(".debug_a"),
  b: document.querySelector(".debug_b"),
  x: document.querySelector(".debug_x"),
  y: document.querySelector(".debug_y"),
  lb: document.querySelector(".debug_lb"),
  lt: document.querySelector(".debug_lt"),
  rb: document.querySelector(".debug_rb"),
  rt: document.querySelector(".debug_rt"),
  ls: document.querySelector(".debug_ls"),
  rs: document.querySelector(".debug_rs"),
  left_axis: document.querySelector(".debug_left-axis"),
  right_axis: document.querySelector(".debug_right-axis")
}

// Actual controller related tags
const controller = {
  top: document.querySelector(".top"),
  down: document.querySelector(".down"),
  left: document.querySelector(".left"),
  right: document.querySelector(".right"),
  select: document.querySelector(".select"),
  start: document.querySelector(".start"),
  home: document.querySelector(".home"),
  a: document.querySelector(".a"),
  b: document.querySelector(".b"),
  x: document.querySelector(".x"),
  y: document.querySelector(".y"),
  lb: document.querySelector(".lb"),
  lt: document.querySelector(".lt"),
  rb: document.querySelector(".rb"),
  rt: document.querySelector(".rt"),
  ls: document.querySelector(".ls"),
  rs: document.querySelector(".rs"),
  left_axis: document.querySelector(".left-axis"),
  right_axis: document.querySelector(".right-axis")
}

const buttons = {
  D_UP: undefined,
  D_DOWN: undefined,
  D_LEFT: undefined,
  D_RIGHT: undefined,
  F_A: undefined,
  F_B: undefined,
  F_X: undefined,
  F_Y: undefined,
  LB: undefined,
  LT: undefined,
  RB: undefined,
  RT: undefined,
  SELECT: undefined,
  START: undefined,
  LS: undefined,
  RS: undefined,
  LEFT_STICK: undefined,
  RIGHT_STICK: undefined
}

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

  // I need to refresh it, so obs can update what it's displaying (controller)
  mainGamepad = navigator.getGamepads()[0];

  buttons.D_UP = mainGamepad.buttons[12].value;
  buttons.D_DOWN = mainGamepad.buttons[13].value;
  buttons.D_LEFT = mainGamepad.buttons[14].value;
  buttons.D_RIGHT = mainGamepad.buttons[15].value;
  buttons.F_A = mainGamepad.buttons[0].value;
  buttons.F_B = mainGamepad.buttons[1].value;
  buttons.F_X = mainGamepad.buttons[2].value;
  buttons.F_Y = mainGamepad.buttons[3].value;
  buttons.LB = mainGamepad.buttons[4].value;
  buttons.LT = mainGamepad.buttons[6].value;
  buttons.RB = mainGamepad.buttons[5].value;
  buttons.RT = mainGamepad.buttons[7].value;
  buttons.SELECT = mainGamepad.buttons[8].value;
  buttons.START = mainGamepad.buttons[9].value;
  buttons.LS = mainGamepad.buttons[10].value;
  buttons.RS = mainGamepad.buttons[11].value;
  buttons.LEFT_STICK = new Float32Array(mainGamepad.axes.slice(0, 2));
  buttons.RIGHT_STICK = new Float32Array(mainGamepad.axes.slice(-2));
  // const HOME = mainGamepad.buttons[16].value; It's a button that I don't want to register activity

  // Actual controller functions
  pressedControllerButton(controller.top, buttons.D_UP, true);
  pressedControllerButton(controller.down, buttons.D_DOWN, true);
  pressedControllerButton(controller.left, buttons.D_LEFT, true);
  pressedControllerButton(controller.right, buttons.D_RIGHT, true);
  pressedControllerButton(controller.a, buttons.F_A);
  pressedControllerButton(controller.b, buttons.F_B);
  pressedControllerButton(controller.x, buttons.F_X);
  pressedControllerButton(controller.y, buttons.F_Y);
  pressedControllerButton(controller.lb, buttons.LB);
  pressedControllerButton(controller.rb, buttons.RB);
  useRangedMechanism(controller.lt, buttons.LT);
  useRangedMechanism(controller.rt, buttons.RT);
  pressedControllerButton(controller.select, buttons.SELECT, true);
  pressedControllerButton(controller.start, buttons.START, true);
  // pressedControllerButton(btn_home, HOME, true); It's a button that I don't want to register activity

  // PressedControllerButton is used to click, useRangedMechanis is used to move the image
  pressedControllerButton(controller.ls, buttons.LS);
  pressedControllerButton(controller.rs, buttons.RS);
  useRangedMechanism(controller.ls, buttons.LEFT_STICK);
  useRangedMechanism(controller.rs, buttons.RIGHT_STICK);

  // Debug functions
  // debugConsole()
  // debugHTML();
  requestAnimationFrame(gamepadInputs);
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

function debugHTML() {
  pressedButton(debugController.top, buttons.D_UP);
  pressedButton(debugController.down, buttons.D_DOWN);
  pressedButton(debugController.left, buttons.D_LEFT);
  pressedButton(debugController.right, buttons.D_RIGHT);
  pressedButton(debugController.a, buttons.F_A);
  pressedButton(debugController.b, buttons.F_B);
  pressedButton(debugController.x, buttons.F_X);
  pressedButton(debugController.y, buttons.F_Y);
  pressedButton(debugController.lb, buttons.LB);
  pressedButton(debugController.lt, buttons.LT);
  pressedButton(debugController.rb, buttons.RB);
  pressedButton(debugController.rt, buttons.RT);
  pressedButton(debugController.select, buttons.SELECT);
  pressedButton(debugController.start, buttons.START);
  pressedButton(debugController.ls, buttons.LS);
  pressedButton(debugController.rs, buttons.RS);
  moveAxis(debugController.left_axis, buttons.LEFT_STICK);
  moveAxis(debugController.right_axis, buttons.RIGHT_STICK);
  // pressedButton(d_btn_home, HOME); It's a button that I don't whant to register activity
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

