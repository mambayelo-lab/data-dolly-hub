"use client";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AuraNodeData } from "@/types";
import { DOMAIN_COLORS, MATURITY_COLORS, cn } from "@/lib/utils";

const DOMAIN_LABELS: Record<string, string> = {
  strategy: "Stratégie",
  customer: "Client",
  commerce: "Commerce",
  operations: "Opérations",
  finance: "Finance",
  people: "Personnes",
  data: "Data & Tech",
  support: "Support",
};

const SI_BADGES: Record<string, { label: string; cls: string }> = {
  critical: { label: "Critique", cls: "bg-red-500/20 text-red-400 border-red-500/40" },
  high:     { label: "Élevée",  cls: "bg-orange-500/20 text-orange-400 border-orange-500/40" },
  medium:   { label: "Moyenne", cls: "bg-blue-500/20 text-blue-400 border-blue-500/40" },
  low:      { label: "Faible",  cls: "bg-slate-500/20 text-slate-400 border-slate-500/40" },
};

export const BizCapNode = memo(({ data, selected }: NodeProps<{ data: AuraNodeData }>) => {
  const domain = (data as AuraNodeData).domain ?? "strategy";
  const level = (data as AuraNodeData).level ?? 1;
  const maturity = (data as AuraNodeData).maturity ?? 3;
  const si = (data as AuraNodeData).strategic_importance ?? "medium";
  const apps = (data as AuraNodeData).applications ?? [];
  const label = (data as AuraNodeData).label ?? "Capability";

  const domainColor = DOMAIN_COLORS[domain as keyof typeof DOMAIN_COLORS] ?? "#8b5cf6";
  const maturityColor = MATURITY_COLORS[maturity as keyof typeof MATURITY_COLORS] ?? "#3b82f6";
  const siInfo = SI_BADGES[si] ?? SI_BADGES.medium;

  const width = level === 1 ? 220 : level === 2 ? 190 : 170;

  return (
    <div
      style={{
        width,
        borderColor: selected ? domainColor : `${domainColor}60`,
        boxShadow: selected ? `0 0 0 2px ${domainColor}80, 0 4px 20px rgba(0,0,0,0.5)` : "0 2px 8px rgba(0,0,0,0.4)",
      }}
      className={cn(
        "relative rounded-xl border-2 transition-all duration-200 overflow-hidden",
        "bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm",
        selected && "scale-[1.02]"
      )}
    >
      {/* Top color band */}
      <div
        className="h-1.5 w-full"
        style={{ background: domainColor }}
      />

      <div className="p-3">
        {/* Domain label */}
        {level <= 2 && (
          <div
            className="text-[9px] font-semibold uppercase tracking-widest mb-1.5"
            style={{ color: domainColor }}
          >
            {DOMAIN_LABELS[domain] ?? domain} {level === 1 ? "L1" : "L2"}
          </div>
        )}

        {/* Capability name */}
        <div
          className={cn(
            "font-semibold leading-tight text-slate-100",
            level === 1 ? "text-sm" : "text-xs"
          )}
        >
          {label}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2.5 gap-1">
          {/* Strategic importance */}
          <span
            className={cn(
              "text-[9px] font-medium px-1.5 py-0.5 rounded border",
              siInfo.cls
            )}
          >
            {siInfo.label}
          </span>

          {/* Maturity dots */}
          <div className="flex gap-0.5 items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-full transition-all"
                style={{
                  width: 6,
                  height: 6,
                  background: i <= maturity ? maturityColor : "#1e293b",
                  border: `1px solid ${i <= maturity ? maturityColor : "#334155"}`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Apps count */}
        {apps.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="text-[9px] text-slate-500 italic">
              {apps.length} app{apps.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle type="target" position={Position.Top} className="!bg-violet-500" />
      <Handle type="source" position={Position.Bottom} className="!bg-violet-500" />
      <Handle type="source" position={Position.Right} className="!bg-violet-500" />
      <Handle type="target" position={Position.Left} className="!bg-violet-500" />
    </div>
  );
});

BizCapNode.displayName = "BizCapNode";
