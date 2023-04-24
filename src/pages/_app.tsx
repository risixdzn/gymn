import { type AppType } from "next/app";

import { GeistProvider, CssBaseline } from '@geist-ui/core'

import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <GeistProvider>
      <CssBaseline/>
      <Component {...pageProps} />
    </GeistProvider>    
  )
};

export default api.withTRPC(MyApp);
