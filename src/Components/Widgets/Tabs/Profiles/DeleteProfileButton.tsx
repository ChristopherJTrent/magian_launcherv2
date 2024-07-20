import { Button, ButtonGroup, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, useDisclosure } from "@chakra-ui/react"
import { removeProfile } from "@lib/store/ProfileReducer"
import { useAppDispatch } from "@lib/store/store"
import { FaRegTrashAlt } from 'react-icons/fa'

type DeleteProfileButtonProps = {
    name:string
}

export default function DeleteProfileButton({name}:DeleteProfileButtonProps) {
    const dispatch = useAppDispatch()
    const {isOpen, onToggle, onClose} = useDisclosure()
    return <Popover 
        placement="bottom-end"
        isOpen={isOpen}
        onClose={onClose}>
        <PopoverTrigger>
            <IconButton 
                icon={<FaRegTrashAlt />}
                aria-label="Delete Profile"
                backgroundColor="#D35547"
                marginRight={'5px'}
                onClick={onToggle}/>
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader fontWeight='semibold'>
                Delete {name}?
            </PopoverHeader>
            <PopoverBody>
                Are you sure you want to delete this profile? this action cannot be undone.
            </PopoverBody>
            <PopoverFooter display='flex' justifyContent='flex-end'>
                <ButtonGroup size="sm">
                    <Button variant='outline' onClick={onClose}>Cancel</Button>
                    <Button 
                        backgroundColor='#D35547'
                        onClick={() => {
                            try{
                                window.electron.ipcRenderer.deleteProfile(name)
                                dispatch(removeProfile(name))
                                onClose()
                            } catch (err) {
                                console.log(err)
                            }
                        }}>
                            Confirm
                        </Button>
                </ButtonGroup>
            </PopoverFooter>
        </PopoverContent>
    </Popover>
}