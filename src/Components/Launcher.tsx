import { Flex, Spacer, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react"
import { RiProfileLine } from 'react-icons/ri'
import { SiCplusplus, SiLua } from 'react-icons/si'
import { FaGear } from 'react-icons/fa6'
import { BsCloudDownload } from 'react-icons/bs'
import { useEffect, useState } from "react"
import AddonListing from "@widgets/Tabs/Addons/AddonListing"
import AppLayout from "./Layouts/App"
import SettingsEditor from "@widgets/SettingsEditor"
import ProfileListing from "@widgets/Tabs/Profiles/ProfileListing"
import PluginListing from "@widgets/Tabs/Plugins/PluginListing"
import { useAppDispatch } from "@store/store"
import handleApplicationLoad from "lib/util/Installation/Loader"
import PolPluginListing from "@widgets/Tabs/PolPlugins/PolPluginListing"
import RepositoryListing from "./Widgets/Tabs/Repositories/RepositoryListing"

export default function Launcher() {
  const dispatch = useAppDispatch()
  const [currentHook, setCurrentHook] = useState('Updating or Installing Ashita (This may take a while...)')
  useEffect(() => {
    try{
      window.electron.ipcRenderer.newUpdateAshita()

      window.electron.ipcRenderer.onUpdateAshita(() => {
        setCurrentHook('updating repositories')
        window.electron.ipcRenderer.updateRepositories()
      })

      window.electron.ipcRenderer.onUpdateRepositories(() => {
        setCurrentHook('ensuring profiles')
        window.electron.ipcRenderer.ensureProfiles()
      })
      window.electron.ipcRenderer.onEnsureProfiles(() => {
        handleApplicationLoad(dispatch).then(v => {
          v.forEach((v2) => {
            setCurrentHook(v2.name)
            v2.func().then(() => {
              if (v2.name === "Load Playonline Plugins") {
                setCurrentHook('')
              }
            })
          })
        })
      })
    } catch (_e) {
      // console.error(e)
    }
    
  }, [])

  return (
  <AppLayout>
    {currentHook.length === 0 &&
    <Tabs width='100%' height='calc(100vh - 30px)' orientation="vertical"
    sx={{
      '.chakra-tabs__tablist': {
        borderLeft: 'none',
      },
      '.chakra-tabs__tab[aria-selected=true]': {
        backgroundColor: '#D35547',
        color: 'white'
      },
      'chakra-tabs__tab[aria-selected=false]': {
        backgroundColor: '#313541'
      },
      '.chakra-tabs__tab:hover': {
        backgroundColor: '#D35547',
        color: 'white'
      }
    }}>
      <TabList>
        <Tab width='60px'>
          <Flex direction='column' color='inherit'>
              <RiProfileLine size='32px' color='inherit'/>
              <p style={{
                fontSize: '6pt',
                fontWeight: '600'
              }}>Profiles</p>
          </Flex>
        </Tab>
        <Tab width='60px'>
        <Flex direction='column'>
              <SiCplusplus size='32px'/>
              <p style={{
                fontSize: '6pt',
                fontWeight: '600'
              }}>Plugins</p>
          </Flex>
        </Tab>
        <Tab width='60px'>
        <Flex direction='column'>
              <SiLua size='32px'/>
              <p style={{
                fontSize: '6pt',
                fontWeight: '600'
              }}>Addons</p>
          </Flex>
        </Tab>
        <Tab width='60px'>
          <Flex direction='column' justify='center' align='center'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 32 32"
              fill="currentColor"
              >
              <circle cx={16} cy={16} r={14} strokeWidth='3px' stroke="currentColor" fill="transparent"/>
              <path d="M9 5 Q15 16 9 29 M23 5 Q17 16 23 29 M5 9 Q16 15 27 9 M5 23 Q16 17 29 23" stroke='currentColor' strokeWidth='1px' fill='none'/>
            </svg>
            <p style={{
              fontSize: '6pt',
              fontWeight: '600'
            }}>
              POLplugins
            </p>
          </Flex>
        </Tab>
        <Tab width='60px'>
          <Flex direction='column' justify='center' align='center'>
              <FaGear size='32px'/>
              <p style={{
                fontSize: '6pt',
                fontWeight: '600'
              }}>Settings</p>
          </Flex>
        </Tab>
        <Spacer />
        <Tab width='60px'>
          <Flex direction='column' justify='center' align='center'>
            <BsCloudDownload size='32px' />
            <p style={{
              fontSize: '6pt',
              fontWeight: '600'
            }}>Repositories</p>
          </Flex>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex overflowY='auto' flexDirection='column' height='calc(100vh - 62px)'>
            <ProfileListing />
          </Flex>
        </TabPanel>
        <TabPanel>
          <PluginListing />
        </TabPanel>
        <TabPanel>
          <AddonListing/>
        </TabPanel>
        <TabPanel>
          <PolPluginListing />
        </TabPanel>
        <TabPanel>
          <SettingsEditor />
        </TabPanel>
        {/* <TabPanel>
          <GamepadEditor />
        </TabPanel> */}
        <TabPanel>
          <RepositoryListing />
        </TabPanel>
      </TabPanels>
    </Tabs> || <Flex justify='center' align='center' width='100%' height='calc(100vh - 30px)' direction='column'>
      <Text fontWeight={700} marginBottom={"1em"}>Running Hook: {currentHook}</Text>
      <Spinner 
        size='xl'
        emptyColor="gray.600"
        color="#D35547"
        speed=".8s"
        thickness="6px"/>
    </Flex>
    }
  </AppLayout>
  )
}
