import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { BizCapDomain, LifecycleStatus, MaturityLevel } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DOMAIN_COLORS: Record<BizCapDomain, string> = {
  strategy:   "#8b5cf6",
  customer:   "#f97316",
  commerce:   "#10b981",
  operations: "#3b82f6",
  finance:    "#a855f7",
  people:     "#ec4899",
  data:       "#06b6d4",
  support:    "#64748b",
};

export const DOMAIN_LABELS: Record<BizCapDomain, string> = {
  strategy:   "Stratégie & Gouvernance",
  customer:   "Client & Marketing",
  commerce:   "Commerce & Ventes",
  operations: "Opérations & Delivery",
  finance:    "Finance & Risques",
  people:     "Personnes & RH",
  data:       "Data & Technologie",
  support:    "Support & Admin",
};

export const LIFECYCLE_COLORS: Record<LifecycleStatus, string> = {
  active:       "#10b981",
  planned:      "#3b82f6",
  legacy:       "#f59e0b",
  decommission: "#ef4444",
  candidate:    "#8b5cf6",
};

export const LIFECYCLE_LABELS: Record<LifecycleStatus, string> = {
  active:       "Actif",
  planned:      "Planifié",
  legacy:       "Legacy",
  decommission: "À décommissionner",
  candidate:    "Candidat",
};

export const MATURITY_COLORS: Record<MaturityLevel, string> = {
  1: "#ef4444",
  2: "#f59e0b",
  3: "#3b82f6",
  4: "#10b981",
  5: "#8b5cf6",
};

export const MATURITY_LABELS: Record<MaturityLevel, string> = {
  1: "Initial",
  2: "Défini",
  3: "Managé",
  4: "Optimisé",
  5: "Innovant",
};

// Event Storming colors (DDD standard palette)
export const ES_COLORS = {
  event:     { bg: "#f97316", border: "#ea580c", text: "#fff" },
  command:   { bg: "#3b82f6", border: "#2563eb", text: "#fff" },
  policy:    { bg: "#a855f7", border: "#9333ea", text: "#fff" },
  aggregate: { bg: "#eab308", border: "#ca8a04", text: "#000" },
  external:  { bg: "#ec4899", border: "#db2777", text: "#fff" },
  hotspot:   { bg: "#ef4444", border: "#dc2626", text: "#fff", dashed: true },
  readmodel: { bg: "#10b981", border: "#059669", text: "#fff" },
};

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function generateId(prefix = "id"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}
