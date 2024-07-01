import { List, ListItem, Switch } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../lib/store/store"
import { currentProfile, disablePolPlugin, enablePolPlugin } from "../../lib/store/ProfileReducer"
import { changeProfile } from "../../lib/store/flagsReducer"


export default function PolPluginListing() {
  const polPlugins = useAppSelector(state => state.polPlugins)
  const profile = useAppSelector(currentProfile)
  const dispatch = useAppDispatch()
  const pluginChangeHandler = (name:string) => () => {
    dispatch(changeProfile())
    if (profile.enabledPolPlugins?.includes(name)) {
      dispatch(disablePolPlugin(name))
    } else {
      dispatch(enablePolPlugin(name))
    }
  }

  return <List>
    {polPlugins.map((v) => {
      return <ListItem
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            key={v}>
        {v}
        <Switch isChecked={profile.enabledPolPlugins?.includes(v)}
          onChange={pluginChangeHandler(v)} />
      </ListItem>
    })}
  </List>
}
