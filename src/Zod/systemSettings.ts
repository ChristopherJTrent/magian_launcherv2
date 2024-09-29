import { z } from "zod"

const systemSettings = z.object({
    preferredController: z.enum(['directInput', 'xInput'])
})

export default systemSettings