import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { forecast, products, skuName } from "@/data/maisonLumen";

export function O9App() {
  const skus = Array.from(new Set(forecast.map((f) => f.sku)));
  const weeks = Array.from(new Set(forecast.map((f) => f.weekISO))).sort();
  const matrix = skus.map((sku) => ({
    sku,
    name: skuName(sku),
    cells: weeks.map((w) => forecast.find((f) => f.sku === sku && f.weekISO === w)!),
  }));
  return (
    <AppShell
      vendorClass="vendor-o9"
      vendorName="o9 Solutions"
      appName="Demand Planning · Maison Lumen S&OP"
      appSubtitle="Tenant MLUMEN · Planning horizon 8 wk"
      logo={
        <span className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full grid place-items-center text-xs font-bold" style={{ background: "white", color: "#7c3aed" }}>o9</span>
          <span className="font-semibold tracking-tight">Solutions</span>
        </span>
      }
      user={{ name: "Aïcha Bensalem", role: "Demand Planner" }}
      rightTopbar={<span style={{ color: "rgba(255,255,255,0.8)" }}>Cycle DP · S+24</span>}
      nav={[
        { label: "Home" },
        { label: "Demand Review", active: true },
        { label: "Statistical Forecast" },
        { label: "Consensus Plan", badge: "Open" },
        { label: "Promo & Events" },
        { label: "Supply Plan" },
        { label: "S&OP Executive" },
        { label: "Scenario Compare" },
        { label: "Master Data" },
      ]}
    >
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Demand Review</div>
          <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-color)" }}>Prévisions hebdomadaires · 8 semaines</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs rounded border bg-white" style={{ borderColor: "var(--vendor-border)" }}>Compare scenario</button>
          <button className="px-3 py-1.5 text-xs rounded text-white font-medium" style={{ background: "var(--vendor-color)" }}>Publish plan</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Forecast accuracy (MAPE)" value="83.6 %" sub="↑ 1.4 pt vs S-1" trend="up" />
        <KpiCard label="Bias" value="+2.1 %" sub="Légère sur-prévision" trend="flat" />
        <KpiCard label="Promo lift modélisé" value="+35 %" sub="Polo Côte d'Azur W25-W27" />
        <KpiCard label="Couverture stock" value="6.4 sem" sub="Cible 6-8" trend="up" />
      </div>

      <div className="bg-white border rounded-md overflow-hidden" style={{ borderColor: "var(--vendor-border)" }}>
        <div className="px-4 py-2.5 text-sm font-semibold border-b flex justify-between" style={{ borderColor: "var(--vendor-border)" }}>
          <span>Consensus Forecast — unités / semaine</span>
          <span className="text-xs font-normal" style={{ color: "var(--vendor-muted)" }}>Baseline · Promo lift · Final consensus</span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide" style={{ background: "color-mix(in oklab, var(--vendor-color) 5%, white)", color: "var(--vendor-muted)" }}>
              <th className="px-4 py-2 font-medium">SKU</th>
              <th className="px-3 py-2 font-medium">Article</th>
              {weeks.map((w) => (
                <th key={w} className="px-2 py-2 font-medium text-right">{w.replace("2026-", "")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.sku} className="border-t" style={{ borderColor: "var(--vendor-border)" }}>
                <td className="px-4 py-2 font-mono text-[12px]" style={{ color: "var(--vendor-color)" }}>{row.sku}</td>
                <td className="px-3 py-2">{row.name}</td>
                {row.cells.map((c) => (
                  <td key={c.weekISO} className="px-2 py-2 text-right tabular-nums">
                    <div>{c.final}</div>
                    {c.promoLift > 0 && (
                      <div className="text-[10px]" style={{ color: "var(--vendor-color)" }}>+{c.promoLift}</div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3" style={{ color: "var(--vendor-color)" }}>Events & promotions enregistrés</div>
          <ul className="text-sm space-y-2">
            <li className="flex justify-between"><span>Promo Polo Côte d'Azur · -20 %</span><Badge>W25→W27</Badge></li>
            <li className="flex justify-between"><span>Lancement collection AH25</span><Badge>W29</Badge></li>
            <li className="flex justify-between"><span>Soldes d'été — wave 1</span><Badge>W26</Badge></li>
            <li className="flex justify-between"><span>Event presse Manteau Belleville</span><Badge>W32</Badge></li>
          </ul>
        </div>
        <DataTable
          caption="Couverture / risque rupture"
          rows={products.slice(0, 6)}
          columns={[
            { key: "sku", header: "SKU", render: (p) => <span className="font-mono text-[12px]" style={{ color: "var(--vendor-color)" }}>{p.sku}</span> },
            { key: "name", header: "Article" },
            { key: "supplierId", header: "Fournisseur" },
            { key: "countryOfOrigin", header: "Origine", align: "right" },
          ]}
        />
      </div>
    </AppShell>
  );
}
