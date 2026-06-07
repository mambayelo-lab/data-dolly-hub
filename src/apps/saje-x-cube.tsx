import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { prodOrders, products, sites, fmtEUR, productName, siteName } from "@/data/fromagerieDuVal";

export function SajeXCubeApp() {
  const totalPlanned = prodOrders.reduce((s, o) => s + o.plannedQtyKg, 0);
  const totalProduced = prodOrders.reduce((s, o) => s + o.producedKg, 0);
  const yieldAvg = (totalProduced / totalPlanned) * 100;
  return (
    <AppShell
      vendorClass="vendor-saje"
      vendorName="Saje"
      appName="X-Cube · ERP Industriel Agro"
      appSubtitle="Dossier FDV · Société 001 · Folder PROD"
      logo={<VendorLogo brand="saje" />}
      user={{ name: "Patrick Hauchard", role: "Directeur Industriel" }}
      rightTopbar={<span className="opacity-80">EUR · Exercice 2026 · P06</span>}
      nav={[
        { label: "Accueil" },
        { label: "Ordres de fabrication", active: true, badge: String(prodOrders.length) },
        { label: "Nomenclatures & gammes" },
        { label: "Achats matières premières" },
        { label: "Stocks multi-sites" },
        { label: "Facturation clients" },
        { label: "Comptabilité fournisseurs", badge: "23" },
        { label: "Reporting CO & marges" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Module Production</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Ordres de fabrication — Tableau de bord</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Vue planificateur · Dernier MAJ 06.06.2026 10:32</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="OF en cours / planifiés" value={String(prodOrders.filter(o => o.status !== "Terminé").length)} sub="3 sites actifs" trend="flat" />
        <KpiCard label="Volume planifié (jour)" value={`${(totalPlanned / 1000).toFixed(1)} t`} sub="+8.4 % vs N-1" trend="up" />
        <KpiCard label="Rendement matière" value={`${yieldAvg.toFixed(1)} %`} sub="Cible 97.5 %" trend={yieldAvg >= 97.5 ? "up" : "down"} />
        <KpiCard label="OF bloqués qualité" value={String(prodOrders.filter(o => o.status === "Bloqué qualité").length)} sub="Voir QualiPlus" trend="down" />
      </div>

      <DataTable
        caption={`Ordres de fabrication — semaine S23/2026`}
        rows={prodOrders}
        columns={[
          { key: "id", header: "N° OF", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "date", header: "Date" },
          { key: "siteCode", header: "Site", render: (r) => siteName(r.siteCode) },
          { key: "productSku", header: "Article", render: (r) => <span><span className="font-mono text-xs">{r.productSku}</span> — {productName(r.productSku)}</span> },
          { key: "lotId", header: "Lot" },
          { key: "plannedQtyKg", header: "Planifié (kg)", align: "right", render: (r) => r.plannedQtyKg.toLocaleString("fr-FR") },
          { key: "producedKg", header: "Produit (kg)", align: "right", render: (r) => r.producedKg.toLocaleString("fr-FR") },
          {
            key: "status",
            header: "Statut",
            render: (r) => {
              const c = r.status === "Terminé" ? "#16a34a" : r.status === "Bloqué qualité" ? "#dc2626" : r.status === "En cours" ? "#00ad4d" : "#6b7280";
              return <Badge color={c}>{r.status}</Badge>;
            },
          },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Capacité par site (tonnes/an)</div>
          <ul className="space-y-2 text-sm">
            {sites.map((s) => (
              <li key={s.code} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span>{s.name} <span className="text-xs" style={{ color: "var(--vendor-muted)" }}>· {s.type}</span></span>
                <span className="tabular-nums">{s.capacityTonsYear.toLocaleString("fr-FR")} t</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Top articles — PRU et marge</div>
          <ul className="space-y-2 text-sm">
            {products.slice(0, 6).map((p) => (
              <li key={p.sku} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span>{p.name}</span>
                <span className="tabular-nums">{fmtEUR(p.priceHTEUR)} <span className="text-xs" style={{ color: "var(--vendor-muted)" }}>· {(((p.priceHTEUR - p.costEUR) / p.priceHTEUR) * 100).toFixed(0)} %</span></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>Saje X-Cube v12 · Solution ERP industrielle (inspirée de Sage X3) · Dossier FDV</span>
        <span className="font-mono">3 sites · 850 collaborateurs</span>
      </div>
    </AppShell>
  );
}
