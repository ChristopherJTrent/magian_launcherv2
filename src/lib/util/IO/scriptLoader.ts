import { existsSync } from "fs"
import { mkdir, writeFile } from "fs/promises"
import { MANAGED_SCRIPT_LOCATION } from "../Installation/paths"
import { generateManagedScript } from "@lib/data/scripts"
import Profile from "@lib/data/profile"
import { join } from "path"

export default async function saveScript(profile:Profile) {
  if(! existsSync(MANAGED_SCRIPT_LOCATION)) {
    await mkdir(MANAGED_SCRIPT_LOCATION)
  }
  try {
    const contents = generateManagedScript(profile.name, profile.enabledAddons, profile.enabledPlugins)
    await writeFile(
      join(MANAGED_SCRIPT_LOCATION, `${profile.name}.txt`), 
      contents)
  } catch {
    /* empty */
  }
}