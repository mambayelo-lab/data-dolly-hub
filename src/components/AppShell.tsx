import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

type NavItem = { label: string; active?: boolean; badge?: string };

type Props = {
  vendorClass: string;       // e.g. "vendor-sap"
  vendorName: string;        // e.g. "SAP"
  appName: string;           // "S/4HANA"
  appSubtitle?: string;      // "Finance & Procurement · Maison Lumen Productive Client 100"
  logo?: ReactNode;          // text/wordmark on topbar
  nav: NavItem[];
  user?: { name: string; role: string };
  children: ReactNode;
  rightTopbar?: ReactNode;
};

export function AppShell({ vendorClass, vendorName, appName, appSubtitle, logo, nav, user, children, rightTopbar }: Props) {
  return (
    <div className={`vendor-shell ${vendorClass} min-h-screen`}>
      <header className="vendor-topbar h-12 flex items-center px-4 gap-4 text-sm font-medium">
        <Link to="/" className="opacity-80 hover:opacity-100 flex items-center gap-1.5 text-xs uppercase tracking-wide">
          <ArrowLeft className="h-3.5 w-3.5" /> Hub
        </Link>
        <div className="h-5 w-px bg-white/30" />
        <div className="bg-white rounded px-2 py-1 flex items-center shadow-sm">{logo ?? <span className="font-semibold text-ink">{vendorName}</span>}</div>
        <span className="opacity-75">|</span>
        <span className="opacity-90">{appName}</span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          {rightTopbar}
          {user && (
            <div className="flex items-center gap-2">
              <div className="text-right leading-tight">
                <div>{user.name}</div>
                <div className="opacity-70 text-[10px]">{user.role}</div>
              </div>
              <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center text-[10px]">
                {user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex">
        <aside className="w-56 shrink-0 border-r bg-white" style={{ borderColor: "var(--vendor-border)", minHeight: "calc(100vh - 48px)" }}>
          {appSubtitle && (
            <div className="px-4 py-3 text-[11px] uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>
              {appSubtitle}
            </div>
          )}
          <nav className="px-2 pb-4 space-y-0.5">
            {nav.map((n) => (
              <div
                key={n.label}
                className={`px-3 py-2 rounded text-sm flex items-center justify-between cursor-pointer ${n.active ? "font-semibold" : ""}`}
                style={{
                  background: n.active ? "color-mix(in oklab, var(--vendor-color) 12%, white)" : "transparent",
                  color: n.active ? "var(--vendor-color)" : "var(--vendor-ink)",
                  borderLeft: n.active ? "3px solid var(--vendor-color)" : "3px solid transparent",
                }}
              >
                <span>{n.label}</span>
                {n.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--vendor-color)", color: "white" }}>
                    {n.badge}
                  </span>
                )}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export function KpiCard({ label, value, sub, trend }: { label: string; value: string; sub?: string; trend?: "up" | "down" | "flat" }) {
  const color = trend === "up" ? "#16a34a" : trend === "down" ? "#dc2626" : "var(--vendor-muted)";
  return (
    <div className="kpi-card">
      <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--vendor-muted)" }}>{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums" style={{ color: "var(--vendor-ink)" }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color }}>{sub}</div>}
    </div>
  );
}

export function DataTable<T>({
  rows,
  columns,
  caption,
}: {
  rows: T[];
  columns: { key: keyof T | string; header: string; render?: (row: T) => ReactNode; align?: "left" | "right" }[];
  caption?: string;
}) {
  return (
    <div className="bg-white border rounded-md overflow-hidden" style={{ borderColor: "var(--vendor-border)" }}>
      {caption && (
        <div className="px-4 py-2.5 text-sm font-semibold border-b" style={{ borderColor: "var(--vendor-border)", color: "var(--vendor-ink)" }}>
          {caption}
        </div>
      )}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide" style={{ color: "var(--vendor-muted)", background: "color-mix(in oklab, var(--vendor-color) 4%, white)" }}>
            {columns.map((c) => (
              <th key={String(c.key)} className={`px-4 py-2 font-medium ${c.align === "right" ? "text-right" : ""}`}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t" style={{ borderColor: "var(--vendor-border)" }}>
              {columns.map((c) => (
                <td key={String(c.key)} className={`px-4 py-2.5 ${c.align === "right" ? "text-right tabular-nums" : ""}`} style={{ color: "var(--vendor-ink)" }}>
                  {c.render ? c.render(r) : String((r as Record<string, unknown>)[c.key as string] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Badge({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium"
      style={{
        background: color ? `color-mix(in oklab, ${color} 15%, white)` : "color-mix(in oklab, var(--vendor-color) 12%, white)",
        color: color ?? "var(--vendor-color)",
        border: `1px solid ${color ? `color-mix(in oklab, ${color} 30%, white)` : "color-mix(in oklab, var(--vendor-color) 25%, white)"}`,
      }}
    >
      {children}
    </span>
  );
}
