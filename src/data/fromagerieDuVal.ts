/**
 * Fromagerie du Val — Dataset SI cohérent partagé entre les 6 applications du secteur Agro-alimentaire.
 * Coopérative laitière normande fictive. Données cohérentes entre Saje X-Cube (ERP), AgroWare (amont),
 * QualiPlus (QHSE), TraceLink (PLM), Divento (distribution) et DataForge (lakehouse).
 *
 * Marques d'application volontairement inspirées (et non identiques) des éditeurs Sage X3, Agriware 365,
 * Qualipro, Trace One, Divalto, Databricks — pour éviter tout conflit de propriété intellectuelle.
 */

export const company = {
  legalName: "Coopérative Fromagerie du Val SCA",
  brand: "Fromagerie du Val",
  hq: "Pont-l'Évêque, Normandie",
  siret: "382 615 740 00027",
  vat: "FR38382615740",
  sites: 3,
  employees: 850,
  producers: 412,
  revenueEUR: 290_000_000,
  fiscalYear: "2025",
  certifications: ["IFS Food v8", "BRC Global Standard", "AOP Camembert de Normandie", "Bio FR-BIO-01"],
} as const;

/** Sites de production. */
export type Site = { code: string; name: string; city: string; type: "Affinage" | "Transformation" | "Conditionnement"; capacityTonsYear: number };
export const sites: Site[] = [
  { code: "SITE-PEV", name: "Site Pont-l'Évêque", city: "Pont-l'Évêque", type: "Transformation", capacityTonsYear: 14500 },
  { code: "SITE-LIS", name: "Site Lisieux", city: "Lisieux", type: "Affinage", capacityTonsYear: 9800 },
  { code: "SITE-VIR", name: "Site Vire", city: "Vire", type: "Conditionnement", capacityTonsYear: 11200 },
];

/** Producteurs laitiers adhérents (extrait). */
export type Producer = { id: string; name: string; commune: string; herd: number; litersDay: number; cert: "AOP" | "Bio" | "Standard" };
export const producers: Producer[] = [
  { id: "PROD-N-014", name: "GAEC des Pommiers", commune: "Beuvron-en-Auge", herd: 86, litersDay: 2400, cert: "AOP" },
  { id: "PROD-N-027", name: "EARL du Pré Vert", commune: "Cambremer", herd: 64, litersDay: 1850, cert: "Bio" },
  { id: "PROD-N-041", name: "Ferme de la Vallée", commune: "Livarot", herd: 110, litersDay: 3100, cert: "AOP" },
  { id: "PROD-N-058", name: "GAEC Saint-Pierre", commune: "Vimoutiers", herd: 92, litersDay: 2620, cert: "Standard" },
  { id: "PROD-N-073", name: "Ferme du Bocage", commune: "Vire", herd: 78, litersDay: 2180, cert: "Bio" },
  { id: "PROD-N-089", name: "EARL des Quatre Vents", commune: "Orbec", herd: 54, litersDay: 1520, cert: "Standard" },
];

