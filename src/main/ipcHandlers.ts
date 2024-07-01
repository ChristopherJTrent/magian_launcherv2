import { IpcMain, IpcMainInvokeEvent } from "electron"
import { readdir } from "fs/promises"
import { existsSync } from "fs"
import updateAshita from "../lib/util/Installation/Ashita"
import { loadProfiles, saveProfile } from "../lib/util/IO/ProfileLoader"
import {getAddonList, getPluginList, getPolPluginList} from "../lib/util/Installation/Extensions"
import Profile from "../lib/data/Profile"
import spawnAshita from "../lib/util/helpers/spawnAshita"
import saveScript from "../lib/util/IO/ScriptLoader"
import { PROFILE_LOCATION, ensureGit } from "../lib/util/Installation/paths"
import { getAddonData } from "../lib/util/helpers/getExtensionData"
import { initialProfiles } from "../lib/data/DefaultProfile"

type IPCHandler = {channel: string, listener: (event:IpcMainInvokeEvent, ...args: any[]) => Promise<any>}

export default function registerIPCCallbacks(ipcMain:IpcMain):void {
  const handlers:IPCHandler[] = [
    {
      channel: 'ashita:update',
      listener: async (_) => {
        updateAshita()
      }
    },

    {
      channel: 'magian:loadProfiles',
      listener: async (_) => {
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
      listener: async (_) => {
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
      listener: async (_) => {
        return getPluginList()
      }
    },
    {
      channel: 'ashita:getPolPlugins',
      listener: async _ => getPolPluginList()
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
      listener: async (_) => {
        try{
          ensureGit()
        } catch (err) {
          console.log(`goddamn electron morons fuck you ${err}`)
        }
      }
    },
    {
      channel: 'magian:ensureProfiles',
      listener: async (_) => {
        if((await readdir(PROFILE_LOCATION, {withFileTypes: true}))
          .filter(entry => entry.isDirectory())
          .filter(entry => existsSync(`${PROFILE_LOCATION}\\${entry.name}\\profile.json`))
          .length === 0) {
            await saveProfile(initialProfiles.list.default)
            return saveProfile(initialProfiles.list.omicron)
        }
        return undefined
      }
    }
  ]
  handlers.forEach((v) => ipcMain.handle(v.channel, v.listener))
  ipcMain.on('magian:legacy:installAshita', (e) => {
    try{
    console.log('received ashita update request')
    updateAshita().then((v) => {
      console.log(v)
      e.reply('magian:legacy:installAshita:reply')
    })
  } catch(err) {console.log(`double fuck you ${err}`)}})
}
