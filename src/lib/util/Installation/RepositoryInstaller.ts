import { existsSync, mkdirSync } from "fs";
import { Repository } from "Zod/Repository";
import { ASHITA_LOCATION, DOWNLOADS_LOCATION, INSTALL_LOCATION } from "./paths";
import { z } from "zod";
import DownloadFile from "../IO/FileDownloader";
import extract from "extract-zip";
import { join } from "path";
import moveFiles from "../IO/moveFiles";
import { downloadYamlFile } from "../helpers/YAML/fileHandler";

export function ensureDirectories() {
    if(!existsSync(DOWNLOADS_LOCATION)) mkdirSync(DOWNLOADS_LOCATION, {recursive: true})
}

export function installExtensions(input: {
        downloadLink: string, 
        filesystemRoot: string, 
        installationRoot: string,
        fileNameOverride: string}
    ) {
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
    
    let filename = checkedFileURL.data.split('/').pop()
    
    if (filename == null) {
        console.error('This should never occur. A validated URL\'s last segment is undefined')
        return
    }

    if (input.fileNameOverride) {
        filename = input.fileNameOverride
    }

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
        console.log('beginning move')
        moveFiles(root, input.installationRoot ? join(ASHITA_LOCATION, input.installationRoot) : ASHITA_LOCATION)
    })
}

export function installRepository(input: Repository) {
    console.log(input)
}

export function installRemoteRepository(location:string) {
    downloadYamlFile(location).then((repo) => {
        installRepository(repo)
    })
}

export default function doRepositoryUpdates() {
    // if this file doesn't exist, no repositories are installed.
    if(!existsSync(join(INSTALL_LOCATION, 'repositories.json'))) {
        return
    }
    //TODO: replace this with opening a file and reading it.
    // eslint-ignore-next-line
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires
    const repoData = require(join(INSTALL_LOCATION, 'repositories.json')) as {currentVersion:number, name:string}[]
}