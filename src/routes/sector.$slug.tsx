import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { apps as retailApps, company as retailCo, products as retailProducts, stores, orders as retailOrders, fmtEUR as fmtRetail } from "@/data/maisonLumen";
import { apps as agroApps, company as agroCo, products as agroProducts, sites, prodOrders, distOrders, fmtEUR as fmtAgro } from "@/data/fromagerieDuVal";
import { apps as indusApps, company as indusCo, parts as indusParts, machines as indusMachines, workOrders as indusWO, purchaseOrders as indusPO, fmtEUR as fmtIndus } from "@/data/helvexPrecision";

type SectorSlug = "retail" | "agro-food" | "industry";

type SectorConfig = {
  slug: SectorSlug;
  eyebrow: string;
  brand: string;
  legal: string;
  siret: string;
  vat: string;
  description: string;
  stats: { label: string; value: string }[];
  apps: ReadonlyArray<{ id: string; code: string; name: string; vendor: string; module: string; color: string }>;
  appDescriptions: Record<string, string>;
  crossStory: { lead: string; body: string; cards: { label: string; value: string; desc: string }[] };
};

function retailConfig(): SectorConfig {
  const totalCA = retailOrders.reduce((s, o) => s + o.totalEUR, 0);
  return {
    slug: "retail",
    eyebrow: "Secteur Retail & Mode",
    brand: retailCo.brand,
    legal: retailCo.legalName,
    siret: retailCo.siret,
    vat: retailCo.vat,
    description:
      "Enseigne française de mode & lifestyle fondée en 2014. Distribution omnicanale : 180 boutiques en propre (Paris, régions, outlet) + e-shop FR/EU. Approvisionnement principal Italie, Portugal, Tunisie. Marges nettes 18 %, croissance 11 %/an.",
    stats: [
      { label: "Magasins", value: String(retailCo.stores) },
      { label: "Collaborateurs", value: retailCo.employees.toLocaleString("fr-FR") },
      { label: "CA annuel", value: fmtRetail(retailCo.revenueEUR) },
      { label: "Exercice", value: `FY ${retailCo.fiscalYear}` },
    ],
    apps: retailApps,
    appDescriptions: {
      sap: "ERP cœur — finance, achats, master data article, comptabilité fournisseurs. Source de vérité référentielle.",
      "cegid-y2": "POS magasins — encaissement, fidélité, gestion locale du stock vendeur. Remonte les ventes vers SAP.",
      shopify: "E-shop FR & EU — catalogue, commandes web, paiements Stripe. Synchronise avec Manhattan pour l'OMS.",
      manhattan: "OMS / WMS — orchestration omnicanale, stock unifié, ship-from-store, click & collect.",
      salesforce: "CRM clienteling — historique clients VIP, opportunités B2B (Hôtel Lutetia & co), parcours de fidélité.",
      o9: "Planification de la demande — prévisions hebdo par SKU, plans promo, S&OP, plan d'appro fournisseurs.",
    },
    crossStory: {
      lead: "Une commande, plusieurs vérités synchronisées",
      body: "La commande SO-2026-018472 existe avec les mêmes lignes, le même montant et le même statut dans toutes les apps qui la voient : Shopify (création), SAP (facturation), Manhattan (préparation), Salesforce (historique client).",
      cards: [
        { label: "SKU partagés", value: String(retailProducts.length), desc: "Référentiel article unique répliqué dans SAP, Cegid, Shopify et Manhattan." },
        { label: "Points de vente", value: String(stores.length), desc: "Magasins + e-shops synchronisés entre Cegid, Manhattan et SAP." },
        { label: "Commandes en base", value: String(retailOrders.length), desc: "Lignes identiques, mêmes statuts dans Shopify, SAP et Manhattan." },
        { label: "Volume orchestré", value: fmtRetail(totalCA), desc: "Somme commandes échantillon traversant les 6 systèmes." },
      ],
    },
  };
}

