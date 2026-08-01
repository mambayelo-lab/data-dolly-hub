import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppSidebar";

export const metadata: Metadata = {
  title: "AURA — Architecture Intelligence",
  description:
    "AURA : Votre agent IA Expert en Architecture d'Entreprise, Solution, Infra, Data et Cybersécurité. Créez des BizCap Maps, Event Stormings et designs d'architecture avec l'IA.",
  keywords: ["architecture entreprise", "TOGAF", "LeanIX", "BizCap", "microservices", "event storming", "AI"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className="bg-aura-bg text-aura-text-primary antialiased">
        <div className="flex h-screen overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-hidden relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
