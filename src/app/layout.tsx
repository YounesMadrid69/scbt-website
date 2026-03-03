import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LenisProvider } from "@/components/layout/LenisProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const verbatim = localFont({
  src: [
    { path: "../../public/fonts/Verbatim-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Verbatim-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Verbatim-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Verbatim-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Verbatim-Black.woff2", weight: "900", style: "normal" },
  ],
  variable: "--font-verbatim",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SCBT - Sporting Club Bron Terraillon | Depuis 1964",
  description:
    "Site officiel du Sporting Club Bron Terraillon. Club de football fondé en 1964, 450+ licenciés, club formateur de Karim Benzema. Bron, Rhône.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${montserrat.variable} ${verbatim.variable}`}
    >
      <body className="font-[family-name:var(--font-montserrat)] antialiased">
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
