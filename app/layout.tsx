import "./globals.css";
import { Inter, Space_Grotesk, JetBrains_Mono, Archivo, IBM_Plex_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mono",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-vl-display",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-vl-mono",
});

export const metadata = {
  title: "Sapient Digital — One brand. Full spectrum.",
  description:
    "Sapient Digital refracts your signal into every channel that earns, ranks, cites, and scales. PR, Content, SEO/AEO, and Video — one coherent spectrum.",
  metadataBase: new URL("https://sapient.digital"),
  openGraph: {
    title: "Sapient Digital — The Prism",
    description:
      "One brand. Full spectrum. Four wavelengths. One orchestration layer.",
    url: "https://sapient.digital",
    siteName: "Sapient Digital",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${mono.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body className="bg-canvas text-body font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
