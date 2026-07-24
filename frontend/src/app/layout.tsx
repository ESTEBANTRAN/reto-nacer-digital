import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GitHub Profile Viewer — Nacer Digital",
  description:
    "Reto técnico para Nacer Digital: aplicación Full-Stack (NestJS + NextJS) que consulta la API de GitHub. Desarrollado por Esteban Aulestia.",
  keywords: ["GitHub", "NestJS", "NextJS", "Nacer Digital", "Esteban Aulestia"],
  authors: [{ name: "Esteban Aulestia" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-white font-sans selection:bg-cyan-500/30">
        {children}
      </body>
    </html>
  );
}
