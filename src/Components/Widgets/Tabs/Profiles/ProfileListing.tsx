import {  useAppSelector } from "@store/store"
import ProfileElement from "./ProfileElement"
import { Flex } from "@chakra-ui/react"
import NewProfileForm from "./NewProfileForm"


export default function ProfileListing() {
  const profiles = useAppSelector(state => state.profiles.list)
  // const dispatch = useAppDispatch()
  // useEffect(() => {
  //   const profs = window.electron.ipcRenderer.loadProfiles()
  //   profs.then((v) => {
  //     return dispatch(receiveProfiles(v))
  //   }).catch(_ => {})
  // }, [dispatch])
  return <Flex direction='column' justifyContent='space-between' height="calc(100vh - 30px)">
      <ul>
        {Object.keys(profiles).map((v) => <li key={v}>
          <ProfileElement profileName={v} />
          </li>)}
      </ul>
      <NewProfileForm />
    </Flex>
}
