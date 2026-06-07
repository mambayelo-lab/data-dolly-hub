import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Layers, ShieldCheck, GitBranch, Sparkles } from "lucide-react";
import { apps as retailApps, company as retailCo } from "@/data/maisonLumen";
import { apps as agroApps, company as agroCo } from "@/data/fromagerieDuVal";

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

type AppCard = { id: string; code: string; name: string; vendor: string; module: string; color: string };

const sectors: {
  slug: string;
  eyebrow: string;
  title: string;
  legal: string;
  desc: string;
  kpis: { label: string; value: string }[];
  apps: ReadonlyArray<AppCard>;
  status: "ready" | "soon";
}[] = [
  {
    slug: "retail",
    eyebrow: "Retail & Mode",
    title: retailCo.brand,
    legal: retailCo.legalName,
    desc: "Enseigne mode & lifestyle française — Paris. 180 boutiques + e-shop EU. Données complètes sur les 6 apps : SAP, Cegid, Shopify, Manhattan, Salesforce, o9.",
    kpis: [
      { label: "Magasins", value: String(retailCo.stores) },
      { label: "Collaborateurs", value: retailCo.employees.toLocaleString("fr-FR") },
      { label: "CA", value: "480 M€" },
    ],
    apps: retailApps,
    status: "ready",
  },
  {
    slug: "agro-food",
    eyebrow: "Agro-alimentaire",
    title: agroCo.brand,
    legal: agroCo.legalName,
    desc: "Coopérative laitière normande — IFS/BRC. 3 sites, 412 producteurs, 850 collab. ERP, amont laitier, QHSE, PLM, distribution, lakehouse — tout est connecté.",
    kpis: [
      { label: "Sites prod.", value: String(agroCo.sites) },
      { label: "Producteurs", value: String(agroCo.producers) },
      { label: "CA", value: "290 M€" },
    ],
    apps: agroApps,
    status: "ready",
  },
  {
    slug: "manufacturing",
    eyebrow: "Industrie manufacturière",
    title: "Helvex Mécanique",
    legal: "Helvex Mécanique SAS",
    desc: "ETI mécanique de précision — Lyon. Aéronautique & automobile. 5 usines, 1 400 collab. ERP, PLM, MES, GMAO, Digital Mfg — SI en préparation.",
    kpis: [
      { label: "Usines", value: "5" },
      { label: "Collaborateurs", value: "1 400" },
      { label: "CA", value: "380 M€" },
    ],
    apps: [
      { id: "sap-mfg", code: "SA", name: "SAP S/4HANA Mfg", vendor: "SAP", module: "ERP Discrete", color: "#0a6ed1" },
      { id: "teamcenter", code: "TC", name: "Teamcenter", vendor: "Siemens", module: "PLM", color: "#009999" },
      { id: "delmia", code: "DA", name: "DELMIA Apriso", vendor: "Dassault", module: "Digital Mfg", color: "#005386" },
      { id: "opcenter", code: "OP", name: "Opcenter MES", vendor: "Siemens", module: "MES", color: "#009999" },
      { id: "maximo", code: "MX", name: "Maximo", vendor: "IBM", module: "GMAO", color: "#0530ad" },
      { id: "databricks-oee", code: "DB", name: "Databricks OEE", vendor: "Databricks", module: "Analytics", color: "#ff3621" },
    ],
    status: "soon",
  },
];

