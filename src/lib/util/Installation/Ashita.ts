import { getAshitaStatus, installAshita, pullAshita } from "../Git"
import ensureInstallLocation from "./Launcher"

export default async function updateAshita():Promise<void> {
  ensureInstallLocation()
  const ashitaStatus = await getAshitaStatus()
  console.log(ashitaStatus)
  switch(ashitaStatus) {
    case 'uninstalled':
      return installAshita()
    case 'behind':
      return pullAshita()
    default:
      return new Promise<void>((resolve, _reject) => {resolve()})
  }
  // console.log(INSTALL_LOCATION)
  // const ashitaStatus = getAshitaStatus()
  // console.log(ashitaStatus)
  // switch(ashitaStatus) {
  // case 'uninstalled':
  //   console.log('installing ashita')
  //   installAshita()
  //   break
  // case 'behind':
  //   pullAshita()
  //   break
  // // next two lines aren't necessary, but explicit is better.
  // case "up-to-date":
  // default:
  // }
}
