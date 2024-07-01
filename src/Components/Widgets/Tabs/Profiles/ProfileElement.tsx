import { Flex, Text } from "@chakra-ui/react"
import LaunchGameButton from "./LaunchGameButton"
import { useAppSelector } from "../../../../lib/store/store"
import TextHighlight from "../../TextHighlight"
import SetActiveProfileButton from "./SetActiveProfileButton"

type ProfileElementProps = {
  profileName:string
}

function convertRegToWindowType(num:number) {
  switch(num){
    case -1: return 'Using Registry Value for Window Type'
    case 0: return 'Full Screen'
    case 1: return 'Windowed'
    case 2: return 'Borderless Windowed'
    default: return 'Windowed Fullscreen'
  }
}

export default function ProfileElement({profileName}:ProfileElementProps) {
  const profile = useAppSelector(state => state.profiles.list[profileName])
  const currentProfile = useAppSelector(state => state.profiles.currentProfile)
  return <Flex
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      border={profile.name === currentProfile ? '2px solid #D355474D' : '2px solid rgba(0,0,0,0.3)'}
      padding='5px'
      backgroundColor='rgba(255, 255, 255, 0.02)'
      marginBottom='5px'
      style={{
        transition: 'border-color linear 0.25s'
      }}
      >
    <Flex direction='column'>
      <Text fontSize='large' fontWeight='600' style={{
        textTransform:'capitalize'
      }}>{profile.name}</Text>
      <Flex direction='row' height='calc(3 * 16px)'>
        <TextHighlight />
        <Flex direction='column'>
          <Text color='GrayText' fontSize='8pt'>Language: {profile.settings.language === 1 ? 'JP' : 'EN'}</Text>
          <Text color='GrayText' fontSize='8pt'>Server Type: {profile.serverType}</Text>
          <Text color='GrayText' fontSize='8pt'>
            {`${profile.settings.windowResolutionX}x${profile.settings.windowResolutionY} (${convertRegToWindowType(profile.settings.windowMode)})`}
          </Text>
        </Flex>
      </Flex>
    </Flex>
    <Flex direction='row'>
      <SetActiveProfileButton profileName={profile.name}/>
      <LaunchGameButton profileName={profile.name} />
    </Flex>
  </Flex>
}
