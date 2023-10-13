import "../globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import VerficationSuccessAlert from "@/components/Auth/Register/ui/VerificationSuccessAlert";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import UnauthorizedAlert from "@/components/Auth/UnauthorizedAlert";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Gymn",
    description: "Um aplicativo, duas perspectivas",
    icons: {
        icon: "../favicon.ico",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link rel='icon' href='../favicon.ico' />
            </head>
            <body className={`${inter.className} min-h-screen`}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <Header />
                    {children}
                    <Footer />
                    <Toaster />
                    <Analytics />
                    <VerficationSuccessAlert />
                    <UnauthorizedAlert />
                </ThemeProvider>
            </body>
        </html>
    );
}
