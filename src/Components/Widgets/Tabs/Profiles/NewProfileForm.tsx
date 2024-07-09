import { AddIcon } from "@chakra-ui/icons"
import { 
  Button, 
  Editable, 
  EditableInput, 
  EditablePreview, 
  Flex, 
  IconButton, 
  Modal, 
  ModalBody, 
  ModalCloseButton, 
  ModalContent, 
  ModalFooter, 
  ModalHeader, 
  ModalOverlay, 
  NumberDecrementStepper, 
  NumberIncrementStepper, 
  NumberInput, 
  NumberInputField, 
  NumberInputStepper, 
  Switch, 
  Text, 
  useDisclosure 
} from "@chakra-ui/react"
import { useState } from "react"
import EditableControls from "../../EditableControls"
import Profile, { defaultAddons, defaultPlugins, defaultPolPlugins } from "../../../../lib/data/Profile"
import { useAppDispatch } from "../../../../lib/store/store"
import { receiveProfile } from "../../../../lib/store/ProfileReducer"

export default function NewProfileForm() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const dispatch = useAppDispatch()

  const [name, setName] = useState('New Profile')
  const [windowResolutionX, setWindowResolutionX] = useState(1920)
  const [windowResolutionY, setWindowResolutionY] = useState(1080)
  const [isPrivateServer, setIsPrivateServer] = useState(false)
  const [useDefaultPlugins, setUseDefaultPlugins] = useState(true)
  const [useDefaultAddons, setUseDefaultAddons] = useState(true)
  const [useDefaultPolPlugins, setUseDefaultPolPlugins] = useState(true)

  const saveProfile = () => {
    const profile = new Profile(
      name,
      useDefaultAddons ? defaultAddons : [],
      useDefaultPlugins ? defaultPlugins : [],
      useDefaultPolPlugins ? defaultPolPlugins : [],
      isPrivateServer
    )
    profile.settings.windowResolutionX = windowResolutionX
    profile.settings.windowResolutionY = windowResolutionY
    window.electron.ipcRenderer.saveProfile(profile).then(() => {
      dispatch(receiveProfile(profile))
    })
  }

  return <>
    <IconButton
    icon={<AddIcon/>}
    aria-label="New Profile"
    onClick={onOpen}
    _hover={{opacity: 1, transform: "scale(1)"}}/>
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent backgroundColor='#282C37'>
        <ModalHeader>Create New Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding='none' >
          <Flex direction='column' rowGap={'5px'}>
            <Text fontWeight='700'>
              Profile Name
            </Text>
            <Editable defaultValue={name}
                onSubmit={(nextValue) => setName(nextValue)}
                padding='0px'
                height='48px'>
              <Flex direction='row' justifyContent='space-between' wrap='nowrap' width='95%' padding='0px' alignItems='center'>
                <EditablePreview/>
                <EditableInput wordBreak='break-all' />
                <EditableControls />
              </Flex>
            </Editable>
            <Text fontWeight={700}>
              Game Window Width
            </Text>
            <NumberInput
              defaultValue={windowResolutionX}
              min={-1}
              max={7680}
              onChange={(_, v) => setWindowResolutionX(v)}>
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            <Text fontWeight={700}>
              Game Window Height
            </Text>
            <NumberInput
              defaultValue={windowResolutionY}
              min={-1}
              max={7680}
              onChange={(_, v) => setWindowResolutionY(v)}>
                <NumberInputField/>
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Flex direction={"row"} justify={'space-between'}>
              <Text fontWeight={700}>
                Private Server?
              </Text>
              <Switch onChange={() => {setIsPrivateServer(!isPrivateServer)}} isChecked={isPrivateServer} />
            </Flex>
            <Flex direction={"row"} justify={'space-between'}>
              <Text fontWeight={700}>
                Use Default Playonline Plugins?
              </Text>
              <Switch onChange={() => {setUseDefaultPolPlugins(!useDefaultPolPlugins)}} isChecked={useDefaultPolPlugins}/>
            </Flex>
            <Flex direction={"row"} justify={'space-between'}>
              <Text fontWeight={700}>
                Use Default Plugins?
              </Text>
              <Switch onChange={() => {setUseDefaultPlugins(!useDefaultPlugins)}} isChecked={useDefaultPlugins}/>
            </Flex>
            <Flex direction={"row"} justify={'space-between'}>
              <Text fontWeight={700}>
                Use Default Addons?
              </Text>
              <Switch onChange={() => {setUseDefaultAddons(!useDefaultAddons)}} isChecked={useDefaultAddons}/>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button 
              backgroundColor="#D35547"
              onClick={() => {
                saveProfile()
                onClose()
              }}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
