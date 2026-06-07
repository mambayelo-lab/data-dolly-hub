import { AppShell, KpiCard, DataTable, Badge } from "@/components/AppShell";
import { VendorLogo } from "@/components/VendorLogo";
import { telemetry, machines, machineName } from "@/data/helvexPrecision";

export function WonderwaveApp() {
  const alarms = telemetry.filter((t) => t.warnHigh !== undefined && t.value >= (t.warnHigh ?? Infinity));
  return (
    <AppShell
      vendorClass="vendor-wonderwave"
      vendorName="Wonderwave"
      appName="SCADA & Historian · Helvex"
      appSubtitle="System Platform 2025 · 8 tags actifs"
      logo={<VendorLogo brand="wonderwave" />}
      user={{ name: "Salim Ait-Brahim", role: "Ingénieur OT" }}
      rightTopbar={<span className="opacity-80">●  LIVE · 5 s polling · OPC-UA</span>}
      nav={[
        { label: "Synoptique sites" },
        { label: "Tags & valeurs live", active: true, badge: String(telemetry.length) },
        { label: "Alarmes ISA-18.2", badge: String(alarms.length) },
        { label: "Historian / Tendances" },
        { label: "Recettes" },
        { label: "Audit trail (21 CFR Part 11)" },
      ]}
    >
      <div className="mb-6">
        <div className="text-xs uppercase tracking-wider" style={{ color: "var(--vendor-muted)" }}>Operational Technology</div>
        <h1 className="text-2xl font-semibold mt-1" style={{ color: "var(--vendor-ink)" }}>Supervision temps réel · parc machines</h1>
        <div className="text-xs mt-1" style={{ color: "var(--vendor-muted)" }}>Historian 90j rétention · 2 PB stockés</div>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-6">
        <KpiCard label="Tags actifs" value={String(telemetry.length)} sub={`${machines.length} machines`} />
        <KpiCard label="Alarmes Warn" value={String(alarms.length)} sub="seuils ISA-18.2" trend={alarms.length ? "down" : "up"} />
        <KpiCard label="Disponibilité OT" value="99.98 %" sub="SLA 99.9 %" trend="up" />
        <KpiCard label="Latence p95" value="142 ms" sub="capteur → SCADA" trend="flat" />
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white border rounded-md p-4" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Tags live</div>
          <table className="w-full text-sm">
            <tbody>
              {telemetry.map((t) => {
                const warn = t.warnHigh !== undefined && t.value >= t.warnHigh;
                const crit = t.critHigh !== undefined && t.value >= t.critHigh;
                return (
                  <tr key={t.tag} className="border-t" style={{ borderColor: "var(--vendor-border)" }}>
                    <td className="py-2"><div className="font-mono text-[11px]" style={{ color: "var(--vendor-color)" }}>{t.tag}</div><div className="text-xs opacity-70">{machineName(t.machineId)} · {t.label}</div></td>
                    <td className="text-right tabular-nums font-semibold" style={{ color: crit ? "#dc2626" : warn ? "#ea580c" : "var(--vendor-ink)" }}>{t.value.toLocaleString("fr-FR")} {t.unit}</td>
                    <td className="pl-3 w-20 text-right"><Badge color={crit ? "#dc2626" : warn ? "#ea580c" : "#16a34a"}>{crit ? "CRIT" : warn ? "WARN" : "OK"}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="bg-white border rounded-md p-4 flex flex-col" style={{ borderColor: "var(--vendor-border)" }}>
          <div className="text-sm font-semibold mb-3">Tendance · MCH-A02.VIBR.RMS (24h)</div>
          <svg viewBox="0 0 400 160" className="w-full">
            <defs>
              <linearGradient id="ww-g" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#ff8200" stopOpacity="0.4" /><stop offset="100%" stopColor="#ff8200" stopOpacity="0" /></linearGradient>
            </defs>
            <line x1="0" x2="400" y1="60" y2="60" stroke="#ea580c" strokeDasharray="3 3" strokeWidth="0.5" />
            <line x1="0" x2="400" y1="30" y2="30" stroke="#dc2626" strokeDasharray="3 3" strokeWidth="0.5" />
            <path d="M0 120 L 30 110 L 60 115 L 90 100 L 120 105 L 150 88 L 180 82 L 210 78 L 240 70 L 270 76 L 300 68 L 330 64 L 360 58 L 400 56 L 400 160 L 0 160 Z" fill="url(#ww-g)" />
            <path d="M0 120 L 30 110 L 60 115 L 90 100 L 120 105 L 150 88 L 180 82 L 210 78 L 240 70 L 270 76 L 300 68 L 330 64 L 360 58 L 400 56" fill="none" stroke="#ff8200" strokeWidth="1.6" />
            <text x="4" y="28" fontSize="9" fill="#dc2626">CRIT 7.1 mm/s</text>
            <text x="4" y="58" fontSize="9" fill="#ea580c">WARN 4.5 mm/s</text>
          </svg>
          <div className="mt-3 text-xs" style={{ color: "var(--vendor-muted)" }}>Alarme propagée à <Badge color="#7a3ff2">MaxiMoves</Badge> → ticket <span className="font-mono">WO-M-3044</span></div>
        </div>
      </div>
    </AppShell>
  );
}
