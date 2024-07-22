import { IpcMain, IpcMainInvokeEvent } from "electron"
import { readdir } from "fs/promises"
import { existsSync } from "fs"
import updateAshita from "./lib/util/Installation/Ashita"
import { initializeProfile, loadProfiles, saveProfile } from "./lib/util/IO/ProfileLoader"
import {getAddonList, getPluginList, getPolPluginList} from "./lib/util/Installation/Extensions"
import Profile from "@data/Profile"
import spawnAshita from "./lib/util/helpers/spawnAshita"
import saveScript from "./lib/util/IO/ScriptLoader"
import { PROFILE_LOCATION, ensureGit } from "./lib/util/Installation/paths"
import { getAddonData } from "./lib/util/helpers/getExtensionData"
import { initialProfiles } from "@data/DefaultProfile"
import { join } from "path"
import { deleteProfile } from "@lib/util/Installation/Profile"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IPCHandler = {channel: string, listener: (event:IpcMainInvokeEvent, ...args: any[]) => Promise<unknown>}

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
        console.log('received delete profile for '+name)
        await deleteProfile(name)
      }
    }
  ]
  handlers.forEach((v) => ipcMain.handle(v.channel, v.listener))
  ipcMain.on('magian:legacy:installAshita', (e) => {
    try{
    ensureGit().then(() => {
      updateAshita().then(() => {
        e.reply('magian:legacy:installAshita:reply')
      })
    })
  } catch(err) {
    console.error(err)
  }})
  ipcMain.on('magian:ensureProfiles', (e) => {
    const doProfiles = () => {
      initializeProfile(initialProfiles.list.default.name)
      initializeProfile(initialProfiles.list.omicron.name)
      saveProfile(initialProfiles.list.default).then(() => {
        saveProfile(initialProfiles.list.omicron).then(() => {
          e.reply('magian:ensureProfiles:reply')
        }).catch()
      }).catch()
    }


    if(!existsSync(PROFILE_LOCATION)) {
      doProfiles()
    } else {
      // eslint-disable-next-line consistent-return
      readdir(PROFILE_LOCATION, {withFileTypes: true}).then(entries => {
        if(entries
          .filter(entry => entry.isDirectory())
          .filter(entry => existsSync(join(PROFILE_LOCATION, entry.name, 'profile.json')))
          .length === 0) {
            console.log("saving profiles...")
            doProfiles()
          } else {
            console.log("Profiles already exist")
            e.reply('magian:ensureProfiles:reply')
          }
        }).catch((e) => {
          console.error(e)
        })
      }
    }
  )
}
