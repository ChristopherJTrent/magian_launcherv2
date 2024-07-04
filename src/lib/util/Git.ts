import { ChildProcess, ChildProcessWithoutNullStreams, ExecOptions, SpawnOptionsWithoutStdio, exec, spawn } from "child_process"
import { ASHITA_LOCATION, INSTALL_LOCATION } from "./Installation/paths"
import { existsSync } from "fs"

const ASHITA_DOWNLOAD_TIMEOUT = 300_000_000

function spawnGitProcess(args:string[], opts?:ExecOptions):ChildProcess {
  const proc = exec([`cd ${INSTALL_LOCATION} &&`,'git', ...args].join(' '), {
    windowsHide: true,
    ...opts
  }, (error, stdout, stderr) => {
  })
  proc.on('error', (e) => {})
  return proc
}

export type installStatus = ('uninstalled'|'up-to-date'|'behind')

export async function getAshitaStatus():Promise<installStatus> {
  return new Promise((resolve, _reject) => {
    if(!existsSync(ASHITA_LOCATION)) {
      resolve('uninstalled')
    }
    let string = ''
    const proc = spawnGitProcess(
      ['status'])
    proc.stdout?.on('data', (data) => {
      string += data.toString()
    })
    proc.stdout?.on('end', () => {
      resolve(/up to date/.test(string) ? 'up-to-date' : 'behind')
    })
    proc.on('exit', (code) => {
      if (code !== 0 && code !== 128) {_reject(new Error('exit code not 0'))}
      else {
        resolve('up-to-date')
      }
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
      _reject()
    }
    }
  )
}

export function installAshita():Promise<void> {
  return new Promise((resolve, _reject) => {
    try{
      let string = 'Proc output: '
      let string2 = 'Proc error: '
      const proc = spawnGitProcess([
        `clone https://github.com/ashitaxi/ashita-v4beta.git "${ASHITA_LOCATION}"`,
      ], {
        timeout: ASHITA_DOWNLOAD_TIMEOUT
      })
      // @ts-ignore
      proc.stdout.on('data', (chunk) => {
        string += chunk.toString()
      })
      proc.stdout?.on('end', () => {
      })
      // @ts-ignore
      proc.stderr.on('data', (chunk) => {
        string2 += chunk.toString()
      })
      proc.on('close', () => {resolve()})
    } catch(e) {
    }
  })
}
