import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { orders, products, customers, fmtEUR, skuName } from "@/data/maisonLumen";

export function SapApp() {
  const ap = orders.slice(0, 6);
  const totalAR = orders.reduce((s, o) => s + o.totalEUR, 0);
  return (
    <AppShell
      vendorClass="vendor-sap"
      vendorName="SAP"
      appName="S/4HANA · Finance & Procurement"
      appSubtitle="Productive · Client 100 · MLUMEN"
      logo={<span className="font-bold tracking-tight text-base">SAP</span>}
      user={{ name: "Camille Roux", role: "Finance Lead" }}
      rightTopbar={<span className="opacity-80">EUR · FY 2026 · Période 06</span>}
      nav={[
        { label: "Home" },
        { label: "Manage Sales Orders", active: true, badge: String(orders.length) },
        { label: "Display Billing Documents" },
        { label: "Customer Line Items" },
        { label: "Material Master" },
        { label: "Supplier Invoices", badge: "12" },
        { label: "GL Account Balances" },
        { label: "Profit Center Reporting" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Application</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Manage Sales Orders</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Standard variant · Last refresh 06.06.2026 09:14 CET</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Open Orders" value="74" sub="↑ 6 vs hier" trend="up" />
        <KpiCard label="Net Value (MTD)" value={fmtEUR(totalAR * 28)} sub="+12.4 % vs N-1" trend="up" />
        <KpiCard label="On-time delivery" value="94.2 %" sub="Target 95 %" trend="down" />
        <KpiCard label="Blocked Items" value="3" sub="2 credit / 1 stock" trend="flat" />
      </div>

      <DataTable
        caption={`Sales Orders — ${ap.length} of ${orders.length}`}
        rows={ap}
        columns={[
          { key: "id", header: "Sales Order", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "date", header: "Created On" },
          { key: "channel", header: "Distribution Channel" },
          { key: "customerId", header: "Sold-To Party", render: (r) => customers.find((c) => c.id === r.customerId)?.name ?? r.customerId },
          { key: "lines", header: "Items", align: "right", render: (r) => <span>{r.lines.reduce((s, l) => s + l.qty, 0)}</span> },
          { key: "totalEUR", header: "Net Value", align: "right", render: (r) => fmtEUR(r.totalEUR) },
          {
            key: "status",
            header: "Overall Status",
            render: (r) => {
              const color = r.status === "Livrée" ? "#16a34a" : r.status === "Retour partiel" ? "#dc2626" : r.status === "Annulée" ? "#6b7280" : "#0a6ed1";
              return <Badge color={color}>{r.status}</Badge>;
            },
          },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Material Master — top sellers</div>
          <ul className="space-y-2 text-sm">
            {products.slice(0, 6).map((p) => (
              <li key={p.sku} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span><span className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{p.sku}</span> — {p.name}</span>
                <span className="tabular-nums">{fmtEUR(p.priceEUR)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">FI/CO — Marge brute par catégorie (MTD)</div>
          <ul className="space-y-2 text-sm">
            {Array.from(new Set(products.map((p) => p.category))).map((cat) => {
              const ps = products.filter((p) => p.category === cat);
              const margin = ps.reduce((s, p) => s + p.marginPct, 0) / ps.length;
              return (
                <li key={cat} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                  <span>{cat}</span>
                  <span className="tabular-nums">{margin.toFixed(1)} %</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>Powered by SAP S/4HANA 2023 FPS02 · System AUR-PRD · Client 100</span>
        <span className="font-mono">{skuName(orders[0].lines[0].sku)}</span>
      </div>
    </AppShell>
  );
}
