import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { distOrders, distCustomers, customerName, productName, fmtEUR } from "@/data/fromagerieDuVal";

export function DiventoApp() {
  const totalCA = distOrders.reduce((s, o) => s + o.totalHTEUR, 0);
  const open = distOrders.filter(o => o.status !== "Livrée").length;
  return (
    <AppShell
      vendorClass="vendor-divento"
      vendorName="Divento"
      appName="Divento Distribution · Tournées & B2B"
      appSubtitle="Société FDV · 6 régions commerciales"
      logo={<span className="font-bold tracking-tight text-base">Divento</span>}
      user={{ name: "Julien Postel", role: "Resp. ADV Nord" }}
      rightTopbar={<span className="opacity-80">Vue semaine S23/2026</span>}
      nav={[
        { label: "Pilotage commercial" },
        { label: "Commandes clients", active: true, badge: String(distOrders.length) },
        { label: "Tournées de livraison" },
        { label: "Fichiers clients GMS / RHF" },
        { label: "Tarifs & conditions" },
        { label: "Facturation" },
        { label: "Litiges & avoirs", badge: "4" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Module ADV</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Commandes clients en cours</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Synchro temps réel Saje X-Cube (facturation) & QualiPlus (libération lots)</div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="CA HT échantillon" value={fmtEUR(totalCA)} sub="6 commandes" trend="up" />
        <KpiCard label="Commandes ouvertes" value={String(open)} sub="dont 1 export DHL Air" trend="flat" />
        <KpiCard label="OTIF (semaine)" value="96.4 %" sub="Cible 95 %" trend="up" />
        <KpiCard label="Marge brute moyenne" value="38.2 %" sub="Stable" trend="flat" />
      </div>

      <DataTable
        caption="Commandes clients — semaine S23"
        rows={distOrders}
        columns={[
          { key: "id", header: "N° commande", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.id}</span> },
          { key: "date", header: "Date" },
          { key: "customerId", header: "Client", render: (r) => customerName(r.customerId) },
          { key: "lines", header: "Lignes", align: "right", render: (r) => r.lines.length },
          { key: "totalHTEUR", header: "Montant HT", align: "right", render: (r) => fmtEUR(r.totalHTEUR) },
          { key: "carrier", header: "Transporteur" },
          {
            key: "status",
            header: "Statut",
            render: (r) => {
              const c = r.status === "Livrée" ? "#16a34a" : r.status === "Expédiée" ? "#0072ce" : r.status === "En préparation" ? "#ef7d00" : "#6b7280";
              return <Badge color={c}>{r.status}</Badge>;
            },
          },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Détail commande {distOrders[0].id}</div>
          <div className="text-xs mb-3" style={{ color: "var(--vendor-muted)" }}>Client : {customerName(distOrders[0].customerId)}</div>
          <ul className="space-y-1.5 text-sm">
            {distOrders[0].lines.map((l) => (
              <li key={l.sku} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span><span className="font-mono text-xs">{l.sku}</span> — {productName(l.sku)}</span>
                <span className="tabular-nums">{l.qty} × {fmtEUR(l.unitPriceEUR)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Portefeuille clients actifs</div>
          <ul className="space-y-2 text-sm">
            {distCustomers.map((c) => (
              <li key={c.id} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span>{c.name} <span className="text-xs" style={{ color: "var(--vendor-muted)" }}>· {c.region}</span></span>
                <Badge color={c.channel === "GMS" ? "#0072ce" : c.channel === "Export" ? "#7c3aed" : c.channel === "RHF" ? "#ef7d00" : "#16a34a"}>{c.channel}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>Divento Distribution · ERP distribution (inspiré de Divalto Infinity)</span>
        <span className="font-mono">Société FDV · Agence Caen</span>
      </div>
    </AppShell>
  );
}
