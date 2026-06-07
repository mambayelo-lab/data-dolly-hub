import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { nonConformities, prodOrders, company } from "@/data/fromagerieDuVal";

export function QualiPlusApp() {
  const open = nonConformities.filter(n => n.status !== "Clôturée").length;
  const critical = nonConformities.filter(n => n.severity === "Critique").length;
  return (
    <AppShell
      vendorClass="vendor-qualiplus"
      vendorName="QualiPlus"
      appName="QualiPlus QHSE · Gestion qualité & IFS"
      appSubtitle="Système qualité Fromagerie du Val · Audit IFS planifié 2026-09"
      logo={<span className="font-bold tracking-tight text-base">QualiPlus</span>}
      user={{ name: "Sophie Hervé", role: "Resp. Qualité Groupe" }}
      rightTopbar={<span className="opacity-80">IFS v8 · BRC v9</span>}
      nav={[
        { label: "Vue d'ensemble" },
        { label: "Non-conformités", active: true, badge: String(open) },
        { label: "Plans d'actions correctives" },
        { label: "Audits internes" },
        { label: "Audits fournisseurs" },
        { label: "Documents qualité" },
        { label: "Formations & habilitations" },
        { label: "Réclamations clients" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>QHSE — Module NC</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Non-conformités · 30 derniers jours</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Suivi temps réel · Notification automatique des pilotes</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="NC ouvertes / en traitement" value={String(open)} sub="dont 1 majeure" trend="flat" />
        <KpiCard label="NC critiques (30j)" value={String(critical)} sub="Clôturée 1 (corps étranger)" trend="up" />
        <KpiCard label="Délai moyen de clôture" value="6.2 j" sub="Cible IFS ≤ 10 j" trend="up" />
        <KpiCard label="Audits programmés" value="3" sub="Internes Q3 + IFS sept." trend="flat" />
      </div>

      <DataTable
        caption={`Non-conformités enregistrées — ${nonConformities.length} entrées`}
        rows={nonConformities}
        columns={[
          { key: "id", header: "N° NC", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "openedAt", header: "Ouverte le" },
          { key: "lotId", header: "Lot concerné", render: (r) => <span className="font-mono text-xs">{r.lotId}</span> },
          { key: "type", header: "Type" },
          {
            key: "severity",
            header: "Gravité",
            render: (r) => <Badge color={r.severity === "Critique" ? "#dc2626" : r.severity === "Majeure" ? "#ef7d00" : "#6b7280"}>{r.severity}</Badge>,
          },
          { key: "owner", header: "Pilote" },
          { key: "actions", header: "Actions", align: "right" },
          {
            key: "status",
            header: "Statut",
            render: (r) => <Badge color={r.status === "Clôturée" ? "#16a34a" : r.status === "Ouverte" ? "#dc2626" : "#0066b3"}>{r.status}</Badge>,
          },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Certifications actives</div>
          <ul className="space-y-2 text-sm">
            {company.certifications.map((c) => (
              <li key={c} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span>{c}</span>
                <Badge color="#16a34a">À jour</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Cohérence avec X-Cube (production)</div>
          <p className="text-xs mb-3" style={{ color: "var(--vendor-muted)" }}>Les lots cités ici proviennent directement des OF Saje X-Cube. La NC NC-2026-0287 bloque l'OF OF-2026-04820 (Neufchâtel).</p>
          <ul className="space-y-2 text-sm">
            {prodOrders.filter(o => o.status === "Bloqué qualité").map((o) => (
              <li key={o.id} className="flex justify-between py-1.5 border-t" style={{ borderColor: "var(--vendor-border)" }}>
                <span><span className="font-mono text-xs">{o.id}</span> · lot {o.lotId}</span>
                <Badge color="#dc2626">Bloqué</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>QualiPlus QHSE · Logiciel qualité agro (inspiré de Qualipro)</span>
        <span className="font-mono">FDV · Site PEV / LIS / VIR</span>
      </div>
    </AppShell>
  );
}
