# Solana + Next.js Starter Kit

🟣🔮 Next.js App Router + Solana wallet adapter + Anchor program — ready to deploy.

A clean starting point with Phantom/Solflare wallet connection, devnet airdrop, and an Anchor counter program. Clone and build.

---

## Quick Start

```bash
# 1. Prerequisites
# - Node.js 20+, pnpm, Solana CLI (agave), Anchor CLI 0.30+
# - Phantom or Solflare wallet (browser extension)

# 2. Clone
git clone https://github.com/AtlasNexusOps/solana-nextjs-starter.git
cd solana-nextjs-starter

# 3. Install
pnpm install

# 4. Dev (frontend only)
pnpm dev
# → http://localhost:3000

# 5. Build & deploy the Anchor program (optional)
cd program
anchor build
anchor deploy --provider.cluster devnet
```

---

## Structure

```
solana-nextjs-starter/
├── apps/
│   └── web/                     # Next.js 15 frontend
│       ├── app/
│       │   ├── layout.tsx        # Root layout + SolanaProvider
│       │   ├── page.tsx          # Landing page
│       │   ├── providers.tsx     # Wallet adapter setup
│       │   └── globals.css       # Tailwind base
│       ├── components/
│       │   ├── wallet-button.tsx  # Connect wallet button
│       │   ├── balance-display.tsx # SOL balance
│       │   └── airdrop-button.tsx  # Devnet faucet
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       └── package.json
├── program/                     # Anchor (Solana) program
│   ├── programs/
│   │   └── counter/
│   │       ├── src/lib.rs        # Counter program
│   │       └── Cargo.toml
│   ├── Anchor.toml
│   └── Cargo.toml
├── package.json                 # Root workspace
├── pnpm-workspace.yaml
└── README.md
```

---

## Frontend

### Wallet adapter

The provider auto-configures Phantom and Solflare:

```tsx
// apps/web/app/providers.tsx
<ConnectionProvider endpoint={SOLANA_RPC}>
  <WalletProvider wallets={[new PhantomWalletAdapter(), new SolflareWalletAdapter()]} autoConnect>
    <WalletModalProvider>
      {children}
    </WalletModalProvider>
  </WalletProvider>
</ConnectionProvider>
```

### Components

| Component | File | Description |
|-----------|------|-------------|
| `WalletButton` | `components/wallet-button.tsx` | "Connect Wallet" button (wraps wallet-adapter-react-ui) |
| `BalanceDisplay` | `components/balance-display.tsx` | Live SOL balance display |
| `AirdropButton` | `components/airdrop-button.tsx` | Request 1 SOL on devnet (devnet/testnet only) |

### RPC Configuration

```bash
# Default: devnet
# Switch via env var:
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com pnpm dev
```

---

## Anchor Program

A minimal counter program with 3 instructions:

| Instruction | Description |
|-------------|-------------|
| `initialize` | Creates a counter tied to your wallet (PDA) |
| `increment` | Increments the counter |
| `decrement` | Decrements (blocked if already at 0) |

### Build

```bash
cd program
anchor build
# → target/deploy/counter.so
```

### Deploy to devnet

```bash
# 1. Configure wallet
solana config set --url devnet

# 2. Fund wallet if needed
solana airdrop 2

# 3. Deploy
anchor deploy --provider.cluster devnet
# → Copy the generated Program ID

# 4. Update the Program ID in:
#    - program/programs/counter/src/lib.rs (declare_id!)
#    - program/Anchor.toml (programs.localnet)
```

### Test

```bash
cd program
anchor test --provider.cluster localnet
```

---

## Frontend Deployment

### Render (free tier)

```yaml
# render.yaml
services:
  - type: web
    name: solana-nextjs-starter
    env: node
    buildCommand: cd apps/web && pnpm install && npx next build
    startCommand: cd apps/web && npx next start -p $PORT
```

### Vercel

```bash
# Root directory: apps/web
# Build command: npx next build
# Install command: pnpm install
```

---

## Key Dependencies

| Package | Version | Usage |
|---------|---------|-------|
| `next` | ^15.2 | React framework |
| `react` | ^19.0 | UI |
| `@solana/web3.js` | ^1.98 | RPC calls, transactions |
| `@solana/wallet-adapter-react` | ^0.15 | Wallet state hooks |
| `@solana/wallet-adapter-wallets` | ^0.19 | Phantom + Solflare |
| `@solana/wallet-adapter-react-ui` | ^0.9 | Connect button UI |
| `anchor-lang` | 0.30.1 | Solana program framework |
| `tailwindcss` | ^3.4 | Styles |

---

## FAQ

### "wallet-adapter-react-ui/styles.css not found"
```bash
pnpm add @solana/wallet-adapter-react-ui
```
The CSS is imported in `providers.tsx`.

### "Cannot find module @solana/web3.js"
```bash
pnpm install
```

### Anchor build fails — "unknown feature init-if-needed"
Upgrade to Anchor 0.30.1+:
```bash
avm install 0.30.1
avm use 0.30.1
```

### Wallet stuck on mainnet?
The default RPC points to **devnet**. Change `NEXT_PUBLIC_SOLANA_RPC` to switch.

### How do I go to mainnet?
```bash
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com pnpm dev
```
⚠️ Transactions cost real SOL on mainnet.

---

## License

MIT — use, modify, deploy freely.

---

Built by [Atlas Nexus](https://github.com/AtlasNexusOps) · 2026