function HubHome() {
  const totalActive = sectors.filter(s => s.status === "ready").reduce((n, s) => n + s.apps.length, 0);
  return (
    <div className="min-h-screen bg-paper text-ink">
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-30 bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div className="leading-tight">
              <div className="font-display text-base">Aura SI Hub</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-ink-soft">Portail des SI témoins</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs text-ink-soft">
            <a href="#sectors" className="hover:text-ink">Secteurs</a>
            <a href="#manifesto" className="hover:text-ink">Manifeste</a>
            <span className="px-2.5 py-1 rounded-full border border-border bg-paper-elev font-mono text-[10px]">hub.aura</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative border-b border-border overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.18]" aria-hidden="true">
          <div className="absolute inset-0" style={{
            backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            color: "var(--ink-soft)",
            maskImage: "radial-gradient(ellipse 80% 60% at 70% 40%, black 30%, transparent 75%)",
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold font-semibold mb-7 border border-gold/40 rounded-full pl-1.5 pr-3 py-1 bg-gold/[0.06]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold text-paper"><Sparkles className="h-3 w-3" /></span>
              Aura Decision Compass · environnement de démo
            </div>
            <h1 className="font-display text-5xl lg:text-[5.5rem] leading-[0.98] text-ink">
              Trois entreprises<br />témoins.<br />
              <span className="italic text-ink-soft">Trois SI vivants.</span>
            </h1>
            <p className="mt-8 text-lg text-ink-soft max-w-xl leading-relaxed">
              18 applications mockées avec l'identité visuelle de leurs éditeurs et des données <em>cohérentes</em> de bout en bout. Une infrastructure pédagogique pour entraîner et présenter Aura sur des cas réels — sans NDA, sans dépendance client.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link to="/sector/$slug" params={{ slug: "retail" }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-ink text-paper text-sm font-medium hover:bg-ink/90 transition">
                SI Retail — Maison Lumen <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/sector/$slug" params={{ slug: "agro-food" }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-paper-elev border border-border text-ink text-sm font-medium hover:border-ink/40 transition">
                SI Agro — Fromagerie du Val <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href="#sectors" className="text-sm text-ink-soft hover:text-ink underline-offset-4 hover:underline">
                ↓ Tous les secteurs
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <LogoCollage />
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="border-b border-border bg-paper-elev">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            ["18", "Applications cataloguées"],
            [String(totalActive), "Apps actives livrées"],
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

      {/* Manifesto / pillars */}
      <section id="manifesto" className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-3 gap-10">
          <Pillar icon={<Layers className="h-4 w-4" />} title="Cohérence cross-systèmes" desc="Mêmes SKU, mêmes commandes, mêmes lots, mêmes clients. La commande SO-2026-018472 existe simultanément dans Shopify, SAP, Manhattan et Salesforce. Le lot L26157-CAM-A traverse AgroWare, X-Cube, QualiPlus et Divento." />
          <Pillar icon={<ShieldCheck className="h-4 w-4" />} title="Fidélité éditeur — sans IP" desc="Identité visuelle proche des SI réels (couleurs, structure de nav, terminologie métier), avec des noms d'apps volontairement inspirés. Suffisamment crédible pour la démo, suffisamment distinct pour éviter tout conflit de marque." />
          <Pillar icon={<GitBranch className="h-4 w-4" />} title="Pensé pour Aura" desc="Chaque app expose ses données comme un vrai SI le ferait : pour entraîner l'extraction, le mapping ontologique et les graphes causaux du Decision Compass." />
        </div>
      </section>

      {/* Sectors */}
      <section id="sectors" className="max-w-7xl mx-auto px-6 lg:px-10 py-20 space-y-20">
        {sectors.map((s) => (
          <SectorBlock key={s.slug} sector={s} />
        ))}
      </section>

      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 text-xs text-ink-soft flex flex-wrap justify-between gap-4">
          <span>Aura SI Hub · Environnement de démonstration. Les marques inspirées par des éditeurs réels appartiennent à leurs propriétaires respectifs.</span>
          <span className="font-mono">v2.1 · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}

function Logo() {
  return (
    <div className="relative h-10 w-10 rounded-lg bg-ink text-paper grid place-items-center overflow-hidden">
      <span className="font-display text-xl leading-none">A</span>
      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold" />
    </div>
  );
}

/** Floating wordmarks of the editors covered, arranged in an editorial collage. */
function LogoCollage() {
  const items = [
    { label: "SAP", color: "#0a6ed1", weight: "bold" },
    { label: "Cegid", color: "#e30613", weight: "semi" },
    { label: "shopify", color: "#008060", weight: "bold" },
    { label: "Manhattan", color: "#ef7d00", weight: "semi" },
    { label: "salesforce", color: "#00a1e0", weight: "bold" },
    { label: "o9", color: "#7c3aed", weight: "bold" },
    { label: "SAJE", color: "#00ad4d", weight: "bold" },
    { label: "AgroWare", color: "#2e7d32", weight: "semi" },
    { label: "QualiPlus", color: "#0066b3", weight: "semi" },
    { label: "TraceLink", color: "#003a70", weight: "semi" },
    { label: "Divento", color: "#0072ce", weight: "semi" },
    { label: "DataForge", color: "#ff3621", weight: "bold" },
  ];
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
      <div className="absolute inset-6 border border-border rounded-2xl bg-paper-elev/60 backdrop-blur-sm shadow-sm" />
      <div className="absolute inset-0 grid grid-cols-3 gap-2.5 p-8">
        {items.map((it, i) => (
          <div
            key={it.label + i}
            className="rounded-md bg-paper border border-border flex items-center justify-center px-2 py-3 shadow-sm hover:-translate-y-0.5 transition-transform"
            style={{ transform: `rotate(${(i % 3 - 1) * 1.2}deg)` }}
          >
            <span
              className="text-[13px] tracking-tight truncate"
              style={{ color: it.color, fontWeight: it.weight === "bold" ? 800 : 600, letterSpacing: it.label === "salesforce" || it.label === "shopify" ? "-0.02em" : undefined }}
            >
              {it.label}
            </span>
          </div>
        ))}
      </div>
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
      <p className="mt-2 text-sm text-ink-soft leading-relaxed">{desc}</p>
    </div>
  );
}

function SectorBlock({ sector }: { sector: typeof sectors[number] }) {
  const ready = sector.status === "ready";
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4 lg:sticky lg:top-24 self-start">
        <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">{sector.eyebrow}</div>
        <h2 className="font-display text-4xl lg:text-5xl mt-3 text-ink">{sector.title}</h2>
        <div className="text-sm text-ink-soft mt-2">{sector.legal}</div>
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
        {sector.apps.map((app) =>
          ready ? (
            <Link key={app.id} to="/apps/$appId" params={{ appId: app.id }} className="group border border-border bg-paper-elev rounded-lg p-4 hover:border-ink/40 hover:shadow-md transition-all">
              <AppCardInner app={app} active />
            </Link>
          ) : (
            <div key={app.id} className="border border-dashed border-border rounded-lg p-4 opacity-60">
              <AppCardInner app={app} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function AppCardInner({ app, active }: { app: AppCard; active?: boolean }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3">
        <div
          className="h-10 w-10 rounded-md grid place-items-center text-white text-[11px] font-extrabold tracking-tight shadow-sm"
          style={{ background: `linear-gradient(135deg, ${app.color}, color-mix(in oklab, ${app.color} 70%, black))` }}
        >
          {app.code}
        </div>
        <div className="leading-tight min-w-0">
          <div className="text-sm font-semibold text-ink truncate" style={{ letterSpacing: "-0.005em" }}>{app.name}</div>
          <div className="text-[11px] text-ink-soft truncate">{app.module} · {app.vendor}</div>
        </div>
      </div>
      <div className="mt-auto pt-4 flex items-center justify-between text-[11px]">
        <span className="font-mono text-ink-soft truncate">{app.id}.aura</span>
        {active ? (
          <span className="text-ink font-medium group-hover:text-gold transition-colors">Ouvrir →</span>
        ) : (
          <span className="text-ink-soft">Bientôt</span>
        )}
      </div>
    </div>
  );
}
