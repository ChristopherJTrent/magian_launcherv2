import {z} from 'zod'

const Repository = z.object({
    customReplacers: z.optional(z.array(z.object({
        matchPattern: z.string(),
        replacement: z.string()
    }))),
    downloads: z.array(z.object({
        downloadLink: z.string().url(),
        filesystemRoot: z.optional(
            z.string().startsWith("$DOWNLOADROOT")
        ),
        installationRoot: z.optional(z.string()),
        descriptionFile: z.optional(z.string())
    }))
})

export type Repository = z.infer<typeof Repository>

export default Repository