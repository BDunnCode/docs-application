import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";


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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
        >
        {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
