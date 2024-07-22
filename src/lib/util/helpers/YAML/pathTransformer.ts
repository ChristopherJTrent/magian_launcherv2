/* eslint-disable @typescript-eslint/no-unused-vars */

import { ADDON_LOCATION, ASHITA_LOCATION, PLUGIN_LOCATION, POL_PLUGIN_LOCATION } from "@lib/util/Installation/paths"
import { join } from "path"
import { pathTransformer } from "../../../data/pathTransformer"
import { Repository } from "Zod/Repository"

export const defaultTransformers: pathTransformer[] = [
    {
        matchPattern: '$ASHITAROOT',
        replacement: ASHITA_LOCATION
    }, 
    {
        matchPattern: '$ADDONROOT',
        replacement: ADDON_LOCATION
    },
    {
        matchPattern: '$PLUGINROOT',
        replacement: PLUGIN_LOCATION
    },
    {
        matchPattern: '$POLPLUGINROOT',
        replacement: POL_PLUGIN_LOCATION
    },
    {
        matchPattern: '$CONFIGROOT',
        replacement: join(ASHITA_LOCATION, 'config')
    }
]

function transformPath(input: string, customReplacers: pathTransformer[] = []): string {
    return customReplacers.reduce((a, v) => (
        a.startsWith(v.matchPattern) ? a.replace(v.matchPattern, join(ASHITA_LOCATION, v.replacement)) : a
    ), defaultTransformers.reduce((a, v) => (
        a.startsWith(v.matchPattern) ? a.replace(v.matchPattern, v.replacement) : a
    ), input))
}

