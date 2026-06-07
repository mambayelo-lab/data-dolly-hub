import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Layers, ShieldCheck, GitBranch } from "lucide-react";
import { apps, company } from "@/data/maisonLumen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura SI Hub — Portail des SI mockés" },
      { name: "description", content: "Trois entreprises témoins, 18 applications métier mockées avec identité éditeur fidèle et données cohérentes cross-systèmes. Conçu pour démos Aura Decision Compass." },
      { property: "og:title", content: "Aura SI Hub — Portail des SI mockés" },
      { property: "og:description", content: "18 apps SI mockées, données cohérentes cross-systèmes. Retail, Agro-alimentaire, Manufacturing." },
    ],
  }),
  component: HubHome,
});

const sectors = [
  {
    slug: "retail",
    eyebrow: "Retail & Mode",
    title: "Maison Lumen",
    legal: company.legalName,
    desc: "Enseigne mode & lifestyle française — Paris. 180 boutiques + e-shop EU. Données complètes & cohérentes sur les 6 apps du SI.",
    kpis: [
      { label: "Magasins", value: "180" },
      { label: "Collaborateurs", value: "1 200" },
      { label: "CA", value: "480 M€" },
    ],
    appIds: ["sap", "cegid-y2", "shopify", "manhattan", "salesforce", "o9"],
    status: "ready" as const,
  },
  {
    slug: "agro-food",
    eyebrow: "Agro-alimentaire",
    title: "Fromagerie du Val",
    legal: "Fromagerie du Val SAS",
    desc: "Coopérative laitière normande — IFS/BRC certifiée. 3 sites de production, 850 collab. SI en préparation.",
    kpis: [
      { label: "Sites prod.", value: "3" },
      { label: "Collaborateurs", value: "850" },
      { label: "CA", value: "290 M€" },
    ],
    appIds: ["sage-x3", "agriware", "qualipro", "traceone", "divalto", "databricks"],
    status: "soon" as const,
  },
  {
    slug: "manufacturing",
    eyebrow: "Industrie manufacturière",
    title: "Helvex Mécanique",
    legal: "Helvex Mécanique SAS",
    desc: "ETI mécanique de précision — Lyon. Aéronautique & automobile. 5 usines, 1 400 collab. SI en préparation.",
    kpis: [
      { label: "Usines", value: "5" },
      { label: "Collaborateurs", value: "1 400" },
      { label: "CA", value: "380 M€" },
    ],
    appIds: ["sap-mfg", "teamcenter", "delmia", "opcenter", "maximo", "databricks-oee"],
    status: "soon" as const,
  },
];

