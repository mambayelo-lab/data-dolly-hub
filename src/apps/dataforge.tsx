import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { prodOrders, collections, distOrders, fmtEUR } from "@/data/fromagerieDuVal";

export function DataForgeApp() {
  const totalLiters = collections.reduce((s, c) => s + c.liters, 0);
  const totalProd = prodOrders.reduce((s, c) => s + c.producedKg, 0);
  const totalCA = distOrders.reduce((s, o) => s + o.totalHTEUR, 0);
  return (
    <AppShell
      vendorClass="vendor-dataforge"
      vendorName="DataForge"
      appName="DataForge Lakehouse · Workspace Analytics"
      appSubtitle="Workspace fdv-prod · Catalog unity-fdv"
      logo={<VendorLogo brand="dataforge" />}
      user={{ name: "Naïma Benyahia", role: "Data Engineer Lead" }}
      rightTopbar={<span className="opacity-80">Cluster fdv-prod-medium · 12 DBU/h</span>}
      nav={[
        { label: "Workspace" },
        { label: "Notebooks", badge: "47" },
        { label: "SQL Warehouse", active: true },
        { label: "Jobs & Pipelines" },
        { label: "Unity Catalog" },
        { label: "Dashboards BI" },
        { label: "MLflow Models", badge: "8" },
        { label: "Lineage explorer" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Dashboard exécutif</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Fromagerie du Val — Vue 360° (J-1)</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Source : pipeline Bronze→Silver→Gold · Dernière exécution 06.06.2026 06:14</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Collecte lait (J)" value={`${(totalLiters / 1000).toFixed(1)} m³`} sub="+3.2 % vs J-7" trend="up" />
        <KpiCard label="Production sortie (J)" value={`${(totalProd / 1000).toFixed(1)} t`} sub="6 OF clôturés" trend="up" />
        <KpiCard label="CA HT facturé (S23)" value={fmtEUR(totalCA)} sub="Échantillon distribution" trend="up" />
        <KpiCard label="Taux de service GMS" value="96.4 %" sub="Cible 95 %" trend="up" />
      </div>

      <div className="bg-white border rounded-md p-0 mb-6" style={{ borderColor: "var(--vendor-border)" }}>
        <div className="px-4 py-2.5 border-b text-sm font-semibold" style={{ borderColor: "var(--vendor-border)" }}>SQL Editor — query_yield_by_site.sql</div>
        <pre className="text-xs p-4 font-mono leading-relaxed overflow-auto" style={{ color: "var(--vendor-ink)" }}>
{`SELECT
  s.name AS site,
  COUNT(DISTINCT po.id) AS of_count,
  SUM(po.planned_qty_kg) AS planned_kg,
  SUM(po.produced_kg)    AS produced_kg,
  ROUND(SUM(po.produced_kg) / NULLIF(SUM(po.planned_qty_kg), 0) * 100, 2) AS yield_pct
FROM unity_fdv.gold.fact_prod_orders po
JOIN unity_fdv.silver.dim_sites s ON s.code = po.site_code
WHERE po.date >= current_date - INTERVAL 7 DAYS
GROUP BY s.name
ORDER BY yield_pct DESC;`}
        </pre>
        <div className="px-4 py-2 border-t text-[11px] flex items-center justify-between" style={{ borderColor: "var(--vendor-border)", color: "var(--vendor-muted)" }}>
          <span>✓ 3 rows · 184 ms · scanned 412 KB</span>
          <span className="font-mono">cluster: fdv-prod-medium</span>
        </div>
      </div>

      <DataTable
        caption="Tables Unity Catalog · catalog `unity_fdv`"
        rows={[
          { name: "gold.fact_prod_orders", source: "Saje X-Cube", rows: "12 480", freshness: "06:14", quality: "✓" },
          { name: "gold.fact_dist_orders", source: "Divento", rows: "48 921", freshness: "06:12", quality: "✓" },
          { name: "silver.dim_recipes", source: "TraceLink", rows: "126", freshness: "01:00", quality: "✓" },
          { name: "silver.dim_producers", source: "AgroWare", rows: "412", freshness: "01:00", quality: "✓" },
          { name: "bronze.raw_milk_collections", source: "AgroWare", rows: "184 504", freshness: "06:10", quality: "⚠ skew" },
          { name: "gold.fact_quality_nc", source: "QualiPlus", rows: "2 184", freshness: "06:15", quality: "✓" },
        ]}
        columns={[
          { key: "name", header: "Table", render: (r) => <span className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{r.name}</span> },
          { key: "source", header: "Source SI" },
          { key: "rows", header: "Lignes", align: "right" },
          { key: "freshness", header: "Fraîcheur" },
          { key: "quality", header: "Qualité", render: (r) => <Badge color={r.quality === "✓" ? "#16a34a" : "#ef7d00"}>{r.quality}</Badge> },
        ]}
      />

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>DataForge Lakehouse · Plateforme data unifiée (inspirée de Databricks)</span>
        <span className="font-mono">workspace · fdv-prod · region eu-west-3</span>
      </div>
    </AppShell>
  );
}
