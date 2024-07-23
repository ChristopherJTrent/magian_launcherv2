import { z } from "zod";
import validateSemver from 'semver/functions/valid'
import { repoRegex } from "./Repository";

const installedRepositories = z.array(z.object({
    installedVersion: z.string().refine(validateSemver),
    remote: z.string().regex(repoRegex)
}))

export default installedRepositories