/** Articles finis (SKU partagé entre ERP, PLM, Distribution, DataForge). */
export type Product = {
  sku: string;
  gtin: string;
  name: string;
  family: "Pâte molle AOP" | "Pâte molle" | "Pâte pressée" | "Ultra-frais" | "Beurre & Crème";
  format: string;
  netWeightG: number;
  shelfLifeDays: number;
  priceHTEUR: number;
  costEUR: number;
  recipeId: string;
  allergens: string[];
};
export const products: Product[] = [
  { sku: "FDV-CAM-AOP-250", gtin: "3402145002508", name: "Camembert du Val AOP", family: "Pâte molle AOP", format: "Boîte bois 250g", netWeightG: 250, shelfLifeDays: 42, priceHTEUR: 3.45, costEUR: 1.82, recipeId: "REC-CAM-001", allergens: ["Lait"] },
  { sku: "FDV-PEV-AOP-220", gtin: "3402145002218", name: "Pont-l'Évêque du Val AOP", family: "Pâte molle AOP", format: "Carré 220g", netWeightG: 220, shelfLifeDays: 35, priceHTEUR: 4.10, costEUR: 2.18, recipeId: "REC-PEV-001", allergens: ["Lait"] },
  { sku: "FDV-LIV-AOP-450", gtin: "3402145004505", name: "Livarot du Val AOP", family: "Pâte molle AOP", format: "Roue 450g", netWeightG: 450, shelfLifeDays: 38, priceHTEUR: 7.95, costEUR: 4.20, recipeId: "REC-LIV-001", allergens: ["Lait"] },
  { sku: "FDV-NEU-200", gtin: "3402145002003", name: "Neufchâtel cœur 200g", family: "Pâte molle", format: "Cœur 200g", netWeightG: 200, shelfLifeDays: 30, priceHTEUR: 3.20, costEUR: 1.65, recipeId: "REC-NEU-001", allergens: ["Lait"] },
  { sku: "FDV-MIM-1000", gtin: "3402145010001", name: "Mimolette du Val 12 mois", family: "Pâte pressée", format: "Demi-boule 1kg", netWeightG: 1000, shelfLifeDays: 120, priceHTEUR: 14.80, costEUR: 7.40, recipeId: "REC-MIM-001", allergens: ["Lait"] },
  { sku: "FDV-YAO-NAT-125x4", gtin: "3402145012500", name: "Yaourt nature ferme 125g x4", family: "Ultra-frais", format: "Pot verre x4", netWeightG: 500, shelfLifeDays: 28, priceHTEUR: 2.45, costEUR: 0.92, recipeId: "REC-YAO-001", allergens: ["Lait"] },
  { sku: "FDV-BEU-DEM-250", gtin: "3402145002553", name: "Beurre demi-sel barattes 250g", family: "Beurre & Crème", format: "Plaquette 250g", netWeightG: 250, shelfLifeDays: 90, priceHTEUR: 2.85, costEUR: 1.35, recipeId: "REC-BEU-001", allergens: ["Lait"] },
  { sku: "FDV-CRE-CRU-200", gtin: "3402145002201", name: "Crème crue fermière 200ml", family: "Beurre & Crème", format: "Pot 200ml", netWeightG: 200, shelfLifeDays: 14, priceHTEUR: 2.30, costEUR: 0.98, recipeId: "REC-CRE-001", allergens: ["Lait"] },
];

/** Recettes / cahiers des charges PLM (TraceLink). */
export type Recipe = { id: string; productSku: string; version: string; status: "Actif" | "En revue" | "Archivé"; pH: number; saltPct: number; fatPct: number; updatedAt: string; owner: string };
export const recipes: Recipe[] = [
  { id: "REC-CAM-001", productSku: "FDV-CAM-AOP-250", version: "v4.2", status: "Actif", pH: 4.7, saltPct: 1.8, fatPct: 22.0, updatedAt: "2026-02-18", owner: "M. Lecuyer" },
  { id: "REC-PEV-001", productSku: "FDV-PEV-AOP-220", version: "v3.1", status: "Actif", pH: 5.1, saltPct: 2.0, fatPct: 24.5, updatedAt: "2025-11-04", owner: "M. Lecuyer" },
  { id: "REC-LIV-001", productSku: "FDV-LIV-AOP-450", version: "v2.8", status: "En revue", pH: 5.3, saltPct: 2.4, fatPct: 26.0, updatedAt: "2026-05-22", owner: "S. Hervé" },
  { id: "REC-NEU-001", productSku: "FDV-NEU-200", version: "v2.0", status: "Actif", pH: 4.5, saltPct: 1.6, fatPct: 20.0, updatedAt: "2025-09-12", owner: "M. Lecuyer" },
  { id: "REC-MIM-001", productSku: "FDV-MIM-1000", version: "v1.5", status: "Actif", pH: 5.6, saltPct: 1.4, fatPct: 28.0, updatedAt: "2024-06-30", owner: "B. Tanguy" },
  { id: "REC-YAO-001", productSku: "FDV-YAO-NAT-125x4", version: "v5.0", status: "Actif", pH: 4.3, saltPct: 0.1, fatPct: 3.5, updatedAt: "2026-04-08", owner: "S. Hervé" },
  { id: "REC-BEU-001", productSku: "FDV-BEU-DEM-250", version: "v3.4", status: "Actif", pH: 6.5, saltPct: 1.7, fatPct: 82.0, updatedAt: "2026-01-21", owner: "B. Tanguy" },
  { id: "REC-CRE-001", productSku: "FDV-CRE-CRU-200", version: "v2.2", status: "Actif", pH: 6.7, saltPct: 0.0, fatPct: 35.0, updatedAt: "2025-12-15", owner: "B. Tanguy" },
];

