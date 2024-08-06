import { existsSync, mkdirSync } from "fs"
import { Repository } from "Zod/Repository"
import { ASHITA_LOCATION, DOWNLOADS_LOCATION, INSTALL_LOCATION } from "./paths"
import { z } from "zod"
import DownloadFile from "../IO/FileDownloader"
import extract from "extract-zip"
import { join } from "path"
import moveFiles from "../IO/moveFiles"
import { downloadYamlFile } from "../helpers/YAML/fileHandler"
import { getInstalledRepositories } from "Zod/installedRepositories"
import parseSemver from 'semver/functions/parse'
import validateSemver from 'semver/functions/valid'

export function ensureDirectories() {
    if(!existsSync(DOWNLOADS_LOCATION)) mkdirSync(DOWNLOADS_LOCATION, {recursive: true})
}

export function installExtensions(input: {
        downloadLink: string, 
        filesystemRoot: string, 
        installationRoot: string,
        fileNameOverride?: string
    }) {
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

    DownloadFile(checkedFileURL.data, filename).then(() => {
        console.log(filename)
        return extract(join(DOWNLOADS_LOCATION, filename), {
            dir: join(DOWNLOADS_LOCATION, filename.slice(0, -4))
        }).catch((err) => {
            console.error(err, ' in extraction')
        })
    }).then(() => {
        let root = join(DOWNLOADS_LOCATION, filename.slice(0, -4))
        if(input.filesystemRoot) {
            root = join(root, input.filesystemRoot)
        }
        const installLocation = input.installationRoot ? join(ASHITA_LOCATION, input.installationRoot) : ASHITA_LOCATION
        console.log(`beginning move from ${root} to ${installLocation}`)
        moveFiles(root, installLocation)
    })
}



export function installRepository(input: Repository) {
    console.log(input)
    if (input.success) {
        input.downloads.forEach((v) => {
            installExtensions(v)
        })
    }
}

export function installRemoteRepository(location:string) {
    downloadYamlFile(location).then((repo) => {
        console.log(repo)
        installRepository(repo)
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

export default async function doRepositoryUpdates() {
    // if this file doesn't exist, no repositories are installed.
    if(!existsSync(join(INSTALL_LOCATION, 'repositories.json'))) {
        console.log('no repositories installed.')
        return
    }
    const repositories = getInstalledRepositories()
    if (repositories.success) {
        repositories.data.forEach(async (v) => {
            if (validateSemver(v.installedVersion) == null) return
            const data = await downloadYamlFile(v.remote)
            if (doVersionCheck(v.installedVersion, data.version)){
                installRepository(data)
            }
        })
    }
}