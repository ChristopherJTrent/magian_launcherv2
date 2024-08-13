import { initialProfiles } from "@lib/data/DefaultProfile"
import updateAshita from "@lib/util/Installation/Ashita"
import { ensureGit, PROFILE_LOCATION } from "@lib/util/Installation/paths"
import { initializeProfile, saveProfile } from "@lib/util/IO/ProfileLoader"
import { IpcMainEvent } from "electron"
import { existsSync } from "fs"
import { readdir } from "fs/promises"
import { join } from "path"


export const ensureProfilesCallback = (e: IpcMainEvent) => {
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

export const installAshitaCallback = (e: IpcMainEvent) => {
    try {
        ensureGit().then(() => {
            updateAshita().then(() => {
                e.reply('magian:legacy:installAshita:reply')
            })
        })
    } catch(err) {
        console.error(err)
    }
}