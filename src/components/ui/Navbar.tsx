import React from 'react'

import { Image, Button, Tooltip,  Spacer, Collapse, Select, } from '@geist-ui/core'
import { Github, Menu } from '@geist-ui/icons'
import { type ThemeChangerTypes } from './ThemeChanger'
import ThemeChanger from './ThemeChanger'
import { useState } from 'react'
import { motion } from 'framer-motion';

function Navbar({switchThemes, themeType}:ThemeChangerTypes) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false) 

  const opacityAnimation = {
    opacity: mobileNavOpen ? 1 : 0,    
    transition: { duration: 0.15 }
  };

  return (
    <>       
      <nav className="fixed bottom top-0 z-50 w-full py-6 bg-neutral-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border-b-2 border-neutral-400 border-opacity-20 
      dark:bg-neutral-950 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-70 dark:border-b-2 dark:border-neutral-700 dark:border-opacity-20">        
        <motion.div initial={{opacity:0}} animate={opacityAnimation} className={mobileNavOpen ? 'absolute px-4 flex flex-col mx-auto left-0 right-0 top-2 bg-neutral-100 dark:bg-neutral-950 w-[87%] h-auto md:hidden rounded-md py-5 border border-neutral-400 dark:border-neutral-700 border-opacity-40 shadow-xl transition-all' : 'hidden'}>          
          <Spacer h={2.5} w={100}></Spacer>
          <hr className='w-full'></hr>
          <div className='flex mt-4'>
            <Collapse.Group>
              <Collapse title='Collapse 1'>
                <p>This is a placeholder nav item. Some sections will be added here in the future.</p>
              </Collapse>
              <Collapse title='Collapse 2'>
                <p>This is a placeholder nav item. Some sections will be added here in the future.</p>
              </Collapse>
            </Collapse.Group>
          </div>
        </motion.div>        
        <div className="flex items-center justify-between mx-auto max-w-5xl w-[85%]">
          <div className='z-30'>
            <Image w={5} src={
              themeType.type == "Dark"
              ? "/gymn_WhiteTextLogo.svg"
              : "/gymn_BlackTextLogo.svg"                
            }  alt=''/>
          </div>
          <div className='hidden md:flex md:gap-2'>
            <Tooltip text={"Github repo."} placement='bottom' type="lite" scale={2/5}>
              <a href='https://github.com/risixdzn/gymn' target='_blank'>                
                <Button iconRight={<Github/>} auto px={0.6} scale={3/5}/>
              </a>
            </Tooltip>  
            <ThemeChanger switchThemes={switchThemes} themeType={themeType} scale={3/5}/>
            <Select initialValue="English" scale={2/3} width="100px; min-width: 100px !important">
              <Select.Option value="English">
                English
              </Select.Option>
              <Select.Option value="Portugues">
                Português
              </Select.Option>
            </Select>
          </div>   
          <div className='flex md:hidden'>            
              <Button iconRight={<Menu/>} auto px={0.6} scale={3/5} onClick={() => setMobileNavOpen(!mobileNavOpen)}/>                     
          </div>
        </div>
                  
      </nav> 
      
      {/* <Drawer visible={mobileNavOpen} onClose={() => setMobileNavOpen(false)} placement="right">
        <Drawer.Title>
          <Image w={5} src={themeType.type == "Dark" ? "/gymn_WhiteTextLogo.svg" : "/gymn_BlackTextLogo.svg"}  alt=''/>
        </Drawer.Title>
        <Drawer.Content>
          <Grid.Container direction='column'>
            <Button width="275px">Test1</Button>
            <Button width="275px">Test2</Button>
            <Button width="275px">Test3</Button>
          </Grid.Container>          
        </Drawer.Content>
      </Drawer> */}
    </>
    
  )
}

export default Navbar