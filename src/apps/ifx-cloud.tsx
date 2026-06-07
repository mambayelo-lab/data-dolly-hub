import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { workOrders, parts, customers, customerName, partName, fmtEUR, purchaseOrders, suppliers } from "@/data/helvexPrecision";

export function IfxCloudApp() {
  const open = workOrders.filter((w) => w.status !== "Terminé");
  const backlog = open.reduce((s, w) => {
    const p = parts.find((x) => x.pn === w.pn);
    return s + (p?.sellPriceEUR ?? p?.stdCostEUR ?? 0) * w.qty;
  }, 0);
  return (
    <AppShell
      vendorClass="vendor-ifx"
      vendorName="IFX Cloud"
      appName="Manufacturing · Helvex Precision · Prod"
      appSubtitle="Helvex · ENV PROD · v25R2"
      logo={<VendorLogo brand="ifx" />}
      user={{ name: "Élodie Charvet", role: "Supply Chain Manager" }}
      rightTopbar={<span className="opacity-80">EUR · FY 2026 · S23</span>}
      nav={[
        { label: "Workspace" },
        { label: "Sales Orders" },
        { label: "Shop Orders", active: true, badge: String(open.length) },
        { label: "Material Planning (MRP)" },
        { label: "Item Master", badge: String(parts.length) },
        { label: "Purchase Orders", badge: String(purchaseOrders.length) },
        { label: "Costing & Margins" },
        { label: "Finance · GL" },
      ]}
    >
      <Header title="Shop Orders — overview" sub="Productive · last refresh 06-06-2026 09:18 CET" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Open WO" value={String(open.length)} sub="dont 1 Hors-spec" trend="flat" />
        <KpiCard label="Sales backlog" value={fmtEUR(backlog)} sub="+8.2 % vs S22" trend="up" />
        <KpiCard label="On-time delivery" value="91.4 %" sub="cible 95 %" trend="down" />
        <KpiCard label="Inventory turn" value="6.8 x" sub="+0.4 vs N-1" trend="up" />
      </div>
      <DataTable
        caption="Shop Orders — Production"
        rows={workOrders}
        columns={[
          { key: "id", header: "WO #", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "pn", header: "Item / PN", render: (r) => <span><span className="font-mono text-xs">{r.pn}</span> · {partName(r.pn)}</span> },
          { key: "qty", header: "Qty", align: "right" },
          { key: "customerId", header: "Customer", render: (r) => customerName(r.customerId) },
          { key: "dueDate", header: "Due" },
          { key: "progressPct", header: "Progress", align: "right", render: (r) => `${r.progressPct} %` },
          { key: "status", header: "Status", render: (r) => <Badge color={statusColor(r.status)}>{r.status}</Badge> },
        ]}
      />
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Item Master — articles vendus</div>
          <ul className="space-y-2 text-sm">
            {parts.filter((p) => p.sellPriceEUR).map((p) => (
              <li key={p.pn} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span><span className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{p.pn}</span> — {p.name}</span>
                <span className="tabular-nums">{fmtEUR(p.sellPriceEUR!)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Fournisseurs stratégiques</div>
          <ul className="space-y-2 text-sm">
            {suppliers.map((s) => (
              <li key={s.id} className="flex justify-between items-center py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span>{s.name} <span className="text-xs opacity-60">· {s.country}</span></span>
                <span className="flex items-center gap-2"><Badge color={s.rating === "A" ? "#16a34a" : s.rating === "B" ? "#f59e0b" : "#dc2626"}>{s.rating}</Badge><span className="tabular-nums text-xs">{s.otd}% OTD</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer left="IFX Cloud 25R2 · tenant HELVEX-PRD" right="MRP next run 06-06-2026 23:00 CET" />
    </AppShell>
  );
}

function statusColor(s: string) {
  if (s === "Terminé") return "#16a34a";
  if (s === "Hors-spec") return "#dc2626";
  if (s === "Suspendu") return "#f59e0b";
  return "#0066cc";
}
function Header({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Application</div>
      <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>{title}</h1>
      <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>{sub}</div>
    </div>
  );
}
function Footer({ left, right }: { left: string; right: string }) {
  return (
    <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
      <span>{left}</span>
      <span className="font-mono">{right}</span>
    </div>
  );
}
