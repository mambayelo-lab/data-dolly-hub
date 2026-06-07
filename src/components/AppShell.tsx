import { Link } from "@tanstack/react-router";
import { useState, type ReactNode, type MouseEvent } from "react";
import { ArrowLeft, X } from "lucide-react";
import { toast } from "sonner";

type NavItem = {
  label: string;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
};

type Props = {
  vendorClass: string;
  vendorName: string;
  appName: string;
  appSubtitle?: string;
  logo?: ReactNode;
  nav: NavItem[];
  user?: { name: string; role: string };
  children: ReactNode;
  rightTopbar?: ReactNode;
  /** Optional toolbar buttons rendered above the page content. Click → toast. */
  toolbar?: { label: string; primary?: boolean; onClick?: () => void }[];
};

export function AppShell({ vendorClass, vendorName, appName, appSubtitle, logo, nav, user, children, rightTopbar, toolbar }: Props) {
  // Fallback: if parent didn't provide onClick on items, manage active state internally
  const initial = nav.findIndex((n) => n.active);
  const [internalActive, setInternalActive] = useState(initial === -1 ? 0 : initial);
  const anyHasHandler = nav.some((n) => n.onClick || n.href);

  return (
    <div className={`vendor-shell ${vendorClass} min-h-screen`}>
      <header className="vendor-topbar h-12 flex items-center px-4 gap-4 text-sm font-medium">
        <Link to="/" className="opacity-80 hover:opacity-100 flex items-center gap-1.5 text-xs uppercase tracking-wide">
          <ArrowLeft className="h-3.5 w-3.5" /> Hub
        </Link>
        <div className="h-5 w-px bg-white/30" />
        <div className="bg-white rounded px-2 py-1 flex items-center shadow-sm">{logo ?? <span className="font-semibold">{vendorName}</span>}</div>
        <span className="opacity-75">|</span>
        <span className="opacity-90">{appName}</span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          {rightTopbar}
          <button
            type="button"
            onClick={() => toast.success(`${vendorName} · notifications synchronisées`, { description: "Aucun nouvel incident bloquant." })}
            className="hidden md:inline-flex h-7 px-2 rounded bg-white/15 hover:bg-white/25 items-center"
            aria-label="Notifications"
          >
            🔔
          </button>
          {user && (
            <button
              type="button"
              onClick={() => toast(`${user.name}`, { description: user.role })}
              className="flex items-center gap-2 hover:bg-white/10 rounded px-1 py-1"
            >
              <div className="text-right leading-tight">
                <div>{user.name}</div>
                <div className="opacity-70 text-[10px]">{user.role}</div>
              </div>
              <div className="h-7 w-7 rounded-full bg-white/20 grid place-items-center text-[10px]">
                {user.name.split(" ").map((s) => s[0]).slice(0, 2).join("")}
              </div>
            </button>
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
            {nav.map((n, idx) => {
              const isActive = anyHasHandler ? !!n.active : internalActive === idx;
              const handle = (e: MouseEvent) => {
                e.preventDefault();
                if (n.onClick) n.onClick();
                else {
                  setInternalActive(idx);
                  toast(`${n.label}`, { description: `${vendorName} · vue chargée` });
                }
              };
              return (
                <button
                  type="button"
                  key={n.label}
                  onClick={handle}
                  className="w-full text-left px-3 py-2 rounded text-sm flex items-center justify-between transition-colors hover:bg-black/[0.03]"
                  style={{
                    background: isActive ? "color-mix(in oklab, var(--vendor-color) 12%, white)" : "transparent",
                    color: isActive ? "var(--vendor-color)" : "var(--vendor-ink)",
                    borderLeft: isActive ? "3px solid var(--vendor-color)" : "3px solid transparent",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  <span className="flex items-center gap-2">
                    {n.icon}
                    {n.label}
                  </span>
                  {n.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--vendor-color)", color: "white" }}>
                      {n.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {toolbar && toolbar.length > 0 && (
            <div className="mb-4 flex gap-2 justify-end">
              {toolbar.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={() => (b.onClick ? b.onClick() : toast(`${b.label}`, { description: "Action exécutée (mock)" }))}
                  className="px-3 py-1.5 text-xs rounded border font-medium transition-colors"
                  style={
                    b.primary
                      ? { background: "var(--vendor-color)", color: "white", borderColor: "var(--vendor-color)" }
                      : { background: "white", color: "var(--vendor-ink)", borderColor: "var(--vendor-border)" }
                  }
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export function KpiCard({ label, value, sub, trend, onClick }: { label: string; value: string; sub?: string; trend?: "up" | "down" | "flat"; onClick?: () => void }) {
  const color = trend === "up" ? "#16a34a" : trend === "down" ? "#dc2626" : "var(--vendor-muted)";
  const handle = () => {
    if (onClick) onClick();
    else toast(label, { description: `${value}${sub ? " · " + sub : ""}` });
  };
  return (
    <button type="button" onClick={handle} className="kpi-card text-left hover:shadow-md transition-shadow cursor-pointer">
      <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--vendor-muted)" }}>{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums" style={{ color: "var(--vendor-ink)" }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color }}>{sub}</div>}
    </button>
  );
}

export function DataTable<T>({
  rows,
  columns,
  caption,
  onRowClick,
  rowKey,
}: {
  rows: T[];
  columns: { key: keyof T | string; header: string; render?: (row: T) => ReactNode; align?: "left" | "right" }[];
  caption?: string;
  onRowClick?: (row: T) => void;
  rowKey?: (row: T, i: number) => string;
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
            <tr
              key={rowKey ? rowKey(r, i) : i}
              onClick={onRowClick ? () => onRowClick(r) : undefined}
              className={`border-t ${onRowClick ? "cursor-pointer hover:bg-black/[0.025]" : ""}`}
              style={{ borderColor: "var(--vendor-border)" }}
            >
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

/** SAP Fiori-style tile */
export function FioriTile({
  title,
  subtitle,
  value,
  unit,
  trend,
  color,
  onClick,
  icon,
}: {
  title: string;
  subtitle?: string;
  value?: string;
  unit?: string;
  trend?: "up" | "down" | "flat";
  color?: string;
  onClick?: () => void;
  icon?: ReactNode;
}) {
  const bg = color ?? "var(--vendor-color)";
  const trendColor = trend === "up" ? "#16a34a" : trend === "down" ? "#dc2626" : "#6b7280";
  return (
    <button
      type="button"
      onClick={onClick ?? (() => toast(title, { description: subtitle ?? value }))}
      className="group relative bg-white rounded-sm border h-[176px] w-full text-left p-3 flex flex-col justify-between hover:shadow-md transition-all hover:-translate-y-0.5"
      style={{ borderColor: "var(--vendor-border)", borderTop: `3px solid ${bg}` }}
    >
      <div>
        <div className="text-[11px] uppercase tracking-wide" style={{ color: "var(--vendor-muted)" }}>{subtitle ?? "Application"}</div>
        <div className="text-[13px] font-semibold mt-0.5 leading-tight" style={{ color: "var(--vendor-ink)" }}>{title}</div>
      </div>
      {value !== undefined ? (
        <div className="flex items-end gap-1">
          <div className="text-3xl font-light tabular-nums" style={{ color: bg }}>{value}</div>
          {unit && <div className="text-xs mb-1" style={{ color: "var(--vendor-muted)" }}>{unit}</div>}
          {trend && <div className="ml-auto text-xs font-semibold" style={{ color: trendColor }}>{trend === "up" ? "▲" : trend === "down" ? "▼" : "▬"}</div>}
        </div>
      ) : (
        <div className="text-4xl opacity-30 self-end">{icon ?? "⬛"}</div>
      )}
    </button>
  );
}

/** Side drawer for row details */
export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <aside className="fixed right-0 top-0 h-full w-[480px] max-w-[92vw] bg-white z-50 shadow-2xl flex flex-col" style={{ borderLeft: "1px solid var(--vendor-border)" }}>
        <header className="h-12 px-4 flex items-center justify-between border-b" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold" style={{ color: "var(--vendor-ink)" }}>{title}</div>
          <button type="button" onClick={onClose} className="p-1 hover:bg-black/5 rounded" aria-label="Fermer"><X className="h-4 w-4" /></button>
        </header>
        <div className="flex-1 overflow-auto p-4 text-sm">{children}</div>
      </aside>
    </>
  );
}
