import { existsSync, mkdirSync } from "fs"
import { CONFIGURATION_LOCATION, MANAGED_SCRIPT_LOCATION, PROFILE_LOCATION, SCRIPT_LOCATION } from "./paths"

export default function setupProfileDirectories() {
  const locations = [PROFILE_LOCATION, CONFIGURATION_LOCATION, SCRIPT_LOCATION, MANAGED_SCRIPT_LOCATION]
  locations.forEach((v) => {
    if(!existsSync(v)) {
      mkdirSync(v, {recursive: true})
    }
  })
}