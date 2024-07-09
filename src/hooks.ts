import { configurationSelector } from "@store/registrySelector"
import { store } from "@store/store"

function saveOnClose() {
}

export default function registerHooks() {
  window.addEventListener('beforeunload', saveOnClose)
}
