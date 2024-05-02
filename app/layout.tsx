import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from '@/app/providers'
import { cn } from "@/lib/utils";

const fontSans = FontSans({
   subsets: ["latin"],
   variable: '--font-sans'
})

export const metadata: Metadata = {
  title: "Web3 AA Auth",
  description: "Boilerplate for Web3 Auth with Alchemy Abstracted Account",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={cn(
          'min-h-screen bg-background font-sans altialiased',
          fontSans.variable
        )}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}
