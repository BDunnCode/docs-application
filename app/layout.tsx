import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout({ children }: {children: React.ReactNode}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
       DKJASJKDAS
      </body>
    </html>
  );
}
