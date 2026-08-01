"use client";
import { ReactFlowProvider } from "@xyflow/react";
import { AuraCanvas } from "@/components/canvas/AuraCanvas";
import { AgentChat } from "@/components/chat/AgentChat";
import { useCanvasStore } from "@/stores/canvas-store";
import { useEffect } from "react";
import { Zap } from "lucide-react";

export default function EventStormingPage() {
  const { loadTemplate, clearCanvas } = useCanvasStore();

  useEffect(() => {
    loadTemplate("eventsourming");
    return () => clearCanvas();
  }, []);

  return (
    <div className="h-full flex overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-3 border-b border-slate-800/60 flex items-center gap-3 bg-slate-900/50">
          <div className="w-7 h-7 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Zap size={14} className="text-orange-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100">Event Storming Board</h1>
            <p className="text-[10px] text-slate-500">
              🟠 Event · 🔵 Command · 🟣 Policy · 🟡 Aggregate · 🔴 Hotspot · 🟢 Read Model
            </p>
          </div>
        </div>
        <div className="flex-1">
          <ReactFlowProvider>
            <AuraCanvas />
          </ReactFlowProvider>
        </div>
      </div>
      <div className="w-80 flex-shrink-0 border-l border-slate-800/60 flex flex-col">
        <AgentChat />
      </div>
    </div>
  );
}
