/**
 * Helvex Precision — Dataset SI cohérent partagé entre les 6 applications du secteur Industrie.
 * ETI française fictive (siège Annecy-74, ateliers Cluses + Saint-Étienne) qui produit des pièces
 * mécaniques de précision pour l'aéronautique (Airbus, Safran, Dassault) et le médical (implants,
 * instruments chirurgicaux). Données cohérentes entre IFX Cloud (ERP), Dasselys 3DX (PLM/CAD),
 * OpCentral (MES), Wonderwave (SCADA/Historian), Coopa (achats) et MaxiMoves (CMMS/maintenance).
 *
 * Les marques sont volontairement inspirées (et non identiques) d'IFS Cloud, Dassault 3DEXPERIENCE,
 * Siemens Opcenter, AVEVA Wonderware, Coupa et IBM Maximo.
 */

export const company = {
  legalName: "Helvex Precision SAS",
  brand: "Helvex Precision",
  hq: "Annecy, Haute-Savoie",
  siret: "451 902 318 00045",
  vat: "FR45451902318",
  sites: 3,
  employees: 1240,
  machines: 86,
  revenueEUR: 218_000_000,
  fiscalYear: "2025",
  certifications: ["EN 9100 Rev D", "ISO 13485:2016", "ISO 14001", "NADCAP (HT, NDT)", "ITAR registered"],
} as const;

/** Sites & ateliers. */
export type Site = { code: string; name: string; city: string; type: "Usinage 5 axes" | "Décolletage" | "Assemblage & Contrôle"; surfaceM2: number };
export const sites: Site[] = [
  { code: "HX-ANN", name: "Helvex Annecy", city: "Annecy", type: "Usinage 5 axes", surfaceM2: 9800 },
  { code: "HX-CLU", name: "Helvex Cluses", city: "Cluses", type: "Décolletage", surfaceM2: 6400 },
  { code: "HX-STE", name: "Helvex Saint-Étienne", city: "Saint-Étienne", type: "Assemblage & Contrôle", surfaceM2: 7200 },
];

/** Machines (CN, presses, contrôle 3D) — partagé MES + CMMS + SCADA. */
export type Machine = {
  id: string;
  name: string;
  model: string;
  siteCode: string;
  family: "Centre d'usinage" | "Tour CN" | "Décolleteuse" | "Rectifieuse" | "MMT" | "EDM fil";
  hourlyRateEUR: number;
  oee30d: number;
  status: "Production" | "Setup" | "Arrêt planifié" | "Panne";
};
export const machines: Machine[] = [
  { id: "MCH-A01", name: "Centre 5 axes A01", model: "DMG Mori DMU 75", siteCode: "HX-ANN", family: "Centre d'usinage", hourlyRateEUR: 92, oee30d: 78.4, status: "Production" },
  { id: "MCH-A02", name: "Centre 5 axes A02", model: "DMG Mori DMU 75", siteCode: "HX-ANN", family: "Centre d'usinage", hourlyRateEUR: 92, oee30d: 81.2, status: "Production" },
  { id: "MCH-A03", name: "Centre 5 axes A03", model: "Mazak Variaxis i-700", siteCode: "HX-ANN", family: "Centre d'usinage", hourlyRateEUR: 95, oee30d: 65.1, status: "Panne" },
  { id: "MCH-A04", name: "Tour CN A04", model: "Mazak Integrex i-200", siteCode: "HX-ANN", family: "Tour CN", hourlyRateEUR: 78, oee30d: 84.0, status: "Production" },
  { id: "MCH-A05", name: "EDM fil A05", model: "Agie Charmilles CUT 2000", siteCode: "HX-ANN", family: "EDM fil", hourlyRateEUR: 64, oee30d: 72.8, status: "Setup" },
  { id: "MCH-C01", name: "Décolleteuse C01", model: "Tornos SwissNano 4", siteCode: "HX-CLU", family: "Décolleteuse", hourlyRateEUR: 48, oee30d: 88.5, status: "Production" },
  { id: "MCH-C02", name: "Décolleteuse C02", model: "Tornos EvoDeco 16", siteCode: "HX-CLU", family: "Décolleteuse", hourlyRateEUR: 52, oee30d: 86.1, status: "Production" },
  { id: "MCH-C03", name: "Décolleteuse C03", model: "Tornos EvoDeco 16", siteCode: "HX-CLU", family: "Décolleteuse", hourlyRateEUR: 52, oee30d: 79.4, status: "Arrêt planifié" },
  { id: "MCH-S01", name: "MMT S01", model: "Zeiss Prismo Ultra", siteCode: "HX-STE", family: "MMT", hourlyRateEUR: 110, oee30d: 91.2, status: "Production" },
  { id: "MCH-S02", name: "Rectifieuse S02", model: "Studer S33", siteCode: "HX-STE", family: "Rectifieuse", hourlyRateEUR: 86, oee30d: 74.6, status: "Production" },
];

