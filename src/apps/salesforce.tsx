import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { customers, orders, fmtEUR } from "@/data/maisonLumen";

export function SalesforceApp() {
  const top = [...customers].sort((a, b) => b.lifetimeValueEUR - a.lifetimeValueEUR);
  return (
    <AppShell
      vendorClass="vendor-salesforce"
      vendorName="Salesforce"
      appName="Sales Cloud · Clienteling Maison Lumen"
      appSubtitle="Org 00D5g000004XyZx · API v59"
      logo={
        <span className="flex items-center gap-2">
          <span className="h-5 w-7 rounded grid place-items-center text-[10px] font-bold" style={{ background: "#00a1e0", color: "white" }}>SF</span>
          <span className="font-semibold">salesforce</span>
        </span>
      }
      user={{ name: "Marc Dupré", role: "Sales Director" }}
      rightTopbar={<span style={{ color: "rgba(255,255,255,0.7)" }}>Sandbox · UAT-2026</span>}
      nav={[
        { label: "Home" },
        { label: "Accounts" },
        { label: "Contacts", active: true, badge: String(customers.length) },
        { label: "Opportunities", badge: "12" },
        { label: "Leads" },
        { label: "Cases" },
        { label: "Campaigns" },
        { label: "Reports" },
        { label: "Dashboards" },
        { label: "Forecasts" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Contact</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-color)" }}>Clienteling · Top relations</h1>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Active customers" value="14 820" sub="VIP 412" trend="up" />
        <KpiCard label="Pipeline (Q3)" value={fmtEUR(2840000)} sub="78 % weighted" trend="up" />
        <KpiCard label="Win rate" value="42 %" sub="vs 38 % T-1" trend="up" />
        <KpiCard label="NPS clients VIP" value="68" sub="+4 pts" trend="up" />
      </div>

      <DataTable
        caption="Top customers by LTV"
        rows={top}
        columns={[
          { key: "id", header: "Contact ID", render: (c) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{c.id}</span> },
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "city", header: "City" },
          { key: "segment", header: "Segment", render: (c) => <Badge color={c.segment === "VIP" ? "#7c3aed" : c.segment === "B2B" ? "#ef7d00" : "#00a1e0"}>{c.segment}</Badge> },
          { key: "ordersCount", header: "Orders", align: "right" },
          { key: "lifetimeValueEUR", header: "LTV", align: "right", render: (c) => fmtEUR(c.lifetimeValueEUR) },
          { key: "lastOrderAt", header: "Last order" },
        ]}
      />

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3" style={{ color: "var(--vendor-color)" }}>Activity — Camille Berthier (VIP)</div>
          <ul className="text-sm space-y-3">
            <li><span className="font-mono text-xs" style={{ color: "var(--vendor-muted)" }}>2026-06-06</span> · Appel conseillère, intérêt collection AH25</li>
            <li><span className="font-mono text-xs" style={{ color: "var(--vendor-muted)" }}>2026-05-28</span> · Achat boutique Cannes ({fmtEUR(995)})</li>
            <li><span className="font-mono text-xs" style={{ color: "var(--vendor-muted)" }}>2026-05-12</span> · Email RDV personal shopping</li>
            <li><span className="font-mono text-xs" style={{ color: "var(--vendor-muted)" }}>2026-04-30</span> · Invitation event Paris Saint-Honoré</li>
          </ul>
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3" style={{ color: "var(--vendor-color)" }}>Opportunities — pipeline B2B</div>
          {[
            ["OPP-2026-118", "Hôtel Lutetia — réassort plaids hiver", 28400, "Proposal"],
            ["OPP-2026-119", "Hôtel Crillon — cadeaux fin d'année", 64200, "Negotiation"],
            ["OPP-2026-121", "Air France Lounges — diffuseurs", 18900, "Qualification"],
          ].map(([id, name, amt, stage]) => (
            <div key={id as string} className="py-2 border-b text-sm last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
              <div className="flex justify-between">
                <span className="font-mono text-xs" style={{ color: "var(--vendor-color)" }}>{id}</span>
                <Badge>{stage as string}</Badge>
              </div>
              <div className="flex justify-between mt-1">
                <span>{name}</span>
                <span className="tabular-nums">{fmtEUR(amt as number)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-xs flex items-center justify-between" style={{ color: "var(--vendor-muted)" }}>
        <span>Données synchronisées depuis SAP (commandes), Shopify (parcours web), Cegid (encaissements magasin).</span>
        <span className="font-mono">Sync · {orders.length} commandes liées</span>
      </div>
    </AppShell>
  );
}