/** Ordres de fabrication / lots — partagés ERP + Qualité + Lakehouse. */
export type ProdOrder = {
  id: string;
  date: string;
  siteCode: string;
  productSku: string;
  plannedQtyKg: number;
  producedKg: number;
  yieldPct: number;
  lotId: string;
  status: "Planifié" | "En cours" | "Terminé" | "Bloqué qualité";
};
export const prodOrders: ProdOrder[] = [
  { id: "OF-2026-04812", date: "2026-06-06", siteCode: "SITE-PEV", productSku: "FDV-CAM-AOP-250", plannedQtyKg: 4200, producedKg: 4118, yieldPct: 98.0, lotId: "L26157-CAM-A", status: "Terminé" },
  { id: "OF-2026-04813", date: "2026-06-06", siteCode: "SITE-PEV", productSku: "FDV-PEV-AOP-220", plannedQtyKg: 2800, producedKg: 2754, yieldPct: 98.4, lotId: "L26157-PEV-B", status: "Terminé" },
  { id: "OF-2026-04815", date: "2026-06-06", siteCode: "SITE-LIS", productSku: "FDV-LIV-AOP-450", plannedQtyKg: 1800, producedKg: 0, yieldPct: 0, lotId: "L26157-LIV-A", status: "En cours" },
  { id: "OF-2026-04818", date: "2026-06-05", siteCode: "SITE-VIR", productSku: "FDV-YAO-NAT-125x4", plannedQtyKg: 6500, producedKg: 6480, yieldPct: 99.7, lotId: "L26156-YAO-C", status: "Terminé" },
  { id: "OF-2026-04820", date: "2026-06-05", siteCode: "SITE-PEV", productSku: "FDV-NEU-200", plannedQtyKg: 1500, producedKg: 1380, yieldPct: 92.0, lotId: "L26156-NEU-A", status: "Bloqué qualité" },
  { id: "OF-2026-04822", date: "2026-06-04", siteCode: "SITE-VIR", productSku: "FDV-BEU-DEM-250", plannedQtyKg: 3200, producedKg: 3192, yieldPct: 99.8, lotId: "L26155-BEU-D", status: "Terminé" },
  { id: "OF-2026-04825", date: "2026-06-07", siteCode: "SITE-LIS", productSku: "FDV-MIM-1000", plannedQtyKg: 2400, producedKg: 0, yieldPct: 0, lotId: "L26158-MIM-A", status: "Planifié" },
];

/** Non-conformités QHSE (QualiPlus) — référencent les mêmes lots que la prod. */
export type NCEntry = {
  id: string;
  openedAt: string;
  lotId: string;
  type: "Bactério" | "Allergène" | "Étiquetage" | "Corps étranger" | "Température";
  severity: "Mineure" | "Majeure" | "Critique";
  status: "Ouverte" | "En traitement" | "Clôturée";
  owner: string;
  actions: number;
};
export const nonConformities: NCEntry[] = [
  { id: "NC-2026-0287", openedAt: "2026-06-05", lotId: "L26156-NEU-A", type: "Bactério", severity: "Majeure", status: "En traitement", owner: "S. Hervé", actions: 4 },
  { id: "NC-2026-0285", openedAt: "2026-06-03", lotId: "L26154-CAM-B", type: "Étiquetage", severity: "Mineure", status: "Clôturée", owner: "A. Mahé", actions: 2 },
  { id: "NC-2026-0282", openedAt: "2026-06-01", lotId: "L26152-LIV-A", type: "Température", severity: "Majeure", status: "Clôturée", owner: "J. Postel", actions: 5 },
  { id: "NC-2026-0279", openedAt: "2026-05-28", lotId: "L26148-BEU-C", type: "Corps étranger", severity: "Critique", status: "Clôturée", owner: "S. Hervé", actions: 8 },
  { id: "NC-2026-0276", openedAt: "2026-05-26", lotId: "L26146-YAO-A", type: "Bactério", severity: "Mineure", status: "Clôturée", owner: "A. Mahé", actions: 3 },
  { id: "NC-2026-0274", openedAt: "2026-05-22", lotId: "L26142-MIM-A", type: "Étiquetage", severity: "Mineure", status: "Ouverte", owner: "A. Mahé", actions: 1 },
];

