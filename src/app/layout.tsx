import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
