import { configurationSelector } from "./lib/store/registrySelector"
import { store } from "./lib/store/store"

function saveOnClose() {
}

export default function registerHooks() {
  window.addEventListener('beforeunload', saveOnClose)
}
