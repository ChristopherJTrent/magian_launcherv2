import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type LoaderHook = {
  name: string
  func: ()=>Promise<any>
}
export type LoaderState = {
  currentHook: string
  hooks: LoaderHook[]
}

const initialState:LoaderState = {
  currentHook: '',
  hooks: []
}

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    receiveHooks: (state, action:PayloadAction<LoaderHook[]>) => {
      state.hooks = action.payload
      state.currentHook = state.hooks[0]?.name ?? ''
    },
    receiveHook: (state, action:PayloadAction<LoaderHook>) => {
      if (! state.currentHook) {
        state.currentHook = action.payload?.name ?? ''
      }
      state.hooks.push(action.payload)
    },
    shiftHook: (state) => {
      state.hooks = state.hooks.slice(1)
      state.currentHook = state.hooks[0]?.name ?? ''
    }
  }
})

export const {receiveHooks, receiveHook, shiftHook} = loaderSlice.actions

export default loaderSlice.reducer