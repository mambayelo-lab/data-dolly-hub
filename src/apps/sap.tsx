import { useState } from "react";
import { AppShell, KpiCard, DataTable, Badge, FioriTile, Drawer } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { orders, products, customers, stores, stock, fmtEUR, skuName, totalOnHand, type Order, type Product } from "@/data/maisonLumen";

type View = "launchpad" | "sales" | "billing" | "customers" | "materials" | "suppliers" | "gl";

const groups: { title: string; tiles: { id: View; title: string; subtitle: string; value: string; unit?: string; trend?: "up" | "down" | "flat"; color?: string }[] }[] = [
  {
    title: "Mes applications fréquentes",
    tiles: [
      { id: "sales", title: "Manage Sales Orders", subtitle: "Sales", value: String(orders.length), unit: "open", trend: "up" },
      { id: "billing", title: "Display Billing Documents", subtitle: "Sales · Billing", value: "184", unit: "K€ MTD", trend: "up" },
      { id: "customers", title: "Customer Line Items", subtitle: "Finance · AR", value: "12", unit: "overdue", trend: "down", color: "#ed8b00" },
    ],
  },
  {
    title: "Master data",
    tiles: [
      { id: "materials", title: "Material Master", subtitle: "MM01 / MM02", value: String(products.length), unit: "actifs", color: "#107e3e" },
      { id: "suppliers", title: "Supplier Invoices", subtitle: "MIRO · pending", value: "12", unit: "à valider", trend: "flat", color: "#0a6ed1" },
    ],
  },
  {
    title: "Finance & Reporting",
    tiles: [
      { id: "gl", title: "GL Account Balances", subtitle: "FI · S/4 Universal Journal", value: "FY26", color: "#5b738b" },
    ],
  },
];

const NAV: { label: string; id: View; badge?: string }[] = [
  { label: "Home", id: "launchpad" },
  { label: "Manage Sales Orders", id: "sales", badge: String(orders.length) },
  { label: "Display Billing Documents", id: "billing" },
  { label: "Customer Line Items", id: "customers", badge: "12" },
  { label: "Material Master", id: "materials", badge: String(products.length) },
  { label: "Supplier Invoices", id: "suppliers", badge: "12" },
  { label: "GL Account Balances", id: "gl" },
];

export function SapApp() {
  const [view, setView] = useState<View>("launchpad");
  const [openOrder, setOpenOrder] = useState<Order | null>(null);
  const [openProduct, setOpenProduct] = useState<Product | null>(null);

  return (
    <AppShell
      vendorClass="vendor-sap"
      vendorName="SAP"
      appName="S/4HANA · Fiori Launchpad"
      appSubtitle="Productive · Client 100 · MLUMEN"
      logo={<VendorLogo brand="sap" />}
      user={{ name: "Camille Roux", role: "Finance Lead" }}
      rightTopbar={<span className="opacity-80">EUR · FY 2026 · Période 06</span>}
      nav={NAV.map((n) => ({ label: n.label, badge: n.badge, active: view === n.id, onClick: () => setView(n.id) }))}
      toolbar={view !== "launchpad" ? [
        { label: "Adapt Filters" },
        { label: "Share" },
        { label: "Create", primary: true },
      ] : undefined}
    >
      {view === "launchpad" && <Launchpad onOpen={(id) => setView(id)} />}
      {view === "sales" && <SalesOrders onOpen={setOpenOrder} />}
      {view === "billing" && <Billing />}
      {view === "customers" && <CustomerLineItems />}
      {view === "materials" && <MaterialMaster onOpen={setOpenProduct} />}
      {view === "suppliers" && <SupplierInvoices />}
      {view === "gl" && <GLBalances />}

      <Drawer open={!!openOrder} onClose={() => setOpenOrder(null)} title={openOrder ? `Sales Order · ${openOrder.id}` : ""}>
        {openOrder && <OrderDetail order={openOrder} />}
      </Drawer>
      <Drawer open={!!openProduct} onClose={() => setOpenProduct(null)} title={openProduct ? `Material · ${openProduct.sku}` : ""}>
        {openProduct && <ProductDetail product={openProduct} />}
      </Drawer>
    </AppShell>
  );
}

