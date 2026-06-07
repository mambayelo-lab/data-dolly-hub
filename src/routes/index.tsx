import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, KeyRound, Sparkles } from "lucide-react";
import { apps as retailApps, company as retailCo } from "@/data/maisonLumen";
import { apps as agroApps, company as agroCo } from "@/data/fromagerieDuVal";
import { apps as indusApps, company as indusCo } from "@/data/helvexPrecision";
import { VendorLogo, type BrandKey } from "@/components/VendorLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura SI Hub — SI mockés" },
      { name: "description", content: "SI mock complets pour sociétés témoins : 18 applications cliquables, données cohérentes cross-systèmes, coffre-fort de credentials." },
      { property: "og:title", content: "Aura SI Hub — SI mockés" },
      { property: "og:description", content: "SI mock complets pour sociétés témoins." },
    ],
  }),
  component: HubHome,
});

type Tile = { id: string; brand: BrandKey; vendor: string; module: string };

const retailTiles: Tile[] = retailApps.map((a) => ({ id: a.id, brand: a.id as BrandKey, vendor: a.vendor, module: a.module }));
const agroTiles: Tile[] = agroApps.map((a) => ({
  id: a.id,
  brand: (a.id === "saje-x-cube" ? "saje" : a.id) as BrandKey,
  vendor: a.vendor, module: a.module,
}));
const indusTiles: Tile[] = indusApps.map((a) => ({
  id: a.id,
  brand: (a.id === "ifx-cloud" ? "ifx" : a.id === "dasselys-3dx" ? "dasselys" : a.id) as BrandKey,
  vendor: a.vendor, module: a.module,
}));

type Sector = {
  slug: "retail" | "agro-food" | "industry";
  band: string;
  accent: string;
  emoji: string;
  label: string;
  tagline: string;
  sub: string;
  tiles: Tile[];
};

const sectors: Sector[] = [
  { slug: "retail",    band: "sector-band-retail",   accent: "#ff7a59", emoji: "👗", label: "Maison Lumen",       tagline: "Retail & Mode",            sub: `${retailCo.stores} mag. · ${retailCo.employees.toLocaleString("fr-FR")} collab.`, tiles: retailTiles },
  { slug: "agro-food", band: "sector-band-agro",     accent: "#14b8a6", emoji: "🧀", label: "Fromagerie du Val",  tagline: "Agro-alimentaire · AOP",   sub: `${agroCo.sites} sites · ${agroCo.producers} producteurs`, tiles: agroTiles },
  { slug: "industry",  band: "sector-band-industry", accent: "#7c3aed", emoji: "⚙️", label: "Helvex Precision",   tagline: "Industrie · Aéro & Médical", sub: `${indusCo.sites} sites · ${indusCo.machines} machines`, tiles: indusTiles },
];

function HubHome() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded-md grid place-items-center text-white" style={{ background: "linear-gradient(135deg, #ff7a59, #7c3aed)" }}>
              <span className="font-display text-base leading-none">A</span>
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full" style={{ background: "#14b8a6" }} />
            </div>
            <div className="font-display text-[15px]">Aura SI Hub</div>
          </div>
          <div className="flex items-center gap-2">
            {sectors.map((s) => (
              <a key={s.slug} href={`#${s.slug}`} className="hidden sm:inline-flex text-xs px-2.5 py-1.5 rounded-md hover:bg-paper-elev text-ink-soft hover:text-ink">
                {s.emoji} {s.label}
              </a>
            ))}
            <Link to="/vault" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border bg-white hover:border-ink/40">
              <KeyRound className="h-3.5 w-3.5" /> Coffre-fort
            </Link>
          </div>
        </div>
      </header>

      <section className="hub-hero border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-16 pb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-semibold px-2.5 py-1 rounded-full bg-white border border-border text-ink-soft">
            <Sparkles className="h-3 w-3" /> 3 sociétés témoins · 18 applications
          </div>
          <h1 className="font-display text-4xl lg:text-6xl mt-5 leading-[1.02] max-w-3xl">
            SI mock complets<br />
            <span style={{ background: "linear-gradient(90deg, #ff7a59, #7c3aed 55%, #14b8a6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pour sociétés témoins.</span>
          </h1>
          <p className="mt-4 text-sm lg:text-base text-ink-soft max-w-xl">Cliquez un logo pour entrer dans l'application.</p>
        </div>
      </section>

      {sectors.map((sec) => (
        <section key={sec.slug} id={sec.slug} className={`${sec.band} border-b border-border`}>
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: sec.accent }}>{sec.tagline}</div>
                <h2 className="font-display text-3xl mt-1 flex items-center gap-2">{sec.emoji} {sec.label}</h2>
                <div className="text-xs text-ink-soft mt-1">{sec.sub}</div>
              </div>
              <Link to="/sector/$slug" params={{ slug: sec.slug }} className="text-xs inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white border border-border hover:border-ink/40">
                Présentation du SI <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {sec.tiles.map((t) => (
                <Link
                  key={t.id}
                  to="/apps/$appId"
                  params={{ appId: t.id }}
                  className="tile-pop group rounded-xl border border-border bg-white p-4 aspect-square flex flex-col items-center justify-center text-center"
                  style={{ borderTopColor: sec.accent, borderTopWidth: 3 }}
                >
                  <div className="flex-1 grid place-items-center">
                    <VendorLogo brand={t.brand} size="md" />
                  </div>
                  <div className="text-[10px] text-ink-soft mt-2 leading-tight">{t.module}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <footer className="max-w-6xl mx-auto px-6 lg:px-10 py-6 text-[11px] text-ink-soft flex justify-between">
        <span>Aura SI Hub · démo. Marques inspirées, propriétés de leurs ayants droit.</span>
        <span className="font-mono">v4.0</span>
      </footer>
    </div>
  );
}
