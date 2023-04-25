import { type AppType } from "next/app";
import { api } from "~/utils/api";

import { GeistProvider, CssBaseline } from '@geist-ui/core'
import "~/styles/globals.css";
import GymnDarkTheme from "~/styles/theme";

const MyApp: AppType = ({ Component, pageProps }) => { 

  return (
    <GeistProvider themes={[GymnDarkTheme]} themeType={"gymnTheme"}>     
      <CssBaseline/>
      <Component {...pageProps}/>
    </GeistProvider>    
  )
};

export default api.withTRPC(MyApp);
