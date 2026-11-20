import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner"; // <-- AÑADIR
import { BarraNavegacion } from "@/components/nav/BarraNavegacion"; // <-- AÑADIR
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
  title: "Crear nueva pelicula",
  description: "Generar una nueva pelicula",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      {/* AÑADIR bg-fondo y text-texto: es lo que aplica la paleta a TODA la web */}
 <body className="flex min-h-full flex-col bg-fondo text-texto">
 {/* AÑADIR esta línea: el menú entero vive en components/nav/ */}
 <BarraNavegacion />
 {children}
 {/* AÑADIR esta línea. theme="system" hace que los avisos sigan el
 modo claro/oscuro del sistema, igual que el resto de la paleta */}
 <Toaster position="top-right" richColors theme="system" />
 </body>
 </html>

  );
}
