"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  PenLine,
  Hexagon,
  Zap,
  BarChart3,
  Settings,
  ExternalLink,
  ChevronRight,
  Shield,
  Database,
  Cloud,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    group: "Principal",
    items: [
      { href: "/", icon: LayoutDashboard, label: "Dashboard", color: "#8b5cf6" },
      { href: "/canvas", icon: PenLine, label: "Canvas MIRO", color: "#06b6d4" },
      { href: "/capabilities", icon: Hexagon, label: "BizCap Map", color: "#f97316" },
      { href: "/eventstorming", icon: Zap, label: "Event Storming", color: "#f97316" },
      { href: "/portfolio", icon: BarChart3, label: "App Portfolio", color: "#10b981" },
    ],
  },
  {
    group: "Domaines",
    items: [
      { href: "/infra", icon: Cloud, label: "Infrastructure", color: "#3b82f6" },
      { href: "/data", icon: Database, label: "Data Architecture", color: "#06b6d4" },
      { href: "/cyber", icon: Shield, label: "Cybersécurité", color: "#ef4444" },
    ],
  },
  {
    group: "Connecteurs",
    items: [
      { href: "/integrations/leainx", icon: ExternalLink, label: "LeanIX", color: "#64748b", badge: "API" },
      { href: "/integrations/jira", icon: ExternalLink, label: "JIRA", color: "#64748b", badge: "API" },
      { href: "/integrations/confluence", icon: ExternalLink, label: "Confluence", color: "#64748b", badge: "API" },
    ],
  },
];

function NavItem({
  href,
  icon: Icon,
  label,
  color,
  badge,
  active,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  color: string;
  badge?: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 group",
        active
          ? "bg-violet-500/15 border border-violet-500/30"
          : "hover:bg-slate-800/60 border border-transparent"
      )}
    >
      <div
        className={cn(
          "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 transition-all",
          active ? "opacity-100" : "opacity-60 group-hover:opacity-100"
        )}
        style={{ background: `${color}20` }}
      >
        <Icon size={12} />
      </div>
      <span
        className={cn(
          "text-xs font-medium flex-1 transition-colors",
          active ? "text-slate-100" : "text-slate-500 group-hover:text-slate-300"
        )}
      >
        {label}
      </span>
      {badge && (
        <span className="text-[8px] px-1 py-0.5 rounded border border-slate-700 text-slate-600">
          {badge}
        </span>
      )}
      {active && <ChevronRight size={10} className="text-violet-400" />}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-52 flex-shrink-0 h-screen flex flex-col border-r border-slate-800/60 bg-slate-900/50 backdrop-blur-sm">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-slate-800/60">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold gradient-text">AURA</div>
            <div className="text-[9px] text-slate-600 leading-tight">Architecture AI</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {NAV_ITEMS.map((group) => (
          <div key={group.group}>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-slate-700 px-3 mb-1.5">
              {group.group}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  {...item}
                  active={
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  }
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-slate-800/60">
        <Link
          href="/settings"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-800/60 transition-colors group"
        >
          <Settings size={13} className="text-slate-600 group-hover:text-slate-400" />
          <span className="text-xs text-slate-600 group-hover:text-slate-400">Paramètres</span>
        </Link>
        <div className="mt-2 px-3">
          <div className="text-[8px] text-slate-700">AURA v0.1.0</div>
          <div className="text-[8px] text-slate-700">Powered by Claude Sonnet 5</div>
        </div>
      </div>
    </div>
  );
}
