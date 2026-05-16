# Solana + Next.js Starter Kit

🟣🔮 Next.js App Router + Solana wallet adapter + Anchor program — prêt à déployer.

Une page blanche propre avec connexion wallet Phantom/Solflare, airdrop devnet, et un programme Anchor counter. Clone et code.

---

## Quick Start

```bash
# 1. Prérequis
# - Node.js 20+, pnpm, Solana CLI (agave), Anchor CLI 0.30+
# - Wallet Phantom ou Solflare (extension navigateur)

# 2. Clone
git clone https://github.com/AtlasNexusOps/solana-nextjs-starter.git
cd solana-nextjs-starter

# 3. Install
pnpm install

# 4. Dev (frontend only)
pnpm dev
# → http://localhost:3000

# 5. Build & deploy le programme Anchor (optionnel)
cd program
anchor build
anchor deploy --provider.cluster devnet
```

---

## Structure

```
solana-nextjs-starter/
├── apps/
│   └── web/                     # Frontend Next.js 15
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

Le provider configure automatiquement Phantom et Solflare :

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

### Composants prêts à l'emploi

| Composant | Fichier | Description |
|-----------|---------|-------------|
| `WalletButton` | `components/wallet-button.tsx` | Bouton "Connect Wallet" (wrapper du wallet-adapter-react-ui) |
| `BalanceDisplay` | `components/balance-display.tsx` | Affiche le solde SOL en temps réel |
| `AirdropButton` | `components/airdrop-button.tsx` | Demande 1 SOL sur devnet (ne fonctionne que sur devnet/testnet) |

### Configuration RPC

```bash
# Par défaut : devnet
# Pour changer : variable d'env
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com pnpm dev
```

---

## Programme Anchor

Un programme counter minimal avec 3 instructions :

| Instruction | Description |
|-------------|-------------|
| `initialize` | Crée un compteur lié à ton wallet (PDA) |
| `increment` | Incrémente le compteur |
| `decrement` | Décrémente (bloqué si déjà à 0) |

### Build

```bash
cd program
anchor build
# → target/deploy/counter.so
```

### Déployer sur devnet

```bash
# 1. Config wallet
solana config set --url devnet

# 2. Fund wallet (si besoin)
solana airdrop 2

# 3. Deploy
anchor deploy --provider.cluster devnet
# → Récupère le Program ID généré

# 4. Mettre à jour le Program ID dans :
#    - program/programs/counter/src/lib.rs (declare_id!)
#    - program/Anchor.toml (programs.localnet)
```

### Tester

```bash
cd program
anchor test --provider.cluster localnet
```

---

## Déploiement frontend

### Render (gratuit)

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

## Dépendances clés

| Package | Version | Usage |
|---------|---------|-------|
| `next` | ^15.2 | Framework React |
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
Le CSS est importé dans `providers.tsx`.

### "Cannot find module @solana/web3.js"
```bash
pnpm install
```

### Anchor build fails — "unknown feature init-if-needed"
Passe à Anchor 0.30.1+ :
```bash
avm install 0.30.1
avm use 0.30.1
```

### Wallet bloqué sur mainnet ?
Par défaut le RPC pointe sur **devnet**. Change `NEXT_PUBLIC_SOLANA_RPC` pour basculer.

### Comment passer sur mainnet ?
```bash
NEXT_PUBLIC_SOLANA_RPC=https://api.mainnet-beta.solana.com pnpm dev
```
⚠️ Les transactions coûtent du vrai SOL sur mainnet.

---

## License

MIT — utilise, modifie, déploie librement.

---

Construit par [Atlas Nexus](https://github.com/AtlasNexusOps) · 2026
