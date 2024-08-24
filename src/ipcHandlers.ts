import { IpcMain, IpcMainEvent, IpcMainInvokeEvent } from "electron"
import updateAshita from "./lib/util/Installation/Ashita"
import { loadProfiles, saveProfile } from "./lib/util/IO/ProfileLoader"
import {getAddonList, getPluginList, getPolPluginList} from "./lib/util/Installation/Extensions"
import Profile from "@data/Profile"
import spawnAshita from "./lib/util/helpers/spawnAshita"
import saveScript from "./lib/util/IO/ScriptLoader"
import { ensureGit } from "./lib/util/Installation/paths"
import { getAddonData } from "./lib/util/helpers/getExtensionData"
import { deleteProfile } from "@lib/util/Installation/Profile"
import { ensureProfilesCallback, installAshitaCallback, installRepositoryCallback, updateRepositoriesCallback } from "ipcCallbacks"
import { getInstalledRepositories } from "Zod/installedRepositories"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IPCHandler = {channel: string, listener: (event:IpcMainInvokeEvent, ...args: any[]) => Promise<unknown>}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LegacyIPCHandler = {channel: string, listener: (event: IpcMainEvent, ...args: any[]) => void}
export default function registerIPCCallbacks(ipcMain:IpcMain):void {
  const handlers:IPCHandler[] = [
    {
      channel: 'ashita:update',
      listener: async () => {
        updateAshita()
      }
    },

    {
      channel: 'magian:loadProfiles',
      listener: async () => {
        return loadProfiles()
      }
    },
    {
      channel: 'magian:saveProfile',
      listener: async (_, profile:Profile) => {
        await saveProfile(profile)
      }
    },
    {
      channel: 'ashita:getAddons',
      listener: async () => {
        return getAddonList()
      }
    },
    {
      channel: 'ashita:getAddonData',
      listener: async (_, name) => {
        return getAddonData(name)
      }
    },
    {
      channel: 'ashita:getPlugins',
      listener: async () => {
        return getPluginList()
      }
    },
    {
      channel: 'ashita:getPolPlugins',
      listener: async () => getPolPluginList()
    },
    {
      channel: 'ashita:saveScript',
      listener: async (_, profile) => {
        await saveScript(profile)
      }
    },
    {
      channel: 'magian:startAshita',
      listener: async (_, name:string) => {
        spawnAshita(name)
      }
    },
    {
      channel: 'magian:ensureGit',
      listener: async () => { ensureGit() }
    },
    {
      channel: 'magian:deleteProfile',
      listener: async(_, name:string) => {
        // console.log('received delete profile for '+name)
        await deleteProfile(name)
      }
    },
    {
      channel: 'magian:getInstalledRepositories',
      listener: async () => {
        const installed = getInstalledRepositories()
        return installed.success ? installed.data : []
      }
    }
  ]
  const legacyHandlers: LegacyIPCHandler[] = [
    {
      channel: 'magian:legacy:installAshita',
      listener: installAshitaCallback
    },
    {
      channel: 'magian:ensureProfiles',
      listener: ensureProfilesCallback
    },
    {
      channel: 'magian:legacy:updateRepositories',
      listener: updateRepositoriesCallback
    },
    {
      channel: 'magian:legacy:installRepository',
      listener: installRepositoryCallback
    }
  ]

  handlers.forEach((v) => ipcMain.handle(v.channel, v.listener))
  legacyHandlers.forEach(v => ipcMain.on(v.channel, v.listener))

}
