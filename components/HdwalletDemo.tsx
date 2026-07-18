"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Globe, ArrowUpRight } from "lucide-react";
import { RetroSelect } from "@/components/RetroSelect";

type CoinOption = { key: string; name: string; symbol: string };

type DemoResult = {
  coin: string;
  symbol: string;
  entropy: string;
  mnemonic: string;
  path: string;
  xPrivateKey: string;
  xPublicKey: string;
  privateKey: string;
  publicKey: string;
  spendPrivateKey: string;
  viewPrivateKey: string;
  spendPublicKey: string;
  viewPublicKey: string;
  addresses: { type: string; value: string }[];
};

// --- Minimal typing over the dynamically-imported hdwallet.js modules ---
type EntropyClient = { generate(strength: number): string } & (new (
  entropy: string
) => unknown);

type HDWalletLike = {
  fromEntropy(entropy: unknown): HDWalletLike;
  fromDerivation(derivation: unknown): HDWalletLike;
  getEntropy(): string | null;
  getMnemonic(): string | null;
  getPath(): string;
  getXPrivateKey(): string | null;
  getXPublicKey(): string | null;
  getPrivateKey(): string | null;
  getPublicKey(): string | null;
  getSpendPrivateKey(): string | null;
  getViewPrivateKey(): string | null;
  getSpendPublicKey(): string | null;
  getViewPublicKey(): string | null;
  getAddress(options?: { address: string }): string;
  getPrimaryAddress(): string;
};

type HDWalletCtor = new (
  crypto: unknown,
  options?: Record<string, unknown>
) => HDWalletLike;