/** Articles : pièces finies + composants achetés. Partagés ERP / PLM / MES / Achats. */
export type Part = {
  pn: string; // part number
  name: string;
  type: "Pièce finie aéro" | "Pièce finie médical" | "Sous-ensemble" | "Matière brute" | "Outil coupant";
  uom: "PC" | "KG" | "M";
  stdCostEUR: number;
  sellPriceEUR?: number;
  leadTimeDays: number;
  revision: string;
  drawing: string;
  material: string;
};
export const parts: Part[] = [
  // Pièces finies aéro
  { pn: "HX-AER-7831-A", name: "Carter pompe hydraulique A350", type: "Pièce finie aéro", uom: "PC", stdCostEUR: 412, sellPriceEUR: 980, leadTimeDays: 28, revision: "C", drawing: "DWG-7831-C.step", material: "Ti-6Al-4V" },
  { pn: "HX-AER-7912-B", name: "Bielle commande de vol Falcon 10X", type: "Pièce finie aéro", uom: "PC", stdCostEUR: 268, sellPriceEUR: 690, leadTimeDays: 24, revision: "B", drawing: "DWG-7912-B.step", material: "Inconel 718" },
  { pn: "HX-AER-8104-A", name: "Support actuateur LEAP-1B", type: "Pièce finie aéro", uom: "PC", stdCostEUR: 184, sellPriceEUR: 445, leadTimeDays: 21, revision: "A", drawing: "DWG-8104-A.step", material: "AlSi10Mg" },
  // Pièces finies médical
  { pn: "HX-MED-5520-D", name: "Tige fémorale implant hanche T2", type: "Pièce finie médical", uom: "PC", stdCostEUR: 96, sellPriceEUR: 285, leadTimeDays: 18, revision: "D", drawing: "DWG-5520-D.step", material: "Ti-6Al-4V ELI" },
  { pn: "HX-MED-5601-B", name: "Vis pédiculaire rachis Ø6.5", type: "Pièce finie médical", uom: "PC", stdCostEUR: 14, sellPriceEUR: 42, leadTimeDays: 12, revision: "B", drawing: "DWG-5601-B.step", material: "Ti-6Al-4V ELI" },
  { pn: "HX-MED-5710-A", name: "Davier porte-aiguille microchir.", type: "Pièce finie médical", uom: "PC", stdCostEUR: 38, sellPriceEUR: 118, leadTimeDays: 15, revision: "A", drawing: "DWG-5710-A.step", material: "AISI 420" },
  // Sous-ensembles
  { pn: "HX-SUB-2010", name: "Sous-ens. corps + couvercle 7831", type: "Sous-ensemble", uom: "PC", stdCostEUR: 320, leadTimeDays: 14, revision: "B", drawing: "DWG-2010-B.step", material: "Ti-6Al-4V" },
  // Matières brutes
  { pn: "RAW-TI64-D80", name: "Barre titane Ti-6Al-4V Ø80 mm", type: "Matière brute", uom: "KG", stdCostEUR: 68, leadTimeDays: 45, revision: "—", drawing: "—", material: "Ti-6Al-4V" },
  { pn: "RAW-IN718-D60", name: "Barre Inconel 718 Ø60 mm", type: "Matière brute", uom: "KG", stdCostEUR: 84, leadTimeDays: 56, revision: "—", drawing: "—", material: "Inconel 718" },
  { pn: "RAW-AL10-PLT", name: "Plaque AlSi10Mg 40 mm", type: "Matière brute", uom: "KG", stdCostEUR: 18, leadTimeDays: 21, revision: "—", drawing: "—", material: "AlSi10Mg" },
  { pn: "RAW-TI64-ELI", name: "Barre Ti-6Al-4V ELI med. Ø25", type: "Matière brute", uom: "KG", stdCostEUR: 96, leadTimeDays: 35, revision: "—", drawing: "—", material: "Ti-6Al-4V ELI" },
  // Outils coupants
  { pn: "TOOL-EM-12-CB", name: "Fraise carbure Ø12 6 dents", type: "Outil coupant", uom: "PC", stdCostEUR: 124, leadTimeDays: 7, revision: "—", drawing: "—", material: "Carbure revêtu AlTiN" },
];

