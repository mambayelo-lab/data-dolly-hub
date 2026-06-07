import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { maintTasks, machines, machineName } from "@/data/helvexPrecision";

export function MaxiMovesApp() {
  const open = maintTasks.filter((t) => t.status !== "Réalisé");
  const mtbf = 412; // h
  const mttr = 4.8; // h
  return (
    <AppShell
      vendorClass="vendor-maximoves"
      vendorName="MaxiMoves"
      appName="CMMS · Helvex Precision"
      appSubtitle="Asset Management 8.x · ENV PROD"
      logo={<VendorLogo brand="maximoves" />}
      user={{ name: "Thierry Mottier", role: "Responsable maintenance" }}
      rightTopbar={<span className="opacity-80">Astreinte semaine 23 : T. Mottier</span>}
      nav={[
        { label: "Tableau de bord" },
        { label: "Ordres de travail", active: true, badge: String(open.length) },
        { label: "Assets / Machines", badge: String(machines.length) },
        { label: "Plans préventifs (PM)" },
        { label: "Pièces détachées" },
        { label: "Achats internes" },
        { label: "Sécurité (LOTO)" },
        { label: "Reporting" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Maintenance & Assets</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Ordres de travail · maintenance</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Intégration SCADA Wonderwave active · alertes prédictives ON</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="OT ouverts" value={String(open.length)} sub="dont 1 P1" trend="down" />
        <KpiCard label="MTBF parc" value={`${mtbf} h`} sub="+34 h vs N-1" trend="up" />
        <KpiCard label="MTTR moyen" value={`${mttr} h`} sub="cible < 6 h" trend="up" />
        <KpiCard label="Coût maintenance YTD" value="312 k€" sub="62 % préventif" trend="flat" />
      </div>
      <DataTable
        caption="Ordres de travail maintenance"
        rows={maintTasks}
        columns={[
          { key: "id", header: "OT", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "machineId", header: "Machine", render: (r) => <span><span className="font-mono text-xs">{r.machineId}</span> · {machineName(r.machineId)}</span> },
          { key: "kind", header: "Type", render: (r) => <Badge color={r.kind === "Correctif" ? "#dc2626" : r.kind === "Prédictif" ? "#7a3ff2" : r.kind === "Métrologie" ? "#0066cc" : "#16a34a"}>{r.kind}</Badge> },
          { key: "title", header: "Intitulé" },
          { key: "priority", header: "Prio.", render: (r) => <Badge color={r.priority === "P1" ? "#dc2626" : r.priority === "P2" ? "#f59e0b" : "#6b7280"}>{r.priority}</Badge> },
          { key: "technician", header: "Technicien" },
          { key: "dueAt", header: "Échéance" },
          { key: "durationMin", header: "Durée", align: "right", render: (r) => `${r.durationMin} min` },
          { key: "status", header: "Statut", render: (r) => <Badge color={r.status === "Réalisé" ? "#16a34a" : r.status === "En cours" ? "#7a3ff2" : r.status === "En attente pièces" ? "#f59e0b" : "#6b7280"}>{r.status}</Badge> },
        ]}
      />
    </AppShell>
  );
}
