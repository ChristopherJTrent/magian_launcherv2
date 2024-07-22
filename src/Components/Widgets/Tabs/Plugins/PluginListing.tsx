import { useAppSelector } from "@store/store"
import PluginElement from "./PluginElement"
import AddonSaveButton from "../Addons/AddonSaveButton"

export default function PluginListing() {
  const plugins = useAppSelector(state => state.plugins)
  
  return <>
    <ul>
      {plugins.map((v) => {
        return <PluginElement plugin={v} key={v}/>
      })}
    </ul>
    <AddonSaveButton />
  </>
}
