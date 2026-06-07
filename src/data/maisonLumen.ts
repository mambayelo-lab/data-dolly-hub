/**
 * Maison Lumen — Dataset SI cohérent partagé entre les 6 applications du secteur Retail.
 * Toutes les apps (SAP, Cegid Y2, Shopify, Manhattan, Salesforce, o9) consomment ce module
 * pour garantir la cohérence cross-systèmes (mêmes SKU, mêmes commandes, mêmes stocks).
 *
 * Marque fictive : Maison Lumen — enseigne mode & lifestyle FR (180 magasins, 1 200 collab, CA 480 M€).
 */

export const company = {
  legalName: "Maison Lumen SAS",
  brand: "Maison Lumen",
  hq: "Paris, France",
  siret: "812 459 037 00018",
  vat: "FR47812459037",
  stores: 180,
  employees: 1200,
  revenueEUR: 480_000_000,
  fiscalYear: "2025",
} as const;

export type Product = {
  sku: string;
  ean: string;
  name: string;
  category: "Prêt-à-porter Femme" | "Prêt-à-porter Homme" | "Maroquinerie" | "Accessoires" | "Lifestyle Maison";
  collection: "PE25" | "AH25" | "Permanent";
  color: string;
  size: string;
  priceEUR: number;
  costEUR: number;
  marginPct: number;
  supplierId: string;
  countryOfOrigin: string;
  hsCode: string;
};

export const products: Product[] = [
  { sku: "ML-PE25-W-001", ean: "3760123456001", name: "Robe Solène lin", category: "Prêt-à-porter Femme", collection: "PE25", color: "Écru", size: "36-44", priceEUR: 189, costEUR: 62, marginPct: 67.2, supplierId: "SUP-PT-014", countryOfOrigin: "PT", hsCode: "6204.43" },
  { sku: "ML-PE25-W-002", ean: "3760123456018", name: "Chemise Marin coton", category: "Prêt-à-porter Femme", collection: "PE25", color: "Bleu rayé", size: "36-44", priceEUR: 95, costEUR: 28, marginPct: 70.5, supplierId: "SUP-TN-008", countryOfOrigin: "TN", hsCode: "6206.30" },
  { sku: "ML-PE25-M-014", ean: "3760123456032", name: "Polo Côte d'Azur piqué", category: "Prêt-à-porter Homme", collection: "PE25", color: "Marine", size: "S-XXL", priceEUR: 79, costEUR: 22, marginPct: 72.1, supplierId: "SUP-TN-008", countryOfOrigin: "TN", hsCode: "6105.10" },
  { sku: "ML-PE25-M-021", ean: "3760123456049", name: "Pantalon Riviera chino", category: "Prêt-à-porter Homme", collection: "PE25", color: "Beige", size: "38-50", priceEUR: 119, costEUR: 39, marginPct: 67.2, supplierId: "SUP-PT-014", countryOfOrigin: "PT", hsCode: "6203.42" },
  { sku: "ML-AH25-W-101", ean: "3760123456056", name: "Manteau Belleville laine", category: "Prêt-à-porter Femme", collection: "AH25", color: "Camel", size: "36-44", priceEUR: 449, costEUR: 168, marginPct: 62.6, supplierId: "SUP-IT-002", countryOfOrigin: "IT", hsCode: "6202.11" },
  { sku: "ML-AH25-W-104", ean: "3760123456063", name: "Pull Montmartre cachemire", category: "Prêt-à-porter Femme", collection: "AH25", color: "Gris perle", size: "36-44", priceEUR: 245, costEUR: 89, marginPct: 63.7, supplierId: "SUP-IT-002", countryOfOrigin: "IT", hsCode: "6110.12" },
  { sku: "ML-AH25-M-118", ean: "3760123456070", name: "Caban Saint-Germain", category: "Prêt-à-porter Homme", collection: "AH25", color: "Marine", size: "S-XXL", priceEUR: 389, costEUR: 142, marginPct: 63.5, supplierId: "SUP-IT-002", countryOfOrigin: "IT", hsCode: "6201.11" },
  { sku: "ML-PERM-MAR-301", ean: "3760123456087", name: "Sac Odéon cuir grainé", category: "Maroquinerie", collection: "Permanent", color: "Noir", size: "TU", priceEUR: 595, costEUR: 178, marginPct: 70.1, supplierId: "SUP-IT-019", countryOfOrigin: "IT", hsCode: "4202.21" },
  { sku: "ML-PERM-MAR-302", ean: "3760123456094", name: "Sac Odéon cuir grainé", category: "Maroquinerie", collection: "Permanent", color: "Cognac", size: "TU", priceEUR: 595, costEUR: 178, marginPct: 70.1, supplierId: "SUP-IT-019", countryOfOrigin: "IT", hsCode: "4202.21" },
  { sku: "ML-PERM-MAR-310", ean: "3760123456100", name: "Portefeuille Tuileries", category: "Maroquinerie", collection: "Permanent", color: "Bordeaux", size: "TU", priceEUR: 189, costEUR: 54, marginPct: 71.4, supplierId: "SUP-IT-019", countryOfOrigin: "IT", hsCode: "4202.31" },
  { sku: "ML-PE25-ACC-405", ean: "3760123456117", name: "Carré de soie Étoile 90", category: "Accessoires", collection: "PE25", color: "Multicolore", size: "90x90", priceEUR: 165, costEUR: 41, marginPct: 75.2, supplierId: "SUP-IT-022", countryOfOrigin: "IT", hsCode: "6214.10" },
  { sku: "ML-PERM-ACC-412", ean: "3760123456124", name: "Ceinture Concorde cuir", category: "Accessoires", collection: "Permanent", color: "Noir", size: "85-105", priceEUR: 125, costEUR: 34, marginPct: 72.8, supplierId: "SUP-IT-019", countryOfOrigin: "IT", hsCode: "4203.30" },
  { sku: "ML-PERM-LH-501", ean: "3760123456131", name: "Bougie Lumen 220g", category: "Lifestyle Maison", collection: "Permanent", color: "Fig & Cèdre", size: "220g", priceEUR: 49, costEUR: 11, marginPct: 77.6, supplierId: "SUP-FR-031", countryOfOrigin: "FR", hsCode: "3406.00" },
  { sku: "ML-PERM-LH-510", ean: "3760123456148", name: "Plaid Vendôme laine", category: "Lifestyle Maison", collection: "Permanent", color: "Écru chevrons", size: "130x180", priceEUR: 229, costEUR: 78, marginPct: 65.9, supplierId: "SUP-PT-014", countryOfOrigin: "PT", hsCode: "6301.20" },
];

