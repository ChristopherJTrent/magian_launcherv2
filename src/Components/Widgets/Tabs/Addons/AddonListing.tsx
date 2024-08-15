import {  Flex, List } from "@chakra-ui/react"
import { useAppSelector } from "@store/store"
import AddonElement from "./AddonElement"
import AddonSaveButton from "./AddonSaveButton"
import { useEffect } from "react"
import { currentProfile } from "@store/ProfileReducer"

export default function AddonListing() {
  const addons = useAppSelector(state => state.addons)
  const profile = useAppSelector(currentProfile)
  useEffect(() => {
    // console.log(profile)
  })
  return <>
    <Flex
        direction='column'
        overflowY='scroll'
        paddingRight='5px'
        marginLeft='-8px'
        height='calc(90vh - 30px)'>
      <List>
        {addons && addons.map((v) => <AddonElement key={v.name} addon={v}/>)}
      </List>
    </Flex>
    <AddonSaveButton />
  </>
}
