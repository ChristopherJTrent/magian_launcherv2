/* eslint-disable react/jsx-props-no-spreading */
import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react"
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons'

export default function EditableControls() {
  const {
    isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps,
  } = useEditableControls()
  return isEditing ? (
    <ButtonGroup>
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} aria-label='Submit' />
      <IconButton icon={<CloseIcon boxSize={3} />} {...getCancelButtonProps()} aria-label='Cancel' />
    </ButtonGroup>
  ) : (
    <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} aria-label='Edit' />
  )
}
