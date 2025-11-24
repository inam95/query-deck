import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/header/navbar";
import { ThemeProvider } from "@/components/theme-provider";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QueryDeck",
  description:
    "QueryDeck is a platform for learning and practicing interview questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <Navbar />
            {children}
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
