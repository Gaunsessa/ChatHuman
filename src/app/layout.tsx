import type { Metadata } from "next";
import "./globals.css";
import InfoButton from "./infoButton";

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
      <body className="min-h-[100vh] bg-white">
        <div className="fixed bottom-4 right-4 z-50">
          <InfoButton /> 
        </div>
        {children}
      </body>
    </html>
  );
}
