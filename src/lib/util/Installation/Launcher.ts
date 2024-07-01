import { existsSync, mkdirSync } from "fs"
import { INSTALL_LOCATION } from "./paths"

export default function ensureInstallLocation() {
  if (!existsSync(INSTALL_LOCATION)) {
    mkdirSync(INSTALL_LOCATION)
  }
}
