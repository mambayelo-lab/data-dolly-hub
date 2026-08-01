"use client";
import { ReactFlowProvider } from "@xyflow/react";
import { AuraCanvas } from "@/components/canvas/AuraCanvas";
import { AgentChat } from "@/components/chat/AgentChat";
import { useState } from "react";
import { MessageSquare, X, Maximize2 } from "lucide-react";

export default function CanvasPage() {
  const [showChat, setShowChat] = useState(true);

  return (
    <div className="h-full flex overflow-hidden">
      {/* Canvas area */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <AuraCanvas />
        </ReactFlowProvider>

        {/* Toggle chat button */}
        <button
          onClick={() => setShowChat(!showChat)}
          className="absolute top-4 right-4 z-20 w-9 h-9 glass-card rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-100 transition-colors shadow-lg"
          title={showChat ? "Fermer AURA" : "Ouvrir AURA"}
        >
          {showChat ? <X size={15} /> : <MessageSquare size={15} />}
        </button>
      </div>

      {/* Right panel: Agent chat */}
      {showChat && (
        <div className="w-80 flex-shrink-0 border-l border-slate-800/60 flex flex-col bg-slate-900/80 backdrop-blur-sm">
          <AgentChat />
        </div>
      )}
    </div>
  );
}
