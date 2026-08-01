"use client";
import { BarChart3, Server, Globe, Package, Cloud, TrendingUp, AlertTriangle } from "lucide-react";
import { LIFECYCLE_COLORS, LIFECYCLE_LABELS, cn } from "@/lib/utils";
import type { Application } from "@/types";

const DEMO_APPS: Application[] = [
  { id: "app-1", name: "SAP S/4HANA", vendor: "SAP", lifecycle: "active", type: "on-premise", capabilities: ["bc-5", "bc-6"], tech_stack: ["ABAP", "Fiori", "HANA"], hosting: "On-Premise", criticality: "critical", cost_annual: 850000, users: 1200, integrations: [], description: "ERP central Finance & Logistique", tags: [] },
  { id: "app-2", name: "Salesforce Sales Cloud", vendor: "Salesforce", lifecycle: "active", type: "saas", capabilities: ["bc-3"], tech_stack: ["Apex", "LWC"], hosting: "Salesforce Cloud", criticality: "high", cost_annual: 320000, users: 450, integrations: ["SAP", "HubSpot"], description: "CRM ventes et opportunités", tags: [] },
  { id: "app-3", name: "Legacy ERP v2", vendor: "Interne", lifecycle: "legacy", type: "on-premise", capabilities: ["bc-6"], tech_stack: ["VB6", "Oracle DB"], hosting: "On-Premise", criticality: "medium", cost_annual: 120000, users: 80, integrations: [], description: "Ancien ERP à décommissionner", tags: [] },
  { id: "app-4", name: "Databricks Lakehouse", vendor: "Databricks", lifecycle: "active", type: "paas", capabilities: ["bc-7"], tech_stack: ["Spark", "Delta Lake", "Python"], hosting: "Azure", criticality: "high", cost_annual: 480000, users: 85, integrations: ["Snowflake", "dbt"], description: "Plateforme data lakehouse", tags: [] },
  { id: "app-5", name: "HubSpot Marketing", vendor: "HubSpot", lifecycle: "active", type: "saas", capabilities: ["bc-4"], tech_stack: ["HubSpot API"], hosting: "HubSpot Cloud", criticality: "medium", cost_annual: 95000, users: 60, integrations: ["Salesforce"], description: "Automation marketing", tags: [] },
  { id: "app-6", name: "Portail E-Commerce", vendor: "Interne", lifecycle: "planned", type: "custom", capabilities: ["bc-5"], tech_stack: ["Next.js", "Node.js", "MongoDB"], hosting: "GCP", criticality: "critical", cost_annual: 0, users: 0, integrations: [], description: "Nouveau portail e-commerce (en cours)", tags: [] },
];

function AppCard({ app }: { app: Application }) {
  const lcColor = LIFECYCLE_COLORS[app.lifecycle] ?? "#10b981";
  const lcLabel = LIFECYCLE_LABELS[app.lifecycle];
  const TypeIcon = app.type === "saas" ? Globe : app.type === "paas" ? Cloud : app.type === "custom" ? Package : Server;

  return (
    <div
      className="glass-card rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200 group"
      style={{ borderTopColor: lcColor, borderTopWidth: 2 }}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${lcColor}20` }}
            >
              <TypeIcon size={14} style={{ color: lcColor }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-100 group-hover:text-white transition-colors">
                {app.name}
              </div>
              {app.vendor && <div className="text-[9px] text-slate-600">{app.vendor}</div>}
            </div>
          </div>
          <span
            className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
            style={{ background: `${lcColor}20`, color: lcColor, border: `1px solid ${lcColor}40` }}
          >
            {lcLabel}
          </span>
        </div>

        {app.description && (
          <p className="text-[10px] text-slate-500 leading-snug mb-3 line-clamp-2">{app.description}</p>
        )}

        <div className="space-y-2">
          {/* Tech stack */}
          {app.tech_stack && app.tech_stack.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {app.tech_stack.slice(0, 3).map((t) => (
                <span key={t} className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700/50">
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Stats row */}
          <div className="flex items-center gap-3 pt-1 border-t border-slate-800">
            {app.criticality && (
              <div className="flex items-center gap-1">
                <AlertTriangle
                  size={10}
                  className={cn(
                    app.criticality === "critical" ? "text-red-400" :
                    app.criticality === "high" ? "text-orange-400" :
                    "text-slate-600"
                  )}
                />
                <span className="text-[9px] text-slate-600 capitalize">{app.criticality}</span>
              </div>
            )}
            {app.users !== undefined && app.users > 0 && (
              <span className="text-[9px] text-slate-600">{app.users.toLocaleString()} users</span>
            )}
            {app.cost_annual !== undefined && app.cost_annual > 0 && (
              <span className="text-[9px] text-slate-600">
                {(app.cost_annual / 1000).toFixed(0)}k€/an
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioPage() {
  const totalCost = DEMO_APPS.reduce((s, a) => s + (a.cost_annual ?? 0), 0);
  const activeCount = DEMO_APPS.filter((a) => a.lifecycle === "active").length;
  const legacyCount = DEMO_APPS.filter((a) => a.lifecycle === "legacy").length;
  const criticalCount = DEMO_APPS.filter((a) => a.criticality === "critical").length;

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="px-8 py-5 border-b border-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <BarChart3 size={16} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-base font-bold text-slate-100">Application Portfolio</h1>
            <p className="text-xs text-slate-500">{DEMO_APPS.length} applications · {(totalCost / 1000).toFixed(0)}k€/an</p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Actives", value: activeCount, color: "#10b981", Icon: TrendingUp },
            { label: "Legacy", value: legacyCount, color: "#f59e0b", Icon: AlertTriangle },
            { label: "Critiques", value: criticalCount, color: "#ef4444", Icon: AlertTriangle },
            { label: "Coût total", value: `${(totalCost / 1000000).toFixed(1)}M€`, color: "#8b5cf6", Icon: BarChart3 },
          ].map(({ label, value, color, Icon }) => (
            <div key={label} className="glass-card rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
                <Icon size={16} style={{ color }} />
              </div>
              <div>
                <div className="text-lg font-bold text-slate-100">{value}</div>
                <div className="text-[10px] text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Lifecycle summary */}
        <div className="flex gap-3">
          {Object.entries(LIFECYCLE_COLORS).map(([lc, color]) => {
            const count = DEMO_APPS.filter((a) => a.lifecycle === lc).length;
            return (
              <div key={lc} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                <span className="text-[10px] text-slate-500">
                  {LIFECYCLE_LABELS[lc as keyof typeof LIFECYCLE_LABELS]} ({count})
                </span>
              </div>
            );
          })}
        </div>

        {/* Apps grid */}
        <div className="grid grid-cols-3 gap-4">
          {DEMO_APPS.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </div>
    </div>
  );
}