type CryptoClass = {
  NAME: string;
  SYMBOL: string;
  COIN_TYPE: number;
  DEFAULT_HD: string;
  DEFAULT_PATH: string;
  NETWORKS?: unknown;
  TYPES: Record<string, string>;
  ADDRESS_TYPES: Record<string, string>;
  ADDRESSES: { getAddresses(): string[] };
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy to clipboard"
      className="mt-0.5 shrink-0 border border-black/50 p-1 text-black/60 hover:bg-black hover:text-white"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

export function HdwalletDemo() {
  const [coins, setCoins] = useState<CoinOption[] | null>(null);
  const [coin, setCoin] = useState("Bitcoin");
  const [result, setResult] = useState<DemoResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mod = await import("@hdwallet/core/cryptocurrencies");
        const list = Object.entries(mod as Record<string, unknown>)
          .filter(([, cls]) => {
            if (typeof cls !== "function") return false;
            const c = cls as unknown as { NAME?: string; NETWORKS?: unknown };
            return Boolean(c.NAME && c.NETWORKS);
          })
          .map(([key, cls]) => {
            const c = cls as unknown as { NAME: string; SYMBOL: string };
            return { key, name: c.NAME, symbol: c.SYMBOL };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        if (!cancelled) setCoins(list);
      } catch {
        if (!cancelled) setError("Failed to load cryptocurrency list");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function generate() {
    setBusy(true);
    setError(null);
    try {
      const [core, entropies, hds, derivations, mod] = await Promise.all([
        import("@hdwallet/core"),
        import("@hdwallet/core/entropies"),
        import("@hdwallet/core/hds"),
        import("@hdwallet/core/derivations"),
        import("@hdwallet/core/cryptocurrencies"),
      ]);

      const HDWallet = (core as { HDWallet: unknown })
        .HDWallet as HDWalletCtor;
      const E = entropies as unknown as {
        BIP39Entropy: EntropyClient;
        BIP39_ENTROPY_STRENGTHS: Record<string, number>;
        AlgorandEntropy: EntropyClient;
        ALGORAND_ENTROPY_STRENGTHS: Record<string, number>;
        MoneroEntropy: EntropyClient;
        MONERO_ENTROPY_STRENGTHS: Record<string, number>;
      };
      const H = hds as unknown as Record<string, unknown>;
      const D = derivations as unknown as {
        CustomDerivation: new (opts: Record<string, unknown>) => unknown;
      };
      const Cryptocurrency = (mod as Record<string, unknown>)[
        coin
      ] as unknown as CryptoClass;

      // Each cryptocurrency uses its own entropy/mnemonic client and derives
      // at its DEFAULT_PATH — mirroring the hdwallet.js `from-entropy`
      // examples. Standard coins run on BIP32HD.
      let hdwallet: HDWalletLike;
      const hdName = Cryptocurrency.DEFAULT_HD;
      const defaultDerivation = () =>
        new D.CustomDerivation({ path: Cryptocurrency.DEFAULT_PATH });
      const bip39Entropy = () =>
        new E.BIP39Entropy(
          E.BIP39Entropy.generate(
            E.BIP39_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
          )
        );

      if (hdName === "Monero") {
        hdwallet = new HDWallet(Cryptocurrency, {
          hd: H.MoneroHD,
        }).fromEntropy(
          new E.MoneroEntropy(
            E.MoneroEntropy.generate(
              E.MONERO_ENTROPY_STRENGTHS.ONE_HUNDRED_TWENTY_EIGHT
            )
          )
        );
      } else if (hdName === "Cardano") {
        hdwallet = new HDWallet(Cryptocurrency, {
          hd: H.CardanoHD,
          cardanoType: Cryptocurrency.TYPES.BYRON_ICARUS,
          addressType: Cryptocurrency.ADDRESS_TYPES.PUBLIC_KEY,
        })
          .fromEntropy(
            new E.BIP39Entropy(
              E.BIP39Entropy.generate(
                E.BIP39_ENTROPY_STRENGTHS.TWO_HUNDRED_TWENTY_FOUR
              )
            )
          )
          .fromDerivation(defaultDerivation());
      } else if (hdName === "Algorand") {
        // Algorand's native mnemonic is 25 words (256-bit entropy).
        hdwallet = new HDWallet(Cryptocurrency, {
          hd: H.AlgorandHD,
        })
          .fromEntropy(
            new E.AlgorandEntropy(
              E.AlgorandEntropy.generate(
                E.ALGORAND_ENTROPY_STRENGTHS.TWO_HUNDRED_FIFTY_SIX
              )
            )
          )
          .fromDerivation(defaultDerivation());
      } else {
        // PiNetwork (Stellar-based) needs an explicit address type.
        const options: Record<string, unknown> =
          coin === "PiNetwork" ? { addressType: "publicKey" } : {};
        try {
          hdwallet = new HDWallet(Cryptocurrency, {
            ...options,
            hd: H.BIP32HD,
          })
            .fromEntropy(bip39Entropy())
            .fromDerivation(defaultDerivation());
        } catch {
          // A few coins have broken DEFAULT_PATH metadata (e.g. Neutron) —
          // fall back to the coin's fully-default recipe.
          hdwallet = new HDWallet(Cryptocurrency, options).fromEntropy(
            bip39Entropy()
          );
        }
      }

      // Some getters are unavailable per HD scheme (e.g. Monero has no
      // extended keys and throws on getPath/getAddress) — swallow those.
      const safe = (fn: () => string | null): string => {
        try {
          return fn() ?? "";
        } catch {
          return "";
        }
      };

      // Collect every address type the coin supports (P2PKH, P2SH, P2TR...).
      let addresses: { type: string; value: string }[];
      if (hdName === "Monero") {
        addresses = [
          { type: "primary", value: safe(() => hdwallet.getPrimaryAddress()) },
        ];
      } else {
        const types = (() => {
          try {
            return Cryptocurrency.ADDRESSES.getAddresses();
          } catch {
            return [];
          }
        })();
        if (types.length > 1) {
          addresses = types.map((type) => ({
            type,
            value: safe(() => hdwallet.getAddress({ address: type })),
          }));
        } else {
          addresses = [{ type: "", value: safe(() => hdwallet.getAddress()) }];
        }
      }
      addresses = addresses.filter((a) => a.value);

      const mnemonic = safe(() => hdwallet.getMnemonic());
      if (!mnemonic || addresses.length === 0) {
        throw new Error("Generation returned an incomplete result");
      }

      setResult({
        coin: Cryptocurrency.NAME,
        symbol: Cryptocurrency.SYMBOL,
        entropy: safe(() => hdwallet.getEntropy()),
        mnemonic,
        path: safe(() => hdwallet.getPath()),
        xPrivateKey: safe(() => hdwallet.getXPrivateKey()),
        xPublicKey: safe(() => hdwallet.getXPublicKey()),
        privateKey: safe(() => hdwallet.getPrivateKey()),
        publicKey: safe(() => hdwallet.getPublicKey()),
        spendPrivateKey: safe(() => hdwallet.getSpendPrivateKey()),
        viewPrivateKey: safe(() => hdwallet.getViewPrivateKey()),
        spendPublicKey: safe(() => hdwallet.getSpendPublicKey()),
        viewPublicKey: safe(() => hdwallet.getViewPublicKey()),
        addresses,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusy(false);
    }
  }

  const coinOptions =
    coins?.map((c) => ({ value: c.key, label: `${c.name} (${c.symbol})` })) ??
    [];

  return (
    <div className="mt-8">
      <p className="mb-3 text-center text-xs leading-relaxed text-white/70 md:text-left md:text-sm">
        Try it live — choose a cryptocurrency and click{" "}
        <span className="font-bold text-[#FFCC00]">GENERATE</span> to derive a
        wallet right here. For the full experience, visit{" "}
        <a
          href="https://hdwallet.online"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#FFCC00] underline hover:bg-[#FFCC00] hover:text-black"
        >
          hdwallet.online
        </a>
        .
      </p>

      <div className="border-2 border-black bg-white p-4 text-black shadow-[3px_3px_0_#fff]">
      <div className="flex flex-col items-center gap-3 md:flex-row md:flex-wrap md:justify-between">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <p className="inline-block border-2 border-black bg-[#FFCC00] px-3 py-1 text-sm font-bold tracking-widest text-black shadow-[2px_2px_0_#000] md:text-base">
            hdwallet.js
          </p>
          <span className="inline-block border-2 border-black bg-black px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FFCC00] shadow-[2px_2px_0_#000]">
            200+ cryptocurrencies
          </span>
        </div>
        <div className="flex w-full flex-col items-stretch gap-2 md:w-auto md:flex-row md:items-center">
          <RetroSelect
            value={coin}
            onChange={setCoin}
            ariaLabel="Cryptocurrency"
            variant="light"
            searchable
            className="w-full md:w-56"
            placeholder={coins ? undefined : "Loading coins..."}
            options={coinOptions}
          />
          <button
            type="button"
            onClick={generate}
            disabled={busy || !coins}
            className="rounded-none border-2 border-black bg-[#FFCC00] px-3 py-2 text-xs font-bold uppercase text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-black hover:text-white disabled:opacity-60 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:py-1.5"
          >
            {busy ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {result && (
        <dl className="mt-4 space-y-2.5 text-xs md:text-sm">
          {(
            [
              { label: "entropy", value: result.entropy },
              { label: "mnemonic", value: result.mnemonic },
              { label: "path", value: result.path },
              { label: "xprivate-key", value: result.xPrivateKey, tone: "danger" },
              { label: "xpublic-key", value: result.xPublicKey },
              { label: "private-key", value: result.privateKey, tone: "danger" },
              { label: "public-key", value: result.publicKey },
              {
                label: "spend private-key",
                value: result.spendPrivateKey,
                tone: "danger",
              },
              {
                label: "view private-key",
                value: result.viewPrivateKey,
                tone: "danger",
              },
              { label: "spend public-key", value: result.spendPublicKey },
              { label: "view public-key", value: result.viewPublicKey },
              ...result.addresses.map((a) => ({
                label: a.type
                  ? `${a.type.toLowerCase()} address`
                  : `${result.coin.toLowerCase()} (${result.symbol}) address`,
                value: a.value,
                tone: "address",
              })),
            ] as { label: string; value: string; tone?: "danger" | "address" }[]
          )
            .filter((row) => row.value)
            .map((row) => (
              <div key={row.label}>
                <dt className="text-black/50">{row.label}</dt>
                <dd className="flex items-start gap-2">
                  <span
                    className={
                      row.tone === "address"
                        ? "break-all bg-[#FFCC00] px-1 font-bold text-black"
                        : row.tone === "danger"
                          ? "break-all bg-[#EE0000] px-1 text-white"
                          : "break-all bg-black px-1 text-white"
                    }
                  >
                    {row.value}
                  </span>
                  <CopyButton text={row.value} />
                </dd>
              </div>
            ))}
        </dl>
      )}

      {error && <p className="mt-3 text-xs text-[#EE0000]">{error}</p>}

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-md text-[10px] leading-relaxed text-black/50">
          Runs entirely in your browser via the hdwallet.js library — nothing
          is sent anywhere. Demo only: do not fund generated addresses or
          reuse these keys.
        </p>
        <a
          href="https://hdwallet.online"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 border-2 border-black bg-[#C0C0C0] px-2.5 py-1 text-xs font-bold text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#FFCC00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Globe className="h-3.5 w-3.5" />
          hdwallet.online
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
        </a>
      </div>
      </div>
    </div>
  );
}
