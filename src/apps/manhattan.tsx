import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { stock, stores, products, orders, totalOnHand, fmtEUR } from "@/data/maisonLumen";

export function ManhattanApp() {
  return (
    <AppShell
      vendorClass="vendor-manhattan"
      vendorName="Manhattan"
      appName="Active® Omni · OMS / WMS"
      appSubtitle="Tenant MLUMEN-PRD · Region EU-WEST"
      logo={<span className="font-bold tracking-tight">MANHATTAN<span style={{ color: "#ef7d00" }}>.</span></span>}
      user={{ name: "Yannick Mboup", role: "Supply Chain Lead" }}
      rightTopbar={<span>SLA fulfillment 99.1 %</span>}
      nav={[
        { label: "Order Hub", active: true },
        { label: "Inventory Visibility", badge: String(stock.length) },
        { label: "Distributed Order Mgmt" },
        { label: "Ship from Store" },
        { label: "Click & Collect" },
        { label: "Returns & Exchanges" },
        { label: "Carrier & Routing" },
        { label: "Warehouse Mgmt (WMS)" },
        { label: "Network Config" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Distributed Order Management</div>
        <h1 className="text-2xl font-semibold mt-1">Order Hub — orchestration omnicanale</h1>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Orders to release" value="184" sub="42 < 1h SLA" trend="down" />
        <KpiCard label="Ship-from-Store rate" value="38 %" sub="Target 35 %" trend="up" />
        <KpiCard label="Stock unifié (SKU)" value={String(products.length)} sub="Cross-channel live" />
        <KpiCard label="Backorders" value="7" sub="3 attente fournisseur" trend="flat" />
      </div>

      <DataTable
        caption="Inventory by location · live"
        rows={stock}
        columns={[
          { key: "sku", header: "SKU", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.sku}</span> },
          { key: "sku", header: "Description", render: (r) => products.find((p) => p.sku === r.sku)?.name ?? "" },
          { key: "storeCode", header: "Location", render: (r) => stores.find((s) => s.code === r.storeCode)?.name ?? r.storeCode },
          { key: "onHand", header: "On hand", align: "right" },
          { key: "reserved", header: "Reserved", align: "right" },
          { key: "inTransit", header: "In transit", align: "right" },
          {
            key: "onHand",
            header: "ATP",
            align: "right",
            render: (r) => <span className="tabular-nums font-semibold">{r.onHand - r.reserved + r.inTransit}</span>,
          },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Allocation engine — derniers releases</div>
          {orders.slice(0, 5).map((o) => (
            <div key={o.id} className="flex justify-between items-center py-2 border-b text-sm last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
              <div>
                <div className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{o.id}</div>
                <div className="text-xs" style={{ color: "var(--vendor-muted)" }}>{o.channel} → {stores.find((s) => s.code === o.storeCode)?.name}</div>
              </div>
              <Badge>{o.carrier ?? "—"}</Badge>
            </div>
          ))}
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Stock global · top SKU</div>
          {products.slice(0, 6).map((p) => (
            <div key={p.sku} className="flex justify-between py-2 border-b text-sm last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
              <span>{p.name}</span>
              <span className="tabular-nums font-semibold">{totalOnHand(p.sku)} pcs · {fmtEUR(p.priceEUR)}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
