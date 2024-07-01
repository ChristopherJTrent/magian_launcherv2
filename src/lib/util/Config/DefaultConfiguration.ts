import { GamepadState } from "../../store/GamepadState"
import { generateRegistry } from "./registry"

/* eslint-disable no-useless-computed-key */
const retail = (name:string) => ({
  ashita: {
    launcher: {
      autoclose: 1,
      name
    },
    boot: {
      file: '',
      command: '/game eAZcFcB',
      gamemodule: 'ffximain.dll',
      script: `managed/${name}.txt`,
      args: ''
    },
    language: {
      playonline: 2,
      ashita: 2
    },
    logging: {
      level: 3,
      crashdumps: 1
    },
    taskpool: {
      threadcount: -1
    },
    resources: {
      'offsets.use_overrides': 1,
      'pointers.use_overrides': 1,
      'resources.use_overrides': 1
    },
    'window.startpos': {
      x: -1,
      y: -1,
    },
    input: {
      'gamepad.allowbackground': 1,
      'gamepad.disableenumeration': 0,
      'keyboard.blockinput': 0,
      'keyboard.blockbindsduringinput':1,
      'keyboard.silentbinds': 1,
      'keyboard.windowskeyenabled': 1,
      'mouse.blockinput': 0,
      'mouse.unhook': 1
    },
    misc: {
      'addons.silent': 1,
      'aliases.silent': 1,
      'plugins.silent': 1
    }
  },
  ffxi: {
    direct3d8:{
      'presentparams.backbufferformat': -1,
      'presentparams.backbuffercount': -1,
      'presentparams.multisampletype': -1,
      'presentparams.swapeffect': -1,
      'presentparams.enableautodepthstencil': -1,
      'presentparams.autodepthstencilformat': -1,
      'presentparams.flags': -1,
      'presentparams.fullscreen_refreshrateinhz': -1,
      'presentparams.fullscreen_presentationinterval': -1,
      'behaviorflags.fpu_preserve': 0,
    },
    registry: { ...generateRegistry([]),
      padmode000: '1,1,0,0,0,1',
      padsin000: '-1,-1,13,-1,10,0,14,3,2,-1,-1,-1,-1,-33,-33,32,32,-36,-36,35,35,6,7,5,4,-1,-1',
      padguid000: '-1'
    }
  }
})

export const xinputDefault:GamepadState = {
  toggles: {
    enabled: true,
    rumble: false,
    sliders: false,
    hats: true,
    inactive: true,
    xinput: true,
  },
  bindings: {
    autorun: -1,
    macroCtrl: -1,
    changeView: 13,
    macroAlt: -1,
    lockOn: 10,
    cancel: 0,
    mainMenu: 14,
    confirm: 3,
    activeWindow: 2,
    toggleUi: -1,
    moveToMenu: -1,
    moveToCamera: -1,
    logout: -1,
    moveForward: -33,
    moveBackward: -33,
    moveLeft: 32,
    moveRight:32,
    cameraUp: -36,
    cameraDown: -36,
    cameraLeft: 35,
    cameraRight: 35,
    menuUp: 6,
    menuDown: 7,
    menuLeft: 5,
    menuRight: 4,
    screenshot: -1,
    toggleMove: -1,
  }
}

export default retail
