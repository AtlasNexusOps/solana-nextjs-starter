"use client";

import { WalletButton } from "@/components/wallet-button";
import { BalanceDisplay } from "@/components/balance-display";
import { AirdropButton } from "@/components/airdrop-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gap-8">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-solana-purple to-solana-green" />
        <h1 className="text-2xl font-bold tracking-tight">
          Solana<span className="text-solana-purple">+</span>Next.js
        </h1>
      </div>

      <p className="text-zinc-400 text-center max-w-md">
        Starter kit with{" "}
        <code className="text-solana-green bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
          @solana/wallet-adapter
        </code>
        , Next.js App Router, and an Anchor program.
      </p>

      {/* Wallet */}
      <div className="flex flex-col items-center gap-3">
        <WalletButton />
        <BalanceDisplay />
        <AirdropButton />
      </div>
    </main>
  );
}
