export default abstract class Extension {
  name: string
  
  type: ('addon'|'plugin')

  constructor(name:string, isAddon: boolean = false) {
    this.name = name
    this.type = isAddon ? 'addon' : 'plugin'
  }
}