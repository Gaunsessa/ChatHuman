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
      <body className="min-h-[100vh]">
        <div className="fixed bottom-10 right-10 z-50">
          <InfoButton /> 
        </div>
        {children}
      </body>
    </html>
  );
}
