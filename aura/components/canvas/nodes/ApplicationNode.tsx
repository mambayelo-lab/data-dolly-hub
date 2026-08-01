"use client";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Server, Cloud, Package, Globe } from "lucide-react";
import type { AuraNodeData } from "@/types";
import { LIFECYCLE_COLORS, cn } from "@/lib/utils";

const APP_TYPE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  saas:       Globe,
  paas:       Cloud,
  "on-premise": Server,
  custom:     Package,
  api:        Globe,
};

const LIFECYCLE_LABELS: Record<string, string> = {
  active:       "Actif",
  planned:      "Planifié",
  legacy:       "Legacy",
  decommission: "À retirer",
  candidate:    "Candidat",
};

export const ApplicationNode = memo(({ data, selected }: NodeProps<{ data: AuraNodeData }>) => {
  const d = data as AuraNodeData;
  const lifecycle = d.lifecycle ?? "active";
  const appType = d.app_type ?? "custom";
  const lifecycleColor = LIFECYCLE_COLORS[lifecycle as keyof typeof LIFECYCLE_COLORS] ?? "#10b981";
  const Icon = APP_TYPE_ICONS[appType] ?? Package;

  return (
    <div
      style={{
        width: 200,
        borderColor: selected ? lifecycleColor : `${lifecycleColor}50`,
        boxShadow: selected
          ? `0 0 0 2px ${lifecycleColor}80, 0 4px 20px rgba(0,0,0,0.5)`
          : "0 2px 8px rgba(0,0,0,0.4)",
      }}
      className={cn(
        "rounded-xl border-2 overflow-hidden transition-all duration-200",
        "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
        selected && "scale-[1.02]"
      )}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ background: `${lifecycleColor}15`, borderBottom: `1px solid ${lifecycleColor}30` }}
      >
        <div
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: `${lifecycleColor}25` }}
        >
          <Icon size={14} style={{ color: lifecycleColor }} />
        </div>
        <div className="min-w-0">
          <div className="text-xs font-semibold text-slate-100 truncate">{d.label}</div>
          {d.vendor && (
            <div className="text-[9px] text-slate-500 truncate">{d.vendor}</div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-3 py-2 space-y-1.5">
        {/* Lifecycle badge */}
        <div className="flex items-center justify-between">
          <span
            className="text-[9px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md"
            style={{
              background: `${lifecycleColor}20`,
              color: lifecycleColor,
              border: `1px solid ${lifecycleColor}40`,
            }}
          >
            {LIFECYCLE_LABELS[lifecycle]}
          </span>
          <span className="text-[9px] text-slate-500 uppercase">
            {appType.replace("-", " ")}
          </span>
        </div>

        {/* Tech stack */}
        {d.tech_stack && d.tech_stack.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {d.tech_stack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[8px] px-1 py-0.5 rounded bg-slate-700/60 text-slate-400 border border-slate-600/50"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Criticality */}
        {d.criticality && (
          <div className="text-[9px] text-slate-500">
            Criticité :{" "}
            <span
              className={cn(
                "font-medium",
                d.criticality === "critical" && "text-red-400",
                d.criticality === "high" && "text-orange-400",
                d.criticality === "medium" && "text-blue-400",
                d.criticality === "low" && "text-slate-400"
              )}
            >
              {d.criticality}
            </span>
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
});

ApplicationNode.displayName = "ApplicationNode";
