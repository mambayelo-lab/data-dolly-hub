import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { parts, boms, partName } from "@/data/helvexPrecision";

export function Dasselys3DXApp() {
  const finished = parts.filter((p) => p.type.startsWith("Pièce finie"));
  const subs = parts.filter((p) => p.type === "Sous-ensemble");
  return (
    <AppShell
      vendorClass="vendor-dasselys"
      vendorName="Dasselys 3DX"
      appName="3DXperience · Engineering Hub"
      appSubtitle="Tenant HELVEX · ENOVIA · CATIA V6"
      logo={<VendorLogo brand="dasselys" />}
      user={{ name: "Romain Védrines", role: "Lead Designer · BE Aéro" }}
      rightTopbar={<span className="opacity-80">Rôle : Product Engineer · Collaborative Space HELVEX-AERO</span>}
      nav={[
        { label: "Compass" },
        { label: "ENOVIA — Specifications", active: true, badge: String(finished.length) },
        { label: "CATIA — 3D models", badge: String(parts.length) },
        { label: "SIMULIA — Calcul" },
        { label: "DELMIA — Process planning" },
        { label: "NETVIBES — BI" },
        { label: "Change Actions", badge: "3" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Engineering</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Product Structure · HX-AER-7831-A · Rév. C</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Maturity : RELEASED · last revised 03-06-2026 by R. Védrines</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Articles gérés" value={String(parts.length)} sub="dont 6 finies + 1 sous-ens." />
        <KpiCard label="Change actions" value="3" sub="2 en revue CCB" trend="flat" />
        <KpiCard label="Modèles CAO" value="142" sub="+8 cette semaine" trend="up" />
        <KpiCard label="Conformité PDM" value="98.6 %" sub="dossiers verrouillés" trend="up" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DataTable
            caption="ENOVIA — Articles & révisions"
            rows={[...finished, ...subs]}
            columns={[
              { key: "pn", header: "Part Number", render: (r) => <span className="font-mono text-[13px]" style={{ color: "var(--vendor-color)" }}>{r.pn}</span> },
              { key: "name", header: "Designation" },
              { key: "type", header: "Type" },
              { key: "revision", header: "Rev." },
              { key: "drawing", header: "Drawing", render: (r) => <span className="font-mono text-xs">{r.drawing}</span> },
              { key: "material", header: "Material" },
            ]}
          />
        </div>
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">BOM · HX-AER-7831-A</div>
          <ul className="space-y-2 text-sm">
            {boms.filter((b) => b.parent === "HX-AER-7831-A").map((b) => (
              <li key={b.child} className="flex justify-between py-1.5 border-b last:border-0" style={{ borderColor: "var(--vendor-border)" }}>
                <span><span className="font-mono text-xs">{b.child}</span> · {partName(b.child)}</span>
                <span className="tabular-nums">{b.qty} {b.uom}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-xs" style={{ color: "var(--vendor-muted)" }}>
            ECN ouvertes : <Badge>ECN-2026-0142</Badge> <Badge>ECN-2026-0145</Badge>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
