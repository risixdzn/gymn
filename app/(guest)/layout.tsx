import "../globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import VerficationSuccessAlert from "@/components/Auth/Register/ui/VerificationSuccessAlert";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Gymn",
    description: "Um aplicativo, duas perspectivas",
    icons: {
        icon: "../favicon.ico",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <link rel='icon' href='../favicon.ico' />
            </head>
            <body className={inter.className}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <Navbar />
                    {children}
                    <Toaster />
                    <VerficationSuccessAlert openState={true} />
                </ThemeProvider>
            </body>
        </html>
    );
}
