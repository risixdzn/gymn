import { Themes } from "@geist-ui/core";

const GymnDarkTheme = Themes.createFromDark({
    type: 'Dark',
    palette: {
      background: '#0d0d0d',
      success: '#0dd661',
      successLight: '#5df095',
      successDark: '#20c960',
      purple: '#0dd661',
      alert: '#0dd661',      
    },
})

const GymnLightTheme = Themes.createFromLight({
  type: 'Light',
  palette: {
    background: '#ededed',
    success: '#0dd661',
    successLight: '#5df095',
    successDark: '#20c960',
    purple: '#0dd661',
    alert: '#0dd661',      
  },
})

const GymnThemes ={
  GymnDarkTheme,
  GymnLightTheme
}

export default GymnThemes