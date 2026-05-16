"use client";

import dynamic from "next/dynamic";

// Wallet button must be client-side only (browser APIs)
const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export function WalletButton() {
  return <WalletMultiButtonDynamic className="!bg-solana-purple !rounded-xl" />;
}