export type Store = {
  code: string;
  name: string;
  city: string;
  region: string;
  format: "Flagship" | "Standard" | "Outlet" | "Pop-up";
  m2: number;
  openedAt: string;
};

export const stores: Store[] = [
  { code: "FR-001", name: "Paris Saint-Honoré", city: "Paris", region: "Île-de-France", format: "Flagship", m2: 620, openedAt: "2014-09-12" },
  { code: "FR-002", name: "Paris Le Marais", city: "Paris", region: "Île-de-France", format: "Standard", m2: 280, openedAt: "2017-03-20" },
  { code: "FR-014", name: "Lyon Presqu'île", city: "Lyon", region: "AURA", format: "Standard", m2: 310, openedAt: "2016-10-04" },
  { code: "FR-021", name: "Bordeaux Intendance", city: "Bordeaux", region: "Nouvelle-Aquitaine", format: "Standard", m2: 240, openedAt: "2018-11-15" },
  { code: "FR-034", name: "Lille Vieille Bourse", city: "Lille", region: "Hauts-de-France", format: "Standard", m2: 220, openedAt: "2019-05-30" },
  { code: "FR-048", name: "Marseille Vieux-Port", city: "Marseille", region: "PACA", format: "Standard", m2: 260, openedAt: "2020-06-18" },
  { code: "FR-072", name: "Cannes Croisette", city: "Cannes", region: "PACA", format: "Flagship", m2: 410, openedAt: "2021-04-10" },
  { code: "FR-099", name: "Troyes Outlet", city: "Troyes", region: "Grand Est", format: "Outlet", m2: 540, openedAt: "2015-11-22" },
  { code: "WEB-FR", name: "Maison Lumen .fr (E-shop)", city: "—", region: "Online", format: "Standard", m2: 0, openedAt: "2015-02-01" },
  { code: "WEB-EU", name: "Maison Lumen Europe (E-shop)", city: "—", region: "Online", format: "Standard", m2: 0, openedAt: "2019-09-15" },
];

