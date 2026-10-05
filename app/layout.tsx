import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voixero Convert Business | 3 Monate testen",
  description:
    "Messen und optimieren Sie die Sichtbarkeit Ihres Unternehmens in ChatGPT, Gemini und weiteren KI-Plattformen. Convert Business 3 Monate für CHF 448.– testen – ohne automatische Verlängerung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}