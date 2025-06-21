import type { Metadata } from "next";
import "./globals.css";
// import ChatHuman from '../../public/Assets/ChatHuman.png';

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
        <div className="max-w-4xl m-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
