import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { Analytics } from '@vercel/analytics/react';

import { useState } from "react";

import { GeistProvider, CssBaseline } from '@geist-ui/core'
import "~/styles/globals.css";

import GymnThemes from "~/styles/theme";

const MyApp: AppType = ({ Component, pageProps }) => { 
  const {GymnDarkTheme} = GymnThemes;
  const {GymnLightTheme} = GymnThemes;
  
  const [themeType, setThemeType] = useState(GymnDarkTheme)

  const switchThemes = () => {
    setThemeType(lastTheme => (lastTheme === GymnLightTheme ? GymnDarkTheme : GymnLightTheme))
  }

  return (
    <GeistProvider themes={[themeType]} themeType={themeType.type == "Dark" ? "Dark" : "Light"}>     
      <CssBaseline/>
      <Component {...pageProps} switchThemes={switchThemes} themeType={themeType}/>
      <Analytics/>
    </GeistProvider>    
  )
};

export default api.withTRPC(MyApp);
