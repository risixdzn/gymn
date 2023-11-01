import "../globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import PagesContainer from "@/components/Dashboard/PagesContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import DashUi from "@/components/Dashboard/Layout/DashUi";
import { Analytics } from "@vercel/analytics/react";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider";
import { Suspense } from "react";
import Preloader from "@/components/Dashboard/Preloader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Gymn - Dashboard",
    description: "Um aplicativo, duas perspectivas",
    manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <html lang='en'>
                <body className={`${inter.className} select-none`}>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='system'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Preloader>
                            <DashUi />
                            <Toaster />
                            <Analytics />
                            <PagesContainer>{children}</PagesContainer>
                        </Preloader>
                    </ThemeProvider>
                </body>
            </html>
        </ReactQueryProvider>
    );
}
