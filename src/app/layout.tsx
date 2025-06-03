import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../../styles/globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Typepoo - Typing Test",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
  },
  description: "Typeoo is a typing test game that helps you improve your typing speed and accuracy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
