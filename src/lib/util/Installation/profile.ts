import { existsSync, mkdirSync } from "fs"
import { CONFIGURATION_LOCATION, MANAGED_SCRIPT_LOCATION, PROFILE_LOCATION, SCRIPT_LOCATION } from "./paths"
import { rm } from "fs/promises"
import { join } from "path"

export default function setupProfileDirectories() {
  const locations = [PROFILE_LOCATION, CONFIGURATION_LOCATION, SCRIPT_LOCATION, MANAGED_SCRIPT_LOCATION]
  locations.forEach((v) => {
    if(!existsSync(v)) {
      mkdirSync(v, {recursive: true})
    }
  })
}

export async function deleteProfile(name:string): Promise<void> {
  [
    join(PROFILE_LOCATION, name),
    join(CONFIGURATION_LOCATION, `${name}.ini`),
    join(MANAGED_SCRIPT_LOCATION, `${name}.txt`),
    join(SCRIPT_LOCATION, name)].forEach((v) => {
      if(existsSync(v)) {
        rm(v, {recursive: true})
      }
    }
  )
}