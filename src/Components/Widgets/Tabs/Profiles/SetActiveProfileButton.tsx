import { IconButton } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { useAppDispatch, useAppSelector } from "../../../../lib/store/store"
import { currentProfile, setActiveProfile } from "../../../../lib/store/ProfileReducer"

type SetActiveProfileButtonProps = {
  profileName: string
}

export default function SetActiveProfileButton({profileName}:SetActiveProfileButtonProps) {
  const dispatch = useAppDispatch()
  const profileChanged = useAppSelector(state => state.flags.profileChanged)
  const profile = useAppSelector(currentProfile)

  return <IconButton
    aria-label={`Change Active Profile to ${profileName}`}
    icon={<EditIcon />}
    onClick={() => {
      if (profileChanged) {
        //window.electron.ipcRenderer.saveProfile(profile)
      }
      dispatch(setActiveProfile(profileName))
    }}
    marginRight='5px'/>
}
