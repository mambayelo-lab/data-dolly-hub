import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { workOrders, machines, partName, machineName } from "@/data/helvexPrecision";

export function OpCentralApp() {
  const inProd = workOrders.filter((w) => w.status === "En cours");
  const avgOee = machines.reduce((s, m) => s + m.oee30d, 0) / machines.length;
  return (
    <AppShell
      vendorClass="vendor-opcentral"
      vendorName="OpCentral"
      appName="MES · Shop Floor · Helvex"
      appSubtitle="Site HX-ANN · Live"
      logo={<VendorLogo brand="opcentral" />}
      user={{ name: "Kévin Maréchal", role: "Chef d'atelier" }}
      rightTopbar={<span className="opacity-80">Shift 2 · 14:00 → 22:00 · 12 op.</span>}
      nav={[
        { label: "Pilotage atelier", active: true },
        { label: "OF en cours", badge: String(inProd.length) },
        { label: "Suivi machines", badge: String(machines.length) },
        { label: "Déclarations temps" },
        { label: "Contrôle qualité (SPC)" },
        { label: "Traçabilité lots" },
        { label: "Andon" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Manufacturing Execution</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Pilotage atelier — temps réel</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Données rafraîchies toutes les 5 s · OPC-UA gateway</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="OF en cours" value={String(inProd.length)} sub="3 sites" />
        <KpiCard label="OEE 30j" value={`${avgOee.toFixed(1)} %`} sub="cible 82 %" trend={avgOee < 82 ? "down" : "up"} />
        <KpiCard label="Scrap S23" value="2.4 %" sub="-0.3 pt vs S22" trend="up" />
        <KpiCard label="Andon ouverts" value="2" sub="1 P1 sur MCH-A03" trend="down" />
      </div>
      <DataTable
        caption="Ordres de fabrication — exécution"
        rows={workOrders}
        columns={[
          { key: "id", header: "OF", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "pn", header: "PN", render: (r) => <span><span className="font-mono text-xs">{r.pn}</span> · {partName(r.pn)}</span> },
          { key: "machineId", header: "Machine", render: (r) => machineName(r.machineId) },
          { key: "qty", header: "Qté", align: "right" },
          { key: "cycleMin", header: "Cycle (min)", align: "right" },
          { key: "progressPct", header: "Avancement", align: "right", render: (r) => (
            <div className="flex items-center justify-end gap-2"><span className="tabular-nums w-10 text-right">{r.progressPct}%</span><div className="w-20 h-1.5 bg-black/10 rounded overflow-hidden"><div className="h-full" style={{ width: `${r.progressPct}%`, background: "var(--vendor-color)" }} /></div></div>
          ) },
          { key: "status", header: "Statut", render: (r) => <Badge color={r.status === "Terminé" ? "#16a34a" : r.status === "Hors-spec" ? "#dc2626" : r.status === "Suspendu" ? "#f59e0b" : "#009999"}>{r.status}</Badge> },
        ]}
      />
      <div className="mt-6">
        <DataTable
          caption="Parc machines · état temps réel"
          rows={machines}
          columns={[
            { key: "id", header: "Machine", render: (m) => <span><span className="font-mono text-xs">{m.id}</span> · {m.name}</span> },
            { key: "model", header: "Modèle" },
            { key: "siteCode", header: "Site" },
            { key: "family", header: "Famille" },
            { key: "oee30d", header: "OEE 30j", align: "right", render: (m) => `${m.oee30d.toFixed(1)} %` },
            { key: "status", header: "État", render: (m) => <Badge color={m.status === "Production" ? "#16a34a" : m.status === "Panne" ? "#dc2626" : m.status === "Setup" ? "#0066cc" : "#f59e0b"}>{m.status}</Badge> },
          ]}
        />
      </div>
    </AppShell>
  );
}
