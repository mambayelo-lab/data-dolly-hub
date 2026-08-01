"use client";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Zap, Layers, ArrowLeftRight } from "lucide-react";
import type { AuraNodeData } from "@/types";
import { cn } from "@/lib/utils";

const PATTERN_CONFIG: Record<string, { color: string; label: string; Icon: React.ComponentType<{ size?: number }> }> = {
  api:          { color: "#3b82f6", label: "REST/GraphQL", Icon: ArrowLeftRight },
  "event-driven": { color: "#f97316", label: "Event-Driven", Icon: Zap },
  saga:         { color: "#8b5cf6", label: "Saga", Icon: Layers },
  bff:          { color: "#10b981", label: "BFF", Icon: Layers },
  gateway:      { color: "#06b6d4", label: "Gateway", Icon: Layers },
};

export const ServiceNode = memo(({ data, selected }: NodeProps<{ data: AuraNodeData }>) => {
  const d = data as AuraNodeData;
  const pattern = d.pattern ?? "api";
  const config = PATTERN_CONFIG[pattern] ?? PATTERN_CONFIG.api;
  const { color, label, Icon } = config;

  return (
    <div
      style={{
        width: 180,
        borderColor: selected ? color : `${color}50`,
        boxShadow: selected
          ? `0 0 0 2px ${color}80, 0 4px 16px rgba(0,0,0,0.4)`
          : "0 2px 8px rgba(0,0,0,0.4)",
      }}
      className={cn(
        "rounded-2xl border-2 overflow-hidden transition-all duration-200",
        "bg-gradient-to-br from-slate-900 to-slate-800 backdrop-blur-sm",
        selected && "scale-[1.02]"
      )}
    >
      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: `${color}25` }}
          >
            <Icon size={12} />
          </div>
          <div
            className="text-[9px] font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            {label}
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-100 leading-tight">{d.label}</div>
        {d.description && (
          <div className="text-[9px] text-slate-500 mt-1 leading-snug line-clamp-2">
            {d.description}
          </div>
        )}
      </div>

      {/* Animated border bottom */}
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
});

ServiceNode.displayName = "ServiceNode";
