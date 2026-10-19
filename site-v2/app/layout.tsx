import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sapientdigital.io"),
  title: "Sapient Digital | Impossible to Ignore",
  description: "Build authority. Earn attention. Become discoverable. Sapient Digital connects digital PR, strategic content, and search visibility through proprietary intelligence and human expertise.",
  openGraph: {
    type: "website",
    title: "Sapient Digital — Impossible to Ignore",
    description: "Connected marketing. Amplified impact. Digital PR, strategic content, and search visibility for B2B brands.",
    siteName: "Sapient Digital",
    url: "https://sapientdigital.io",
  },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