export type Customer = {
  id: string;
  name: string;
  email: string;
  city: string;
  segment: "VIP" | "Loyal" | "Régulier" | "Nouveau" | "B2B";
  lifetimeValueEUR: number;
  ordersCount: number;
  lastOrderAt: string;
};

export const customers: Customer[] = [
  { id: "CUST-100245", name: "Camille Berthier", email: "c.berthier@orange.fr", city: "Paris", segment: "VIP", lifetimeValueEUR: 14820, ordersCount: 38, lastOrderAt: "2026-05-28" },
  { id: "CUST-100312", name: "Antoine Marchal", email: "a.marchal@gmail.com", city: "Lyon", segment: "Loyal", lifetimeValueEUR: 6240, ordersCount: 21, lastOrderAt: "2026-05-31" },
  { id: "CUST-100489", name: "Inès Lefèvre", email: "ines.lf@protonmail.com", city: "Bordeaux", segment: "VIP", lifetimeValueEUR: 19450, ordersCount: 47, lastOrderAt: "2026-06-04" },
  { id: "CUST-100517", name: "Hugo Pellerin", email: "h.pellerin@free.fr", city: "Lille", segment: "Régulier", lifetimeValueEUR: 1820, ordersCount: 7, lastOrderAt: "2026-05-12" },
  { id: "CUST-100624", name: "Sarah Cohen-Levy", email: "sarah.cl@me.com", city: "Marseille", segment: "Loyal", lifetimeValueEUR: 4980, ordersCount: 16, lastOrderAt: "2026-06-02" },
  { id: "CUST-100701", name: "Mathieu Andriamanjato", email: "m.andria@gmail.com", city: "Paris", segment: "Nouveau", lifetimeValueEUR: 389, ordersCount: 1, lastOrderAt: "2026-06-06" },
  { id: "CUST-B2B-042", name: "Hôtel Lutetia (Concierge)", email: "concierge@lutetia.fr", city: "Paris", segment: "B2B", lifetimeValueEUR: 58400, ordersCount: 92, lastOrderAt: "2026-06-05" },
  { id: "CUST-100856", name: "Elena Rossi", email: "elena.rossi@libero.it", city: "Milan", segment: "Loyal", lifetimeValueEUR: 7120, ordersCount: 19, lastOrderAt: "2026-05-26" },
];

export type OrderChannel = "Magasin" | "E-shop FR" | "E-shop EU" | "Click & Collect" | "B2B";
export type OrderStatus = "Confirmée" | "En préparation" | "Expédiée" | "Livrée" | "Retour partiel" | "Annulée";

export type Order = {
  id: string;
  date: string;
  channel: OrderChannel;
  storeCode: string;
  customerId: string;
  lines: { sku: string; qty: number; unitPriceEUR: number }[];
  totalEUR: number;
  status: OrderStatus;
  shipTo: string;
  carrier?: "Chronopost" | "Colissimo" | "UPS" | "DHL" | "Retrait magasin";
  tracking?: string;
};

const line = (sku: string, qty: number) => {
  const p = products.find((x) => x.sku === sku)!;
  return { sku, qty, unitPriceEUR: p.priceEUR };
};
const total = (ls: { qty: number; unitPriceEUR: number }[]) =>
  ls.reduce((s, l) => s + l.qty * l.unitPriceEUR, 0);

