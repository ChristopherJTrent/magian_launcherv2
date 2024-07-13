import { mkdir, readFile, readdir, writeFile } from "fs/promises"
import { existsSync, mkdirSync } from "fs"
import { CONFIGURATION_LOCATION, MANAGED_SCRIPT_LOCATION, PROFILE_LOCATION, SCRIPT_LOCATION } from "../Installation/paths"
import Profile from "@data/Profile"
import { dumpAshitaSettings } from "../Config/INIHelper"
import { generateHookScript, generateManagedScript } from "@data/Scripts"
import { join } from "path"
import setupProfileDirectories from "../Installation/Profile"

export async function loadProfiles():Promise<Profile[]> {
  return Promise.all((await readdir(PROFILE_LOCATION, {withFileTypes: true}))
    .filter(entry => {
      return entry.isDirectory()})
    .map(entry => join(PROFILE_LOCATION, entry.name, 'profile.json'))
    .map(async path => JSON.parse((await readFile(path)).toString()) as Profile)
  )
}

export async function saveProfile(input:Profile):Promise<void> {
  const PROFILE_DIR = join(PROFILE_LOCATION, input.name)
  setupProfileDirectories()
  if(!existsSync(PROFILE_DIR)) {
    mkdirSync(PROFILE_DIR, {recursive: true})
  }
  try{
    await writeFile(join(PROFILE_DIR, 'profile.json'), JSON.stringify(input, null, 2), { flag: 'w+'})
    await writeFile(
      join(CONFIGURATION_LOCATION, `${input.name}.ini`),
      dumpAshitaSettings(input),
      {flag: 'w+'}
    )
    await writeFile(
      join(MANAGED_SCRIPT_LOCATION, `${input.name}.txt`),
      generateManagedScript(input.name, input.enabledAddons, input.enabledPlugins),
      {flag: 'w+'}
    )
  } catch(e) { /* empty */ }
}

export async function initializeProfile(name: string):Promise<void> {
  if (!existsSync(join(PROFILE_LOCATION, name))) {
    await mkdir(join(PROFILE_LOCATION, name), {recursive: true})
  }
  if (!existsSync(join(SCRIPT_LOCATION, name))) {
    await mkdir(join(SCRIPT_LOCATION, name), {recursive: true})
  }
  ['beforePluginLoad','beforeAddonLoad','keybinds','addonInit'].forEach(async (v) => {
    const hookPath = join(SCRIPT_LOCATION, name, `${v}.txt`)
    if(!existsSync(hookPath)) {
      try {
        await writeFile(hookPath, generateHookScript(name), {flag: 'w+'})
      } catch {
        /* empty */
      }
    }
  })
}
