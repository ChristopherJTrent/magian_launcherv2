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

}


export default function transformYamlPaths(input: Repository): Repository {
    input.downloads = input.downloads.map((v) => ({
        downloadLink: v.downloadLink,
        
    }))
}