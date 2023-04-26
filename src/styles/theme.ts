import { Themes } from "@geist-ui/core";

const GymnDarkTheme = Themes.createFromDark({
    type: 'Dark',
    palette: {
      background: '#0d0d0d',
      success: '#8a2be2',
      successLight: '#8f3ddb',
      purple: '#8a2be1',
      alert: '#8a2be3',      
    },
})

const GymnLightTheme = Themes.createFromLight({
  type: 'Light',
  palette: {
    background: '#ededed',
    success: '#8a2be2',
    successLight: '#8f3ddb',
    purple: '#8a2be1',
    alert: '#8a2be3',      
  },
})

const GymnThemes ={
  GymnDarkTheme,
  GymnLightTheme
}

export default GymnThemes