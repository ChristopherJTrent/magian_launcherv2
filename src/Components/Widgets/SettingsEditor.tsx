import { Accordion, Box } from "@chakra-ui/react"
import AshitaConfig from "./configModules/AshitaConfig"
import RegistryEditor from "./configModules/RegistryEditor"

export default function SettingsEditor() {
  return (
      <Box scrollBehavior='smooth' overflowY='scroll' height='calc(100vh - 62px)'>
        <Accordion allowMultiple marginRight='5px' defaultIndex={[0]}>
          <AshitaConfig />
          <RegistryEditor />
        </Accordion>
      </Box>
  )
}
