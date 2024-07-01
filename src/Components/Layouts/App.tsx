import { Box, Flex, Text } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

export type AppLayoutProps = {}

export default function AppLayout({children}:PropsWithChildren<AppLayoutProps>) {
  return (
    <Box width='100vw' height='100vh' backgroundColor='#282C37'>
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
