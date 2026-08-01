"use client";
import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AuraNodeData } from "@/types";
import { ES_COLORS, cn } from "@/lib/utils";

const ES_TYPE_LABELS: Record<string, string> = {
  event:     "Domain Event",
  command:   "Command",
  policy:    "Policy",
  aggregate: "Aggregate",
  external:  "External System",
  hotspot:   "Hotspot ⚠️",
  readmodel: "Read Model",
};

export const EventStormNode = memo(({ data, selected }: NodeProps<{ data: AuraNodeData }>) => {
  const d = data as AuraNodeData;
  const esType = d.es_type ?? "event";
  const colors = ES_COLORS[esType as keyof typeof ES_COLORS] ?? ES_COLORS.event;
  const typeLabel = ES_TYPE_LABELS[esType] ?? esType;

  return (
    <div
      style={{
        width: 180,
        height: 100,
        background: colors.bg,
        borderColor: selected ? "#fff" : "transparent",
        borderWidth: selected ? 2 : 0,
        boxShadow: selected
          ? "0 0 0 2px rgba(255,255,255,0.5), 0 4px 16px rgba(0,0,0,0.5)"
          : "0 3px 10px rgba(0,0,0,0.5)",
        borderStyle: esType === "hotspot" ? "dashed" : "solid",
        transform: "rotate(-1deg)",
      }}
      className={cn(
        "relative rounded-sm p-3 flex flex-col justify-between transition-all duration-200",
        selected && "scale-[1.02]"
      )}
    >
      {/* Type label top */}
      <div
        className="text-[9px] font-bold uppercase tracking-widest opacity-70"
        style={{ color: colors.text }}
      >
        {typeLabel}
      </div>

      {/* Main label */}
      <div
        className="text-sm font-bold leading-tight"
        style={{ color: colors.text }}
      >
        {d.label}
      </div>

      {/* Bottom fold effect */}
      <div
        className="absolute bottom-0 right-0 w-6 h-6"
        style={{
          background: `${colors.border}`,
          clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
          opacity: 0.5,
        }}
      />

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
});

EventStormNode.displayName = "EventStormNode";
