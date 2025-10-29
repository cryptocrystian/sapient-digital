import "./globals.css";
import { Inter, Inter_Tight } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight"
});

export const metadata = {
  title: "Sapient Digital — Integrated PR, Content & SEO",
  description: "Senior-led agency delivering integrated PR, content, and SEO systems.",
  metadataBase: new URL("https://sapient.digital"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body className="bg-bg-900 text-fg-100">{children}</body>
    </html>
  );
}
