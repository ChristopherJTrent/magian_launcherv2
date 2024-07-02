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

type IPCHandler = {channel: string, listener: (event:IpcMainInvokeEvent, ...args: any[]) => Promise<unknown>}

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
      listener: async (_) => { ensureGit() }
    },
  ]
  handlers.forEach((v) => ipcMain.handle(v.channel, v.listener))
  ipcMain.on('magian:legacy:installAshita', (e) => {
    try{
    console.log('received ashita update request')
    ensureGit().then(() => {
      updateAshita().then((v) => {
        console.log(v)
        e.reply('magian:legacy:installAshita:reply')
      })
    })
  } catch(err) {console.log(`${err}`)}})
  ipcMain.on('magian:ensureProfiles', (e) => {
    const doProfiles = () => {
      console.log('doing profiles')
      return saveProfile(initialProfiles.list.default).then(() => {
        console.log('successfully saved default')
        return saveProfile(initialProfiles.list.omicron).then(() => {
          console.log('successfully saved omicron')
          e.reply('magian:ensureProfiles:reply')
        }).catch((e) => {console.log(e)})
      }).catch((e) => { console.log(e)})
    }

    console.log('ensuring profiles')

    if(!existsSync(PROFILE_LOCATION)) {
      doProfiles()
    } else {
      // eslint-disable-next-line consistent-return
      readdir(PROFILE_LOCATION, {withFileTypes: true}).then(entries => {
        if(entries
          .filter(entry => entry.isDirectory())
          .filter(entry => existsSync(`${PROFILE_LOCATION}\\${entry.name}\\profile.json`))
          .length === 0) {
            doProfiles()
          } else {
            e.reply('magian:ensureProfiles:reply')
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  )
}
