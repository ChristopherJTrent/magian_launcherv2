import { repoRegex } from "Zod/Repository"

export function convertLocation(input: string): string {
    if (input.startsWith('http')) {
        // console.log('convertLocation passed URL')
        return input
    }
    const { service, user, repo, branch, file } = repoRegex.exec(input)?.groups ?? {}

    return service === 'gh:'
        ? `https://raw.githubusercontent.com/${user}/${repo}/${branch ?? 'main'}/${file ?? 'repo.yaml'}`
        : `https://gitlab.com/${user}/${repo}/-/raw/${branch ?? 'main'}/${file ?? 'repo.yaml'}?ref_type=heads`
}
