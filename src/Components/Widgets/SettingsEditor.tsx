import { Accordion, Box } from "@chakra-ui/react"
import AshitaConfig from "./configModules/AshitaConfig"
import RegistryEditor from "./configModules/RegistryEditor"

// TODO: Refactor this module to use the profile settings\

export default function SettingsEditor() {
  return (
      <Box scrollBehavior='smooth' overflowY='scroll' height='80vh'>
        <Accordion allowMultiple marginRight='5px'>
          <AshitaConfig />
          <RegistryEditor />
        </Accordion>
          {/* Enable Advanced Settings:&nbsp;
          <Switch
            isChecked={advanced}
            onChange={() => setAdvanced(! advanced)}
            sx={{
              '.chakra-switch__track[data-checked]': {
                backgroundColor: '#D35547'
              }
            }}/>
          {
            Object.entries(settings).map(([k, v]) => (
              <div key={k}>
                {(advanced || k === 'ashita') && <h2 style={{textTransform: 'capitalize'}}>{k}</h2>}
                <Accordion allowMultiple>
                  {Object.entries(v).map(([k1,v1]) =>
                    { if (advanced || !advancedRows.includes(k1)) {
                      return <AccordionItem key={k1}>
                      <h2>
                        <AccordionButton>
                          <Box as='span' flex='1' textAlign='left' textTransform="capitalize" fontSize='larger' fontWeight='600'>
                            {k1}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                    {Object.entries(v1).map(([k2, v2]) => (
                      <SettingsRow
                      k0={k}
                      k1={k1}
                      k2={k2}
                      value={v2} key={k2}/>
                    ))}
                  </AccordionItem>}
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    return undefined
                  }
                )}
                </Accordion>
              </div>
            ))
          } */}
      </Box>
  )
}
