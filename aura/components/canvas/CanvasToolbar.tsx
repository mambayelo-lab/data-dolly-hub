"use client";
import {
  MousePointer2,
  Square,
  Hexagon,
  Server,
  Zap,
  Trash2,
  Download,
  Layout,
  Grid3x3,
  Map,
  RotateCcw,
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useCanvasStore } from "@/stores/canvas-store";
import { cn } from "@/lib/utils";

interface ToolButtonProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  danger?: boolean;
}

function ToolButton({ icon, label, active, onClick, danger }: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={cn(
        "w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-150",
        "text-slate-400 hover:text-slate-100",
        active && "bg-violet-500/20 text-violet-400 border border-violet-500/40",
        !active && "hover:bg-slate-700/60",
        danger && "hover:bg-red-500/20 hover:text-red-400"
      )}
    >
      {icon}
    </button>
  );
}

function Separator() {
  return <div className="w-px h-6 bg-slate-700 mx-0.5" />;
}

export function CanvasToolbar() {
  const {
    canvasMode,
    setCanvasMode,
    showMinimap,
    showGrid,
    toggleMinimap,
    toggleGrid,
    clearCanvas,
    loadTemplate,
    addBizCapNode,
    addApplicationNode,
    addServiceNode,
    addEventNode,
  } = useCanvasStore();

  const { fitView } = useReactFlow();

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
      <div className="glass-card rounded-2xl px-3 py-2 flex items-center gap-1 shadow-xl">
        {/* Selection mode */}
        <ToolButton
          icon={<MousePointer2 size={16} />}
          label="Sélectionner (V)"
          active={canvasMode === "select"}
          onClick={() => setCanvasMode("select")}
        />

        <Separator />

        {/* Add nodes */}
        <ToolButton
          icon={<Hexagon size={16} />}
          label="Business Capability"
          active={canvasMode === "bizcap"}
          onClick={() => { setCanvasMode("bizcap"); addBizCapNode(300, 200); }}
        />
        <ToolButton
          icon={<Square size={16} />}
          label="Application"
          active={canvasMode === "application"}
          onClick={() => { setCanvasMode("application"); addApplicationNode(400, 200); }}
        />
        <ToolButton
          icon={<Server size={16} />}
          label="Service / Microservice"
          active={canvasMode === "service"}
          onClick={() => { setCanvasMode("service"); addServiceNode(500, 200); }}
        />
        <ToolButton
          icon={<Zap size={16} />}
          label="Event (Event Storming)"
          active={canvasMode === "event"}
          onClick={() => { setCanvasMode("event"); addEventNode(600, 200); }}
        />

        <Separator />

        {/* Templates */}
        <div className="relative group">
          <ToolButton
            icon={<Layout size={16} />}
            label="Templates"
            onClick={() => {}}
          />
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-col glass-card rounded-xl overflow-hidden shadow-xl w-48 z-50">
            {[
              { id: "bizcap", label: "🗺️ BizCap Map" },
              { id: "eventsourming", label: "⚡ Event Storming" },
              { id: "c4", label: "🏗️ C4 Context" },
              { id: "microservices", label: "🔧 Microservices" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => loadTemplate(id as Parameters<typeof loadTemplate>[0])}
                className="text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-700/60 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <Separator />

        {/* View controls */}
        <ToolButton
          icon={<Grid3x3 size={16} />}
          label={showGrid ? "Cacher la grille" : "Afficher la grille"}
          active={showGrid}
          onClick={toggleGrid}
        />
        <ToolButton
          icon={<Map size={16} />}
          label={showMinimap ? "Cacher la minimap" : "Afficher la minimap"}
          active={showMinimap}
          onClick={toggleMinimap}
        />
        <ToolButton
          icon={<RotateCcw size={16} />}
          label="Ajuster la vue"
          onClick={() => fitView({ duration: 600, padding: 0.2 })}
        />

        <Separator />

        {/* Danger zone */}
        <ToolButton
          icon={<Trash2 size={16} />}
          label="Effacer le canvas"
          danger
          onClick={clearCanvas}
        />
      </div>
    </div>
  );
}
