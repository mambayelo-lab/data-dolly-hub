import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, KeyRound, Lock, ShieldCheck, RefreshCw } from "lucide-react";
import { credentials, type Status } from "@/data/credentials";
import { VendorLogo } from "@/components/VendorLogo";

export const Route = createFileRoute("/vault")({
  head: () => ({
    meta: [
      { title: "Coffre-fort · Aura SI Hub" },
      { name: "description", content: "Credentials OAuth/OIDC de toutes les applications du hub. Tokens, scopes, rotations — mockés." },
    ],
  }),
  component: VaultPage,
});

const statusColor: Record<Status, string> = {
  "Connecté": "#16a34a",
  "Expire bientôt": "#d97706",
  "À reconnecter": "#dc2626",
};

function VaultPage() {
  const ok = credentials.filter((c) => c.status === "Connecté").length;
  const warn = credentials.filter((c) => c.status !== "Connecté").length;
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Aura SI Hub
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-ink-soft">Coffre-fort</span>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">
              <KeyRound className="h-3.5 w-3.5" /> Vault · service principal Aura
            </div>
            <h1 className="font-display text-4xl lg:text-5xl mt-3">Credentials des SI mockés</h1>
            <p className="mt-4 text-sm text-ink-soft max-w-2xl leading-relaxed">
              Connexions OAuth 2.0, OIDC, JWT mTLS et clés HMAC vers les 12 applications. Rotations,
              scopes minimaux, expirations — la posture sécu d'un vrai connecteur, sans secret réel.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-4">
            <Stat icon={<ShieldCheck className="h-4 w-4" />} v={String(credentials.length)} l="Connexions" />
            <Stat icon={<Lock className="h-4 w-4" />} v={String(ok)} l="Actives" />
            <Stat icon={<RefreshCw className="h-4 w-4" />} v={String(warn)} l="À renouveler" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
        <div className="border border-border rounded-lg bg-paper-elev overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-ink-soft bg-paper">
                <th className="px-4 py-3 font-medium">Application</th>
                <th className="px-4 py-3 font-medium">Protocole</th>
                <th className="px-4 py-3 font-medium">Client ID</th>
                <th className="px-4 py-3 font-medium">Scopes</th>
                <th className="px-4 py-3 font-medium">Expire dans</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {credentials.map((c) => (
                <tr key={c.appId} className="border-t border-border align-middle">
                  <td className="px-4 py-3">
                    <Link to="/apps/$appId" params={{ appId: c.appId }} className="inline-flex items-center gap-2 hover:underline">
                      <VendorLogo brand={c.brand} size="sm" />
                    </Link>
                    <div className="text-[11px] text-ink-soft mt-0.5 font-mono">{c.vaultPath}</div>
                  </td>
                  <td className="px-4 py-3 text-[12px]">{c.scheme}<div className="text-[11px] text-ink-soft font-mono mt-0.5">{c.authority}</div></td>
                  <td className="px-4 py-3 font-mono text-[12px]">{c.clientId}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {c.scopes.map((s) => (
                        <span key={s} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper border border-border">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-[12px]">{c.tokenExpiresIn}<div className="text-[11px] text-ink-soft">rot. {c.lastRotated}</div></td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium">
                      <span className="h-2 w-2 rounded-full" style={{ background: statusColor[c.status] }} />
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[11px] px-2 py-1 rounded border border-border bg-paper hover:border-ink/40 inline-flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" /> Renouveler
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-ink-soft mt-3">
          Vault simulé. Aucune valeur n'est un secret réel — les rotations et scopes documentent la posture cible.
        </p>
      </section>
    </div>
  );
}

function Stat({ icon, v, l }: { icon: React.ReactNode; v: string; l: string }) {
  return (
    <div className="border border-border bg-paper-elev rounded-lg p-3">
      <div className="text-gold">{icon}</div>
      <div className="font-display text-2xl mt-1 tabular-nums">{v}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-soft">{l}</div>
    </div>
  );
}
