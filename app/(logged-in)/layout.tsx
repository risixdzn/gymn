import "../globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import PagesContainer from "@/components/Dashboard/PagesContainer";
import { ThemeProvider } from "@/components/ThemeProvider";
import Sidebar from "@/components/Dashboard/Sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Gymn - Dashboard",
    description: "Um aplicativo, duas perspectivas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
                    <Sidebar />
                    <Toaster />
                    <PagesContainer>{children}</PagesContainer>
                </ThemeProvider>
            </body>
        </html>
    );
}