function Launchpad({ onOpen }: { onOpen: (v: View) => void }) {
  return (
    <div>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>SAP Fiori Launchpad</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Bonjour Camille</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Rôle : Finance Lead (FAGL_GL_DISPLAY, SD_ORDER, FK_DISP) · Dernière connexion 06.06.2026 09:14</div>
      </div>

      {groups.map((g) => (
        <section key={g.title} className="mb-8">
          <div className="text-[13px] font-semibold uppercase tracking-wide mb-3" style={{ color: "var(--vendor-muted)" }}>{g.title}</div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {g.tiles.map((t) => (
              <FioriTile
                key={t.id}
                title={t.title}
                subtitle={t.subtitle}
                value={t.value}
                unit={t.unit}
                trend={t.trend}
                color={t.color}
                onClick={() => onOpen(t.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SalesOrders({ onOpen }: { onOpen: (o: Order) => void }) {
  const totalAR = orders.reduce((s, o) => s + o.totalEUR, 0);
  return (
    <div>
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Application</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Manage Sales Orders</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Standard variant · Last refresh 06.06.2026 09:14 CET · Cliquez une ligne pour le détail</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Open Orders" value={String(orders.filter(o => o.status !== "Livrée" && o.status !== "Annulée").length)} sub="↑ 6 vs hier" trend="up" />
        <KpiCard label="Net Value (MTD)" value={fmtEUR(totalAR * 28)} sub="+12.4 % vs N-1" trend="up" />
        <KpiCard label="On-time delivery" value="94.2 %" sub="Target 95 %" trend="down" />
        <KpiCard label="Blocked Items" value="3" sub="2 credit / 1 stock" trend="flat" />
      </div>
      <DataTable
        caption={`Sales Orders — ${orders.length} items`}
        rows={orders}
        rowKey={(r) => r.id}
        onRowClick={onOpen}
        columns={[
          { key: "id", header: "Sales Order", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "date", header: "Created On" },
          { key: "channel", header: "Distribution Channel" },
          { key: "customerId", header: "Sold-To Party", render: (r) => customers.find((c) => c.id === r.customerId)?.name ?? r.customerId },
          { key: "lines", header: "Items", align: "right", render: (r) => r.lines.reduce((s, l) => s + l.qty, 0) },
          { key: "totalEUR", header: "Net Value", align: "right", render: (r) => fmtEUR(r.totalEUR) },
          { key: "status", header: "Overall Status", render: (r) => {
            const color = r.status === "Livrée" ? "#16a34a" : r.status === "Retour partiel" ? "#dc2626" : r.status === "Annulée" ? "#6b7280" : "#0a6ed1";
            return <Badge color={color}>{r.status}</Badge>;
          } },
        ]}
      />
    </div>
  );
}

function Billing() {
  const billable = orders.filter((o) => o.status === "Livrée" || o.status === "Expédiée");
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Display Billing Documents</h1>
      <div className="text-xs mb-6" style={{ color: "var(--vendor-muted)" }}>VF03 · Documents de facturation période 06/2026</div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Documents émis" value={String(billable.length)} sub="MTD" trend="up" />
        <KpiCard label="Net facturé" value={fmtEUR(billable.reduce((s, o) => s + o.totalEUR, 0))} sub="HT" trend="up" />
        <KpiCard label="Avoirs" value="2" sub="-1 240 €" trend="flat" />
        <KpiCard label="À transférer FI" value="0" sub="release OK" trend="flat" />
      </div>
      <DataTable
        caption="Facturation — pièces"
        rows={billable}
        rowKey={(r) => r.id}
        columns={[
          { key: "id", header: "Billing Doc.", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id.replace("SO", "FA")}</span> },
          { key: "date", header: "Billing Date" },
          { key: "customerId", header: "Payer", render: (r) => customers.find((c) => c.id === r.customerId)?.name ?? r.customerId },
          { key: "totalEUR", header: "Net Value", align: "right", render: (r) => fmtEUR(r.totalEUR) },
          { key: "totalEUR", header: "VAT (20%)", align: "right", render: (r) => fmtEUR(r.totalEUR * 0.2) },
          { key: "totalEUR", header: "Gross", align: "right", render: (r) => fmtEUR(r.totalEUR * 1.2) },
          { key: "status", header: "Statut", render: () => <Badge color="#16a34a">Comptabilisé</Badge> },
        ]}
      />
    </div>
  );
}

function CustomerLineItems() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Customer Line Items</h1>
      <div className="text-xs mb-6" style={{ color: "var(--vendor-muted)" }}>FBL5N · Vue Comptabilité Client · MLUMEN</div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Encours total" value={fmtEUR(412_800)} sub="dont 84 K€ > 60j" trend="down" />
        <KpiCard label="DSO" value="42 j" sub="cible 38" trend="down" />
        <KpiCard label="Clients actifs" value={String(customers.length)} />
        <KpiCard label="LTV moyenne VIP" value={fmtEUR(17_135)} trend="up" />
      </div>
      <DataTable
        caption="Comptes clients"
        rows={customers}
        rowKey={(c) => c.id}
        columns={[
          { key: "id", header: "Customer #", render: (c) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{c.id}</span> },
          { key: "name", header: "Name" },
          { key: "city", header: "City" },
          { key: "segment", header: "Segment", render: (c) => <Badge color={c.segment === "VIP" ? "#a855f7" : c.segment === "B2B" ? "#0a6ed1" : "#16a34a"}>{c.segment}</Badge> },
          { key: "ordersCount", header: "Orders", align: "right" },
          { key: "lifetimeValueEUR", header: "LTV", align: "right", render: (c) => fmtEUR(c.lifetimeValueEUR) },
          { key: "lastOrderAt", header: "Last Order" },
        ]}
      />
    </div>
  );
}

function MaterialMaster({ onOpen }: { onOpen: (p: Product) => void }) {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Material Master</h1>
      <div className="text-xs mb-6" style={{ color: "var(--vendor-muted)" }}>MM03 · Affichage article · vue Comptabilité + Achats</div>
      <DataTable
        caption={`Articles — ${products.length}`}
        rows={products}
        rowKey={(p) => p.sku}
        onRowClick={onOpen}
        columns={[
          { key: "sku", header: "Material #", render: (p) => <span className="font-mono text-[12px]" style={{ color: "var(--vendor-color)" }}>{p.sku}</span> },
          { key: "name", header: "Designation" },
          { key: "category", header: "Plant cat." },
          { key: "collection", header: "Coll." },
          { key: "priceEUR", header: "Price", align: "right", render: (p) => fmtEUR(p.priceEUR) },
          { key: "costEUR", header: "Cost", align: "right", render: (p) => fmtEUR(p.costEUR) },
          { key: "marginPct", header: "Marge %", align: "right", render: (p) => `${p.marginPct.toFixed(1)} %` },
          { key: "countryOfOrigin", header: "Origin" },
        ]}
      />
    </div>
  );
}

function SupplierInvoices() {
  const sups = Array.from(new Set(products.map((p) => p.supplierId)));
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">Supplier Invoices</h1>
      <div className="text-xs mb-6" style={{ color: "var(--vendor-muted)" }}>MIRO · Pièces fournisseurs en attente de validation</div>
      <DataTable
        caption={`${sups.length} fournisseurs · 12 factures en attente`}
        rows={sups.map((id, i) => ({ id, count: 1 + (i % 4), amount: 12_000 + i * 4380, due: `2026-06-${15 + i}` }))}
        rowKey={(r) => r.id}
        columns={[
          { key: "id", header: "Vendor #", render: (r) => <span className="font-mono text-[12px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "count", header: "Open Invoices", align: "right" },
          { key: "amount", header: "Open Amount", align: "right", render: (r) => fmtEUR(r.amount) },
          { key: "due", header: "Net Due" },
          { key: "id", header: "Status", render: () => <Badge color="#ed8b00">À valider</Badge> },
        ]}
      />
    </div>
  );
}

function GLBalances() {
  const rows = [
    { acc: "411000", desc: "Clients — Compte général", debit: 412_800, credit: 0 },
    { acc: "401000", desc: "Fournisseurs — Compte général", debit: 0, credit: 184_200 },
    { acc: "707100", desc: "Ventes de marchandises — France", debit: 0, credit: 2_840_400 },
    { acc: "707200", desc: "Ventes de marchandises — Export EU", debit: 0, credit: 612_100 },
    { acc: "607000", desc: "Achats de marchandises", debit: 1_120_500, credit: 0 },
    { acc: "445660", desc: "TVA déductible 20 %", debit: 224_100, credit: 0 },
    { acc: "445710", desc: "TVA collectée 20 %", debit: 0, credit: 568_080 },
  ];
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-1">GL Account Balances</h1>
      <div className="text-xs mb-6" style={{ color: "var(--vendor-muted)" }}>S/4 Universal Journal · Période 06/2026 · MLUMEN</div>
      <DataTable
        caption="Balance des comptes (€)"
        rows={rows}
        rowKey={(r) => r.acc}
        columns={[
          { key: "acc", header: "G/L Account", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.acc}</span> },
          { key: "desc", header: "Description" },
          { key: "debit", header: "Debit", align: "right", render: (r) => r.debit ? fmtEUR(r.debit) : "—" },
          { key: "credit", header: "Credit", align: "right", render: (r) => r.credit ? fmtEUR(r.credit) : "—" },
          { key: "desc", header: "Net", align: "right", render: (r) => fmtEUR(r.debit - r.credit) },
        ]}
      />
    </div>
  );
}

function OrderDetail({ order }: { order: Order }) {
  const cust = customers.find((c) => c.id === order.customerId);
  const store = stores.find((s) => s.code === order.storeCode);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div><div className="opacity-60">Date</div><div className="font-medium">{order.date}</div></div>
        <div><div className="opacity-60">Canal</div><div className="font-medium">{order.channel}</div></div>
        <div><div className="opacity-60">Client</div><div className="font-medium">{cust?.name}</div></div>
        <div><div className="opacity-60">Site / magasin</div><div className="font-medium">{store?.name ?? order.storeCode}</div></div>
        <div className="col-span-2"><div className="opacity-60">Adresse</div><div className="font-medium">{order.shipTo}</div></div>
        {order.tracking && <div className="col-span-2"><div className="opacity-60">{order.carrier} · tracking</div><div className="font-mono">{order.tracking}</div></div>}
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-70">Postes de commande</div>
        <table className="w-full text-xs border" style={{ borderColor: "var(--vendor-border)" }}>
          <thead><tr className="bg-black/[0.03]"><th className="px-2 py-1.5 text-left">SKU</th><th className="text-left">Designation</th><th className="text-right">Qty</th><th className="text-right">Net</th></tr></thead>
          <tbody>
            {order.lines.map((l) => (
              <tr key={l.sku} className="border-t" style={{ borderColor: "var(--vendor-border)" }}>
                <td className="px-2 py-1.5 font-mono">{l.sku}</td>
                <td>{skuName(l.sku)}</td>
                <td className="text-right">{l.qty}</td>
                <td className="text-right tabular-nums">{fmtEUR(l.qty * l.unitPriceEUR)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr className="border-t font-semibold" style={{ borderColor: "var(--vendor-border)" }}><td className="px-2 py-1.5" colSpan={3}>Total HT</td><td className="text-right tabular-nums">{fmtEUR(order.totalEUR)}</td></tr></tfoot>
        </table>
      </div>
      <div className="flex gap-2 pt-2">
        <Badge color="#0a6ed1">{order.status}</Badge>
        <Badge>FY 2026 · P06</Badge>
        <Badge>MLUMEN</Badge>
      </div>
    </div>
  );
}

function ProductDetail({ product }: { product: Product }) {
  const onHand = totalOnHand(product.sku);
  const byStore = stock.filter((s) => s.sku === product.sku);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div><div className="opacity-60">SKU</div><div className="font-mono">{product.sku}</div></div>
        <div><div className="opacity-60">EAN</div><div className="font-mono">{product.ean}</div></div>
        <div><div className="opacity-60">Catégorie</div><div>{product.category}</div></div>
        <div><div className="opacity-60">Collection</div><div>{product.collection}</div></div>
        <div><div className="opacity-60">Prix vente</div><div className="font-semibold">{fmtEUR(product.priceEUR)}</div></div>
        <div><div className="opacity-60">Coût</div><div>{fmtEUR(product.costEUR)}</div></div>
        <div><div className="opacity-60">Marge</div><div>{product.marginPct.toFixed(1)} %</div></div>
        <div><div className="opacity-60">Origine</div><div>{product.countryOfOrigin} · HS {product.hsCode}</div></div>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide mb-2 opacity-70">Stock par site · {onHand} u.</div>
        <table className="w-full text-xs border" style={{ borderColor: "var(--vendor-border)" }}>
          <thead><tr className="bg-black/[0.03]"><th className="px-2 py-1.5 text-left">Site</th><th className="text-right">On hand</th><th className="text-right">Reserved</th><th className="text-right">In transit</th></tr></thead>
          <tbody>
            {byStore.map((s) => (
              <tr key={s.storeCode} className="border-t" style={{ borderColor: "var(--vendor-border)" }}>
                <td className="px-2 py-1.5 font-mono">{s.storeCode}</td>
                <td className="text-right">{s.onHand}</td>
                <td className="text-right">{s.reserved}</td>
                <td className="text-right">{s.inTransit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
