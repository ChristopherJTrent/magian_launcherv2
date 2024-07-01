import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import Addon from "../data/Addon"

export type addonsMapping = Addon[]

// this will change in the future when repos are fully implemented.
const initialState:addonsMapping = []

export const addonsSlice = createSlice({
  name: 'addons',
  initialState,
  reducers: {
    receiveAddons:  (state: addonsMapping, action: PayloadAction<Addon[]>) => {
      action.payload.forEach((v, i) => {state[i] = v})
    },
    receiveAddon: (state: addonsMapping, action:PayloadAction<Addon>) => {
      if(!state.find((value) => value.name === action.payload.name)) {
        state.push(action.payload)
      }
    }
  }
})

export const {receiveAddons, receiveAddon} = addonsSlice.actions

export default addonsSlice.reducer

