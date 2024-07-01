import { readFileSync, writeFileSync } from "fs"
import { INSTALL_LOCATION } from "../Installation/paths"

function formatFileName(filename:string) {
  return `${INSTALL_LOCATION}\\profiles\\${filename}${filename.endsWith('.json') ? '' : '.json'}`
}

export function loadProfile(filename:string) {
  return JSON.parse(
    readFileSync(
      formatFileName(filename)
      )
      .toString()
  )
}

export function saveProfile(filename:string, object:any) {
  writeFileSync(formatFileName(filename), JSON.stringify(object))
}