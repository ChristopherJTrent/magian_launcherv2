import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type polPluginsMapping = string[]

const initialState:polPluginsMapping = []

export const polPluginsSlice = createSlice({
  name: 'polPlugins',
  initialState,
  reducers: {
    receivePolPlugins: (state:polPluginsMapping, action: PayloadAction<string[]>) => {
      action.payload.forEach((v, i) => {state[i] = v})
    }
  }
})

export const {receivePolPlugins} = polPluginsSlice.actions
export default polPluginsSlice.reducer
