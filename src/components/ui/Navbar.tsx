import React from 'react'

import { Image, Button, Drawer, Tooltip, Grid } from '@geist-ui/core'
import { Github, Menu } from '@geist-ui/icons'
import { type ThemeChangerTypes } from './ThemeChanger'
import ThemeChanger from './ThemeChanger'
import { useState } from 'react'

function Navbar({switchThemes, themeType}:ThemeChangerTypes) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false) 

  return (
    <>
      <nav className="fixed bottom top-0 z-50 w-full py-4 bg-neutral-50 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70 border-b-2 border-neutral-400 border-opacity-20 
      dark:bg-neutral-950 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-sm dark:bg-opacity-70 dark:border-b-2 dark:border-neutral-700 dark:border-opacity-20">
        <div className="flex items-center justify-between mx-auto max-w-5xl w-[88%]">
          <div>
            <Image w={5} src={themeType.type == "Dark" ? "/gymn_WhiteTextLogo.svg" : "/gymn_BlackTextLogo.svg"}  alt=''/>
          </div>
          <div className='hidden md:flex md:gap-2'>
            <Tooltip text={"Github repo."} placement='bottom' type="lite" scale={2/5}>
              <a href='https://github.com/risixdzn/gymn' target='_blank'>                
                <Button iconRight={<Github/>} auto px={0.6} scale={3/5}/>
              </a>
            </Tooltip>  
            <ThemeChanger switchThemes={switchThemes} themeType={themeType} scale={3/5}/>
          </div>   
          <div className='flex md:hidden'>
            
              <Button iconRight={<Menu/>} auto px={0.6} scale={3/5} onClick={() => setMobileNavOpen(true)}/>
                     
          </div>
        </div>        
      </nav>   
      <Drawer visible={mobileNavOpen} onClose={() => setMobileNavOpen(false)} placement="right">
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
      </Drawer>
    </>
    
  )
}

export default Navbar