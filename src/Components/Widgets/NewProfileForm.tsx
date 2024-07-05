import { AddIcon } from "@chakra-ui/icons"
import { Box, Button, Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, Editable, EditableInput, EditablePreview, Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import CustomEditablePreview from "./customEditablePreview"
import EditableControls from "./EditableControls"

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
    onClick={onOpen}
    _hover={{opacity: 1, transform: "scale(1)"}}/>
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
      <ModalContent backgroundColor='#282C37'>
        <ModalHeader>Create New Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding='none' >
          <Flex direction='column'>
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
          </Flex>
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
