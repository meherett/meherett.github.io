"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  Copy,
  Check,
  Globe,
  ArrowUpRight,
  Download,
  Eraser,
} from "lucide-react";
import { RetroSelect } from "@/components/RetroSelect";

type CoinOption = { key: string; name: string; symbol: string };

// Send a Google Analytics event (no-op if gtag hasn't loaded, e.g. blocked).
function trackEvent(name: string, params?: Record<string, unknown>) {
  const w = window as unknown as {
    gtag?: (command: string, action: string, params?: unknown) => void;
  };
  if (typeof w.gtag === "function") {
    w.gtag("event", name, params);
  }
}

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
  fingerprint: string;
  dump: Record<string, unknown> | null;
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
  getFingerprint(): string | null;
  getDump(): Record<string, unknown>;
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

// The library's own full dump (seed, root keys, WIF, chain codes,
// fingerprints, every address type); falls back to the collected fields.
function resultPayload(res: DemoResult): Record<string, unknown> {
  if (res.dump) return res.dump;
  const payload: Record<string, unknown> = {
    cryptocurrency: res.coin,
    symbol: res.symbol,
    entropy: res.entropy,
    mnemonic: res.mnemonic,
  };
  if (res.path) payload.path = res.path;
  if (res.xPrivateKey) payload["xprivate-key"] = res.xPrivateKey;
  if (res.xPublicKey) payload["xpublic-key"] = res.xPublicKey;
  if (res.privateKey) payload["private-key"] = res.privateKey;
  if (res.publicKey) payload["public-key"] = res.publicKey;
  if (res.spendPrivateKey) payload["spend-private-key"] = res.spendPrivateKey;
  if (res.viewPrivateKey) payload["view-private-key"] = res.viewPrivateKey;
  if (res.spendPublicKey) payload["spend-public-key"] = res.spendPublicKey;
  if (res.viewPublicKey) payload["view-public-key"] = res.viewPublicKey;
  if (res.addresses.length === 1 && !res.addresses[0].type) {
    payload.address = res.addresses[0].value;
  } else {
    payload.addresses = Object.fromEntries(
      res.addresses.map((a) => [a.type.toLowerCase(), a.value])
    );
  }
  return payload;
}

// Retro CGA-terminal JSON highlighting: yellow keys, green strings,
// cyan numbers, magenta booleans, red null.
function JsonView({ json }: { json: string }) {
  const nodes: ReactNode[] = [];
  const token =
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false)\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = token.exec(json))) {
    if (match.index > last) nodes.push(json.slice(last, match.index));
    const [full, str, colon, bool] = match;
    if (str !== undefined) {
      if (colon) {
        nodes.push(
          <span key={key++} className="text-[#FFCC00]">
            {str}
          </span>,
          colon
        );
      } else {
        nodes.push(
          <span key={key++} className="text-white">
            {str}
          </span>
        );
      }
    } else if (bool !== undefined) {
      nodes.push(
        <span key={key++} className="text-[#FF55FF]">
          {full}
        </span>
      );
    } else if (full === "null") {
      nodes.push(
        <span key={key++} className="text-[#FF5555]">
          {full}
        </span>
      );
    } else {
      nodes.push(
        <span key={key++} className="text-[#55FFFF]">
          {full}
        </span>
      );
    }
    last = match.index + full.length;
  }
  nodes.push(json.slice(last));
  return <>{nodes}</>;
}

function CopyButton({ text, dark = false }: { text: string; dark?: boolean }) {
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
      className={
        dark
          ? "mt-0.5 shrink-0 border border-white/50 bg-black p-1 text-white/70 hover:bg-white hover:text-black"
          : "mt-0.5 shrink-0 border border-black/50 p-1 text-black/60 hover:bg-black hover:text-white"
      }
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </button>
  );
}

export function HDWalletDemo() {
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
    trackEvent("generate_hdwallet", { cryptocurrency: coin });
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
        fingerprint: safe(() => hdwallet.getFingerprint()),
        dump: (() => {
          try {
            return hdwallet.getDump();
          } catch {
            return null;
          }
        })(),
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setBusy(false);
    }
  }

  function downloadJson() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(resultPayload(result), null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const coinName = result.coin.toLowerCase().replace(/\s+/g, "-");
    link.download = `${
      result.fingerprint ? `${result.fingerprint}.` : ""
    }${coinName}.hdwallet.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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
        <span className="font-bold text-[#FFCC00]">hdwallet.online</span>
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
            onChange={(value) => {
              setCoin(value);
              trackEvent("select_cryptocurrency", { cryptocurrency: value });
            }}
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
        <div className="relative mt-4 border-2 border-black bg-black p-3">
          <div className="absolute right-2 top-2">
            <CopyButton
              dark
              text={JSON.stringify(resultPayload(result), null, 2)}
            />
          </div>
          <pre className="overflow-x-auto pr-8 text-[11px] leading-relaxed text-white/60 md:text-xs">
            <JsonView json={JSON.stringify(resultPayload(result), null, 2)} />
          </pre>
        </div>
      )}

      {result && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={downloadJson}
            className="inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#FFCC00] px-2.5 py-1 text-xs font-bold uppercase text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-black hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </button>
          <button
            type="button"
            onClick={() => setResult(null)}
            className="inline-flex items-center gap-1.5 rounded-none border-2 border-black bg-[#C0C0C0] px-2.5 py-1 text-xs font-bold uppercase text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#FFCC00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Eraser className="h-3.5 w-3.5" />
            Clean
          </button>
        </div>
      )}

      {error && <p className="mt-3 text-xs text-[#EE0000]">{error}</p>}

      <div className="mt-4 flex flex-wrap items-end justify-between gap-3">
        <p className="w-full text-xs leading-relaxed text-black md:w-auto md:min-w-0 md:flex-1 md:text-sm">
          Runs entirely in your browser via the hdwallet.js library — nothing
          is sent anywhere.
          <br />
          <span className="font-bold">
            Disclaimer:{" "}
            <span className="text-[#EE0000]">
              do not fund generated addresses or reuse these keys.
            </span>
          </span>
        </p>
        <a
          href="https://hdwallet.online"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 border-2 border-black bg-[#C0C0C0] px-2.5 py-1 text-xs font-bold text-black shadow-[2px_2px_0_#000] transition-colors hover:bg-[#FFCC00] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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
