/* eslint-disable react/jsx-props-no-spreading */
import { AccordionPanel, Editable, EditableInput, EditablePreview, Flex, useColorModeValue } from "@chakra-ui/react"
import { useAppDispatch } from "../../lib/store/store"
import { setValue } from "../../lib/store/AshitaSettingsReducer"
import EditableControls from "./EditableControls"

export type SettingsRowProps = {
  k0: string
  k1: string
  k2: string
  value: any
}

export default function SettingsRow({k0, k1, k2, value}:SettingsRowProps) {
  const dispatch = useAppDispatch()
  // eslint-disable-next-line react/no-unstable-nested-components
  return <AccordionPanel>
  <Flex direction='row' align='center'>
    <h2 style={{textTransform: 'capitalize'}}>{k2}:</h2>
    <Editable defaultValue={value as string}
      onSubmit={(nextvalue: string):void => {
        dispatch(setValue({
          k0,
          k1,
          k2,
          value: nextvalue
        }))
      }}
      width='100%'>
      <Flex direction='row' justifyContent='space-between'>
        <EditablePreview background={useColorModeValue('gray.100', 'gray.700')} paddingLeft='8px' paddingRight='8px' marginLeft='0.5em' overflowWrap='anywhere'/>
        <EditableInput wordBreak='break-all'/>
        <EditableControls />
      </Flex>
    </Editable>
  </Flex>
</AccordionPanel>
}
