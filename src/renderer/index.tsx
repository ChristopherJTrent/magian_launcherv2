import { ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from '../lib/theme'


export default function RootNode() {
  return <>
    <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
    <App />
  </>
}