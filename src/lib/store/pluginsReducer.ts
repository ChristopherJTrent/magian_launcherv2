import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type pluginsMapping = string[]

// this will change in the future when repos are fully implemented.
const initialState:pluginsMapping = []

export const pluginsSlice = createSlice({
  name: 'plugins',
  initialState,
  reducers: {
    receiveplugins:  (state: pluginsMapping, action: PayloadAction<string[]>) => {
      action.payload.forEach((v, i) => {state[i] = v})
    }
  }
})

export const {receiveplugins} = pluginsSlice.actions

export default pluginsSlice.reducer

