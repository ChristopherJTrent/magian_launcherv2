import { Box, Flex, Text } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function AppLayout({children}:PropsWithChildren<object>) {
  return (
    <Box width='100vw' height='100vh' backgroundColor='#282C37FF' position='fixed' top='0px' left='0px'>
      <Box width='100vw' height='30px' className='titlebar' margin='0px'>
        <Flex align='center'>
          <Text marginLeft='1em' paddingTop='2px'>Magian Launcher</Text>
        </Flex>
      </Box>
      <Flex align='center' justify='left'>
        {children}
      </Flex>
    </Box>
  )
}
