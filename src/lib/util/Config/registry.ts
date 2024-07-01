import { Dictionary } from "../Types"
import { padModes } from "./RegistryDefinition"

export const registryKeys = {
  MIPMAPLEVEL: '0000',
  WINDOWHEIGHT: '0001',
  WINDOWWIDTH: '0002',
  BACKGROUNDHEIGHT: '0003',
  BACKGROUNDWIDTH: '0004',
  GAMESOUND: '0007',
  ENVIRONMENTANIMATIONS: '0011',
  BUMPMAPPING: '0017',
  TEXTURECOMPRESSION: '0018',
  MAPCOMPRESSION: '0019',
  ANIMATIONFRAMERATE: '0020',
  HARDWAREMOUSE: '0021',
  OPENINGMOVIE: '0022',
  SIMPLECHARCREATION: '0023',

}


export function generateRegistry(input:string[]): Dictionary<string> {
  const output:Dictionary<string> = {}
  for(let i = 0; i < 46; i += 1) {
    const key = String(i).padStart(4, '0')
    output[key] = input[i] ?? '-1'
  }
  return output
}
export function generatePadMode(input: padModes):string {
  return `${input.enable?1:0},${input.rumble?1:0},${input.slider?1:0},${input.hats?1:0},${input.unfocused},${input.xinput?1:0}`
}
