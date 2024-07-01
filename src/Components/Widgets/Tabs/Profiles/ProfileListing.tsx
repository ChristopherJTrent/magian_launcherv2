import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../lib/store/store"
import { receiveProfiles } from "../../../../lib/store/ProfileReducer"
import ProfileElement from "./ProfileElement"


export default function ProfileListing() {
  const profiles = useAppSelector(state => state.profiles.list)
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const profs = window.electron.ipcRenderer.loadProfiles()
  //   profs.then((v) => {
  //     return dispatch(receiveProfiles(v))
  //   }).catch(_ => {})
  // }, [dispatch])
  return <ul>
    {Object.keys(profiles).map((v) => <li key={v}>
      <ProfileElement profileName={v} />
      </li>)}
  </ul>
}
