import { AddIcon } from "@chakra-ui/icons"
import { Drawer, DrawerCloseButton, DrawerContent, DrawerOverlay, IconButton, useDisclosure } from "@chakra-ui/react"

export default function NewProfileForm() {
  const {isOpen, onOpen, onClose} = useDisclosure()

  return <>
    <IconButton
    icon={<AddIcon/>}
    aria-label="New Profile"
    onClick={onOpen}/>
    <Drawer onClose={onClose} isOpen={isOpen} size="full">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
      </DrawerContent>
    </Drawer>
  </>
}