/** Clients & commandes distribution (Divento). */
export type DistCustomer = { id: string; name: string; channel: "GMS" | "RHF" | "Export" | "Crèmerie indé"; region: string; deliveryDay: string };
export const distCustomers: DistCustomer[] = [
  { id: "CLI-GMS-001", name: "Centrale Carrefour Ouest", channel: "GMS", region: "Bretagne / Normandie", deliveryDay: "Mardi" },
  { id: "CLI-GMS-002", name: "Leclerc SCAOuest", channel: "GMS", region: "Pays de la Loire", deliveryDay: "Jeudi" },
  { id: "CLI-GMS-003", name: "Système U Ouest", channel: "GMS", region: "Normandie", deliveryDay: "Vendredi" },
  { id: "CLI-RHF-014", name: "Metro France — Caen", channel: "RHF", region: "Calvados", deliveryDay: "Mercredi" },
  { id: "CLI-EXP-021", name: "Maison Kitano (Tokyo)", channel: "Export", region: "Japon", deliveryDay: "Cont. hebdo" },
  { id: "CLI-IND-038", name: "Fromagerie Beaupré (Paris 7e)", channel: "Crèmerie indé", region: "Île-de-France", deliveryDay: "Jeudi" },
];

export type DistOrder = {
  id: string;
  date: string;
  customerId: string;
  lines: { sku: string; qty: number; unitPriceEUR: number }[];
  totalHTEUR: number;
  status: "Confirmée" | "En préparation" | "Expédiée" | "Livrée";
  carrier: "STEF" | "Délifresh" | "DHL Air" | "Transports Lemoine";
};
const dline = (sku: string, qty: number) => {
  const p = products.find((x) => x.sku === sku)!;
  return { sku, qty, unitPriceEUR: p.priceHTEUR };
};
const dtotal = (ls: { qty: number; unitPriceEUR: number }[]) => ls.reduce((s, l) => s + l.qty * l.unitPriceEUR, 0);
const mkDOrder = (id: string, date: string, customerId: string, items: [string, number][], status: DistOrder["status"], carrier: DistOrder["carrier"]): DistOrder => {
  const lines = items.map(([s, q]) => dline(s, q));
  return { id, date, customerId, lines, totalHTEUR: dtotal(lines), status, carrier };
};
export const distOrders: DistOrder[] = [
  mkDOrder("CMD-FDV-2026-09217", "2026-06-06", "CLI-GMS-001", [["FDV-CAM-AOP-250", 4800], ["FDV-PEV-AOP-220", 2400], ["FDV-YAO-NAT-125x4", 3600]], "En préparation", "STEF"),
  mkDOrder("CMD-FDV-2026-09214", "2026-06-06", "CLI-GMS-002", [["FDV-CAM-AOP-250", 3200], ["FDV-BEU-DEM-250", 2400]], "Confirmée", "STEF"),
  mkDOrder("CMD-FDV-2026-09210", "2026-06-05", "CLI-RHF-014", [["FDV-LIV-AOP-450", 480], ["FDV-MIM-1000", 120], ["FDV-CRE-CRU-200", 360]], "Expédiée", "Délifresh"),
  mkDOrder("CMD-FDV-2026-09205", "2026-06-04", "CLI-EXP-021", [["FDV-CAM-AOP-250", 1200], ["FDV-LIV-AOP-450", 240], ["FDV-MIM-1000", 96]], "Expédiée", "DHL Air"),
  mkDOrder("CMD-FDV-2026-09198", "2026-06-04", "CLI-GMS-003", [["FDV-YAO-NAT-125x4", 5400], ["FDV-NEU-200", 1800]], "Livrée", "STEF"),
  mkDOrder("CMD-FDV-2026-09192", "2026-06-03", "CLI-IND-038", [["FDV-CAM-AOP-250", 80], ["FDV-PEV-AOP-220", 60], ["FDV-LIV-AOP-450", 40]], "Livrée", "Transports Lemoine"),
];

