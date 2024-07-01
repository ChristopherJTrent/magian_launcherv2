import { readFile } from "fs/promises"
import { CONFIGURATION_LOCATION } from "../Installation/paths"
import { parseINI } from "../Config/INIHelper"
import deepTransformKeys from "../helpers/deepTransformKeys"

export default async function loadConfig(name:string) {
  return deepTransformKeys(
    parseINI(
      (await readFile(`${CONFIGURATION_LOCATION}\\${name}`))
      .toString()
    )
  )
}
