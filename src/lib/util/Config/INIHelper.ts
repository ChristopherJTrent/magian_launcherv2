import {stringify, parse} from 'ini'
import { settingsBoolToNumber } from '../../data/AshitaSettings'
import Profile from '../../data/Profile'

export function dumpINI(object:Object):string {
  return stringify(object, {
    align: true,
    sort: false,
    platform: 'win32',
  })
}

export function dumpAshitaSettings(input:Profile):string {
  const { settings } = input
  const outputObject = {
    ashita: {
      launcher: {
        autoclose: settings.autocloseLauncher,
        name: settings.profileName
      },
      boot: {
        file: settings.bootFile,
        command: settings.bootCommand,
        gamemodule: settings.bootGameModule,
        script: settings.bootScript === ''
          ? `managed/${settings.profileName}.txt`
          : settings.bootScript,
        args: settings.bootArgs
      },
      language: {
        playonline: settings.language,
        ashita: settings.language
      },
      logging: {
        level: settings.loggingLevel,
        crashdumps: settings.loggingCrashdumps
      },
      taskpool: {
        threadcount: settings.taskpoolThreadcount
      },
      resources: {
        'offsets.use_overrides': settings.offsetOverrides,
        'pointers.use_overrides': settings.pointerOverrides,
        'resources.use_overrides': settings.resourceOverrides
      },
      'window.startpos': {
        x: settings.windowStartX,
        y: settings.windowStartY
      },
      input: {
        'gamepad.allowbackground': settings.gamepadBackground,
        'gamepad.disableenumeration': settings.gamepadDisableEnumeration,
        'keyboard.blockinput': settings.blockKeyboardInput,
        'keyboard.blockbindsduringinput': settings.blockKeybindsDuringInput,
        'keyboard.silentbinds': settings.silentKeybinds,
        'keyboard.windowskeyenabled': settings.windowsKeyEnabled,
        'mouse.blockinput': settings.blockMouseInput,
        'mouse.unhook': settings.unhookMouse
      },
      misc: {
        'addons.silent': settings.silentAddons,
        'aliases.silent': settings.silentAliases,
        'plugins.silent': settings.silentPlugins
      },
      polplugins: input.enabledPolPlugins?.reduce((p, c) => ({...p, [c]: 1}), {})
    },
    ffxi: {
      direct3d8: {
        // altering direct3d settings is not supported.
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
      registry: {
        '0000': settings.mipMapLevel,
        '0001': settings.windowResolutionX,
        '0002': settings.windowResolutionY,
        '0003': settings.backgroundResolutionX,
        '0004': settings.backgroundResolutionY,
        '0005': -1,
        '0006': -1,
        '0007': settingsBoolToNumber(settings.gameSoundEnabled),
        '0008': -1,
        '0009': -1,
        '0010': -1,
        '0011': settings.environmentAnimations,
        '0012': -1,
        '0013': -1,
        '0014': -1,
        '0015': -1,
        '0016': -1,
        '0017': settingsBoolToNumber(settings.bumpMapping),
        '0018': settings.textureCompression,
        '0019': settingsBoolToNumber(settings.mapCompression),
        '0020': settings.animationFrameRate,
        '0021': settingsBoolToNumber(settings.hardwareMouse),
        '0022': settingsBoolToNumber(settings.openingMovie),
        '0023': settingsBoolToNumber(settings.simpleCharacterCreation),
        '0024': -1,
        '0025': -1,
        '0026': -1,
        '0027': -1,
        '0028': 0,
        '0029': settings.simultaneousSfx,
        '0030': 0,
        '0031': -1,
        '0032': -1,
        '0033': -1,
        '0034': settings.windowMode,
        '0035': settingsBoolToNumber(settings.backgroundSounds),
        '0036': settings.fontCompression,
        '0037': settings.menuResolutionX,
        '0038': settings.menuResolutionY,
        '0039': settingsBoolToNumber(settings.imeMode),
        '0040': settingsBoolToNumber(settings.graphicsStabilization),
        '0041': settingsBoolToNumber(settings.betaUI),
        '0042': -1,
        '0043': -1,
        '0044': settingsBoolToNumber(settings.maintainAspectRatio),
        '0045': -1,
        'padmode000': [
          settings.enableGamepad,
          settings.enableRumble,
          settings.enableSlider,
          settings.enableHats,
          settings.enableWhenInactive,
          settings.xInput
        ].map(v => settingsBoolToNumber(v).toString()).join(','),
        padsin000: settings.padBinding
     }
    },
  }
  if (outputObject.ffxi.registry.padmode000 === '-1,-1,-1,-1,-1,-1') {
    outputObject.ffxi.registry.padmode000 = '-1'
  }

  return dumpINI(outputObject).replaceAll('\\.', '.')
}


export function parseINI(string:string):Object {
  return parse(string)
}
