import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/store/store"
import { receiveplugins } from "../../../../lib/store/pluginsReducer"
import PluginElement from "./PluginElement"
import AddonSaveButton from "../Addons/AddonSaveButton"

export default function PluginListing() {
  const plugins = useAppSelector(state => state.plugins)
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   window.electron.ipcRenderer.getPlugins().then((v) => {
  //     return dispatch(receiveplugins(v))
  //   }).catch((_) => {})
  // }, [dispatch])

  return <>
    <ul>
      {plugins.map((v) => {
        return <PluginElement plugin={v} key={v}/>
      })}
    </ul>
    <AddonSaveButton />
  </>
}
