import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import Profile from "../data/Profile"
import { type RootState } from "./store"
import { initialProfiles, profilesMapping } from "../data/DefaultProfile"
import AshitaSettings from "../data/AshitaSettings"

export const addonEnabled = (name:string) =>
  createSelector((state:RootState) => state.profiles,
    profiles => {
      return profiles.list[profiles.currentProfile].enabledAddons?.includes(name) ?? false
    }
)

export const pluginEnabled = (name:string) =>
  createSelector((state:RootState) => state.profiles,
    profiles =>
      profiles.list[profiles.currentProfile].enabledPlugins?.includes(name) ?? true
)

export const currentProfile = createSelector((state:RootState) => state.profiles,
  profiles => profiles.list[profiles.currentProfile]
)

export const profileSlice = createSlice({
  name: 'profiles',
  initialState:initialProfiles,
  reducers: {
    receiveProfiles: (state: profilesMapping, action: PayloadAction<Profile[]>) => {
      state.list = {}
      action.payload.forEach((v) => {
        state.list[v.name] = v
      })
      state.currentProfile = action.payload[0].name
    },
    receiveProfile: (state:profilesMapping, action: PayloadAction<Profile>) => {
      state.list[action.payload.name] = action.payload
    },
    removeProfile: (state:profilesMapping, action: PayloadAction<string>) => {
      const newState = {...state.list}
      delete newState[action.payload]
      state.list = newState
    },
    setActiveProfile: (state: profilesMapping, action: PayloadAction<string>) => {
      if (Object.keys(state.list).includes(action.payload)) {
        state.currentProfile = action.payload
      }
    },
    setAddonEnabled: (state:profilesMapping, action:PayloadAction<string>) => {
      if(!state.list[state.currentProfile].enabledAddons.includes(action.payload)) {
        state.list[state.currentProfile].enabledAddons = [
          ...state.list[state.currentProfile].enabledAddons,
          action.payload
        ]
      }
    },
    setAddonDisabled: (state:profilesMapping, action:PayloadAction<string>) => {
      state.list[state.currentProfile].enabledAddons =
        state.list[state.currentProfile].enabledAddons.filter(addon => addon !== action.payload)
    },
    setPluginEnabled: (state:profilesMapping, action:PayloadAction<string>) => {
      if(!state.list[state.currentProfile].enabledPlugins?.includes(action.payload)) {
        state.list[state.currentProfile].enabledPlugins = [
          ...state.list[state.currentProfile].enabledPlugins,
          action.payload
        ]
      }
    },
    setPluginDisabled: (state:profilesMapping, action:PayloadAction<string>) => {
      state.list[state.currentProfile].enabledPlugins =
        state.list[state.currentProfile].enabledPlugins.filter(plugin => plugin !== action.payload)
    },
    setSettingsValue: (state:profilesMapping, action:PayloadAction<{field:string, value: any}>) => {
      // @ts-ignore
      state.list[state.currentProfile]
        .settings[action.payload.field as keyof AshitaSettings]
        = action.payload.value
    },
    enablePolPlugin: (state: profilesMapping, action: PayloadAction<string>) => {
      state.list[state.currentProfile].enabledPolPlugins ??= []
      if (!state.list[state.currentProfile].enabledPolPlugins?.includes(action.payload)) {
        state.list[state.currentProfile].enabledPolPlugins = [
          ...state.list[state.currentProfile].enabledPolPlugins,
          action.payload
        ]
      }
    },
    disablePolPlugin: (state:profilesMapping, action: PayloadAction<string>) => {
      if (state.list[state.currentProfile].enabledPolPlugins?.includes(action.payload)) {
        state.list[state.currentProfile].enabledPolPlugins =
          state.list[state.currentProfile].enabledPolPlugins?.filter(plugin => plugin !== action.payload)
      }
    }
  }
})

export const {
  receiveProfiles,
  receiveProfile,
  setAddonEnabled,
  setAddonDisabled,
  setPluginEnabled,
  setPluginDisabled,
  setSettingsValue,
  setActiveProfile,
  enablePolPlugin,
  disablePolPlugin
} = profileSlice.actions

export default profileSlice.reducer
