import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit"
import Profile, { ExtensionField } from "@data/Profile"
import { type RootState } from "./store"
import { profilesMapping } from "@data/DefaultProfile"
import AshitaSettings from "@data/AshitaSettings"

export const extensionEnabled = (name: string, type: ExtensionField) => (state: RootState) => (
  (state.profiles.list[state.profiles.currentProfile][type] ?? []).includes(name)
)

export const addonEnabled = (name:string) => (state:RootState) => (
  (state.profiles.list[state.profiles.currentProfile].enabledAddons ?? []).includes(name)
)

export const pluginEnabled = (name:string) => (state:RootState) => (
  (state.profiles.list[state.profiles.currentProfile].enabledAddons ?? []).includes(name)
)


const disableExtension = (
    type: ExtensionField
  ) => (
      state:profilesMapping, 
      action: PayloadAction<string>
  ) => {
  return {
    // Don't alter the currentProfile (or any other field I add later)
    ...state,
    list: {
      // Don't alter other members of the list
      ...state.list,
      // Specifically work on the currentProfile
      [state.currentProfile]: {
        // Don't alter other parts of the object
        ...state.list[state.currentProfile],
        // Specifically filter the appropriate field of the profile
        [type]: state.list[state.currentProfile][type].filter(
          (v) => v !== action.payload
        )
      }
    }
  }
}

const enableExtension = (
  type: ExtensionField
) => (
  state: profilesMapping,
  action: PayloadAction<string>
) => ({
  ...state,
  list: {
    ...state.list,
    [state.currentProfile]: {
      ...state.list[state.currentProfile],
      [type]: state.list[state.currentProfile][type].includes(action.payload) ?
        state.list[state.currentProfile][type] :
        [
          ...state.list[state.currentProfile][type],
          action.payload
        ]
    }
  }
})

export const currentProfile = createSelector((state:RootState) => state.profiles,
  profiles => profiles.list[profiles.currentProfile]
)

export const profileSlice = createSlice({
  name: 'profiles',
  initialState: {} as profilesMapping,
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
      delete state.list[action.payload]
    },
    setActiveProfile: (state: profilesMapping, action: PayloadAction<string>) => {
      if (Object.keys(state.list).includes(action.payload)) {
        state.currentProfile = action.payload
      }
    },
    setAddonEnabled:   enableExtension('enabledAddons'),
    enablePolPlugin:   enableExtension('enabledPolPlugins'),
    setPluginEnabled:  enableExtension('enabledPlugins'),
    setAddonDisabled:  disableExtension('enabledAddons'),
    setPluginDisabled: disableExtension('enabledPlugins'),
    disablePolPlugin:  disableExtension('enabledPolPlugins'),
    setSettingsValue: (state:profilesMapping, action:PayloadAction<{field:string, value: unknown}>) => {
      // @ts-expect-error this errors for an unknown reason, but it works.
      state.list[state.currentProfile]
        .settings[action.payload.field as keyof AshitaSettings]
        = action.payload.value
    },
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
  disablePolPlugin,
  removeProfile
} = profileSlice.actions

export default profileSlice.reducer
