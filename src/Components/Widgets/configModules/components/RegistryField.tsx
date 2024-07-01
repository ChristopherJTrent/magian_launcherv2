import { EditableInput, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Switch, Text } from "@chakra-ui/react"
import { currentProfile, setSettingsValue } from "../../../../lib/store/ProfileReducer"
import { useAppDispatch, useAppSelector } from "../../../../lib/store/store"
import CustomEditablePreview from "../../customEditablePreview"
import EditableControls from "../../EditableControls"
import { changeProfile } from "../../../../lib/store/flagsReducer"

type RegistryFieldProps = {
  fieldName: string
  title:string
  type: ('boolean' | 'number' | 'string')
  min?: number
  max?: number
  step?: number
}

export default function RegistryField({
    fieldName,
    title,
    type = 'boolean',
    min=-1,
    max=1,
    step=1
  }:RegistryFieldProps) {
  const profile = useAppSelector(currentProfile)
  const dispatch = useAppDispatch()
  // @ts-ignore
  return <Flex
      direction='row'
      align='center'
      justify='space-between'
      marginBottom='5px'>
    <Text>{title}</Text>
    {type === 'boolean' && (
    <Switch
      isChecked={profile.settings[fieldName as keyof typeof profile.settings] as boolean}
      onChange={() => {dispatch(setSettingsValue({
          field: fieldName,
          value: !(profile.settings[fieldName as keyof typeof profile.settings] as boolean)
        }))
        dispatch(changeProfile())
      }}
      />
  ) || ( type === 'number' &&
    <NumberInput
        step={step}
        defaultValue={profile.settings[fieldName as keyof typeof profile.settings] as number}
        min={min}
        max={max}
        onChange={(_, v) => {dispatch(setSettingsValue({
            field: fieldName,
            value: v
          }))
          dispatch(changeProfile())
        }}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  ) || (
    <Flex direction='row' justifyContent='space-between'>
    <CustomEditablePreview />
    <EditableInput wordBreak='break-all' />
    <EditableControls />
  </Flex>
  )}
  </Flex>
}
