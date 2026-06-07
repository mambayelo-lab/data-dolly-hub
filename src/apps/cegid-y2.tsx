import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { orders, stores, products, fmtEUR } from "@/data/maisonLumen";

export function CegidApp() {
  const storeOrders = orders.filter((o) => o.channel === "Magasin" || o.channel === "Click & Collect");
  return (
    <AppShell
      vendorClass="vendor-cegid"
      vendorName="Cegid"
      appName="Retail Y2 · Back Office Enseigne"
      appSubtitle="Enseigne MLUMEN · Caisse centralisée"
      logo={<span className="font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>cegid</span>}
      user={{ name: "Sophie Carlier", role: "Retail Ops" }}
      rightTopbar={<span>180 magasins synchronisés · MAJ 06/06 09:12</span>}
      nav={[
        { label: "Tableau de bord" },
        { label: "Ventes magasin", active: true },
        { label: "Encaissement" },
        { label: "Fidélité & cartes" },
        { label: "Stocks magasin" },
        { label: "Transferts inter-mags" },
        { label: "Catalogue articles" },
        { label: "Promotions" },
        { label: "Référentiel magasins" },
        { label: "Reporting Z" },
      ]}
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Module Retail</div>
          <h1 className="text-2xl font-semibold mt-1">Ventes magasin — temps réel</h1>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="px-3 py-1.5 rounded border" style={{ borderColor: "var(--vendor-border)" }}>Aujourd'hui</button>
          <button className="px-3 py-1.5 rounded text-white" style={{ background: "var(--vendor-color)" }}>7 derniers jours</button>
          <button className="px-3 py-1.5 rounded border" style={{ borderColor: "var(--vendor-border)" }}>MTD</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="CA réseau (7j)" value={fmtEUR(1247800)} sub="+8.2 % vs S-1" trend="up" />
        <KpiCard label="Tickets" value="4 218" sub="Panier moy. 296 €" />
        <KpiCard label="Taux conversion" value="22.4 %" sub="Cible 21 %" trend="up" />
        <KpiCard label="Stock alerte" value="14" sub="Réassort à déclencher" trend="down" />
      </div>

      <DataTable
        caption="Dernières ventes magasin"
        rows={storeOrders}
        columns={[
          { key: "id", header: "N° ticket", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id.replace("SO-", "TKT-")}</span> },
          { key: "date", header: "Date" },
          { key: "storeCode", header: "Magasin", render: (r) => stores.find((s) => s.code === r.storeCode)?.name ?? r.storeCode },
          { key: "channel", header: "Canal" },
          { key: "lines", header: "Articles", align: "right", render: (r) => r.lines.reduce((s, l) => s + l.qty, 0) },
          { key: "totalEUR", header: "Total TTC", align: "right", render: (r) => fmtEUR(r.totalEUR) },
          { key: "status", header: "Statut", render: (r) => <Badge>{r.status}</Badge> },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Top magasins (CA 7j)</div>
          {[
            ["Paris Saint-Honoré", 218400, 26.1],
            ["Cannes Croisette", 142800, 18.2],
            ["Lyon Presqu'île", 96200, 9.4],
            ["Paris Le Marais", 78500, -2.1],
            ["Bordeaux Intendance", 64200, 11.7],
          ].map(([name, ca, var_]) => (
            <div key={name as string} className="flex justify-between py-2 border-b text-sm last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
              <span>{name}</span>
              <span className="tabular-nums">{fmtEUR(ca as number)} <span className={(var_ as number) >= 0 ? "text-green-600" : "text-red-600"}>{(var_ as number) >= 0 ? "+" : ""}{var_} %</span></span>
            </div>
          ))}
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Articles les plus vendus (réseau)</div>
          {products.slice(0, 5).map((p) => (
            <div key={p.sku} className="flex justify-between py-2 border-b text-sm last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
              <span><span className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{p.sku}</span> — {p.name}</span>
              <span className="tabular-nums">{fmtEUR(p.priceEUR)}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
