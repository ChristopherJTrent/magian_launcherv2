import { IconButton } from "@chakra-ui/react"
import { CiPlay1 } from 'react-icons/ci'
import { useAppDispatch, useAppSelector } from "../../../../lib/store/store"
import { resetChangeProfile } from "../../../../lib/store/flagsReducer"
import { receiveHook } from "../../../../lib/store/loaderReducer"

type LaunchGameButtonProps = {
  profileName: string
}

export default function LaunchGameButton({profileName}:LaunchGameButtonProps) {
  const hasScriptUpdate = useAppSelector(state => state.flags.profileChanged)
  const profile = useAppSelector(state => state.profiles.list[profileName])
  const dispatch = useAppDispatch()
  const launchGame = () => {
    if (hasScriptUpdate) {
      dispatch(receiveHook({
        name: 'Save Profile',
        func: async () => {
          console.log('saving profile')
          //window.electron.ipcRenderer.saveScript(profile)
          dispatch(resetChangeProfile())
        }
      }))
    }
    //window.electron.ipcRenderer.launchAshita(profileName)
  }
  return <IconButton
    aria-label={`Launch ${profileName}`}
    icon={<CiPlay1 />}
    onClick={launchGame}
    backgroundColor="#D35547"/>
}
