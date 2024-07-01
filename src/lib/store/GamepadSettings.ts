import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { xinputDefault } from "../util/Config/DefaultConfiguration"
import { GamepadState } from "./GamepadState"

const initialState:GamepadState = xinputDefault

export type overwriteParams<T> = {
  name: string,
  value: T
}


export const gamepadSlice = createSlice({
  name: 'gamepad',
  initialState,
  reducers: {
    setToggle: (state: GamepadState, action: PayloadAction<overwriteParams<boolean>>) => {
      state.toggles[action.payload.name as keyof typeof state.toggles]
        = action.payload.value
    },
    setBinding: (state: GamepadState, action: PayloadAction<overwriteParams<number>>) => {
      state.bindings[action.payload.name as keyof typeof state.bindings]
        = action.payload.value
    },
  }
})

export const {setToggle, setBinding} = gamepadSlice.actions

export default gamepadSlice.reducer
