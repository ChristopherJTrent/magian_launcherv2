import { configurationSelector } from "./lib/store/registrySelector"
import { store } from "./lib/store/store"

function saveOnClose() {
  const state = store.getState()
  if (state.flags.settingsChanged) {
    const ini = configurationSelector(state.ashitaSettings)(state)

  }
}

export default function registerHooks() {
  window.addEventListener('beforeunload', saveOnClose)
}