/** Collecte lait amont (AgroWare) — tournées par producteur. */
export type Collection = { date: string; producerId: string; liters: number; tempC: number; bactClass: "A" | "B" | "C"; somaticCells: number; destinationSite: string };
export const collections: Collection[] = [
  { date: "2026-06-06", producerId: "PROD-N-014", liters: 2380, tempC: 3.8, bactClass: "A", somaticCells: 184, destinationSite: "SITE-PEV" },
  { date: "2026-06-06", producerId: "PROD-N-027", liters: 1840, tempC: 4.1, bactClass: "A", somaticCells: 152, destinationSite: "SITE-PEV" },
  { date: "2026-06-06", producerId: "PROD-N-041", liters: 3090, tempC: 3.6, bactClass: "A", somaticCells: 178, destinationSite: "SITE-LIS" },
  { date: "2026-06-06", producerId: "PROD-N-058", liters: 2580, tempC: 4.4, bactClass: "B", somaticCells: 248, destinationSite: "SITE-PEV" },
  { date: "2026-06-06", producerId: "PROD-N-073", liters: 2150, tempC: 3.9, bactClass: "A", somaticCells: 162, destinationSite: "SITE-VIR" },
  { date: "2026-06-06", producerId: "PROD-N-089", liters: 1490, tempC: 4.2, bactClass: "B", somaticCells: 232, destinationSite: "SITE-PEV" },
];

/** Catalogue éditeur des 6 applications du SI Agro. */
export const apps = [
  { id: "saje-x-cube", code: "SX", name: "Saje X-Cube", inspiredBy: "Sage X3", vendor: "Saje", module: "ERP Industriel", color: "#00ad4d", brand: "Saje" },
  { id: "agroware", code: "AW", name: "AgroWare 365", inspiredBy: "Agriware 365", vendor: "AgroWare", module: "Gestion amont laitier", color: "#2e7d32", brand: "AgroWare" },
  { id: "qualiplus", code: "QP", name: "QualiPlus QHSE", inspiredBy: "Qualipro", vendor: "QualiPlus", module: "Qualité & IFS", color: "#0066b3", brand: "QualiPlus" },
  { id: "tracelink", code: "TL", name: "TraceLink PLM", inspiredBy: "Trace One", vendor: "TraceLink", module: "PLM Specs produits", color: "#003a70", brand: "TraceLink" },
  { id: "divento", code: "DV", name: "Divento Distribution", inspiredBy: "Divalto", vendor: "Divento", module: "Tournées & B2B", color: "#0072ce", brand: "Divento" },
  { id: "dataforge", code: "DF", name: "DataForge Lakehouse", inspiredBy: "Databricks", vendor: "DataForge", module: "Data Platform", color: "#ff3621", brand: "DataForge" },
] as const;

export type AgroAppId = (typeof apps)[number]["id"];

export const fmtEUR = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
export const productName = (sku: string) => products.find((p) => p.sku === sku)?.name ?? sku;
export const customerName = (id: string) => distCustomers.find((c) => c.id === id)?.name ?? id;
export const producerName = (id: string) => producers.find((p) => p.id === id)?.name ?? id;
export const siteName = (code: string) => sites.find((s) => s.code === code)?.name ?? code;
