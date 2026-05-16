"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useEffect, useState } from "react";

export function BalanceDisplay() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }
    connection.getBalance(publicKey).then((b) => setBalance(b));
    const id = connection.onAccountChange(publicKey, (account) =>
      setBalance(account.lamports)
    );
    return () => { connection.removeAccountChangeListener(id); };
  }, [connection, publicKey]);

  if (!publicKey || balance === null) return null;

  return (
    <p className="text-sm text-zinc-400">
      Balance: {(balance / LAMPORTS_PER_SOL).toFixed(4)} SOL
    </p>
  );
}
