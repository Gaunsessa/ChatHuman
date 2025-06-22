import type { Metadata } from "next";
import "./globals.css";
// import ChatHuman from '../../public/Assets/ChatHuman.png';
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
      <body>
        <div className="fixed bottom-10 right-10 z-50">
          <InfoButton /> 
        </div>
        <div className="max-w-4xl m-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
