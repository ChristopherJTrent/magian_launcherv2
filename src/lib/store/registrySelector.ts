import { GamepadState } from "./GamepadState"
import { RootState} from "./store"


function getPadmode000(gpState:GamepadState) {
  function boolToToggle(b?:boolean) {
    if (b == null) return -1
    return b ? 1 : 0
  }
  const {toggles} = gpState
  return [
    boolToToggle(toggles.enabled),
    boolToToggle(toggles.rumble),
    boolToToggle(toggles.sliders),
    boolToToggle(toggles.hats),
    boolToToggle(toggles.inactive),
    boolToToggle(toggles.xinput)
  ].join(',')
}
export default function getGamepadRegistrySegment(state: GamepadState) {
  return {
    padmode000: getPadmode000(state),
    padsin000: Object.values(state.bindings).join(',')
  }
}

export const configurationSelector = (retailObj:any) => (state:RootState) => ({
  ...retailObj,
    ffxi:{
      ...retailObj.ffxi,
      registry: {
        ...retailObj.ffxi.registry,
        ...getGamepadRegistrySegment(state.gamepad)
      }
    }
})

