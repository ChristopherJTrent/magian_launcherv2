import { readFileSync } from "fs"
import { ADDON_LOCATION } from "../Installation/paths"
import Addon from "../../data/Addon"

export type AddonData = {
  author: string
  version: string
  desc: string
  link: string
}

const authorRegex = /addon\.author += ?['"]([^'"]+)['"];?\r?\n/
const versionRegex = /addon\.version += ?['"]([^'"]+)['"];?\r?\n/
const descRegex = /addon\.desc += ?['"]([^'"]+)['"];?\r?\n/
const linkRegex = /addon\.link += ?['"]([^'"]+)['"];?\r?\n/

function matchOrDefault(input:string, regex:RegExp, def:string = ''):string {
  return (input.match(regex) ?? ['',def])[1]
}

export function getAddonData(name: string): AddonData {
  const file = readFileSync(`${ADDON_LOCATION}\\${name}\\${name}.lua`).toString()
  const output:AddonData = {
    author: matchOrDefault(file, authorRegex),
    version: matchOrDefault(file, versionRegex),
    desc: matchOrDefault(file, descRegex),
    link: matchOrDefault(file, linkRegex)
  }
  return output
}

export function getAddon(name:string):Addon {
  const addonData = getAddonData(name)
  return new Addon(
    name, 
    addonData.author,
    addonData.version,
    addonData.desc,
    addonData.link
  )
}