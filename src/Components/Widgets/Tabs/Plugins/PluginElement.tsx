import { useSelector } from "react-redux"
import { Flex, Switch } from "@chakra-ui/react"
import { pluginEnabled, setPluginDisabled, setPluginEnabled } from "../../../../lib/store/ProfileReducer"
import { useAppDispatch } from "../../../../lib/store/store"
import { changeProfile } from "../../../../lib/store/flagsReducer"

export type PluginElementProps = {
  plugin: string
}

export default function PluginElement({plugin}:PluginElementProps) {
  const enabled = useSelector(pluginEnabled(plugin))
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
