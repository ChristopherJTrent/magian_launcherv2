import { cpSync, existsSync, mkdirSync, PathLike } from "fs"
import { Repository } from "Zod/repository"
import { ASHITA_LOCATION, DOWNLOADS_LOCATION, INSTALL_LOCATION } from "./paths"
import { z } from "zod"
import DownloadFile from "../IO/fileDownloader"
import extract from "extract-zip"
import { join } from "path"
import { downloadYamlFile } from "../helpers/YAML/fileHandler"
import { addInstalledRepository, getInstalledRepositories } from "Zod/installedRepositories"
import parseSemver from 'semver/functions/parse'
import validateSemver from 'semver/functions/valid'
import GarbageCollector from "./garbageCollector"

export function ensureDirectories() {
    if(!existsSync(DOWNLOADS_LOCATION)) mkdirSync(DOWNLOADS_LOCATION, {recursive: true})
}

export function installExtensions(input: {
        downloadLink: string, 
        filesystemRoot?: string, 
        installationRoot: string,
        fileNameOverride?: string
    }, cwd: PathLike) {
    console.log(`installing: ${input}`)

    ensureDirectories()

    const checkedFileURL = z.string().url().safeParse(input.downloadLink)
    if (! checkedFileURL.success) {
        console.error('Download link is not a valid URL')
        return
    }

    if (! checkedFileURL.data.endsWith('.zip')) {
        console.error('Download link doesn\'t point to a zip file. (Boutique formats not supported)')
        return
    }
    
    // can assert that pop will return a value 
    // because we're ensuring that the download link is a valid url pointing to a zip file.
    const filename = input.fileNameOverride ?? checkedFileURL.data.split('/').pop()!

    const downloadLocation = cwd === '' ? 
        join(DOWNLOADS_LOCATION, Math.random().toString(20).substring(2, 8))
        : join(DOWNLOADS_LOCATION, cwd.toString())
    
    GarbageCollector.instance.push(downloadLocation)

    return DownloadFile(checkedFileURL.data, filename).then(() => {
        console.log(filename)
        return extract(join(DOWNLOADS_LOCATION, filename), {
            dir: join(downloadLocation, filename.slice(0, -4))
        }).catch((err) => {
            console.error(err, ' in extraction')
        })
    }).then(() => {
        let root = join(downloadLocation, filename.slice(0, -4))
        if(input.filesystemRoot) {
            root = join(root, input.filesystemRoot)
        }
        const installLocation = input.installationRoot ? join(ASHITA_LOCATION, input.installationRoot) : ASHITA_LOCATION
        console.log(`beginning move from ${root} to ${installLocation}`)
        return cpSync(root, installLocation, {
            force: true,
            recursive: true
        })
    })
}



export function installRepository(input: Repository, cwd: PathLike = '') {
    console.log(input)
    if (input.success) {
        return input.downloads.map((v) => installExtensions(v, cwd)).filter((v) => v != undefined)
    }
    return []
}

export function installRemoteRepository(location:string) {
    return downloadYamlFile(location).then((repo) => {
        console.log(repo)
        return Promise.all(installRepository(repo)).then(() => {
            addInstalledRepository(repo.version, location)
        })
    })
}

function doVersionCheck(left:string, right:string):boolean {
    if (left === right) {
        return false
    }
    if (validateSemver(right) == null) {
        return false
    }
    if (validateSemver(left) == null) {
        return false
    }
    if (parseSemver(left)!.major !== parseSemver(right)!.major) {
        return false
    }
    return true
}

export default function doRepositoryUpdates() {
    const promises:Promise<void[]>[] = []
    // if this file doesn't exist, no repositories are installed.
    if(!existsSync(join(INSTALL_LOCATION, 'repositories.json'))) {
        console.log('no repositories installed.')
        return
    }
    const repositories = getInstalledRepositories()
    if (repositories.success) {
        repositories.data.forEach((v) => {
            console.log(`performing update on: ${v.remote}, installed version: ${v.installedVersion}`)
            if (validateSemver(v.installedVersion) == null) return
            downloadYamlFile(v.remote).then(data => {
                console.log(`Downloaded: ${v.remote}
                    version: ${data.version}
                    ${
                        data.downloads.map((v) => `file: ${v.downloadLink.split('/').pop()!}`)
                    }`)
                if (doVersionCheck(v.installedVersion, data.version)){
                    promises.push((Promise.all(installRepository(data))))
                } else {
                    console.log(`repository ${v.remote} up to date, skipping...`)
                }
            })
        })
    }
    return promises
}