function agroConfig(): SectorConfig {
  const totalCA = distOrders.reduce((s, o) => s + o.totalHTEUR, 0);
  return {
    slug: "agro-food",
    eyebrow: "Secteur Agro-alimentaire",
    brand: agroCo.brand,
    legal: agroCo.legalName,
    siret: agroCo.siret,
    vat: agroCo.vat,
    description:
      "Coopérative laitière normande fondée en 1947. 3 sites de production (Pont-l'Évêque, Lisieux, Vire), 412 producteurs adhérents, certifications IFS Food v8 et BRC v9. Marques AOP Camembert de Normandie, Pont-l'Évêque, Livarot. 70 % GMS France, 20 % RHF, 10 % export.",
    stats: [
      { label: "Sites prod.", value: String(agroCo.sites) },
      { label: "Producteurs", value: String(agroCo.producers) },
      { label: "Collaborateurs", value: agroCo.employees.toLocaleString("fr-FR") },
      { label: "CA annuel", value: fmtAgro(agroCo.revenueEUR) },
    ],
    apps: agroApps,
    appDescriptions: {
      "saje-x-cube": "ERP industriel — production, MRP, stocks multi-sites, comptabilité. Cœur opérationnel du groupe.",
      agroware: "Gestion amont — collecte lait, tournées camions, qualité bactério, paie du lait producteurs.",
      qualiplus: "QHSE — non-conformités, plans d'actions, audits IFS/BRC, traçabilité lots et formations.",
      tracelink: "PLM — fiches recettes, cahiers des charges fournisseurs, déclarations nutri & allergènes (INCO).",
      divento: "Distribution — commandes GMS/RHF/export, tournées de livraison, tarifs, facturation B2B.",
      dataforge: "Lakehouse — pipelines Bronze/Silver/Gold, dashboards rendement, ML prévisionnel de la demande.",
    },
    crossStory: {
      lead: "Du producteur de lait au rayon GMS, une traçabilité continue",
      body: "Le lot L26157-CAM-A : collecté ce matin chez GAEC des Pommiers (AgroWare), transformé site Pont-l'Évêque (Saje X-Cube), validé qualité (QualiPlus), expédié à Carrefour Ouest demain matin (Divento). Toutes les apps voient le même lot avec les mêmes attributs.",
      cards: [
        { label: "Articles finis", value: String(agroProducts.length), desc: "SKU partagés entre PLM TraceLink, ERP X-Cube et distribution Divento." },
        { label: "Sites industriels", value: String(sites.length), desc: "Capacités, OF et stocks consolidés dans DataForge." },
        { label: "OF traçés", value: String(prodOrders.length), desc: "Lots cohérents entre production, qualité et expédition." },
        { label: "CA distribution (S23)", value: fmtAgro(totalCA), desc: "Commandes GMS, RHF, export & crémeries indépendantes." },
      ],
    },
  };
}

function industryConfig(): SectorConfig {
  const backlog = indusWO.filter((w) => w.status !== "Terminé").reduce((s, w) => {
    const p = indusParts.find((x) => x.pn === w.pn);
    return s + (p?.sellPriceEUR ?? p?.stdCostEUR ?? 0) * w.qty;
  }, 0);
  return {
    slug: "industry",
    eyebrow: "Secteur Industrie · Aéro & Médical",
    brand: indusCo.brand,
    legal: indusCo.legalName,
    siret: indusCo.siret,
    vat: indusCo.vat,
    description:
      "ETI française fondée en 1992 (siège Annecy). Fabricant de pièces mécaniques de précision pour l'aéronautique (Airbus, Safran, Dassault) et le médical (implants orthopédiques, instruments chirurgicaux). 3 sites : Annecy (5 axes), Cluses (décolletage), Saint-Étienne (assemblage & contrôle). Certifications EN 9100, ISO 13485, NADCAP.",
    stats: [
      { label: "Sites prod.", value: String(indusCo.sites) },
      { label: "Machines", value: String(indusCo.machines) },
      { label: "Collaborateurs", value: indusCo.employees.toLocaleString("fr-FR") },
      { label: "CA annuel", value: fmtIndus(indusCo.revenueEUR) },
    ],
    apps: indusApps,
    appDescriptions: {
      "ifx-cloud": "ERP industriel — ventes, OF, MRP, stocks multi-sites, coûts standards, comptabilité. Source de vérité.",
      "dasselys-3dx": "PLM & CAO 3D — articles, BOM, plans, ECN, maturité (RELEASED), gestion des configurations.",
      opcentral: "MES — exécution atelier, OEE temps réel, déclarations temps & quantités, SPC, andon, traçabilité.",
      wonderwave: "SCADA / Historian — supervision OPC-UA des machines, alarmes ISA-18.2, historique 90 j, audit trail.",
      coopa: "Source-to-Pay — requisitions, PO, factures, performance fournisseurs, contrats, sourcing événementiel.",
      maximoves: "GMAO — ordres de travail correctifs & préventifs, plans PM, pièces détachées, prédictif via SCADA.",
    },
    crossStory: {
      lead: "De la spécification client à la pièce expédiée, un fil d'information continu",
      body: "L'OF WO-2026-014821 (carter HX-AER-7831-A pour Airbus Atlantic) référence le même PN dans Dasselys (Rev. C), le même besoin matière (RAW-TI64-D80, 4.2 kg) dans IFX & Coopa, est exécuté sur MCH-A01 (OpCentral & Wonderwave), et déclenche l'OT prédictif WO-M-3044 dans MaxiMoves si vibrations détectées.",
      cards: [
        { label: "Articles & matières", value: String(indusParts.length), desc: "PN partagés entre PLM Dasselys, ERP IFX, MES OpCentral et Coopa." },
        { label: "Machines pilotées", value: String(indusMachines.length), desc: "Mêmes assets dans MES, SCADA Wonderwave et GMAO MaxiMoves." },
        { label: "OF en cours", value: String(indusWO.length), desc: "Ordres synchronisés ERP ↔ MES avec mêmes statuts et qty produites." },
        { label: "PO Achats", value: String(indusPO.length), desc: "Engagements Coopa rapatriés dans IFX Cloud pour les coûts projets." },
      ],
    },
  };
}

