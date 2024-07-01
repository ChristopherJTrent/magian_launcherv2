import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { RiProfileLine } from 'react-icons/ri'
import { SiCplusplus, SiLua } from 'react-icons/si'
import { FaGear } from 'react-icons/fa6'
import { useEffect, useRef } from "react"
import { Mutex } from "async-mutex"
import AddonListing from "./Widgets/Tabs/Addons/AddonListing"
import AppLayout from "./Layouts/App"
import SettingsEditor from "./Widgets/SettingsEditor"
import GamepadEditor from "./Widgets/GamepadEditor"
import ProfileListing from "./Widgets/Tabs/Profiles/ProfileListing"
import PluginListing from "./Widgets/Tabs/Plugins/PluginListing"
import { useAppDispatch, useAppSelector } from "../lib/store/store"
import handleApplicationLoad from "../lib/util/Installation/Loader"
import PolPluginListing from "./Widgets/PolPluginListing"

export default function Launcher() {
  // const remainingHooks = useAppSelector(state => state.flags.remainingHooks)
  const mutex = useRef(new Mutex())
  const loader = useAppSelector(state => state.loader)
  const dispatch = useAppDispatch()

  useEffect(() => {
    try{
      handleApplicationLoad(dispatch).then((v) => {
        return v.forEach(v1 => mutex.current.runExclusive(v1.func))
      }).catch(() => {})
    } catch (e) {
      console.log(`fuck you: ${e}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (loader.hooks.length > 0 && remainingHooks === 0) {
  //     const current = loader.hooks[0]
  //     dispatch(shiftHook())
  //     dispatch(setRemainingHooks(1))
  //     current.func().then(
  //       () => dispatch(setRemainingHooks(0))
  //     ).catch((_) => {})
  //   }
  // }, [loader, remainingHooks, dispatch])
  return (
  <AppLayout>
    {loader.hooks.length === 0 &&
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
        <Flex direction='column'>
              <FaGear size='32px'/>
              <p style={{
                fontSize: '6pt',
                fontWeight: '600'
              }}>Settings</p>
          </Flex>
        </Tab>
		    {/* <Tab width='60px'>
        <Flex direction='column'>
              <PiGameController size='large'/>
              <p style={{
                fontSize: '6pt',
                fontWeight: '600'
              }}>Gamepad</p>
          </Flex>
        </Tab> */}
      </TabList>
      <TabPanels>
        <TabPanel>
          <Flex overflowY='auto' flexDirection='column' height='80vh'>
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
        <TabPanel>
          <GamepadEditor />
        </TabPanel>
      </TabPanels>
    </Tabs> || <Flex justify='center' align='center' width='100%' height='calc(100vh - 30px)'>
      <h1>Running Hook: {loader.currentHook}</h1>
    </Flex>
    }
  </AppLayout>
  )
}
