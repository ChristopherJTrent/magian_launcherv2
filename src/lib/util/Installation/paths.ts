import { spawnSync } from "child_process"
import { app, dialog } from "electron"
import { join } from "path"


export const INSTALL_LOCATION = join(app.getPath('home'), 'Magian Launcher')
export const ASHITA_LOCATION = join(INSTALL_LOCATION, "Ashita")
export const PROFILE_LOCATION = join(INSTALL_LOCATION, "Profiles")
export const CONFIGURATION_LOCATION = join(ASHITA_LOCATION, 'config', 'boot', 'managed')
export const SCRIPT_LOCATION = join(ASHITA_LOCATION, 'scripts')
export const MANAGED_SCRIPT_LOCATION = join(SCRIPT_LOCATION, 'managed')
export const ADDON_LOCATION = join(ASHITA_LOCATION, 'addons')
export const PLUGIN_LOCATION = join(ASHITA_LOCATION, 'plugins')
export const POL_PLUGIN_LOCATION = join(ASHITA_LOCATION, 'polplugins')
export const DOWNLOADS_LOCATION = join(INSTALL_LOCATION, 'Downloads')

export function hasGit():boolean {
  try{

    const bat = spawnSync('powershell.exe',[
      '-command',
      '(Get-Command git).path'
    ])
    return bat.status === 0
  } catch(_e) {
    return false
  }

}

export function installGit() {
  const selection = dialog.showMessageBoxSync({
    message: 'Git is required for Magian Launcher to function.\nWould you like to install it now?',
    buttons: ['Yes', 'No']
  })
  if (selection === 0) {
    spawnSync('winget', [
      'install',
      '--id',
      'Git.Git',
      '-e',
      '--source',
      'winget'
    ])
    dialog.showMessageBoxSync({
      message: 'Magian Launcher will close. Please reopen it when you have completed the git installation process.'
    })
  } else {
    dialog.showMessageBoxSync({
      message: 'Launching cannot continue, closing...'
    })
  }
  app.quit()
}

export async function ensureGit() {
  if(! hasGit()) {
    installGit()
  }
}
