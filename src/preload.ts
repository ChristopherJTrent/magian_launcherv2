// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer} from 'electron'
import Profile from './lib/data/Profile'
import { AddonData } from './lib/util/helpers/getExtensionData'

export type Channels = 'ipc-example'

const electronHandler = {
  ipcRenderer: {
    updateAshita: () => ipcRenderer.invoke('ashita:update') as Promise<void>,
    loadProfiles: () => ipcRenderer.invoke('magian:loadProfiles') as Promise<Profile[]>,
    getAddons: () => ipcRenderer.invoke('ashita:getAddons') as Promise<string[]>,
    getPlugins: () => ipcRenderer.invoke('ashita:getPlugins') as Promise<string[]>,
    getPolPlugins: () => ipcRenderer.invoke('ashita:getPolPlugins') as Promise<string[]>,
    /**
     * @deprecated
     */
    saveScript: (profile:Profile) => ipcRenderer.invoke('ashita:saveScript', profile),
    saveProfile: (profile:Profile) => ipcRenderer.invoke('magian:saveProfile', profile),
    launchAshita: (profileName:string) => { ipcRenderer.invoke('magian:startAshita', profileName)},
    ensureGit: () => ipcRenderer.invoke('magian:ensureGit') as Promise<void>,
    getAddonData: (name: string) => ipcRenderer.invoke('ashita:getAddonData',name) as Promise<AddonData>,
    ensureProfiles: () => ipcRenderer.send('magian:ensureProfiles'),
    newUpdateAshita: () => { ipcRenderer.send('magian:legacy:installAshita') },
    deleteProfile: (name: string) => {ipcRenderer.invoke('magian:deleteProfile', name)},
    onUpdateAshita: ( callback: () => void) => {
      ipcRenderer.on('magian:legacy:installAshita:reply', () => {
        callback()
      })
    },
    onEnsureProfiles: (callback: () => void) => {
      ipcRenderer.on('magian:ensureProfiles:reply', () => {
        callback()
      })
    }
  },
}

contextBridge.exposeInMainWorld('electron', electronHandler)

export type ElectronHandler = typeof electronHandler
