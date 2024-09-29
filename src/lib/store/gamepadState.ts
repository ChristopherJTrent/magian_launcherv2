
export interface GamepadState {
  toggles: {
    enabled?: boolean;
    rumble?: boolean;
    sliders?: boolean;
    hats?: boolean;
    inactive?: boolean;
    xinput?: boolean;
  };
  bindings: {
    autorun?: number;
    macroCtrl?: number;
    changeView?: number;
    macroAlt?: number;
    lockOn?: number;
    cancel?: number;
    mainMenu?: number;
    confirm?: number;
    activeWindow?: number;
    toggleUi?: number;
    moveToMenu?: number;
    moveToCamera?: number;
    logout?: number;
    moveForward?: number;
    moveBackward?: number;
    moveLeft?: number;
    moveRight?: number;
    cameraUp?: number;
    cameraDown?: number;
    cameraLeft?: number;
    cameraRight?: number;
    menuUp?: number;
    menuDown?: number;
    menuLeft?: number;
    menuRight?: number;
    screenshot?: number;
    toggleMove?: number;
  };
}
