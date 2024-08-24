import { existsSync } from "fs"
import { getAshitaStatus, installAshita, pullAshita } from "../Git"
import ensureInstallLocation from "./Launcher"
import { ASHITA_LOCATION } from "./paths"

export default async function updateAshita():Promise<void> {
  ensureInstallLocation()
  if (!existsSync(ASHITA_LOCATION)) {
    return installAshita()
  }
  const ashitaStatus = await getAshitaStatus()
  switch(ashitaStatus) {
    case 'uninstalled':
      return installAshita()
    case 'behind':
      return pullAshita()
    default:
      return new Promise<void>((resolve) => {resolve()})
  }
}
