import { existsSync, PathLike} from "fs"
import { readFile } from "fs/promises"
import { parse } from "yaml"
import RepositoryValidator, {type Repository} from "Zod/Repository"
import { convertLocation } from "./convertLocation"

/**
 * Loads a yaml file from disk and converts it into an object.
 * @param path the path to a yaml file
 * @returns the object represented by the chosen file, or an empty object if it is invalid
 */
export async function loadYamlFile(path: PathLike): Promise<Repository> {
    if(existsSync(path)) {
        const repo = RepositoryValidator.safeParse(parse((await readFile(path)).toString()))
        return repo.success ? {...repo.data, success: true} : {version: '1.0.0-invalid', downloads: []}
    } else {
        return {version: '1.0.0-invalid', downloads: []}
    }
}

export async function downloadYamlFile(location: string): Promise<Repository> {
    const repo = RepositoryValidator.safeParse(parse(await (await fetch(convertLocation(location))).text()))
    // console.log(repo.success ? repo.data : repo.error)
    return repo.success ? {...repo.data, success: true} : {success: false, version: '1.0.0-invalid', downloads: []}
}