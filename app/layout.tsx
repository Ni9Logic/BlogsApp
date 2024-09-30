import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Components/Navbar";
import ToasterContext from "./context/ToasterContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Simple Blog App",
  description: "A simple blog app designed in Next.JS",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ToasterContext />
        <div className="flex-grow">{children}</div>
        <div className="p-5 fixed bottom-0 left-0 right-0 md:items-center md:justify-center md:flex">
          <Navbar isLoggedIn={false} />
        </div>
      </body>
    </html>
  );
}
