import { AccordionButton, AccordionIcon, Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";


export default function AccordButton({children}:PropsWithChildren) {
  return <AccordionButton backgroundColor='rgba(255,255,255,0.02)'
    borderTopRadius='0px'
    _expanded={{
      borderBottom: '2px solid rgba(255,255,255,0.1)'
    }}>
    <Box 
      as='span' 
      flex='1' 
      textAlign='left' 
      textTransform='capitalize'
      fontSize='larger'
      fontWeight='600'
    >
      {children}
    </Box>
    <AccordionIcon />
  </AccordionButton>
}