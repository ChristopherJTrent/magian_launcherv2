export function generateManagedScript(name:string, addons:string[], plugins: string[]):string {
  return `
;---------------------------------------------------------------------------;
; This script is managed by Magian Launcher. It will be overwritten         ;
; when you enable or disable any addons or plugins.                         ;
; Please edit the profile hook scripts provided in scripts/${name}.         ;
;---------------------------------------------------------------------------;
/exec ${name}/beforePluginLoad
${plugins.map((v) => `/load ${v}`).join('\n')}

/exec ${name}/beforeAddonLoad
${addons?.map((v) => `/addon load ${v}`)?.join('\n') ?? '\n'}
/exec ${name}/keybinds
/wait 3
/exec ${name}/addonInit`
}

function generateTimingText(step: string) {
  switch(step) {
    case "beforePluginLoad":
      return "before plugins are loaded"
    case "beforeAddonLoad":
      return "before addons are loaded"
    case "keybinds":
      return "after addons are loaded"
    default:
      return "at the end of the script"
  }
}

export function generateHookScript(name:string) {
  return `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ This script is not managed by Magian Launcher. ┃
┃ You are free to edit it as you wish.           ┃
┃                                                ┃
┃ This script will run ${generateTimingText(name).padEnd(26)}┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
}