import Addon from "../../data/Addon"
import { receiveProfiles } from "../../store/ProfileReducer"
import { receiveAddon, receiveAddons } from "../../store/addonsReducer"
import { LoaderHook, receiveHook } from "../../store/loaderReducer"
import { receiveplugins } from "../../store/pluginsReducer"
import { receivePolPlugins } from "../../store/polPluginsReducer"
import { AppDispatch } from "../../store/store"
/**
 * Frontend
 */
export default async function handleApplicationLoad(dispatch: AppDispatch):Promise<LoaderHook[]> {
  dispatch(receiveAddons([]))
  const ipc = window.electron.ipcRenderer
  return [
    {
      name: 'Load Profiles',
      func: async () => {
        console.log('attempting to load profiles')
        return dispatch(receiveProfiles(await ipc.loadProfiles()))
      },
    },
    {
      name: 'Load Addons',
      func:async () => {
        const addons = await ipc.getAddons()
        addons.forEach(addon => {
          ipc.getAddonData(addon).then((addonData) => {
            console.log(addonData)
            return dispatch(receiveAddon(new Addon(addon, addonData.author, addonData.version, addonData.desc, addonData.link)))
          }).catch((e) => console.log(e))
        })
      }
    },
    {
      name: 'Load Plugins',
      func: async () => {return dispatch(receiveplugins(await ipc.getPlugins()))}
    },
    {
      name: 'Load Playonline Plugins',
      func: async () => {return dispatch(receivePolPlugins(await(ipc.getPolPlugins())))}
    },
  ]
}