/** Nomenclatures (BOM) — partagé PLM ↔ ERP ↔ MES. */
export type BomLine = { parent: string; child: string; qty: number; uom: "PC" | "KG" | "M" };
export const boms: BomLine[] = [
  { parent: "HX-AER-7831-A", child: "RAW-TI64-D80", qty: 4.2, uom: "KG" },
  { parent: "HX-AER-7831-A", child: "HX-SUB-2010", qty: 1, uom: "PC" },
  { parent: "HX-AER-7831-A", child: "TOOL-EM-12-CB", qty: 0.03, uom: "PC" },
  { parent: "HX-AER-7912-B", child: "RAW-IN718-D60", qty: 2.6, uom: "KG" },
  { parent: "HX-AER-8104-A", child: "RAW-AL10-PLT", qty: 1.8, uom: "KG" },
  { parent: "HX-MED-5520-D", child: "RAW-TI64-ELI", qty: 0.72, uom: "KG" },
  { parent: "HX-MED-5601-B", child: "RAW-TI64-ELI", qty: 0.04, uom: "KG" },
  { parent: "HX-MED-5710-A", child: "RAW-TI64-ELI", qty: 0.18, uom: "KG" },
  { parent: "HX-SUB-2010", child: "RAW-TI64-D80", qty: 1.4, uom: "KG" },
];

/** Clients donneurs d'ordres. */
export type Customer = { id: string; name: string; segment: "Aéronautique" | "Médical" | "Défense"; country: string; ppm: number };
export const customers: Customer[] = [
  { id: "CUST-AIR-001", name: "Airbus Atlantic", segment: "Aéronautique", country: "FR", ppm: 12 },
  { id: "CUST-SAF-002", name: "Safran Aircraft Engines", segment: "Aéronautique", country: "FR", ppm: 8 },
  { id: "CUST-DAS-003", name: "Dassault Aviation", segment: "Aéronautique", country: "FR", ppm: 14 },
  { id: "CUST-MED-014", name: "Stryker Orthopaedics", segment: "Médical", country: "US", ppm: 4 },
  { id: "CUST-MED-021", name: "Medtronic Spine", segment: "Médical", country: "IE", ppm: 6 },
  { id: "CUST-DEF-031", name: "MBDA Systems", segment: "Défense", country: "FR", ppm: 9 },
];

