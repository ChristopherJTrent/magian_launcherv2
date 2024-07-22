import {z} from 'zod'

export const repoRegex = /^(?<service>gl:|gh:)(?<user>[a-zA-Z0-9-]+)\/(?<repo>[\w.-]+)(?:@(?<branch>[a-zA-Z0-9\-_.]+))?(?:\/(?<file>\w+\.yaml))?$/

const Repository = z.object({
    success: z.optional(z.boolean()),

    customReplacers: z.optional(z.array(z.object({
        matchPattern: z.string(),
        replacement: z.string()
    }))),
    extends: z.optional(z.array(z.string().regex(repoRegex))),
    downloads: z.array(z.object({
        downloadLink: z.string().url(),
        filesystemRoot: z.string(),
        installationRoot: z.string(),
        descriptionFile: z.optional(z.string())
    }))
})

export type Repository = z.infer<typeof Repository> 

export default Repository