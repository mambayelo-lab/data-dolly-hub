import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { purchaseOrders, suppliers, supplierName, partName, fmtEUR } from "@/data/helvexPrecision";

export function CoopaApp() {
  const open = purchaseOrders.filter((p) => p.status !== "Réceptionné");
  const committed = purchaseOrders.reduce((s, p) => s + p.qty * p.unitPriceEUR, 0);
  return (
    <AppShell
      vendorClass="vendor-coopa"
      vendorName="Coopa"
      appName="Procurement · Helvex Precision"
      appSubtitle="Source-to-Pay · EUR"
      logo={<VendorLogo brand="coopa" />}
      user={{ name: "Léa Garnier", role: "Acheteuse Sénior · Matières" }}
      rightTopbar={<span className="opacity-80">Budget direct : 42 M€ / 60 M€ FY26</span>}
      nav={[
        { label: "Dashboards" },
        { label: "Requisitions", badge: "9" },
        { label: "Purchase Orders", active: true, badge: String(purchaseOrders.length) },
        { label: "Invoices", badge: "14" },
        { label: "Suppliers", badge: String(suppliers.length) },
        { label: "Contracts" },
        { label: "Sourcing events" },
        { label: "Risk Aware" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Source-to-Pay</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Purchase Orders — vue acheteur</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Connecteur IFX Cloud actif · sync. toutes les 15 min</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="PO ouverts" value={String(open.length)} sub="dont 1 en litige" trend="down" />
        <KpiCard label="Engagement S23" value={fmtEUR(committed)} sub="+12 % vs S22" trend="up" />
        <KpiCard label="OTD fournisseurs" value="93.6 %" sub="cible 95 %" trend="flat" />
        <KpiCard label="Économies réalisées" value={fmtEUR(184_000)} sub="YTD vs baseline" trend="up" />
      </div>
      <DataTable
        caption="Purchase Orders"
        rows={purchaseOrders}
        columns={[
          { key: "id", header: "PO #", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "supplierId", header: "Supplier", render: (r) => supplierName(r.supplierId) },
          { key: "pn", header: "Item", render: (r) => <span><span className="font-mono text-xs">{r.pn}</span> · {partName(r.pn)}</span> },
          { key: "qty", header: "Qty", align: "right", render: (r) => `${r.qty} ${r.uom}` },
          { key: "unitPriceEUR", header: "Prix u.", align: "right", render: (r) => fmtEUR(r.unitPriceEUR) },
          { key: "total", header: "Total", align: "right", render: (r) => fmtEUR(r.qty * r.unitPriceEUR) },
          { key: "expectedAt", header: "Réception prévue" },
          { key: "status", header: "Statut", render: (r) => <Badge color={r.status === "Réceptionné" ? "#16a34a" : r.status === "Litige" ? "#dc2626" : r.status === "Envoyé" ? "#ff5b34" : "#6b7280"}>{r.status}</Badge> },
          { key: "buyer", header: "Acheteur" },
        ]}
      />
      <div className="mt-6">
        <DataTable
          caption="Performance fournisseurs"
          rows={suppliers}
          columns={[
            { key: "id", header: "ID", render: (s) => <span className="font-mono text-xs">{s.id}</span> },
            { key: "name", header: "Fournisseur" },
            { key: "country", header: "Pays" },
            { key: "rating", header: "Note", render: (s) => <Badge color={s.rating === "A" ? "#16a34a" : s.rating === "B" ? "#f59e0b" : "#dc2626"}>{s.rating}</Badge> },
            { key: "otd", header: "OTD %", align: "right", render: (s) => `${s.otd}` },
            { key: "ppm", header: "PPM Qualité", align: "right" },
          ]}
        />
      </div>
    </AppShell>
  );
}
