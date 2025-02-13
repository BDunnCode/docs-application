import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Provider from "./Provider";


const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LiveDocs",
  description: 'Collaborative Editor'
}

export default function RootLayout({ children }: {children: React.ReactNode}) {

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: { 
          colorPrimary: "#3371FF",
          fontSize: "16px",
        },
      }}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
        >
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