const mkOrder = (
  id: string,
  date: string,
  channel: OrderChannel,
  storeCode: string,
  customerId: string,
  skus: [string, number][],
  status: OrderStatus,
  shipTo: string,
  carrier?: Order["carrier"],
  tracking?: string,
): Order => {
  const lines = skus.map(([s, q]) => line(s, q));
  return { id, date, channel, storeCode, customerId, lines, totalEUR: total(lines), status, shipTo, carrier, tracking };
};

export const orders: Order[] = [
  mkOrder("SO-2026-018472", "2026-06-06", "E-shop FR", "WEB-FR", "CUST-100701", [["ML-PE25-W-002", 1], ["ML-PERM-LH-501", 2]], "En préparation", "12 rue de Turenne, 75003 Paris", "Colissimo", "6A12345678901"),
  mkOrder("SO-2026-018471", "2026-06-06", "Magasin", "FR-001", "CUST-100245", [["ML-PERM-MAR-301", 1], ["ML-PERM-ACC-412", 1]], "Livrée", "Retrait sur place", "Retrait magasin"),
  mkOrder("SO-2026-018470", "2026-06-05", "B2B", "WEB-FR", "CUST-B2B-042", [["ML-PERM-LH-501", 48], ["ML-PE25-ACC-405", 12]], "Expédiée", "45 bd Raspail, 75006 Paris", "Chronopost", "XK456712398FR"),
  mkOrder("SO-2026-018465", "2026-06-04", "E-shop EU", "WEB-EU", "CUST-100856", [["ML-AH25-W-101", 1]], "Expédiée", "Via Montenapoleone 8, 20121 Milano", "DHL", "JD0014682591IT"),
  mkOrder("SO-2026-018461", "2026-06-04", "Click & Collect", "FR-021", "CUST-100489", [["ML-PERM-MAR-302", 1], ["ML-AH25-W-104", 1]], "Confirmée", "Retrait Bordeaux Intendance", "Retrait magasin"),
  mkOrder("SO-2026-018458", "2026-06-03", "Magasin", "FR-014", "CUST-100312", [["ML-PE25-M-014", 2], ["ML-PE25-M-021", 1]], "Livrée", "Retrait sur place", "Retrait magasin"),
  mkOrder("SO-2026-018455", "2026-06-02", "E-shop FR", "WEB-FR", "CUST-100624", [["ML-PE25-W-001", 1], ["ML-PE25-ACC-405", 1]], "Livrée", "18 rue Paradis, 13001 Marseille", "Colissimo", "6A12345678875"),
  mkOrder("SO-2026-018448", "2026-05-31", "E-shop FR", "WEB-FR", "CUST-100312", [["ML-AH25-M-118", 1]], "Retour partiel", "32 rue Mercière, 69002 Lyon", "Chronopost", "XK456712301FR"),
  mkOrder("SO-2026-018442", "2026-05-28", "Magasin", "FR-072", "CUST-100245", [["ML-AH25-W-101", 1], ["ML-PERM-MAR-301", 1]], "Livrée", "Retrait sur place", "Retrait magasin"),
  mkOrder("SO-2026-018431", "2026-05-26", "E-shop EU", "WEB-EU", "CUST-100856", [["ML-PERM-MAR-310", 1], ["ML-PE25-ACC-405", 2]], "Livrée", "Via Montenapoleone 8, 20121 Milano", "DHL", "JD0014682402IT"),
];

/**
 * Stock par SKU x magasin (extrait représentatif — Manhattan OMS expose la maille complète).
 */
export type StockLine = { sku: string; storeCode: string; onHand: number; reserved: number; inTransit: number };

