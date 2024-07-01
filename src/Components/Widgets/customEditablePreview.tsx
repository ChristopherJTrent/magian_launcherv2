import { EditablePreview, useColorModeValue } from "@chakra-ui/react"

export default function CustomEditablePreview() {
  return <EditablePreview
    background={useColorModeValue('gray.100', 'gray.700')}
    paddingLeft='8px'
    paddingRight='8px'
    marginLeft='0.5em'
    overflowWrap='anywhere'/>
}
