"use client";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "./nodes";
import { useCanvasStore } from "@/stores/canvas-store";
import { useAgentStore } from "@/stores/agent-store";
import { CanvasToolbar } from "./CanvasToolbar";
import type { CanvasUpdateData } from "@/types";

export function AuraCanvas() {
  const {
    nodes,
    edges,
    showMinimap,
    showGrid,
    onNodesChange,
    onEdgesChange,
    onConnect,
    selectNode,
    addBizCapNode,
    addApplicationNode,
    addServiceNode,
    applyCanvasUpdate,
  } = useCanvasStore();

  const { canvasUpdates } = useAgentStore();
  const { fitView } = useReactFlow();

  // Apply canvas updates from agents
  useEffect(() => {
    if (canvasUpdates.length > 0) {
      const last = canvasUpdates[canvasUpdates.length - 1];
      if (last?.data) {
        applyCanvasUpdate(last.data as CanvasUpdateData);
        setTimeout(() => fitView({ duration: 800, padding: 0.2 }), 100);
      }
    }
  }, [canvasUpdates, applyCanvasUpdate, fitView]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: { id: string }) => {
      selectNode(node.id);
    },
    [selectNode]
  );

  const onPaneClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  // Double-click on canvas to add a bizcap node
  const onDoubleClick = useCallback(
    (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest(".react-flow__node")) return;
      const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
      addBizCapNode(event.clientX - bounds.left - 110, event.clientY - bounds.top - 50);
    },
    [addBizCapNode]
  );

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onDoubleClick={onDoubleClick}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        defaultEdgeOptions={{
          animated: false,
          style: { stroke: "#334155", strokeWidth: 2 },
        }}
        proOptions={{ hideAttribution: true }}
        className="canvas-bg"
      >
        {showGrid && (
          <Background
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1}
            color="rgba(148,163,184,0.15)"
          />
        )}

        <Controls
          position="bottom-left"
          style={{ marginBottom: 60 }}
        />

        {showMinimap && (
          <MiniMap
            position="bottom-right"
            nodeColor={(node) => {
              const data = node.data as { domain?: string; es_type?: string; lifecycle?: string };
              if (data.domain) {
                const map: Record<string, string> = {
                  strategy: "#8b5cf6", customer: "#f97316", commerce: "#10b981",
                  operations: "#3b82f6", finance: "#a855f7", people: "#ec4899",
                  data: "#06b6d4", support: "#64748b",
                };
                return map[data.domain] ?? "#334155";
              }
              if (data.es_type) {
                const map: Record<string, string> = {
                  event: "#f97316", command: "#3b82f6", policy: "#a855f7",
                  aggregate: "#eab308", external: "#ec4899", hotspot: "#ef4444",
                  readmodel: "#10b981",
                };
                return map[data.es_type] ?? "#334155";
              }
              return "#334155";
            }}
            style={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: 8,
            }}
          />
        )}

        {/* Legend Panel */}
        <Panel position="top-right">
          <div className="glass-card rounded-xl p-3 text-xs space-y-1.5 max-w-[160px]">
            <div className="text-slate-400 font-semibold uppercase tracking-wide text-[9px] mb-2">
              Légende
            </div>
            {[
              { color: "#8b5cf6", label: "BizCap — Stratégie" },
              { color: "#f97316", label: "BizCap — Client" },
              { color: "#3b82f6", label: "BizCap — Ops" },
              { color: "#10b981", label: "App — Actif" },
              { color: "#f59e0b", label: "App — Legacy" },
              { color: "#f97316", label: "Event Storming" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                  style={{ background: color }}
                />
                <span className="text-slate-400 text-[9px]">{label}</span>
              </div>
            ))}
            <div className="border-t border-slate-700 pt-1.5 mt-1 text-[9px] text-slate-600">
              Double-clic = ajouter BizCap
            </div>
          </div>
        </Panel>
      </ReactFlow>

      {/* Floating toolbar */}
      <CanvasToolbar />
    </div>
  );
}