const sectorConfigs: Record<SectorSlug, () => SectorConfig> = {
  retail: retailConfig,
  "agro-food": agroConfig,
  industry: industryConfig,
};

export const Route = createFileRoute("/sector/$slug")({
  loader: ({ params }) => {
    const key = params.slug as SectorSlug;
    if (!(key in sectorConfigs)) throw notFound();
    return { config: sectorConfigs[key]() };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.config.brand} — ${loaderData.config.eyebrow} · Aura SI Hub` },
          { name: "description", content: `Vue d'ensemble du SI ${loaderData.config.brand} : 6 applications mockées avec données cohérentes cross-systèmes.` },
        ]
      : [],
  }),
  component: SectorPage,
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center text-ink-soft">Secteur non disponible pour l'instant.</div>
  ),
});

function SectorPage() {
  const { config } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm text-ink-soft hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Aura SI Hub
          </Link>
          <span className="text-[11px] uppercase tracking-widest text-ink-soft">{config.eyebrow}</span>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.18em] text-gold font-semibold">Entreprise témoin</div>
            <h1 className="font-display text-6xl mt-3">{config.brand}</h1>
            <div className="text-ink-soft mt-2">{config.legal} · SIRET {config.siret} · TVA {config.vat}</div>
            <p className="mt-6 text-lg text-ink-soft max-w-2xl leading-relaxed">{config.description}</p>
          </div>
          <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-10 grid grid-cols-2 gap-6">
            {config.stats.map((s: { label: string; value: string }) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-ink tabular-nums">{s.value}</div>
                <div className="text-[10px] uppercase tracking-wider text-ink-soft mt-1">{s.label}</div>
              </div>
            ))}
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
          {config.apps.map((a: { id: string; code: string; name: string; vendor: string; module: string; color: string }) => (
            <Link key={a.id} to="/apps/$appId" params={{ appId: a.id }} className="group border border-border bg-paper-elev rounded-lg p-5 hover:border-ink/40 hover:shadow-sm transition-all">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded grid place-items-center text-white text-xs font-bold" style={{ background: a.color }}>{a.code}</div>
                <div>
                  <div className="font-semibold text-sm">{a.name}</div>
                  <div className="text-[11px] text-ink-soft">{a.module} · {a.vendor}</div>
                </div>
              </div>
              <p className="text-xs text-ink-soft mt-4 leading-relaxed">{config.appDescriptions[a.id]}</p>
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
          <h2 className="font-display text-3xl mt-2">{config.crossStory.lead}</h2>
          <p className="text-sm text-ink-soft mt-3 max-w-3xl">{config.crossStory.body}</p>
          <div className="grid lg:grid-cols-4 gap-4 mt-6">
            {config.crossStory.cards.map((c: { label: string; value: string; desc: string }) => (
              <div key={c.label} className="bg-paper border border-border rounded-lg p-5">
                <div className="text-[10px] uppercase tracking-wider text-ink-soft">{c.label}</div>
                <div className="font-display text-3xl mt-1 tabular-nums">{c.value}</div>
                <p className="text-xs text-ink-soft mt-2 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
