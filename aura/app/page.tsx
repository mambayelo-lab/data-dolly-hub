"use client";
import Link from "next/link";
import {
  Sparkles,
  PenLine,
  Hexagon,
  Zap,
  BarChart3,
  ArrowRight,
  TrendingUp,
  Layers,
  Globe2,
  Shield,
  Database,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { AgentChat } from "@/components/chat/AgentChat";

const QUICK_ACTIONS = [
  {
    href: "/canvas",
    icon: PenLine,
    label: "Nouveau Canvas",
    description: "Créez une architecture Miro-like",
    color: "#06b6d4",
    gradient: "from-cyan-500/10 to-transparent",
  },
  {
    href: "/capabilities",
    icon: Hexagon,
    label: "Business Capability Map",
    description: "Cartographiez vos capacités métier",
    color: "#f97316",
    gradient: "from-orange-500/10 to-transparent",
  },
  {
    href: "/eventstorming",
    icon: Zap,
    label: "Event Storming",
    description: "Modélisez vos domaines métier",
    color: "#eab308",
    gradient: "from-yellow-500/10 to-transparent",
  },
  {
    href: "/portfolio",
    icon: BarChart3,
    label: "Application Portfolio",
    description: "Gérez votre portefeuille applicatif",
    color: "#10b981",
    gradient: "from-emerald-500/10 to-transparent",
  },
];

const STATS = [
  { label: "Capabilities", value: "—", Icon: Hexagon, color: "#f97316" },
  { label: "Applications", value: "—", Icon: Layers, color: "#10b981" },
  { label: "Domaines", value: "—", Icon: Globe2, color: "#8b5cf6" },
  { label: "Interviews", value: "—", Icon: Sparkles, color: "#06b6d4" },
];

const RECENT_CANVASES = [
  { id: 1, name: "BizCap Map Retail", type: "bizcap", updated: "Aujourd'hui" },
  { id: 2, name: "Architecture E-Commerce", type: "architecture", updated: "Hier" },
  { id: 3, name: "Event Storming Commande", type: "eventsourcing", updated: "Il y a 2 jours" },
];

const CAPABILITIES = [
  { label: "TOGAF & CESAMES", icon: TrendingUp, color: "#8b5cf6" },
  { label: "DDD & Event Storming", icon: Zap, color: "#f97316" },
  { label: "Microservices & 12-Factor", icon: Layers, color: "#3b82f6" },
  { label: "Architecture Data", icon: Database, color: "#10b981" },
  { label: "Cybersécurité Zero Trust", icon: Shield, color: "#ef4444" },
  { label: "LeanIX / JIRA / Confluence", icon: ExternalLink, color: "#64748b" },
];

export default function DashboardPage() {
  return (
    <div className="h-full flex">
      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="relative px-8 py-10 bg-aura-hero border-b border-slate-800/60">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
                AURA — Architecture Intelligence
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-100 leading-tight mb-3">
              Votre Architecte d&apos;Entreprise{" "}
              <span className="gradient-text">Augmenté par l&apos;IA</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
              AURA combine une équipe d&apos;agents spécialisés pour vous aider à cartographier vos business capabilities,
              designer vos architectures, orchestrer vos event stormings et dimensionner vos investissements SI.
            </p>
            <div className="flex gap-3 mt-5">
              <Link
                href="/canvas"
                className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold transition-all duration-150 shadow-glow-purple"
              >
                <PenLine size={14} /> Nouveau Canvas
              </Link>
              <Link
                href="/capabilities"
                className="flex items-center gap-2 px-4 py-2 border border-slate-700 hover:border-violet-500/50 text-slate-300 hover:text-slate-100 rounded-xl text-xs font-semibold transition-all duration-150"
              >
                <Hexagon size={14} /> BizCap Map
              </Link>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            {STATS.map(({ label, value, Icon, color }) => (
              <div
                key={label}
                className="glass-card rounded-xl p-4 flex items-center gap-3"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}20` }}
                >
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-lg font-bold text-slate-100">{value}</div>
                  <div className="text-[10px] text-slate-500">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-3">Actions rapides</h2>
            <div className="grid grid-cols-2 gap-3">
              {QUICK_ACTIONS.map(({ href, icon: Icon, label, description, color, gradient }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "glass-card rounded-xl p-4 hover:border-slate-600 transition-all duration-200 group",
                    "bg-gradient-to-br",
                    gradient
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `${color}20` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <ArrowRight
                      size={14}
                      className="text-slate-700 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all"
                    />
                  </div>
                  <div className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {label}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{description}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent canvases */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-300">Canvases récents</h2>
              <Link href="/canvas" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Voir tous →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {RECENT_CANVASES.map((c) => (
                <Link
                  key={c.id}
                  href={`/canvas?id=${c.id}`}
                  className="glass-card rounded-xl overflow-hidden hover:border-slate-600 transition-all duration-200 group"
                >
                  <div className="h-20 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border-b border-slate-800">
                    <div className="text-slate-700 text-xs text-center px-3">
                      {c.type === "bizcap" && "🗺️ Business Capability Map"}
                      {c.type === "architecture" && "🏗️ Architecture Diagram"}
                      {c.type === "eventsourcing" && "⚡ Event Storming"}
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                      {c.name}
                    </div>
                    <div className="text-[9px] text-slate-600 mt-0.5">{c.updated}</div>
                  </div>
                </Link>
              ))}
              <Link
                href="/canvas"
                className="glass-card rounded-xl flex items-center justify-center h-full min-h-[100px] border-dashed hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-200 group"
              >
                <div className="text-center">
                  <div className="text-slate-700 group-hover:text-violet-400 text-xl mb-1 transition-colors">+</div>
                  <div className="text-[10px] text-slate-700 group-hover:text-slate-500 transition-colors">
                    Nouveau canvas
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Capabilities grid */}
          <div>
            <h2 className="text-sm font-semibold text-slate-300 mb-3">Expertises AURA</h2>
            <div className="grid grid-cols-3 gap-2">
              {CAPABILITIES.map(({ label, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-800 bg-slate-900/50"
                >
                  <Icon size={13} style={{ color }} />
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Agent chat */}
      <div className="w-80 flex-shrink-0 border-l border-slate-800/60 flex flex-col">
        <AgentChat />
      </div>
    </div>
  );
}

// Local cn helper (layout doesn't import from lib)
function cn(...args: (string | boolean | undefined)[]): string {
  return args.filter(Boolean).join(" ");
}
