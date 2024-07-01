
export type settingsBoolean = (boolean | 'useRegistry');

export const settingsBoolToNumber = (v:settingsBoolean):number =>
  // eslint-disable-next-line no-nested-ternary
  v === 'useRegistry' ? -1 : v ? 1 : 0


export default class AshitaSettings {
  autocloseLauncher:boolean = true

  profileName: string = ''

  bootFile:string = ''

  bootCommand:string = '/game eAZcFcB'

  bootGameModule:string = 'ffximain.dll'

  bootScript:string = ''

  bootArgs:string = ''

  language:number = 2

  loggingLevel:number = 3

  loggingCrashdumps:number = 1

  taskpoolThreadcount:number = -1

  offsetOverrides:boolean = true

  pointerOverrides:boolean = true

  resourceOverrides:boolean = true

  windowStartX: number = -1

  windowStartY: number = -1

  gamepadBackground:boolean = true

  gamepadDisableEnumeration: boolean = false

  blockKeyboardInput:boolean = false

  blockKeybindsDuringInput:boolean = true

  silentKeybinds: boolean = true

  windowsKeyEnabled: boolean = true

  blockMouseInput:boolean = false

  unhookMouse: boolean = true

  silentAddons:boolean = true

  silentAliases:boolean = true

  silentPlugins:boolean = true

  mipMapLevel:number = 6

  windowResolutionX:number = 1920

  windowResolutionY:number = 1080

  backgroundResolutionX:number = 4096

  backgroundResolutionY:number = 4096

  gameSoundEnabled:settingsBoolean = 'useRegistry'

  environmentAnimations:number = 2

  bumpMapping:settingsBoolean = 'useRegistry'

  textureCompression:number = 2

  mapCompression:settingsBoolean = 'useRegistry'

  animationFrameRate:number = -1

  hardwareMouse:settingsBoolean = 'useRegistry'

  openingMovie:settingsBoolean = false

  simpleCharacterCreation:settingsBoolean = false

  simultaneousSfx:number = 20

  windowMode: number = -1

  backgroundSounds:settingsBoolean = 'useRegistry'

  fontCompression:number = 2

  menuResolutionX:number = 0

  menuResolutionY:number = 0

  imeMode:settingsBoolean = 'useRegistry'

  graphicsStabilization:settingsBoolean = false

  betaUI: settingsBoolean = false

  maintainAspectRatio:settingsBoolean = 'useRegistry'

  enableGamepad:settingsBoolean = 'useRegistry'

  enableRumble:settingsBoolean = 'useRegistry'

  enableSlider:settingsBoolean = 'useRegistry'

  enableHats:settingsBoolean = 'useRegistry'

  enableWhenInactive:settingsBoolean = 'useRegistry'

  xInput:settingsBoolean = 'useRegistry'

  padBinding:string = '-1'

  constructor(profileName:string) {
    this.profileName = profileName
    this.bootScript = `managed/${profileName}`
  }
}
