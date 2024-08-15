import valid  from 'semver/functions/valid'
import {z} from 'zod'

export const repoRegex = /^(?<service>gl:|gh:)(?<user>[a-zA-Z0-9-]+)\/(?<repo>[\w.-]+)(?:@(?<branch>[a-zA-Z0-9\-_.]+))?(?:\/(?<file>\w+\.yaml))?$/

const Repository = z.object({
    // helpfully, semver returns a falsey value if the string isn't valid.
    version: z.string().refine(valid),
    success: z.optional(z.boolean()),
    description: z.optional(z.string()),
    maintainer: z.optional(z.string()),
    maintainerContact: z.optional(z.string()),
    //customReplacers: z.optional(z.array(z.object({
    //    matchPattern: z.string(),
    //    replacement: z.string()
    //}))),
    //extends: z.optional(z.array(z.string().regex(repoRegex))),
    downloads: z.array(z.object({
        downloadLink: z.string().url(),
        filesystemRoot: z.optional(z.string()),
        installationRoot: z.string(),
        descriptionFile: z.optional(z.string())
    }))
})

export type Repository = z.infer<typeof Repository> 

export default Repository