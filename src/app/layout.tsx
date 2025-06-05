import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Registry } from "./registry";
import { ThemeProvider } from "@/components/ui/theme";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lista de contatos",
  description: "Gerencie seus contatos facilmente com este aplicativo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${roboto.variable} `}>
        <Registry>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </Registry>
      </body>
    </html>
  );
}
