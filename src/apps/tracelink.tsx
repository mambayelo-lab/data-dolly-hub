import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { recipes, products, productName } from "@/data/fromagerieDuVal";

export function TraceLinkApp() {
  const active = recipes.filter(r => r.status === "Actif").length;
  const review = recipes.filter(r => r.status === "En revue").length;
  return (
    <AppShell
      vendorClass="vendor-tracelink"
      vendorName="TraceLink"
      appName="TraceLink PLM · Specs produits & fournisseurs"
      appSubtitle="Workspace Fromagerie du Val · Référentiel cahiers des charges"
      logo={<VendorLogo brand="tracelink" />}
      user={{ name: "Maxime Lecuyer", role: "Resp. R&D Fromages" }}
      rightTopbar={<span className="opacity-80">Workspace FDV · {recipes.length} recettes</span>}
      nav={[
        { label: "Tableau de bord" },
        { label: "Fiches recettes", active: true, badge: String(recipes.length) },
        { label: "Matières premières" },
        { label: "Cahiers des charges fournisseurs" },
        { label: "Étiquettes & déclarations nutri" },
        { label: "Workflows de validation", badge: String(review) },
        { label: "Bibliothèque allergènes" },
        { label: "Référentiel réglementaire" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Spécifications produit</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Fiches recettes — Catalogue groupe</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Workflow ISO 22000 · Validation R&D + Qualité + Industriel</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Recettes actives" value={String(active)} sub={`${review} en revue`} trend="flat" />
        <KpiCard label="Cahier des charges OK" value="98 %" sub="Conformité GMS" trend="up" />
        <KpiCard label="Délai moyen validation" value="14 j" sub="Cible 21 j" trend="up" />
        <KpiCard label="Alertes réglementaires" value="2" sub="Nouvelles obligations INCO" trend="down" />
      </div>

      <DataTable
        caption="Fiches recettes — vue R&D"
        rows={recipes}
        columns={[
          { key: "id", header: "Recette", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "productSku", header: "Produit", render: (r) => productName(r.productSku) },
          { key: "version", header: "Version" },
          { key: "pH", header: "pH", align: "right", render: (r) => r.pH.toFixed(1) },
          { key: "saltPct", header: "Sel %", align: "right", render: (r) => `${r.saltPct.toFixed(1)} %` },
          { key: "fatPct", header: "MG %", align: "right", render: (r) => `${r.fatPct.toFixed(1)} %` },
          { key: "owner", header: "Propriétaire" },
          { key: "updatedAt", header: "MAJ" },
          {
            key: "status",
            header: "Statut",
            render: (r) => <Badge color={r.status === "Actif" ? "#16a34a" : r.status === "En revue" ? "#ef7d00" : "#6b7280"}>{r.status}</Badge>,
          },
        ]}
      />

      <div className="mt-6 grid grid-cols-3 gap-4">
        {products.slice(0, 3).map((p) => (
          <div key={p.sku} className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
            <div className="text-xs font-mono mb-1" style={{ color: "var(--vendor-color)" }}>{p.sku}</div>
            <div className="text-sm font-semibold">{p.name}</div>
            <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>GTIN {p.gtin}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div><span style={{ color: "var(--vendor-muted)" }}>Format</span><div>{p.format}</div></div>
              <div><span style={{ color: "var(--vendor-muted)" }}>Poids net</span><div>{p.netWeightG} g</div></div>
              <div><span style={{ color: "var(--vendor-muted)" }}>DLC</span><div>{p.shelfLifeDays} jours</div></div>
              <div><span style={{ color: "var(--vendor-muted)" }}>Famille</span><div>{p.family}</div></div>
            </div>
            <div className="mt-3 text-xs">
              <span style={{ color: "var(--vendor-muted)" }}>Allergènes : </span>
              {p.allergens.map(a => <Badge key={a} color="#003a70">{a}</Badge>)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>TraceLink PLM · Plateforme PLM agro-alimentaire (inspirée de Trace One)</span>
        <span className="font-mono">Workspace · FDV-MASTER</span>
      </div>
    </AppShell>
  );
}
