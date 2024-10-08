import { z } from "zod"
import validateSemver from 'semver/functions/valid'
import { repoRegex } from "./repository"
import { existsSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"
import { INSTALL_LOCATION } from "@lib/util/Installation/paths"

const installedRepositories = z.array(z.object({
    installedVersion: z.string().refine(validateSemver),
    remote: z.string().regex(repoRegex)
}))

export function getInstalledRepositories() {
    try{
        if(!existsSync(join(INSTALL_LOCATION, 'repositories.json'))) return installedRepositories.safeParse([])
        return installedRepositories.safeParse(JSON.parse(
            readFileSync(
                join(INSTALL_LOCATION, 'repositories.json')
            ).toString()
        ))
    } catch (err) {
        // console.log(err)
        return installedRepositories.safeParse([])
    }
}

export function addInstalledRepository(version: string, location: string) {
    const installed = installedRepositories.safeParse([{installedVersion:version, remote: location}])
    const existing = getInstalledRepositories()
    if(!installed.success || !existing.success) return
    writeFileSync(
        join(INSTALL_LOCATION, 'repositories.json'),
        JSON.stringify([...existing.data, ...installed.data])
    )
}
export default installedRepositories