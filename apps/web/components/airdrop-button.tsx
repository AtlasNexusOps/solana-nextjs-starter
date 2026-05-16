"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useState } from "react";

export function AirdropButton() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [tx, setTx] = useState<string | null>(null);

  const airdrop = useCallback(async () => {
    if (!publicKey) return;
    setLoading(true);
    setTx(null);
    try {
      const sig = await connection.requestAirdrop(
        publicKey,
        LAMPORTS_PER_SOL
      );
      setTx(sig);
    } catch (err: any) {
      alert("Airdrop failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }, [connection, publicKey]);

  if (!publicKey) return null;

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={airdrop}
        disabled={loading}
        className="rounded-lg bg-zinc-800 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-700 disabled:opacity-50 transition"
      >
        {loading ? "Requesting..." : "Airdrop 1 SOL (devnet)"}
      </button>
      {tx && (
        <a
          href={`https://explorer.solana.com/tx/${tx}?cluster=devnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-solana-green hover:underline"
        >
          View on Explorer ↗
        </a>
      )}
    </div>
  );
}
