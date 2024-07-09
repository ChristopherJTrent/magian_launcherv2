import AshitaSettings from "./AshitaSettings"

export const defaultPlugins = [
  'thirdparty',
  'addons',
  'screenshot',
]

export const defaultAddons = [
  'distance',
  'fps',
  'move',
  'timestamp',
  'tparty',
]

export const defaultPolPlugins = [
  'sandbox'
]

export default class Profile {
  public name:string

  public enabledAddons: string[]

  public enabledPlugins: string[]

  public enabledPolPlugins: string[]

  public settings: AshitaSettings

  public serverType: ('retail'|'private')

  constructor(name: string, enabledAddons:string[] = [], enabledPlugins:string[] = [], enabledPolPlugins:string[] = [], isPrivate: boolean = false) {
    this.name = name
    this.enabledAddons = enabledAddons
    this.enabledPlugins = enabledPlugins
    this.enabledPolPlugins = enabledPolPlugins
    this.settings = new AshitaSettings(name)
    this.serverType = isPrivate? 'private' : 'retail'
  }
}

export type ExtensionField = keyof Profile & ('enabledAddons'|'enabledPlugins'|'enabledPolPlugins')