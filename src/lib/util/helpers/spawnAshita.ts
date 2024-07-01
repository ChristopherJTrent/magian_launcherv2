import { spawnSync } from 'child_process'
import { ASHITA_LOCATION } from '../Installation/paths'

export default async function spawnAshita(scriptName:string) {
  console.log(scriptName)
  console.log(ASHITA_LOCATION)
  try{

    const bat = spawnSync(
      'Start-Process',
      [
        '-FilePath',
        `"${ASHITA_LOCATION}\\ashita-cli.exe"`,
        '-WorkingDirectory',
        `"${ASHITA_LOCATION}"`,
        '-Args',
        `managed/${scriptName}.ini`,
        '-Verb',
        'RunAs'
      ], // Start-Process -FilePath C:\Users\Chris\Magian Launcher\Ashita\Ashita-cli.exe -WorkingDirectory C:\Users\Chris\Magian Launcher\Ashita -Args managed/default.ini -Verb RunAs
      {
        shell: 'powershell.exe',
        windowsHide: false
      }
    )
  } catch (e) {
    console.log(e)
  }
  console.log(bat.output.toString())
}