/** Ordres de fabrication (OF) partagés ERP / MES / CMMS. */
export type WorkOrder = {
  id: string;
  pn: string;
  qty: number;
  customerId: string;
  siteCode: string;
  machineId: string;
  startAt: string;
  dueDate: string;
  cycleMin: number;
  status: "Planifié" | "En cours" | "Suspendu" | "Terminé" | "Hors-spec";
  progressPct: number;
};
export const workOrders: WorkOrder[] = [
  { id: "WO-2026-014821", pn: "HX-AER-7831-A", qty: 48, customerId: "CUST-AIR-001", siteCode: "HX-ANN", machineId: "MCH-A01", startAt: "2026-06-06 06:00", dueDate: "2026-06-12", cycleMin: 86, status: "En cours", progressPct: 62 },
  { id: "WO-2026-014824", pn: "HX-AER-7912-B", qty: 24, customerId: "CUST-DAS-003", siteCode: "HX-ANN", machineId: "MCH-A02", startAt: "2026-06-06 14:00", dueDate: "2026-06-11", cycleMin: 124, status: "En cours", progressPct: 41 },
  { id: "WO-2026-014830", pn: "HX-AER-8104-A", qty: 96, customerId: "CUST-SAF-002", siteCode: "HX-ANN", machineId: "MCH-A04", startAt: "2026-06-05 22:00", dueDate: "2026-06-10", cycleMin: 38, status: "En cours", progressPct: 78 },
  { id: "WO-2026-014835", pn: "HX-MED-5520-D", qty: 120, customerId: "CUST-MED-014", siteCode: "HX-CLU", machineId: "MCH-C02", startAt: "2026-06-06 04:00", dueDate: "2026-06-09", cycleMin: 22, status: "En cours", progressPct: 55 },
  { id: "WO-2026-014838", pn: "HX-MED-5601-B", qty: 2400, customerId: "CUST-MED-021", siteCode: "HX-CLU", machineId: "MCH-C01", startAt: "2026-06-05 06:00", dueDate: "2026-06-08", cycleMin: 2.4, status: "En cours", progressPct: 84 },
  { id: "WO-2026-014841", pn: "HX-MED-5710-A", qty: 180, customerId: "CUST-MED-021", siteCode: "HX-STE", machineId: "MCH-S02", startAt: "2026-06-04 06:00", dueDate: "2026-06-07", cycleMin: 16, status: "Hors-spec", progressPct: 92 },
  { id: "WO-2026-014845", pn: "HX-AER-7831-A", qty: 24, customerId: "CUST-AIR-001", siteCode: "HX-ANN", machineId: "MCH-A03", startAt: "2026-06-07 06:00", dueDate: "2026-06-13", cycleMin: 86, status: "Suspendu", progressPct: 0 },
  { id: "WO-2026-014802", pn: "HX-AER-8104-A", qty: 48, customerId: "CUST-SAF-002", siteCode: "HX-ANN", machineId: "MCH-A04", startAt: "2026-06-02 22:00", dueDate: "2026-06-05", cycleMin: 38, status: "Terminé", progressPct: 100 },
];

/** Fournisseurs matières & outils. */
export type Supplier = { id: string; name: string; country: string; rating: "A" | "B" | "C"; otd: number; ppm: number };
export const suppliers: Supplier[] = [
  { id: "SUP-AUB-001", name: "Aubert & Duval (Eramet)", country: "FR", rating: "A", otd: 96, ppm: 180 },
  { id: "SUP-VSM-008", name: "VSMPO-AVISMA Titanium", country: "DE", rating: "A", otd: 92, ppm: 240 },
  { id: "SUP-CON-012", name: "Constellium Aero", country: "FR", rating: "B", otd: 88, ppm: 420 },
  { id: "SUP-SAN-022", name: "Sandvik Coromant Tooling", country: "SE", rating: "A", otd: 98, ppm: 60 },
  { id: "SUP-HEM-031", name: "Hempel Surface Treatment", country: "FR", rating: "B", otd: 84, ppm: 580 },
];

