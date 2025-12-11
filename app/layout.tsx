import type { Metadata } from "next";
import { HeroUIProvider } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "BUZZDAQ - The Buzzword Stock Market",
  description: "A satirical stock market for trending buzzwords",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
