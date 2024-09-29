import { readFile } from "fs/promises"
import { CONFIGURATION_LOCATION } from "../Installation/paths"
import { parseINI } from "../Config/iniHelper"
import deepTransformKeys from "../helpers/deepTransformKeys"
import { join } from "path"

export default async function loadConfig(name:string) {
  return deepTransformKeys(
    parseINI(
      (await readFile(join(CONFIGURATION_LOCATION, name)))
      .toString()
    )
  )
}