/** Ordres d'achat (Coopa) — liés aux composants des BOM. */
export type PurchaseOrder = {
  id: string;
  supplierId: string;
  pn: string;
  qty: number;
  uom: "KG" | "PC";
  unitPriceEUR: number;
  status: "Brouillon" | "Approuvé" | "Envoyé" | "Réceptionné" | "Litige";
  expectedAt: string;
  buyer: string;
};
export const purchaseOrders: PurchaseOrder[] = [
  { id: "PO-2026-08214", supplierId: "SUP-AUB-001", pn: "RAW-TI64-D80", qty: 480, uom: "KG", unitPriceEUR: 64, status: "Envoyé", expectedAt: "2026-06-22", buyer: "L. Garnier" },
  { id: "PO-2026-08218", supplierId: "SUP-VSM-008", pn: "RAW-TI64-ELI", qty: 220, uom: "KG", unitPriceEUR: 92, status: "Approuvé", expectedAt: "2026-07-08", buyer: "L. Garnier" },
  { id: "PO-2026-08221", supplierId: "SUP-AUB-001", pn: "RAW-IN718-D60", qty: 180, uom: "KG", unitPriceEUR: 80, status: "Réceptionné", expectedAt: "2026-06-04", buyer: "L. Garnier" },
  { id: "PO-2026-08224", supplierId: "SUP-CON-012", pn: "RAW-AL10-PLT", qty: 640, uom: "KG", unitPriceEUR: 17, status: "Envoyé", expectedAt: "2026-06-18", buyer: "S. Berthod" },
  { id: "PO-2026-08230", supplierId: "SUP-SAN-022", pn: "TOOL-EM-12-CB", qty: 60, uom: "PC", unitPriceEUR: 119, status: "Réceptionné", expectedAt: "2026-06-05", buyer: "S. Berthod" },
  { id: "PO-2026-08234", supplierId: "SUP-HEM-031", pn: "RAW-AL10-PLT", qty: 280, uom: "KG", unitPriceEUR: 18, status: "Litige", expectedAt: "2026-06-02", buyer: "S. Berthod" },
];

/** Interventions maintenance (CMMS) — machines partagées avec MES. */
export type MaintTask = {
  id: string;
  machineId: string;
  kind: "Préventif" | "Correctif" | "Prédictif" | "Métrologie";
  title: string;
  status: "Planifié" | "En cours" | "Réalisé" | "En attente pièces";
  priority: "P1" | "P2" | "P3";
  technician: string;
  dueAt: string;
  durationMin: number;
};
export const maintTasks: MaintTask[] = [
  { id: "WO-M-3041", machineId: "MCH-A03", kind: "Correctif", title: "Remplacement broche HSK63 — vibrations excessives", status: "En cours", priority: "P1", technician: "T. Mottier", dueAt: "2026-06-07", durationMin: 360 },
  { id: "WO-M-3042", machineId: "MCH-C03", kind: "Préventif", title: "Vidange + filtre huile 2000h", status: "Planifié", priority: "P2", technician: "J. Lambert", dueAt: "2026-06-08", durationMin: 120 },
  { id: "WO-M-3043", machineId: "MCH-A05", kind: "Préventif", title: "Calibration tension du fil EDM", status: "Planifié", priority: "P3", technician: "T. Mottier", dueAt: "2026-06-09", durationMin: 90 },
  { id: "WO-M-3038", machineId: "MCH-S01", kind: "Métrologie", title: "Vérification annuelle MMT — labo accréd. COFRAC", status: "Réalisé", priority: "P2", technician: "Ext. Hexagon", dueAt: "2026-05-30", durationMin: 480 },
  { id: "WO-M-3044", machineId: "MCH-A02", kind: "Prédictif", title: "Analyse vibratoire roulements axe Z — alerte", status: "En attente pièces", priority: "P2", technician: "T. Mottier", dueAt: "2026-06-11", durationMin: 180 },
  { id: "WO-M-3045", machineId: "MCH-C01", kind: "Préventif", title: "Lubrification graisseur central", status: "Réalisé", priority: "P3", technician: "J. Lambert", dueAt: "2026-06-04", durationMin: 45 },
];

