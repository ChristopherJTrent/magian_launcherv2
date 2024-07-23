import { existsSync, PathLike} from "fs";
import { readFile } from "fs/promises";
import { parse } from "yaml";
import RepositoryValidator, {repoRegex, type Repository} from "Zod/Repository";

/**
 * Loads a yaml file from disk and converts it into an object.
 * @param path the path to a yaml file
 * @returns the object represented by the chosen file, or an empty object if it is invalid
 */
export async function loadYamlFile(path: PathLike): Promise<Repository> {
    if(existsSync(path)) {
        const repo = RepositoryValidator.safeParse(parse((await readFile(path)).toString()))
        return repo.success ? {...repo.data, success: true} : {downloads: []}
    } else {
        return {downloads: []}
    }
}

function convertLocation(input: string): string {
    const {service, user, repo, branch, file} = repoRegex.exec(input)?.groups ?? {}

    return service === 'gh:' 
        ? `https://raw.githubusercontent.com/${user}/${repo}/${branch ?? 'main'}/${file ?? 'repo.yaml'}`
        : `https://gitlab.com/${user}/${repo}/-/raw/${branch ?? 'main'}/${file ?? 'repo.yaml'}?ref_type=heads`
}

export async function downloadYamlFile(location: string): Promise<Repository> {
    const repo = RepositoryValidator.safeParse(parse(await (await fetch(convertLocation(location))).text()))
    return repo.success ? {...repo.data, success: true} : {success: false, version: '1.0.0-invalid', downloads: []}
}