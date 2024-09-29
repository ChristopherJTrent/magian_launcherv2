export type unused = (string|number|undefined)
export type toggle = (-1|0|1)

export type padModes = {
  enable: boolean
  rumble: boolean
  slider: boolean
  hats: boolean
  unfocused: boolean
  xinput: boolean
}

export const GamepadIndices = {
  AUTORUN: 0,
  MACRO_CTRL: 1,
  CHANGE_VIEW: 2,
  MACRO_ALT: 3,
  LOCK_ON: 4,
  CANCEL: 5,
  MAIN_MENU: 6,
  CONFIRM: 7,
  ACTIVE_WINDOW: 8,
  TOGGLE_UI: 9,
  MOVE_TO_MENU: 10,
  MOVE_TO_CAMERA: 11,
  LOGOUT: 12,
  MOVE_FORWARD: 13,
  MOVE_BACKWARD: 14,
  MOVE_LEFT: 15,
  MOVE_RIGHT: 16,
  CAMERA_UP: 17,
  CAMERA_DOWN: 18,
  CAMERA_LEFT: 19,
  CAMERA_RIGHT: 20,
  MENU_UP: 21,
  MENU_DOWN: 22,
  MENU_LEFT: 23,
  MENU_RIGHT: 24,
  SCREENSHOT: 25,
  TOGGLE_MOVEMENT: 26
}

// TODO: find someone who uses a dualshock/dualsense for this game to verify these.
export const DInputButtons = {
  NONE: -1,
  SQUARE: 0,
  CROSS: 1,
  CIRCLE: 2,
  TRIANGLE: 3,
  L1: 4,
  R1: 5,
  L2: 6,
  R2: 7,
  SELECT: 8,
  START: 9,
  L3: 10,
  R3: 11,
  PS_BUTTON: 12,
  TOUCHPAD: 13,
  MIC: 14,
  NOTHING: 15,
  BLANK: 16,
  LSTICK_LR: 32,
  LSTICK_UD: 33,
  RSTICK_LR: 34,
  RSTICK_UD: 37,
  DPAD_LR: 40,
  DPAD_UD: 41
}

export const XInputButtons = {
  NONE: -1,
  B: 0,
  X: 1,
  Y: 2,
  A: 3,
  RIGHT: 4,
  LEFT: 5,
  UP: 6,
  DOWN: 7,
  L1: 8,
  L2: 9,
  L3: 10,
  R1: 11,
  R2: 12,
  R3: 13,
  START: 14,
  BACK: 15,
  BLANK: 16,
  LSTICK_LR_INVERTED: -32,
  LSTICK_LR: 32,
  LSTICK_UD_INVERTED: -33,
  LSTICK_UD: 33,
  RSTICK_LR_INVERTED: -35,
  RSTICK_LR: 35,
  RSTICK_UD_INVERTED: -36,
  RSTICK_UD: 36
}

export const XInputBindings = {
    [-1]:'Unbound',
    0:  'B',
    1:  'X',
    2:  'Y',
    3:  'A',
    4:  'D-Pad Right',
    5:  'D-Pad Left',
    6:  'D-Pad Up',
    7:  'D-Pad Down',
    8:  'L1',
    9:  'L2',
    10: 'L3',
    11: 'R1',
    12: 'R2',
    13: 'R3',
    14: 'START',
    15: 'BACK',
    16: 'Unbound (16)',
    [-32]:'LSTICK L/R INVERTED',
    32: 'LSTICK L/R',
    [-33]:'LSTICK U/D INVERTED',
    33: 'LSTICK U/D',
    [-35]:'RSTICK L/R INVERTED',
    35: 'RSTICK L/R',
    [-36]:'RSTICK U/D INVERTED',
    36: 'RSTICK U/D'
}

export const DInputBindings = {
  [-1]:'Unbound',
  0:  '▢',
  1:  '✖',
  2:  '○',
  3:  '△',
  4:  'L1',
  5:  'R1',
  6:  'L2',
  7:  'R2',
  8:  'Select',
  9:  'Start',
  10: 'L3',
  11: 'R1',
  12: 'Playstation Button',
  13: 'Touchpad (click)',
  14: 'Mic button',
  15: 'Unbound (15)',
  16: 'Unbound (16)',
  32: 'Left Stick L/R',
  33: 'Left Stick U/D',
  34: 'Right Stick L/R',
  37: 'Right Stick U/D',
  40: 'D-Pad L/R',
  41: 'D-Pad U/D'
}