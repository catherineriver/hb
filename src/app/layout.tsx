import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "@/components/ui/provider"
import { Noto_Serif } from 'next/font/google'
import { Roboto_Slab } from 'next/font/google'
import { ManagerProvider} from '@/context/mock-context'

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
const primaryFont = Noto_Serif({ subsets: ['cyrillic'] })
const secondaryFont = Roboto_Slab({ subsets: ['cyrillic'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html suppressHydrationWarning>
      <body className={`${primaryFont.className} ${secondaryFont.className}`}>
      <Provider>
          <ManagerProvider>
           {children}
          </ManagerProvider>
      </Provider>
      </body>
      </html>
  );
}