/** Mesures temps réel SCADA (Wonderwave) — capteurs IoT sur machines. */
export type Telemetry = { tag: string; machineId: string; label: string; value: number; unit: string; warnHigh?: number; critHigh?: number; trend: "up" | "down" | "flat" };
export const telemetry: Telemetry[] = [
  { tag: "MCH-A01.SPINDLE.TEMP", machineId: "MCH-A01", label: "Température broche", value: 48.2, unit: "°C", warnHigh: 55, critHigh: 65, trend: "up" },
  { tag: "MCH-A01.SPINDLE.LOAD", machineId: "MCH-A01", label: "Charge broche", value: 72, unit: "%", warnHigh: 85, critHigh: 95, trend: "flat" },
  { tag: "MCH-A02.VIBR.RMS",    machineId: "MCH-A02", label: "Vibration RMS axe Z", value: 4.8, unit: "mm/s", warnHigh: 4.5, critHigh: 7.1, trend: "up" },
  { tag: "MCH-A03.STATE",       machineId: "MCH-A03", label: "État machine",        value: 0,   unit: "code", trend: "flat" },
  { tag: "MCH-C01.RPM",         machineId: "MCH-C01", label: "Régime broche",       value: 8420, unit: "rpm", trend: "flat" },
  { tag: "MCH-C02.OIL.PRESS",   machineId: "MCH-C02", label: "Pression huile",      value: 3.4, unit: "bar", trend: "down" },
  { tag: "MCH-S01.AIR.TEMP",    machineId: "MCH-S01", label: "Temp. salle métrologie", value: 20.1, unit: "°C", warnHigh: 21, critHigh: 22, trend: "flat" },
  { tag: "MCH-S02.GRIND.AMP",   machineId: "MCH-S02", label: "Courant moteur meule", value: 18.4, unit: "A", warnHigh: 22, critHigh: 26, trend: "flat" },
];

/** Catalogue éditeur des 6 applications du SI Industrie. */
export const apps = [
  { id: "ifx-cloud",   code: "IFX", name: "IFX Cloud",          inspiredBy: "IFS Cloud",            vendor: "IFX",        module: "ERP Manufacturing",      color: "#0066cc", brand: "IFX" },
  { id: "dasselys-3dx",code: "3DX", name: "Dasselys 3DX",       inspiredBy: "Dassault 3DEXPERIENCE",vendor: "Dasselys",   module: "PLM & CAD",              color: "#005386", brand: "Dasselys" },
  { id: "opcentral",   code: "OPC", name: "OpCentral MES",      inspiredBy: "Siemens Opcenter",     vendor: "OpCentral",  module: "Manufacturing Execution",color: "#009999", brand: "OpCentral" },
  { id: "wonderwave",  code: "WW",  name: "Wonderwave SCADA",   inspiredBy: "AVEVA Wonderware",     vendor: "Wonderwave", module: "SCADA & Historian",      color: "#ff8200", brand: "Wonderwave" },
  { id: "coopa",       code: "CP",  name: "Coopa Procurement",  inspiredBy: "Coupa",                vendor: "Coopa",      module: "Achats & Sourcing",      color: "#ff5b34", brand: "Coopa" },
  { id: "maximoves",   code: "MX",  name: "MaxiMoves CMMS",     inspiredBy: "IBM Maximo",           vendor: "MaxiMoves",  module: "Maintenance & Assets",   color: "#7a3ff2", brand: "MaxiMoves" },
] as const;

export type IndustryAppId = (typeof apps)[number]["id"];

export const fmtEUR = (n: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
export const partName = (pn: string) => parts.find((p) => p.pn === pn)?.name ?? pn;
export const customerName = (id: string) => customers.find((c) => c.id === id)?.name ?? id;
export const supplierName = (id: string) => suppliers.find((s) => s.id === id)?.name ?? id;
export const machineName = (id: string) => machines.find((m) => m.id === id)?.name ?? id;
export const siteName = (code: string) => sites.find((s) => s.code === code)?.name ?? code;
