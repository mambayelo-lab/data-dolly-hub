import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, KeyRound } from "lucide-react";
import { apps as retailApps, company as retailCo } from "@/data/maisonLumen";
import { apps as agroApps, company as agroCo } from "@/data/fromagerieDuVal";
import { VendorLogo, type BrandKey } from "@/components/VendorLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aura SI Hub — SI mockés" },
      { name: "description", content: "SI mock complets pour sociétés témoins : 12 applications cliquables, données cohérentes cross-systèmes, coffre-fort de credentials." },
      { property: "og:title", content: "Aura SI Hub — SI mockés" },
      { property: "og:description", content: "SI mock complets pour sociétés témoins." },
    ],
  }),
  component: HubHome,
});

type Tile = { id: string; brand: BrandKey; vendor: string; module: string };

const retailTiles: Tile[] = retailApps.map((a) => ({ id: a.id, brand: a.id as BrandKey, vendor: a.vendor, module: a.module }));
const agroTiles: Tile[] = agroApps.map((a) => ({ id: a.id, brand: (a.id === "saje-x-cube" ? "saje" : a.id) as BrandKey, vendor: a.vendor, module: a.module }));

const sectors = [
  { slug: "retail", label: "Maison Lumen", sub: "Retail & Mode · " + retailCo.stores + " mag.", tiles: retailTiles },
  { slug: "agro-food", label: "Fromagerie du Val", sub: "Agro · " + agroCo.sites + " sites · " + agroCo.producers + " prod.", tiles: agroTiles },
] as const;

function HubHome() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative h-8 w-8 rounded-md bg-ink text-paper grid place-items-center">
              <span className="font-display text-base leading-none">A</span>
              <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold" />
            </div>
            <div className="font-display text-[15px]">Aura SI Hub</div>
          </div>
          <Link to="/vault" className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-border bg-paper-elev hover:border-ink/40">
            <KeyRound className="h-3.5 w-3.5" /> Coffre-fort
          </Link>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-14 pb-10">
          <h1 className="font-display text-4xl lg:text-5xl max-w-2xl leading-[1.05]">
            SI mock complets<br />pour sociétés témoins.
          </h1>
          <p className="mt-4 text-sm text-ink-soft max-w-xl">
            12 applications cliquables, données cohérentes de bout en bout.
          </p>
        </div>
      </section>

      {sectors.map((sec) => (
        <section key={sec.slug} className="border-b border-border">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-10">
            <div className="flex items-end justify-between mb-5">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">{sec.sub}</div>
                <h2 className="font-display text-2xl mt-1">{sec.label}</h2>
              </div>
              <Link to="/sector/$slug" params={{ slug: sec.slug }} className="text-xs text-ink-soft hover:text-ink inline-flex items-center gap-1">
                Présentation du SI <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {sec.tiles.map((t) => (
                <Link
                  key={t.id}
                  to="/apps/$appId"
                  params={{ appId: t.id }}
                  className="group rounded-lg border border-border bg-paper-elev hover:border-ink/40 hover:-translate-y-0.5 transition-all p-4 aspect-square flex flex-col items-center justify-center text-center"
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
        <span className="font-mono">v3.0</span>
      </footer>
    </div>
  );
}
