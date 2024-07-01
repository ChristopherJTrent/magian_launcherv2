import Profile from "./Profile"

export type profilesMapping = {
  currentProfile:string
  list: {[name:string]: Profile}
}

const omicron = new Profile('Omicron XI', [], [], true)
omicron.settings.bootFile = '.\\bootloader\\xiloader.exe'
omicron.settings.bootCommand = '--server OmicronFFXI.com'

export const initialProfiles:profilesMapping = {
  currentProfile: 'default',
  list: {
    'default': new Profile(
      'default', 
      [
        'distance',
        'fps',
        'move',
        'timestamp',
        'tparty'
      ],
      [
        'thirdparty',
        'addons',
        'screenshot'
      ]
    ),
    'omicron': omicron
  }
}
