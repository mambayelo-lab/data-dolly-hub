import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { collections, producers, producerName, siteName } from "@/data/fromagerieDuVal";

export function AgroWareApp() {
  const totalLiters = collections.reduce((s, c) => s + c.liters, 0);
  const classA = collections.filter(c => c.bactClass === "A").length;
  return (
    <AppShell
      vendorClass="vendor-agroware"
      vendorName="AgroWare"
      appName="AgroWare 365 · Gestion amont laitier"
      appSubtitle="Coopérative Fromagerie du Val · 412 producteurs"
      logo={<span className="font-bold tracking-tight text-base">🌿 AgroWare</span>}
      user={{ name: "Hélène Marais", role: "Resp. Collecte" }}
      rightTopbar={<span className="opacity-80">Tournée J · 06.06.2026</span>}
      nav={[
        { label: "Tableau de bord collecte", active: true },
        { label: "Producteurs adhérents", badge: "412" },
        { label: "Planning tournées" },
        { label: "Analyses laboratoire" },
        { label: "Paie du lait" },
        { label: "Audit cahier des charges AOP" },
        { label: "Cartographie élevages" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Collecte amont</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Tournée du jour — 6 juin 2026</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Camions 7 / 12 rentrés · Affichage temps réel via tablette chauffeur</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Litres collectés (J)" value={`${totalLiters.toLocaleString("fr-FR")} L`} sub="+3.2 % vs hier" trend="up" />
        <KpiCard label="Producteurs visités" value={`${collections.length} / 64`} sub="Tournées matin terminées" trend="flat" />
        <KpiCard label="Lait classe A" value={`${Math.round((classA / collections.length) * 100)} %`} sub="Cible 90 %" trend={classA / collections.length >= 0.9 ? "up" : "down"} />
        <KpiCard label="Alertes température" value="1" sub="PROD-N-058 : 4.4°C" trend="down" />
      </div>

      <DataTable
        caption="Collectes du jour — détail par producteur"
        rows={collections}
        columns={[
          { key: "producerId", header: "Producteur", render: (r) => <span><span className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{r.producerId}</span> · {producerName(r.producerId)}</span> },
          { key: "liters", header: "Litres", align: "right", render: (r) => r.liters.toLocaleString("fr-FR") },
          { key: "tempC", header: "Température", align: "right", render: (r) => <span style={{ color: r.tempC > 4.2 ? "#dc2626" : undefined }}>{r.tempC.toFixed(1)} °C</span> },
          { key: "bactClass", header: "Classe bactério", render: (r) => <Badge color={r.bactClass === "A" ? "#2e7d32" : r.bactClass === "B" ? "#ef7d00" : "#dc2626"}>Classe {r.bactClass}</Badge> },
          { key: "somaticCells", header: "Cellules som.", align: "right", render: (r) => `${r.somaticCells} k/mL` },
          { key: "destinationSite", header: "Affectation site", render: (r) => siteName(r.destinationSite) },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Producteurs adhérents — extrait</div>
          <ul className="space-y-2 text-sm">
            {producers.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span><span className="font-mono text-xs">{p.id}</span> · {p.name} <span className="text-xs" style={{ color: "var(--vendor-muted)" }}>· {p.commune}</span></span>
                <span className="flex items-center gap-2 text-xs">
                  <Badge color={p.cert === "AOP" ? "#2e7d32" : p.cert === "Bio" ? "#16a34a" : "#6b7280"}>{p.cert}</Badge>
                  <span className="tabular-nums">{p.herd} VL · {p.litersDay.toLocaleString("fr-FR")} L/j</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Engagement AOP Camembert de Normandie</div>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Producteurs engagés AOP</span><span className="tabular-nums">186 / 412</span></li>
            <li className="flex justify-between"><span>Pâturage min. respecté</span><span className="tabular-nums" style={{ color: "#2e7d32" }}>92 %</span></li>
            <li className="flex justify-between"><span>Race normande pure</span><span className="tabular-nums">71 %</span></li>
            <li className="flex justify-between"><span>Lait cru collecté (J)</span><span className="tabular-nums">8 470 L</span></li>
            <li className="flex justify-between"><span>Prix moyen base 1 000 L</span><span className="tabular-nums">498 €</span></li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>AgroWare 365 · Solution sectorielle agro (inspirée d'Agriware 365)</span>
        <span className="font-mono">Tournée matin · Camions 4-7 · Chauffeurs validés</span>
      </div>
    </AppShell>
  );
}
