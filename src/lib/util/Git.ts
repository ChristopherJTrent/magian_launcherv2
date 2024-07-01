import { ChildProcess, ChildProcessWithoutNullStreams, ExecOptions, SpawnOptionsWithoutStdio, exec, spawn } from "child_process"
import { ASHITA_LOCATION } from "./Installation/paths"

const ASHITA_DOWNLOAD_TIMEOUT = 300_000

function spawnGitProcess(args:string[], opts?:ExecOptions):ChildProcess {
  const proc = exec([`cd ${ASHITA_LOCATION} &&`,'git', ...args].join(' '), {
    windowsHide: true,
    ...opts
  })
  proc.on('error', (e) => {console.log(`what the fuck: ${e}`)})
  return proc
}

export type installStatus = ('uninstalled'|'up-to-date'|'behind')

export async function getAshitaStatus():Promise<installStatus> {
  return new Promise((resolve, _reject) => {
    let string = ''
    const proc = spawnGitProcess(
      ['status'])
    proc.stdout?.on('data', (data) => {
      console.log(`received chunk from git: ${data.toString()}`)
      string += data.toString()
    })
    proc.stdout?.on('end', () => {
      resolve(/up to date/.test(string) ? 'up-to-date' : 'behind')
    })
    proc.on('exit', (code) => {
      if (code !== 0) {resolve('uninstalled')}
    })
  })
}

  // const result = spawnGitProcess([
  //   'status'
  // ], {
  //   cwd: ASHITA_LOCATION
  // })
  // if (result.status) {
  //   return 'uninstalled'
  // }
  // if (result.stdout == null) {
  //   return 'uninstalled'
  // }
  // return /up to date/.test(result.stdout.toString()) ? 'up-to-date' : 'behind'

export async function pullAshita():Promise<void> {
  return new Promise((resolve, _reject) => {
    try{
      spawnGitProcess([
        'pull',
        '--rebase'
      ], {
       // cwd: ASHITA_LOCATION
      }).on('exit', resolve)
    } catch (err) {
      console.log(err)
      _reject()
    }
    }
  )
}

export function installAshita():Promise<void> {
  return new Promise((resolve, _reject) => {
    try{

      spawnGitProcess([
        `clone https://github.com/ashitaxi/ashita-v4beta.git "${ASHITA_LOCATION}"`,
      ], {
        timeout: ASHITA_DOWNLOAD_TIMEOUT
      }).on('close', resolve)
    } catch(e) {
      console.log(e)
      _reject()
    }
  })
}
