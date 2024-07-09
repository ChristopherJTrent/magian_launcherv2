import { List } from "@chakra-ui/react"
import { useAppSelector } from "@store/store"
import PolPluginElement from "./PolPluginElement"


export default function PolPluginListing() {
  const polPlugins = useAppSelector(state => state.polPlugins)

  return <List>
    {polPlugins.map((v) => <PolPluginElement name={v} />)}
  </List>
}
