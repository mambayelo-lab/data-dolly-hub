import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { apps, company, products, stores, orders, fmtEUR } from "@/data/maisonLumen";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/sector/$slug")({
  loader: ({ params }) => {
    if (params.slug !== "retail") throw notFound();
    return { slug: params.slug };
  },
  head: () => ({
    meta: [
      { title: "SI Retail — Maison Lumen · Aura SI Hub" },
      { name: "description", content: "Vue d'ensemble du SI Maison Lumen : 6 applications, données cohérentes, flux commande-to-cash et omnicanal." },
    ],
  }),
  component: SectorPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-ink-soft">Secteur non disponible pour l'instant.</div>
  ),
});

function SectorPage() {
  const totalCAOrders = orders.reduce((s, o) => s + o.totalEUR, 0);
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Aura SI Hub
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-ink-soft">Secteur Retail & Mode</span>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">Entreprise témoin</div>
            <h1 className="font-display text-6xl mt-3">{company.brand}</h1>
            <div className="text-ink-soft mt-2">{company.legalName} · SIRET {company.siret} · TVA {company.vat}</div>
            <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">
              Enseigne française de mode & lifestyle fondée en 2014. Distribution omnicanale : 180 boutiques en propre (Paris, régions, outlet) + e-shop FR/EU. Approvisionnement principal Italie, Portugal, Tunisie. Marges nettes 18 %, croissance 11 %/an.
            </p>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-10 grid grid-cols-2 gap-6">
            <Stat label="Magasins" value={String(company.stores)} />
            <Stat label="Collaborateurs" value={company.employees.toLocaleString("fr-FR")} />
            <Stat label="CA annuel" value={fmtEUR(company.revenueEUR)} />
            <Stat label="Exercice" value={`FY ${company.fiscalYear}`} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">Système d'information</div>
            <h2 className="font-display text-3xl mt-2">6 applications · 1 réalité</h2>
          </div>
          <div className="text-sm text-ink-soft">Chaque tuile ouvre l'app mockée fidèle à son éditeur.</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {apps.map((a) => (
            <Link key={a.id} to="/apps/$appId" params={{ appId: a.id }} className="group border border-border bg-paper-elev rounded-lg p-5 hover:border-ink/40 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded grid place-items-center text-white text-xs font-bold" style={{ background: a.color }}>{a.code}</div>
                <div>
                  <div className="font-semibold text-sm">{a.name}</div>
                  <div className="text-[11px] text-ink-soft">{a.module} · {a.vendor}</div>
                </div>
              </div>
              <p className="text-xs text-ink-soft mt-4 leading-relaxed">{descriptions[a.id]}</p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="font-mono text-ink-soft">{a.id}.aura</span>
                <span className="font-medium group-hover:text-gold inline-flex items-center gap-1">Ouvrir <ArrowUpRight className="h-3 w-3" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-paper-elev">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
          <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">Cohérence cross-systèmes</div>
          <h2 className="font-display text-3xl mt-2">Une commande, plusieurs vérités synchronisées</h2>
          <p className="text-sm text-ink-soft mt-3 max-w-3xl">
            La commande <span className="font-mono text-ink">SO-2026-018472</span> existe avec les mêmes lignes, le même montant et le même statut dans toutes les apps qui la voient :
            Shopify (création), SAP (facturation), Manhattan (préparation), Salesforce (historique client).
          </p>
          <div className="grid lg:grid-cols-4 gap-4 mt-6">
            <CrossCard label="SKU partagés" value={String(products.length)} desc="Référentiel article unique répliqué dans SAP, Cegid, Shopify et Manhattan." />
            <CrossCard label="Points de vente" value={String(stores.length)} desc="Magasins + e-shops synchronisés entre Cegid, Manhattan et SAP." />
            <CrossCard label="Commandes en base" value={String(orders.length)} desc="Lignes identiques, mêmes statuts dans Shopify, SAP et Manhattan." />
            <CrossCard label="Volume orchestré" value={fmtEUR(totalCAOrders)} desc="Somme commandes échantillon traversant les 6 systèmes." />
          </div>
        </div>
      </section>
    </div>
  );
}

const descriptions: Record<string, string> = {
  sap: "ERP cœur — finance, achats, master data article, comptabilité fournisseurs. Source de vérité référentielle.",
  "cegid-y2": "POS magasins — encaissement, fidélité, gestion locale du stock vendeur. Remonte les ventes vers SAP.",
  shopify: "E-shop FR & EU — catalogue, commandes web, paiements Stripe. Synchronise avec Manhattan pour l'OMS.",
  manhattan: "OMS / WMS — orchestration omnicanale, stock unifié, ship-from-store, click & collect.",
  salesforce: "CRM clienteling — historique clients VIP, opportunités B2B (Hôtel Lutetia & co), parcours de fidélité.",
  o9: "Planification de la demande — prévisions hebdo par SKU, plans promo, S&OP, plan d'appro fournisseurs.",
};

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-ink tabular-nums">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-ink-soft mt-1">{label}</div>
    </div>
  );
}

function CrossCard({ label, value, desc }: { label: string; value: string; desc: string }) {
  return (
    <div className="bg-paper border border-border rounded-lg p-5">
      <div className="text-[10px] uppercase tracking-wider text-ink-soft">{label}</div>
      <div className="font-display text-3xl mt-1 tabular-nums">{value}</div>
      <p className="text-xs text-ink-soft mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}
