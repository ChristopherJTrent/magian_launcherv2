import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import GamepadSettings from "./GamepadSettings"
import flagsReducer from "./flagsReducer"
import addonsReducer from "./addonsReducer"
import ProfileReducer from "./ProfileReducer"
import pluginsReducer from "./pluginsReducer"
import loaderReducer from "./loaderReducer"
import polPluginsReducer from "./polPluginsReducer"

export const store = configureStore({
	reducer: {
    gamepad: GamepadSettings,
    flags: flagsReducer,
    addons: addonsReducer,
    plugins: pluginsReducer,
    profiles: ProfileReducer,
    loader: loaderReducer,
    polPlugins: polPluginsReducer
	},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

