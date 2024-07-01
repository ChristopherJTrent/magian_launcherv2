import { readdir } from "fs/promises"
import { existsSync } from "fs"
import { ADDON_LOCATION, PLUGIN_LOCATION, POL_PLUGIN_LOCATION } from "./paths"

export async function getAddonList():Promise<string[]> {
  return (await readdir(ADDON_LOCATION, {withFileTypes: true}))
    .filter(entry => entry.isDirectory())
    .filter(entry => existsSync(`${ADDON_LOCATION}\\${entry.name}\\${entry.name}.lua`))
    .map(entry => entry.name)
}
export async function getPluginList():Promise<string[]> {
  return (await readdir(PLUGIN_LOCATION, {withFileTypes: true}))
    .filter(entry => entry.isFile() && entry.name.endsWith('.dll'))
    .map(entry => entry.name.replaceAll('.dll','').toLowerCase())
}
export async function getPolPluginList(): Promise<string[]> {
  return (await readdir(POL_PLUGIN_LOCATION, {withFileTypes: true}))
    .filter(entry => entry.isFile() && entry.name.endsWith('.dll'))
    .map(entry => entry.name.replaceAll('.dll', '').toLocaleLowerCase())
}
