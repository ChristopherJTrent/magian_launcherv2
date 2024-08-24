import { initialProfiles } from "@lib/data/DefaultProfile"
import updateAshita from "@lib/util/Installation/Ashita"
import GarbageCollector from "@lib/util/Installation/GarbageCollector"
import { ensureGit, PROFILE_LOCATION } from "@lib/util/Installation/paths"
import doRepositoryUpdates, { installRemoteRepository } from "@lib/util/Installation/RepositoryInstaller"
import { initializeProfile, saveProfile } from "@lib/util/IO/ProfileLoader"
import { IpcMainEvent } from "electron"
import { existsSync } from "fs"
import { readdir } from "fs/promises"
import { join } from "path"
import { getInstalledRepositories } from "Zod/installedRepositories"

export const updateRepositoriesCallback = (e: IpcMainEvent) => {
  const remote = 'gh:ChristopherJTrent/magian_launcherv2@master/exampleRepo.yaml'
  const repos = getInstalledRepositories()
  if (repos.success && repos.data.some((v) => v.remote === remote )) {
    // console.log('file found, data read. repositories updating...')
    // this is gross and I hate it, but this is the only way to get it to work. Thanks @node_maintainers
    Promise.all(doRepositoryUpdates() ?? []).then(() => {
      GarbageCollector.instance.run()
      e.reply('magian:legacy:updateRepositories:reply')
    })
  } else {
    // console.log(`error in updateRepositoriesCallback: ${repos.error}, object: ${repos}`)
    installRemoteRepository(remote).then(() => {
      GarbageCollector.instance.run()
      e.reply('magian:legacy:updateRepositories:reply')
    })
  }
}

export const installRepositoryCallback = (e: IpcMainEvent, location: string) => {
  installRemoteRepository(location).then(() => {
    e.reply('magian:legacy:installRepository:reply')
  })
}

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
            // console.log("saving profiles...")
            doProfiles()
          } else {
            // console.log("Profiles already exist")
            e.reply('magian:ensureProfiles:reply')
          }
        }).catch((e) => {
          // console.error(e)
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
        // console.error(err)
    }
}