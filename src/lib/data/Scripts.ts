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

export function generateHookScript() {

}