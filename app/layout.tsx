import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SIDIBE Social AI",
  description: "Agent IA de gestion des réseaux sociaux de SIDIBE STUDIO"
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="fr"><body>{children}</body></html>;
}