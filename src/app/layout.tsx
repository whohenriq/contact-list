import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Registry } from "./registry";
import { ThemeProvider } from "@/components/ui/theme";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search } from "@/components/search";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Contact Manager",
  description: "Manage your contacts easily with this app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} $ antialiased`}>
        <Registry>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ModeToggle />
            <Search />
            {children}
          </ThemeProvider>
        </Registry>
      </body>
    </html>
  );
}
