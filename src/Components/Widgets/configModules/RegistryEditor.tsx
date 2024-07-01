import { AccordionItem, AccordionPanel, Divider, Flex, Select, Switch, Text } from "@chakra-ui/react"
import { useState } from "react"
import AccordButton from "../AccordButton"
import RegistryField from "./components/RegistryField"
import { useAppDispatch } from "../../../lib/store/store"
import { setSettingsValue } from "../../../lib/store/ProfileReducer"

export default function RegistryEditor() {
  const [advanced, setAdvanced] = useState(false)
  const dispatch = useAppDispatch()
  return <AccordionItem>
    <AccordButton>
      FFXI Registry
    </AccordButton>
    <AccordionPanel>
      <Flex direction='row' justify='space-between' align='center'>
        <Text >Show advanced options?</Text>
        <Switch
          isChecked={advanced}
          onChange={() => setAdvanced(!advanced)}
        />
      </Flex>
      <Divider marginTop='5px' marginBottom='5px'/>
      <RegistryField
        fieldName="windowResolutionX"
        title="Window Width"
        type="number"
        min={-1} max={7680}
      />
      <RegistryField
        fieldName="windowResolutionY"
        title='Window Height'
        type='number'
        min={-1} max={4320}
      />
      {advanced && <>
      <RegistryField
        fieldName="backgroundResolutionX"
        title='Background Width'
        type='number'
        min={-1} max={4096}
        />
      <RegistryField
        fieldName="backgroundResolutionY"
        title='Background Height'
        type='number'
        min={-1} max={4096}
        />
      </>}
      <RegistryField
        fieldName="gameSoundEnabled"
        title='Game Sound'
        type='boolean'
      />
      <RegistryField
        fieldName='environmentAnimations'
        title="Environment Animation Quality"
        type='number'
        min={-1} max={2}
      />
      <RegistryField
        fieldName="bumpMapping"
        title="Enable Bump Mapping"
        type="boolean"
      />
      <RegistryField
        fieldName="textureCompression"
        title="Texture Compression (Higher = better quality)"
        type="number"
        min={-1} max={2}
      />
      <RegistryField
        fieldName="mapCompression"
        title="Use uncompressed maps"
        type="boolean"
      />
      { advanced && <>
        <RegistryField
          fieldName="hardwareMouse"
          title="Use hardware mouse"
          type="boolean"
        />
        <RegistryField
          fieldName="openingMovie"
          title="Enable Opening Movie"
          type="boolean"
        />
        <RegistryField
          fieldName="simpleCharacterCreation"
          title="Use Simplified Character Creation"
          type="boolean"
        />
      </>}
      <RegistryField
        fieldName="simultaneousSfx"
        title="Max. number of sound effects"
        type="number"
        min={12}
        max={20}
      />
      <Select
          placeholder="Window Type"
          onChange={(e) => {dispatch(setSettingsValue({
            field: 'windowMode',
            value: parseInt(e.target.value, 10)
          }))}}
          marginBottom='5px'>
        <option value={-1}>Use Registry</option>
        <option value={0}>Fullscreen</option>
        <option value={1}>Windowed</option>
        <option value={2}>Windowed (Borderless)</option>
        <option value={3}>Fullscreen (Windowed)</option>
      </Select>
      <RegistryField
        fieldName="backgroundSounds"
        title="Play sound in background"
        type="boolean"
      />
      <RegistryField
        fieldName="fontCompression"
        title="Font Quality"
        type="number"
        min={-1} max={2}
      />
      {advanced && <>
        <RegistryField
          fieldName="menuResolutionX"
          title="Menu Resolution (X)"
          type="number"
          min={-1} max={7680}
        />
        <RegistryField
          fieldName="menuResolutionY"
          title="Menu Resolution (Y)"
          type="number"
          min={-1} max={4320}
        />
      </>}
    </AccordionPanel>
  </AccordionItem>
}
