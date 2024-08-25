import { useSelector } from "react-redux"
import { Divider, Flex, ListItem, Switch, Text } from "@chakra-ui/react"
import { extensionEnabled, setAddonDisabled, setAddonEnabled } from "@store/ProfileReducer"
import { useAppDispatch } from "@store/store"
import { changeProfile } from "@store/flagsReducer"
import Addon from "@lib/data/addon"

export type AddonElementProps = {
  addon: Addon
}

export default function AddonElement({addon}:AddonElementProps) {
  const enabled = useSelector(extensionEnabled(addon.name, 'enabledAddons'))
  const dispatch = useAppDispatch()

  const toggleAddon = () => {
    dispatch(changeProfile())
    if (enabled) {
      dispatch(setAddonDisabled(addon.name))
    } else {
      dispatch(setAddonEnabled(addon.name))
    }
  }
  return <ListItem
      marginTop='4px'
      border='2px solid rgba(0,0,0,0.2)'
      padding='0.75em'>
    <Flex
      justifyContent='space-between'
      direction='row'>
      <Flex direction='column'>
        <Text fontSize='large' fontWeight='700'>{addon.name}</Text>
        <Flex direction='row' alignItems='center'>
          <Divider
            borderColor='#D35547'
            backgroundColor='#D35547'
            orientation="vertical"
            width='1px'
            borderWidth='1px'
            marginTop='5px'
            marginBottom='5px'
            marginRight='5px'/>
          <Text fontSize='9pt' marginTop='auto' marginBottom='auto'>
            {addon.desc}
          </Text>
        </Flex>
      </Flex>
      <Switch
        isChecked={enabled}
        onChange={toggleAddon}
        sx={{
          '.chakra-switch__track[data-checked]': {
            backgroundColor: '#D35547'
          }
        }}
      />
    </Flex>
    <Flex direction='row' justifyContent='space-between' alignItems='center'>
      <Text>
        {addon.author}
      </Text>
      <Text textAlign='right'>
        {addon.link}
      </Text>
    </Flex>
  </ListItem>
}