export const stock: StockLine[] = [
  { sku: "ML-PERM-MAR-301", storeCode: "FR-001", onHand: 14, reserved: 2, inTransit: 6 },
  { sku: "ML-PERM-MAR-301", storeCode: "FR-072", onHand: 8, reserved: 1, inTransit: 0 },
  { sku: "ML-PERM-MAR-301", storeCode: "WEB-FR", onHand: 42, reserved: 5, inTransit: 24 },
  { sku: "ML-PERM-MAR-302", storeCode: "FR-021", onHand: 6, reserved: 1, inTransit: 0 },
  { sku: "ML-AH25-W-101", storeCode: "WEB-EU", onHand: 28, reserved: 2, inTransit: 60 },
  { sku: "ML-AH25-W-101", storeCode: "FR-072", onHand: 12, reserved: 0, inTransit: 0 },
  { sku: "ML-PE25-W-001", storeCode: "WEB-FR", onHand: 86, reserved: 3, inTransit: 0 },
  { sku: "ML-PE25-W-002", storeCode: "WEB-FR", onHand: 124, reserved: 4, inTransit: 0 },
  { sku: "ML-PE25-M-014", storeCode: "FR-014", onHand: 32, reserved: 1, inTransit: 0 },
  { sku: "ML-PERM-LH-501", storeCode: "WEB-FR", onHand: 412, reserved: 12, inTransit: 240 },
  { sku: "ML-PERM-LH-501", storeCode: "FR-001", onHand: 56, reserved: 0, inTransit: 0 },
  { sku: "ML-PE25-ACC-405", storeCode: "WEB-FR", onHand: 78, reserved: 3, inTransit: 0 },
];

/**
 * Prévisions de demande o9 — 8 semaines glissantes, par SKU agrégé tous canaux.
 */
export type ForecastPoint = { sku: string; weekISO: string; baseline: number; promoLift: number; final: number };

const weeks = ["2026-W23", "2026-W24", "2026-W25", "2026-W26", "2026-W27", "2026-W28", "2026-W29", "2026-W30"];

export const forecast: ForecastPoint[] = (
  [
    ["ML-PE25-W-001", [42, 48, 55, 62, 58, 51, 44, 38]],
    ["ML-PE25-W-002", [61, 68, 72, 78, 74, 66, 58, 51]],
    ["ML-PE25-M-014", [55, 62, 70, 76, 80, 72, 64, 56]],
    ["ML-PERM-MAR-301", [18, 19, 21, 22, 24, 26, 28, 30]],
    ["ML-AH25-W-101", [8, 10, 14, 18, 24, 32, 41, 52]],
    ["ML-PERM-LH-501", [120, 124, 130, 138, 142, 148, 156, 168]],
  ] as [string, number[]][]
).flatMap(([sku, series]) =>
  series.map((baseline, i) => {
    const promoLift = sku === "ML-PE25-M-014" && i >= 2 && i <= 4 ? Math.round(baseline * 0.35) : 0;
    return { sku, weekISO: weeks[i], baseline, promoLift, final: baseline + promoLift };
  }),
);

/** Catalogue éditeur des 6 applications du SI Retail. */
export const apps = [
  { id: "sap", code: "SA", name: "SAP S/4HANA", vendor: "SAP", module: "ERP Finance & Achats", color: "#0a6ed1", brand: "SAP" },
  { id: "cegid-y2", code: "Y2", name: "Cegid Retail Y2", vendor: "Cegid", module: "POS / Retail", color: "#e30613", brand: "Cegid" },
  { id: "shopify", code: "SH", name: "Shopify Admin", vendor: "Shopify", module: "E-commerce", color: "#008060", brand: "Shopify" },
  { id: "manhattan", code: "MA", name: "Manhattan Active Omni", vendor: "Manhattan Associates", module: "WMS / OMS", color: "#ef7d00", brand: "Manhattan" },
  { id: "salesforce", code: "SF", name: "Salesforce Sales Cloud", vendor: "Salesforce", module: "CRM", color: "#00a1e0", brand: "Salesforce" },
  { id: "o9", code: "O9", name: "o9 Demand Planning", vendor: "o9 Solutions", module: "S&OP", color: "#7c3aed", brand: "o9" },
] as const;

export type AppId = (typeof apps)[number]["id"];

/** Helpers d'agrégation pour les KPIs cross-systèmes. */
export const fmtEUR = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

export const totalOnHand = (sku: string) =>
  stock.filter((s) => s.sku === sku).reduce((a, b) => a + b.onHand, 0);

export const skuName = (sku: string) => products.find((p) => p.sku === sku)?.name ?? sku;
