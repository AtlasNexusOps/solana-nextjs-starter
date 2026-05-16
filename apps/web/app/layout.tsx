import "./globals.css";
import type { Metadata } from "next";
import { SolanaProvider } from "./providers";

export const metadata: Metadata = {
  title: "Solana + Next.js Starter",
  description: "Next.js App Router + Solana wallet adapter + Anchor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white antialiased">
        <SolanaProvider>{children}</SolanaProvider>
      </body>
    </html>
  );
}
