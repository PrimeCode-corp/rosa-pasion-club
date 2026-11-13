import type { Metadata, Viewport } from "next";
import { Inter, Yeseva_One } from "next/font/google";
import "./globals.css";

// Fuentes elegidas por similitud con public/references (títulos: Yeseva One, texto: Inter)
const yeseva = Yeseva_One({
  variable: "--font-display-src",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter-src",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rosa Pasión Club | Beneficios y Comercios Aliados",
  description: "Club exclusivo de beneficios, descuentos y marcas aliadas de Rosa Pasión.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#F26666",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${yeseva.variable} ${inter.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col bg-[#F26666] text-white overflow-x-hidden w-full max-w-full">
        {children}
      </body>
    </html>
  );
}
