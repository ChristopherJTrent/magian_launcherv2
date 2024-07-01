import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type flags = {
  profileChanged: boolean
  loadSucceeded: boolean
  ashitaInstalled: boolean
  remainingHooks: number
}

const initialState:flags = {
  profileChanged: false,
  loadSucceeded: false,
  ashitaInstalled: false,
  remainingHooks: 0
}

export const flagsSettingsSlice = createSlice({
  name: 'flags',
  initialState,
  reducers: {
    changeProfile: (state) => {state.profileChanged = true},
    resetChangeProfile: (state) => {state.profileChanged = false},
    loadSucceed: (state) => {state.loadSucceeded = true},
    resetLoad: (state) => {state.loadSucceeded = false},
    ashitaFound: (state) => {state.ashitaInstalled = true},
    setRemainingHooks: (state, action:PayloadAction<number>) => {state.remainingHooks = action.payload}
  }
})

export const {
  changeProfile,
  resetChangeProfile,
  loadSucceed,
  resetLoad,
  ashitaFound,
  setRemainingHooks} = flagsSettingsSlice.actions

export default flagsSettingsSlice.reducer
