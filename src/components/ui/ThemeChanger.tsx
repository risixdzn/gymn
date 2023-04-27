import React from 'react'
import { Button } from '@geist-ui/core'
import { Moon, Sun } from '@geist-ui/icons'
import { type MouseEventHandler } from 'react'

interface ThemeChangerTypes {
    switchThemes: MouseEventHandler<HTMLButtonElement>;
    themeType: {
      type: string
    };
    scale: number;
}

function ThemeChanger({switchThemes, themeType, scale}:ThemeChangerTypes) {
  return (
    <Button onClick={switchThemes} iconRight={themeType.type == "Dark" ? <Sun/> : <Moon/>} auto scale={scale} px={0.6} />
  )
}

export default ThemeChanger