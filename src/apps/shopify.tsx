import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { orders, products, customers, fmtEUR } from "@/data/maisonLumen";

export function ShopifyApp() {
  const web = orders.filter((o) => o.channel === "E-shop FR" || o.channel === "E-shop EU");
  return (
    <AppShell
      vendorClass="vendor-shopify"
      vendorName="Shopify"
      appName="Admin · maison-lumen.fr"
      appSubtitle="Plan Shopify Plus"
      logo={<VendorLogo brand="shopify" />}
      user={{ name: "Léa Vidal", role: "E-com Manager" }}
      rightTopbar={<span style={{ color: "#bbb" }}>EUR · maison-lumen.fr</span>}
      nav={[
        { label: "Home" },
        { label: "Orders", active: true, badge: String(web.length) },
        { label: "Draft orders" },
        { label: "Abandoned checkouts", badge: "23" },
        { label: "Products" },
        { label: "Customers" },
        { label: "Analytics" },
        { label: "Marketing" },
        { label: "Discounts" },
        { label: "Online Store" },
        { label: "Apps" },
      ]}
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Orders</h1>
          <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>All locations · All channels</div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs rounded border bg-white" style={{ borderColor: "var(--vendor-border)" }}>Export</button>
          <button className="px-3 py-1.5 text-xs rounded text-white font-medium" style={{ background: "#008060" }}>Create order</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Total sales (7d)" value={fmtEUR(184200)} sub="↑ 14.6 % vs prev" trend="up" />
        <KpiCard label="Orders" value="612" sub="+38 vs prev week" trend="up" />
        <KpiCard label="Conversion rate" value="3.42 %" sub="↑ 0.18 pt" trend="up" />
        <KpiCard label="Returning customer" value="48.1 %" sub="↑ 2.4 pt" trend="up" />
      </div>

      <DataTable
        caption="Recent online orders"
        rows={web}
        columns={[
          { key: "id", header: "Order", render: (r) => <span className="font-mono text-[13px]" style={{ color: "#008060" }}>#{r.id.replace("SO-2026-", "")}</span> },
          { key: "date", header: "Date" },
          { key: "customerId", header: "Customer", render: (r) => customers.find((c) => c.id === r.customerId)?.name ?? r.customerId },
          { key: "channel", header: "Channel" },
          { key: "totalEUR", header: "Total", align: "right", render: (r) => fmtEUR(r.totalEUR) },
          { key: "status", header: "Fulfillment", render: (r) => <Badge color={r.status === "Livrée" ? "#16a34a" : "#008060"}>{r.status}</Badge> },
          { key: "carrier", header: "Carrier", render: (r) => r.carrier ?? "—" },
        ]}
      />

      <div className="mt-6 grid grid-cols-3 gap-4">
        {products.slice(0, 6).map((p) => (
          <div key={p.sku} className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
            <div className="aspect-[4/3] rounded mb-3 grid place-items-center text-3xl font-display" style={{ background: `color-mix(in oklab, #008060 8%, white)`, color: "#008060" }}>
              {p.name.split(" ")[0][0]}
            </div>
            <div className="text-sm font-semibold leading-tight">{p.name}</div>
            <div className="text-xs mt-0.5 font-mono" style={{ color: "var(--vendor-muted)" }}>{p.sku}</div>
            <div className="mt-2 flex justify-between items-center text-sm">
              <span className="tabular-nums font-semibold">{fmtEUR(p.priceEUR)}</span>
              <Badge color="#008060">Active</Badge>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
