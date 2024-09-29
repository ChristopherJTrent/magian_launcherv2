import { readFileSync, writeFileSync } from "fs"
import { INSTALL_LOCATION } from "../Installation/paths"
import { join } from "path"

function formatFileName(filename:string) {
  return join(INSTALL_LOCATION, 'profiles', filename + filename.endsWith('.json')? '' : '.json')
}

export function loadProfile(filename:string) {
  return JSON.parse(
    readFileSync(
      formatFileName(filename)
      )
      .toString()
  )
}

export function saveProfile(filename:string, object:unknown) {
  writeFileSync(formatFileName(filename), JSON.stringify(object))
}