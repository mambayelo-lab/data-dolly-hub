"use client";
import { useState } from "react";
import { Hexagon, Plus, Sparkles, Filter, Download, RefreshCw } from "lucide-react";
import { AgentChat } from "@/components/chat/AgentChat";
import { DOMAIN_COLORS, DOMAIN_LABELS, MATURITY_COLORS, MATURITY_LABELS, cn } from "@/lib/utils";
import type { BusinessCapability, BizCapDomain, MaturityLevel } from "@/types";

const DEMO_CAPABILITIES: BusinessCapability[] = [
  { id: "bc-1", name: "Planification Stratégique", description: "Définition et suivi de la stratégie d'entreprise", domain: "strategy", level: 1, maturity: 3, strategic_importance: "critical", applications: ["Anaplan", "PowerBI"], pain_points: ["Silos entre métiers"], objectives: [], kpis: [], tags: [] },
  { id: "bc-2", name: "Gouvernance IT", description: "Gouvernance des systèmes d'information", domain: "strategy", level: 1, maturity: 2, strategic_importance: "high", applications: ["LeanIX"], pain_points: ["Manque de visibilité"], objectives: [], kpis: [], tags: [] },
  { id: "bc-3", name: "Gestion Client (CRM)", description: "Gestion de la relation client end-to-end", domain: "customer", level: 1, maturity: 4, strategic_importance: "critical", applications: ["Salesforce", "SAP CRM"], pain_points: [], objectives: [], kpis: [], tags: [] },
  { id: "bc-4", name: "Marketing Digital", description: "Campagnes, SEO, automation marketing", domain: "customer", level: 1, maturity: 3, strategic_importance: "high", applications: ["HubSpot", "Adobe"], pain_points: ["ROI difficile à mesurer"], objectives: [], kpis: [], tags: [] },
  { id: "bc-5", name: "Gestion des Commandes", description: "OMS - Order Management System", domain: "commerce", level: 1, maturity: 3, strategic_importance: "critical", applications: ["SAP SD", "Magento"], pain_points: ["Délais de traitement"], objectives: [], kpis: [], tags: [] },
  { id: "bc-6", name: "Comptabilité Générale", description: "Tenue de la comptabilité et clôtures", domain: "finance", level: 1, maturity: 4, strategic_importance: "high", applications: ["SAP FI", "Oracle Finance"], pain_points: [], objectives: [], kpis: [], tags: [] },
  { id: "bc-7", name: "Data Management", description: "Gouvernance et qualité de la donnée", domain: "data", level: 1, maturity: 2, strategic_importance: "critical", applications: ["Databricks", "Collibra"], pain_points: ["Data silos", "Qualité données"], objectives: [], kpis: [], tags: [] },
  { id: "bc-8", name: "Supply Chain", description: "Gestion de la chaîne d'approvisionnement", domain: "operations", level: 1, maturity: 3, strategic_importance: "high", applications: ["SAP SCM", "o9 Solutions"], pain_points: ["Visibilité temps réel"], objectives: [], kpis: [], tags: [] },
];

const SI_COLORS = {
  critical: "text-red-400",
  high: "text-orange-400",
  medium: "text-blue-400",
  low: "text-slate-500",
};

const SI_LABELS = {
  critical: "Critique",
  high: "Élevée",
  medium: "Moyenne",
  low: "Faible",
};

