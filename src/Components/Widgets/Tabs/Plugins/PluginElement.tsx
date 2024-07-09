import { useSelector } from "react-redux"
import { Flex, Switch } from "@chakra-ui/react"
import { extensionEnabled, setPluginDisabled, setPluginEnabled } from "@store/ProfileReducer"
import { useAppDispatch } from "@store/store"
import { changeProfile } from "@store/flagsReducer"

export type PluginElementProps = {
  plugin: string
}

export default function PluginElement({plugin}:PluginElementProps) {
  const enabled = useSelector(extensionEnabled(plugin, 'enabledPlugins'))
  const dispatch = useAppDispatch()

  const togglePlugin = () => {
    dispatch(changeProfile())
    if (enabled) {
      dispatch(setPluginDisabled(plugin))
    } else {
      dispatch(setPluginEnabled(plugin))
    }
  }
  return <li>
    <Flex justifyContent='space-between' direction='row'>
      <h2>{plugin}</h2>
      <Switch
        isChecked={enabled}
        onChange={togglePlugin}
        sx={{
          '.chakra-switch__track[data-checked]': {
            backgroundColor: '#D35547'
          }
        }}
      />
    </Flex>
  </li>
}
