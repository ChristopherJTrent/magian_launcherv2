import './App.css'
import { ChakraProvider} from '@chakra-ui/react'
import { Provider } from 'react-redux'
import theme from '../lib/theme'
import Launcher from '@components/Launcher'
import { store } from '@store/store'
import registerHooks from '../hooks'

export default function App() {
  registerHooks()
  return (
	<Provider store={store}>
		<ChakraProvider theme={theme}>
			<Launcher />
	    </ChakraProvider>
	</Provider>
  )
}