function CapabilityCard({ cap }: { cap: BusinessCapability }) {
  const domainColor = DOMAIN_COLORS[cap.domain] ?? "#8b5cf6";
  const maturityColor = MATURITY_COLORS[cap.maturity as MaturityLevel] ?? "#3b82f6";
  const siColor = SI_COLORS[cap.strategic_importance as keyof typeof SI_COLORS] ?? "text-blue-400";
  const siLabel = SI_LABELS[cap.strategic_importance as keyof typeof SI_LABELS] ?? "Moyenne";

  return (
    <div
      className="glass-card rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200 group cursor-pointer"
      style={{ borderLeftColor: domainColor, borderLeftWidth: 3 }}
    >
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <div
              className="text-[9px] font-semibold uppercase tracking-widest mb-1"
              style={{ color: domainColor }}
            >
              {DOMAIN_LABELS[cap.domain]} · L{cap.level}
            </div>
            <div className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
              {cap.name}
            </div>
          </div>
          <div className={cn("text-[9px] font-medium", siColor)}>{siLabel}</div>
        </div>

        {/* Description */}
        <p className="text-[10px] text-slate-500 leading-snug mb-3 line-clamp-2">{cap.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Maturity */}
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    background: i <= cap.maturity ? maturityColor : "#1e293b",
                    border: `1px solid ${i <= cap.maturity ? maturityColor : "#334155"}`,
                  }}
                />
              ))}
            </div>
            <span className="text-[9px] text-slate-600">
              {MATURITY_LABELS[cap.maturity as MaturityLevel]}
            </span>
          </div>

          {/* Apps */}
          {cap.applications.length > 0 && (
            <div className="flex gap-1">
              {cap.applications.slice(0, 2).map((app) => (
                <span
                  key={app}
                  className="text-[8px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-500 border border-slate-700/50"
                >
                  {app}
                </span>
              ))}
              {cap.applications.length > 2 && (
                <span className="text-[8px] text-slate-700">+{cap.applications.length - 2}</span>
              )}
            </div>
          )}
        </div>

        {/* Pain points */}
        {cap.pain_points && cap.pain_points.length > 0 && (
          <div className="mt-2 flex gap-1 flex-wrap">
            {cap.pain_points.map((pp) => (
              <span
                key={pp}
                className="text-[8px] px-1.5 py-0.5 rounded-md bg-red-500/10 text-red-400 border border-red-500/20"
              >
                ⚠ {pp}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CapabilitiesPage() {
  const [filterDomain, setFilterDomain] = useState<BizCapDomain | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "heatmap">("grid");

  const domains = Object.keys(DOMAIN_COLORS) as BizCapDomain[];
  const filtered = filterDomain === "all"
    ? DEMO_CAPABILITIES
    : DEMO_CAPABILITIES.filter((c) => c.domain === filterDomain);

  const grouped = filtered.reduce((acc, cap) => {
    const d = cap.domain;
    if (!acc[d]) acc[d] = [];
    acc[d].push(cap);
    return acc;
  }, {} as Record<string, BusinessCapability[]>);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="px-8 py-5 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 flex items-center justify-center">
              <Hexagon size={16} className="text-orange-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100">Business Capability Map</h1>
              <p className="text-xs text-slate-500">
                {DEMO_CAPABILITIES.length} capabilities · {domains.length} domaines
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-slate-700 rounded-lg text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-colors">
              <Download size={12} /> Exporter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-orange-500/20 border border-orange-500/30 rounded-lg text-orange-400 hover:bg-orange-500/30 transition-colors">
              <Sparkles size={12} /> Générer avec AURA
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-violet-500/20 border border-violet-500/30 rounded-lg text-violet-400 hover:bg-violet-500/30 transition-colors">
              <Plus size={12} /> Ajouter
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="px-8 py-3 border-b border-slate-800/40 flex gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterDomain("all")}
            className={cn(
              "text-[10px] font-medium px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all",
              filterDomain === "all"
                ? "bg-slate-700 border-slate-600 text-slate-100"
                : "border-slate-800 text-slate-500 hover:text-slate-300"
            )}
          >
            Tous ({DEMO_CAPABILITIES.length})
          </button>
          {domains.map((d) => {
            const count = DEMO_CAPABILITIES.filter((c) => c.domain === d).length;
            if (count === 0) return null;
            return (
              <button
                key={d}
                onClick={() => setFilterDomain(d)}
                className={cn(
                  "flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all",
                  filterDomain === d
                    ? "border-current text-white"
                    : "border-slate-800 text-slate-500 hover:text-slate-300"
                )}
                style={{
                  ...(filterDomain === d && { borderColor: DOMAIN_COLORS[d], background: `${DOMAIN_COLORS[d]}20` }),
                  ...(filterDomain === d && { color: DOMAIN_COLORS[d] }),
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: DOMAIN_COLORS[d] }}
                />
                {DOMAIN_LABELS[d]} ({count})
              </button>
            );
          })}
        </div>

        {/* Capability grid by domain */}
        <div className="px-8 py-6 space-y-8">
          {Object.entries(grouped).map(([domain, caps]) => {
            const color = DOMAIN_COLORS[domain as BizCapDomain] ?? "#8b5cf6";
            return (
              <div key={domain}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-4 rounded-full" style={{ background: color }} />
                  <h2 className="text-sm font-semibold" style={{ color }}>
                    {DOMAIN_LABELS[domain as BizCapDomain]}
                  </h2>
                  <span className="text-xs text-slate-700">({caps.length})</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {caps.map((cap) => (
                    <CapabilityCard key={cap.id} cap={cap} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Agent chat */}
      <div className="w-80 flex-shrink-0 border-l border-slate-800/60 flex flex-col">
        <AgentChat />
      </div>
    </div>
  );
}
