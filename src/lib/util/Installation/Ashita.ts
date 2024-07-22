import { getAshitaStatus, installAshita, pullAshita } from "../Git"
import ensureInstallLocation from "./Launcher"

export default async function updateAshita():Promise<void> {
  ensureInstallLocation()
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