function HubHome() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-ink text-paper grid place-items-center font-display text-lg">A</div>
            <div className="leading-tight">
              <div className="font-display text-base">Aura SI Hub</div>
              <div className="text-[11px] uppercase tracking-widest text-ink-soft">Portail des SI témoins</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-ink-soft">
            <span className="hidden md:inline">3 entreprises · 18 applications</span>
            <span className="px-2.5 py-1 rounded-full border border-border bg-paper-elev font-mono text-[10px]">hub.aura</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold mb-6">
              Portail des SI mockés · Aura Decision Compass
            </div>
            <h1 className="font-display text-5xl lg:text-7xl leading-[1.02] text-ink">
              Trois entreprises<br />témoins.<br />
              <span className="italic text-ink-soft">Trois SI complets.</span>
            </h1>
            <p className="mt-8 text-lg text-ink-soft max-w-xl leading-relaxed">
              18 applications métier mockées — identité visuelle fidèle aux éditeurs, données cohérentes cross-systèmes. Une infrastructure de démonstration pour entraîner et présenter Aura Decision Compass sur des cas réels.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/sector/retail" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink/90 transition">
                Explorer le SI Retail — Maison Lumen <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href="#sectors" className="text-sm text-ink-soft hover:text-ink underline-offset-4 hover:underline">
                Voir les 3 secteurs ↓
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-12">
            <div className="space-y-6">
              <Pillar icon={<Layers className="h-4 w-4" />} title="Cohérence cross-systèmes" desc="Mêmes SKU, mêmes commandes, mêmes clients. La commande SO-2026-018472 existe simultanément dans Shopify, SAP, Manhattan et Salesforce." />
              <Pillar icon={<ShieldCheck className="h-4 w-4" />} title="Fidélité éditeur" desc="SAP Fiori, Salesforce Lightning, Shopify Polaris, Cegid, Manhattan, o9 — couleurs, structure de nav et UI propres à chaque éditeur." />
              <Pillar icon={<GitBranch className="h-4 w-4" />} title="Pensé pour Aura" desc="Chaque app expose ses données de manière à entraîner l'extraction, le mapping ontologique et les graphes causaux du Decision Compass." />
            </div>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-border bg-paper-elev">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-3 gap-8">
          {[
            ["18", "Applications mockées"],
            ["3", "Secteurs d'activité"],
            ["100 %", "Données cohérentes"],
          ].map(([v, l]) => (
            <div key={l}>
              <div className="font-display text-4xl lg:text-5xl text-ink tabular-nums">{v}</div>
              <div className="text-[11px] uppercase tracking-widest text-ink-soft mt-2">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="max-w-7xl mx-auto px-6 lg:px-10 py-20 space-y-16">
        {sectors.map((s) => (
          <SectorBlock key={s.slug} sector={s} />
        ))}
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-xs text-ink-soft flex flex-wrap justify-between gap-4">
          <span>Aura SI Hub · Mocks pédagogiques pour démonstrations. Toutes les marques citées appartiennent à leurs propriétaires respectifs.</span>
          <span className="font-mono">v2.0 · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

function Pillar({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div>
      <div className="flex items-center gap-2 text-ink">
        <span className="text-gold">{icon}</span>
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{desc}</p>
    </div>
  );
}

function SectorBlock({ sector }: { sector: typeof sectors[number] }) {
  const ready = sector.status === "ready";
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">{sector.eyebrow}</div>
        <h2 className="font-display text-4xl mt-3 text-ink">{sector.title}</h2>
        <div className="text-sm text-ink-soft mt-1">{sector.legal}</div>
        <p className="text-sm text-ink-soft leading-relaxed mt-5">{sector.desc}</p>
        <div className="mt-6 grid grid-cols-3 gap-4">
          {sector.kpis.map((k) => (
            <div key={k.label}>
              <div className="font-display text-xl text-ink tabular-nums">{k.value}</div>
              <div className="text-[10px] uppercase tracking-wider text-ink-soft mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>
        {ready ? (
          <Link to="/sector/$slug" params={{ slug: sector.slug }} className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-gold border-b border-ink hover:border-gold pb-0.5 transition-colors">
            Voir le SI complet <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <div className="mt-7 inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-ink-soft border border-dashed border-border px-3 py-1.5 rounded-full">
            Bientôt disponible
          </div>
        )}
      </div>
      <div className="lg:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {sector.appIds.map((id) => {
          const app = apps.find((a) => a.id === id);
          if (app && ready) {
            return (
              <Link key={id} to="/apps/$appId" params={{ appId: app.id }} className="group border border-border bg-paper-elev rounded-lg p-4 hover:border-ink/40 hover:shadow-sm transition-all">
                <AppCardInner code={app.code} name={app.name} module={app.module} vendor={app.vendor} color={app.color} active />
              </Link>
            );
          }
          // Coming soon — use static names
          const fallback = fallbackApps[id as keyof typeof fallbackApps];
          return (
            <div key={id} className="border border-dashed border-border rounded-lg p-4 opacity-70">
              <AppCardInner code={fallback.code} name={fallback.name} module={fallback.module} vendor={fallback.vendor} color={fallback.color} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

const fallbackApps: Record<string, { code: string; name: string; module: string; vendor: string; color: string }> = {
  "sage-x3": { code: "SX", name: "Sage X3", module: "ERP", vendor: "Sage", color: "#00ad4d" },
  agriware: { code: "AG", name: "Agriware 365", module: "Gestion amont", vendor: "Agriware", color: "#2e7d32" },
  qualipro: { code: "QU", name: "Qualipro QHSE", module: "Qualité / IFS", vendor: "Qualipro", color: "#0066b3" },
  traceone: { code: "TR", name: "Trace One PLM", module: "PLM Specs", vendor: "Trace One", color: "#003a70" },
  divalto: { code: "DI", name: "Divalto Infinity", module: "Distribution", vendor: "Divalto", color: "#0072ce" },
  databricks: { code: "DB", name: "Databricks Lakehouse", module: "Data Platform", vendor: "Databricks", color: "#ff3621" },
  "sap-mfg": { code: "SA", name: "SAP S/4HANA Mfg", module: "ERP Discrete", vendor: "SAP", color: "#0a6ed1" },
  teamcenter: { code: "SI", name: "Siemens Teamcenter", module: "PLM", vendor: "Siemens", color: "#009999" },
  delmia: { code: "DA", name: "DELMIA Apriso", module: "Digital Mfg", vendor: "Dassault", color: "#005386" },
  opcenter: { code: "SI", name: "Siemens Opcenter", module: "MES", vendor: "Siemens", color: "#009999" },
  maximo: { code: "IB", name: "IBM Maximo", module: "GMAO", vendor: "IBM", color: "#0530ad" },
  "databricks-oee": { code: "DB", name: "Databricks OEE", module: "Analytics", vendor: "Databricks", color: "#ff3621" },
};

function AppCardInner({ code, name, module, vendor, color, active }: { code: string; name: string; module: string; vendor: string; color: string; active?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-md grid place-items-center text-white text-xs font-bold tracking-tight" style={{ background: color }}>
          {code}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-ink">{name}</div>
          <div className="text-[11px] text-ink-soft">{module} · {vendor}</div>
        </div>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between text-[11px]">
        <span className="font-mono text-ink-soft truncate">{vendor.toLowerCase().replace(/\s/g, "")}.aura</span>
        {active ? (
          <span className="text-ink font-medium group-hover:text-gold transition-colors">Ouvrir →</span>
        ) : (
          <span className="text-ink-soft">Bientôt</span>
        )}
      </div>
    </div>
  );
}
