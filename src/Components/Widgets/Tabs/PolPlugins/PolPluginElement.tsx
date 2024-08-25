import { ListItem, Switch } from "@chakra-ui/react"
import { changeProfile } from "@store/flagsReducer"
import { setPolPluginDisabled, setPolPluginEnabled, extensionEnabled } from "@store/ProfileReducer"
import { useAppDispatch, useAppSelector } from "@store/store"

type PolPluginElementProps = {
    name: string
}

export default function PolPluginElement({name}:PolPluginElementProps) {
    const dispatch = useAppDispatch()
    const polPluginEnabled = useAppSelector(extensionEnabled(name, 'enabledPolPlugins'))
    return <ListItem
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            key={name}>
        {name}
        <Switch isChecked={polPluginEnabled}
          onChange={() => {
            dispatch(changeProfile())
            dispatch(polPluginEnabled ? setPolPluginDisabled(name) : setPolPluginEnabled(name))
          }} />
    </ListItem>
}