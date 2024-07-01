/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Flex, Select, Switch } from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../lib/store/store"
import { setBinding, setToggle } from "../../lib/store/GamepadSettings"
import { DInputBindings, DInputButtons, XInputBindings, XInputButtons } from "../../lib/util/Config/RegistryDefinition"

type UIDef = {
  key: string
  label: string

}

const toggleUIDefs:UIDef[] = [
  {
    key: 'enabled',
    label:'Enable Gamepad'
  },
  {
    key: 'rumble',
    label: 'Enable Rumble'
  },
  {
    key:'sliders',
    label:'Enable Sliders'
  },
  {
    key: 'hats',
    label: 'Enable Hat Switches'
  },
  {
    key: 'inactive',
    label:'Enable Input when Inactive'
  },
  {
    key: 'xinput',
    label: 'XInput (Xbox)'
  }
]

const bindingUIDefs:UIDef[] = [
  {
    key: 'autorun',
    label: 'Autorun'
  },
  {
    key: 'macroCtrl',
    label: 'Macro Palette (CTRL)'
  },
  {
    key: 'changeView',
    label: 'Toggle First/Third person view'
  },
  {
    key: 'macroAlt',
    label: 'Macro Palette (Alt)'
  },
  {
    key: 'lockOn',
    label: 'Lock Target / heal'
  },
  {
    key: 'cancel',
    label: 'Cancel'
  },
  {
    key: 'mainMenu',
    label: 'Main Menu'
  },
  {
    key: 'confirm',
    label: 'Confirm'
  },
  {
    key: 'activeWindow',
    label: 'Active Window (Chat/Buffs)'
  },
  {
    key: 'toggleUi',
    label: 'Toggle UI'
  },
  {
    key: 'moveToMenu',
    label: 'Hold to use Move for Menu'
  },
  {
    key: 'moveToCamera',
    label: 'Hold to use Move for Camera'
  },
  {
    key: 'logout',
    label: 'Log Out'
  },
  {
    key: 'moveFoward',
    label: 'Move Forward'
  },
  {
    key: 'moveBackward',
    label: 'Move Backward'
  },
  {
    key: 'moveLeft',
    label: 'Move Left'
  },
  {
    key: 'moveRight',
    label: 'Move Right'
  },
  {
    key: 'cameraUp',
    label: 'Camera Up'
  },
  {
    key: 'cameraDown',
    label: 'Camera Down'
  },
  {
    key: 'cameraLeft',
    label: 'Camera Left'
  },
  {
    key: 'cameraRight',
    label: 'Camera Right'
  },
  {
    key: 'menuUp',
    label: 'Menu Up'
  },
  {
    key: 'menuDown',
    label: 'Menu Down'
  },
  {
    key: 'menuLeft',
    label: 'Menu Left'
  },
  {
    key: 'menuRight',
    label: 'Menu Right'
  },
  {
    key: 'screenshot',
    label: 'Take a Screenshot'
  },
  {
    key: 'toggleMove',
    label: 'Toggle Movement'
  }
]
export default function GamepadEditor() {



  const flags = useAppSelector((state) => state.gamepad.toggles)
  const bindings = useAppSelector((state) => state.gamepad.bindings)
  const dispatch = useAppDispatch()
  return <>
    <Flex direction='row' flexWrap='wrap' justifyContent='space-around' height='18vh'>
      <h2 style={{fontSize:'1.4em'}}>Controller Settings</h2>
      <div style={{width: '100%'}} />
      {
        toggleUIDefs.map((v) => (
          <label style={{width: '45%'}} key={v.key}>
            <Switch
              isChecked={flags[v.key as keyof typeof flags]}
              onChange={() => dispatch(setToggle({
                name: v.key,
                value: !(flags[v.key as keyof typeof flags])
              }))} marginRight='8px'
              sx={{
                '.chakra-switch__track[data-checked]': {
                  backgroundColor: '#D35547'
                }
              }}/>
              {v.label}
          </label>
        ))
      }
    </Flex>
    <Flex direction='column' alignContent='center' overflowY='scroll' height='67vh' paddingRight='5px'>
      <h1 style={{fontSize: '1.4em'}}>Controller Bindings</h1>
      <hr/>
      {
        bindingUIDefs.map((v) => (
          <div key={v.key}>
            <h2>{v.label}:</h2>
            <Select variant='outline'
              value={bindings[v.key as keyof typeof bindings]}
              onChange={(e) => {
                dispatch(setBinding({
                  name:v.key,
                  value: Number(e.target.value) // this will always be a number.
              }))
            }}>
              {
                Object.entries(flags.xinput ? XInputButtons : DInputButtons).map(([k1, v1]) => (
                  <option value={v1} key={k1}>{
                    flags.xinput
                      ? XInputBindings[v1 as keyof typeof XInputBindings]
                      : DInputBindings[v1 as keyof typeof DInputBindings]
                    }</option>
                ))
              }
            </Select>
          </div>
        ))
      }
    </Flex>
  </>
}
