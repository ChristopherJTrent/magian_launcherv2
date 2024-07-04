import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

export default function NewProfileForm() {
  const {isOpen, onOpen, onClose} = useDisclosure()

  const [name, setName] = useState('New Profile')
  const [windowResolutionX, setWindowResolutionX] = useState(1920)
  const [windowResolutionY, setWindowResolutionY] = useState(1080)
  const [isPrivateServer, setIsPrivateServer] = useState(false)
  const [useDefaultPlugins, setUseDefaultPlugins] = useState(true)
  const [useDefaultAddons, setUseDefaultAddons] = useState(true)
  const [useDefaultPolPlugins, setUseDefaultPolPlugins] = useState(true)

  const SaveOnClose = () => {

  }

  return <>
    <IconButton
    icon={<AddIcon/>}
    aria-label="New Profile"
    onClick={onOpen}/>
    {/* <Drawer onClose={onClose} isOpen={isOpen} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <Flex direction='column'>
          <DrawerCloseButton marginTop='30px'/>
        </Flex>
      </DrawerContent>
    </Drawer> */}
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>

        </ModalBody>
        <ModalFooter>
          <Button backgroundColor="#D35547">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
}
