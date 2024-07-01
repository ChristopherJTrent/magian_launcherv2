import { AccordionItem, AccordionPanel, Divider, Editable, EditableInput, Flex, Select, Switch, Text } from "@chakra-ui/react"
import AccordButton from "../AccordButton"
import { useAppDispatch, useAppSelector } from "../../../lib/store/store"
import { currentProfile, setSettingsValue } from "../../../lib/store/ProfileReducer"
import CustomEditablePreview from "../customEditablePreview"
import EditableControls from "../EditableControls"

export default function AshitaConfig() {
  const profile = useAppSelector(currentProfile)
  const dispatch = useAppDispatch()
  return <AccordionItem>
    <AccordButton>
      Ashita
    </AccordButton>
    <AccordionPanel>
      <Text fontSize='12pt' fontStyle='oblique'>
        Boot Settings
      </Text>
      <Divider marginBottom='5px'/>
      {
        profile.serverType === 'private'
        && <>
          <Flex direction='row' align='center'>
            <Text as='h2' style={{textTransform: 'capitalize'}}>Boot&nbsp;File: </Text>
            <Editable defaultValue={profile.settings.bootFile}
              onSubmit={(next) => dispatch(setSettingsValue({field: 'bootFile', value: next}))}
              width='100%'>
                <Flex direction='row' justifyContent='space-between'>
                  <CustomEditablePreview />
                  <EditableInput wordBreak='break-all' />
                  <EditableControls />
                </Flex>
            </Editable>
          </Flex>
          <Flex direction='row' align='center'>
            <Text as='h2' style={{textTransform: 'capitalize'}}>Boot&nbsp;Command: </Text>
            <Editable defaultValue={profile.settings.bootCommand}
              onSubmit={(next) => dispatch(setSettingsValue({field: 'bootCommand', value: next}))}
              width='100%'>
                <Flex direction='row' justifyContent='space-between'>
                  <CustomEditablePreview />
                  <EditableInput wordBreak='break-all' />
                  <EditableControls />
                </Flex>
            </Editable>
          </Flex>
          <Flex direction='row' align='center'>
            <Text as='h2' style={{textTransform: 'capitalize'}}>Game&nbsp;Module</Text>
            <Editable defaultValue={profile.settings.bootGameModule}
              onSubmit={(next) => dispatch(setSettingsValue({field: 'bootGameModule', value: next}))}
              width='100%'>
                <Flex direction='row' justifyContent='space-between'>
                  <CustomEditablePreview />
                  <EditableInput wordBreak='break-all' />
                  <EditableControls />
                </Flex>
            </Editable>
          </Flex>
        </>
      } {/* End Private server Section */}
      <Flex direction='row' align='center'>
        <Text as='h2' style={{textTransform: 'capitalize'}}>Boot&nbsp;Script: </Text>
        <Editable defaultValue={profile.settings?.bootScript}
          onSubmit={(next) => dispatch(setSettingsValue({field: 'bootScript', value: next}))}
          width='100%'>
            <Flex direction='row' justifyContent='space-between'>
              <CustomEditablePreview />
              <EditableInput wordBreak='break-all' />
              <EditableControls />
            </Flex>
        </Editable>
      </Flex>
      <Flex direction='row' align='center'>
        <Text as='h2' style={{textTransform: 'capitalize'}}>Boot&nbsp;Script&nbsp;Args: </Text>
        <Editable defaultValue={profile.settings?.bootArgs}
          onSubmit={(next) => dispatch(setSettingsValue({field: 'bootArgs', value: next}))}
          width='100%'>
            <Flex direction='row' justifyContent='space-between'>
              <CustomEditablePreview />
              <EditableInput wordBreak='break-all' />
              <EditableControls />
            </Flex>
        </Editable>
      </Flex>
      <Text fontSize='12pt' fontStyle='oblique' marginTop='1em'>Launcher Settings</Text>
      <Divider marginTop='5px' marginBottom='5px'/>
      <Flex direction='row' align='center' justifyContent='space-between'>
        <Text as='h2' style={{textTransform: 'capitalize'}}>Automatically&nbsp;Close&nbsp;Launcher</Text>
        <Switch
          isChecked={profile.settings.autocloseLauncher}
          onChange={() => {dispatch(setSettingsValue({field: 'autocloseLauncher', value: !profile.settings.autocloseLauncher}))}} />
      </Flex>
      <Text fontSize='12pt' fontStyle='oblique' marginTop='1em'>Game Settings</Text>
      <Divider marginTop='5px' marginBottom='5px'/>
      <Flex direction='row' align='center' justifyContent='space-between'>
        <Select
            placeholder="Language"
            onChange={(e) => {dispatch(setSettingsValue({field:'language', value:parseInt(e.target.value, 10)}))}}>
          <option value={1}>Japanese</option>
          <option value={2}>English</option>
        </Select>
      </Flex>
      <Text fontSize='12pt' fontStyle='oblique' marginTop='1em'>Input Settings</Text>
      <Divider marginTop='5px' marginBottom='5px'/>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Allow&nbsp;gamepad&nbsp;input&nbsp;when&nbsp;not&nbsp;focused</Text>
        <Switch
          isChecked={profile.settings.gamepadBackground}
          onChange={() => {dispatch(setSettingsValue({field: 'gamepadBackground', value: !profile.settings.gamepadBackground}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Disable&nbsp;gamepad&nbsp;enumeration</Text>
        <Switch
          isChecked={profile.settings.gamepadDisableEnumeration}
          onChange={() => {dispatch(setSettingsValue({field: 'gamepadDisableEnumeration', value: !profile.settings.gamepadDisableEnumeration}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Block&nbsp;keyboard&nbsp;input</Text>
        <Switch
          isChecked={profile.settings.blockKeyboardInput}
          onChange={() => {dispatch(setSettingsValue({field: 'blockKeyboardInput', value: !profile.settings.blockKeyboardInput}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Block&nbsp;keybinds&nbsp;during&nbsp;input</Text>
        <Switch
          isChecked={profile.settings.gamepadBackground}
          onChange={() => {dispatch(setSettingsValue({field: 'gamepadBackground', value: !profile.settings.gamepadBackground}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Silent&nbsp;keybinds</Text>
        <Switch
          isChecked={profile.settings.silentKeybinds}
          onChange={() => {dispatch(setSettingsValue({field: 'silentKeybinds', value: !profile.settings.silentKeybinds}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Allow&nbsp;Windows&nbsp;key</Text>
        <Switch
          isChecked={profile.settings.windowsKeyEnabled}
          onChange={() => {dispatch(setSettingsValue({field: 'windowsKeyEnabled', value: !profile.settings.windowsKeyEnabled}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Block&nbsp;mouse&nbsp;input</Text>
        <Switch
          isChecked={profile.settings.blockMouseInput}
          onChange={() => {dispatch(setSettingsValue({field: 'blockMouseInput', value: !profile.settings.blockMouseInput}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Unhook&nbsp;mouse</Text>
        <Switch
          isChecked={profile.settings.unhookMouse}
          onChange={() => {dispatch(setSettingsValue({field: 'unhookMouse', value: !profile.settings.unhookMouse}))}}
        />
      </Flex>
      <Text fontSize='12pt' fontStyle='oblique' marginTop='1em'>In-Game settings</Text>
      <Divider marginTop='5px' marginBottom='5px'/>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Silent&nbsp;addons</Text>
        <Switch
          isChecked={profile.settings.silentAddons}
          onChange={() => {dispatch(setSettingsValue({field: 'silentAddons', value: !profile.settings.silentAddons}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Silent&nbsp;aliases</Text>
        <Switch
          isChecked={profile.settings.silentAliases}
          onChange={() => {dispatch(setSettingsValue({field: 'silentAliases', value: !profile.settings.silentAliases}))}}
        />
      </Flex>
      <Flex direction='row' align='center' justify='space-between'>
        <Text>Silent&nbsp;plugins</Text>
        <Switch
          isChecked={profile.settings.silentPlugins}
          onChange={() => {dispatch(setSettingsValue({field: 'silentPlugins', value: !profile.settings.silentPlugins}))}}
        />
      </Flex>
    </AccordionPanel>
  </AccordionItem>
}
