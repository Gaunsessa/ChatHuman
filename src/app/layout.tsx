import "./globals.css";

import type { Metadata } from "next";
import InfoButton from "@/components/infoButton";

export const metadata: Metadata = {
  title: "ChatHuman",
  description: "Powered by HL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body
        className="min-h-[100vh] bg-white"
        style={{ backgroundColor: "white" }}
      >
        {children}
      </body>
    </html>
  );
}
