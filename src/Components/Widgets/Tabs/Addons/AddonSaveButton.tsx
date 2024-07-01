import { Button, Flex } from "@chakra-ui/react"
import { CheckIcon } from "@chakra-ui/icons"
import { useAppSelector } from "../../../../lib/store/store"
import { currentProfile } from "../../../../lib/store/ProfileReducer"

export default function AddonSaveButton() {
  const profile = useAppSelector(currentProfile)
  return <Button marginTop='3px'
  width='100%' onClick={() => {
    //window.electron.ipcRenderer.saveScript(profile)
    //window.electron.ipcRenderer.saveProfile(profile)
  }}>
<Flex>
  <h1>Save</h1>
  <CheckIcon marginLeft='10px'/>
</Flex>
</Button>
}
