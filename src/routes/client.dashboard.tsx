import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Bell } from "lucide-react";
import { DashboardLayout } from "@/components/B2BLayout";
import { campaigns, sectors, getSupplier, getCurrentTier, getCampaignProgress, formatPrice, formatQty, buildWhatsAppLink } from "@/data/marketplace";
import { toast } from "sonner";

export const Route = createFileRoute("/client/dashboard")({
  head: () => ({ meta: [{ title: "Espace Acheteur — Dolly Trade B2B" }] }),
  component: ClientDashboardPage,
});

const NAV = [
  { id: "overview", label: "Mon tableau de bord", icon: "📊" },
  { id: "my-campaigns", label: "Mes campagnes", icon: "🔥", badge: 2 },
  { id: "browse", label: "Explorer les campagnes", icon: "🔍" },
  { id: "orders", label: "Mes commandes", icon: "📦", badge: 1 },
  { id: "whatsapp", label: "WhatsApp", icon: "📱" },
  { id: "favorites", label: "Favoris", icon: "❤️" },
  { id: "documents", label: "Mes documents", icon: "📄" },
  { id: "settings", label: "Paramètres", icon: "⚙️" },
];

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const MY_CAMPAIGNS = campaigns.slice(0, 2);
const MY_ORDERS = [
  { id: "CMD-2847", campaign: "Gants chirurgicaux latex", supplier: "🇩🇪 MedEquip Global", qty: "500 000 paires", amount: "€ 31 000", status: "Confirmée", statusColor: "#1B5E3E", date: "11 Août 2026" },
  { id: "CMD-2791", campaign: "Sucre roux de canne ICUMSA 45", supplier: "🇧🇷 AgriKing Export", qty: "50 tonnes", amount: "$ 12 400", status: "En transit", statusColor: "#1E4D8C", date: "28 Juil 2026" },
  { id: "CMD-2756", campaign: "Filtres huile diesel Toyota", supplier: "🇨🇳 AutoParts Asia Hub", qty: "2 000 pièces", amount: "$ 18 400", status: "Livrée ✓", statusColor: "#1B5E3E", date: "15 Juil 2026" },
];

const NOTIFS = [
  { icon: "📈", text: "Palier Silver atteint — Gants chirurgicaux! Nouveau prix: $0.062/paire", time: "il y a 2h", urgent: true },
  { icon: "📦", text: "Votre commande CMD-2791 est en transit à Dakar", time: "il y a 5h", urgent: false },
  { icon: "🔔", text: "Nouvelle campagne: Panneaux solaires 400W disponibles dans Électronique", time: "il y a 1j", urgent: false },
  { icon: "✅", text: "Votre compte acheteur a été vérifié par notre équipe", time: "il y a 3j", urgent: false },
];

function ClientDashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const kpis = [
    { label: "Commandes actives", value: "2", color: "#C14B1D", icon: "🔥" },
    { label: "Total économisé", value: "€ 8 200", color: "#1B5E3E", icon: "💰" },
    { label: "Campagnes rejointes", value: "5", color: "#E8A820", icon: "🤝" },
    { label: "Commandes livrées", value: "3", color: "#1E4D8C", icon: "✅" },
  ];

  return (
    <DashboardLayout
      title="Espace Acheteur"
      subtitle="Pharmacie Centrale Dakar — 🇸🇳 Sénégal"
      role="client"
      navItems={NAV}
      activeItem={activeSection}
      onNavClick={setActiveSection}
      stats={[
        { label: "Campagnes rejointes", value: "2", color: "#1B5E3E" },
        { label: "Commandes en cours", value: "1", color: "#E8A820" },
        { label: "Économie totale", value: "€8.2K", color: "#C14B1D" },
      ]}
    >
      {/* ── OVERVIEW ─────────────────────────────────── */}
      {activeSection === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-[#2B1507] text-xl">Bonjour, Pharmacie Centrale! 👋</h2>
              <p className="text-sm text-gray-500">Lundi 11 août 2026 · 2 campagnes actives vous concernent</p>
            </div>
            <Link to="/campaigns" className="btn-primary text-sm">
              Explorer les campagnes
            </Link>
          </div>

          {/* Notifications urgentes */}
          {NOTIFS.filter((n) => n.urgent).map((n, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-xl border-l-4" style={{ background: "rgba(193,75,29,0.06)", borderLeftColor: "#C14B1D" }}>
              <Bell className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#C14B1D" }} />
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#2B1507]">{n.text}</div>
                <div className="text-xs text-gray-400 mt-0.5">{n.time}</div>
              </div>
              <button className="btn-primary text-xs" style={{ padding: "6px 12px", fontSize: 11 }}
                onClick={() => toast.info("Voir la campagne")}>
                Voir <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          ))}

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="kpi-tile" style={{ borderTop: `3px solid ${k.color}` }}>
                <div className="text-xl mb-2">{k.icon}</div>
                <div className="font-bold text-2xl mb-1" style={{ color: k.color }}>{k.value}</div>
                <div className="text-xs text-gray-500">{k.label}</div>
              </div>
            ))}
          </div>

          {/* My active campaigns */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#2B1507] text-lg">Mes campagnes actives</h3>
              <button onClick={() => setActiveSection("my-campaigns")} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#1B5E3E" }}>
                Toutes <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {MY_CAMPAIGNS.map((c) => {
                const tier = getCurrentTier(c);
                const prog = getCampaignProgress(c);
                const supplier = getSupplier(c.supplierId);
                return (
                  <div key={c.id} className="bg-white rounded-xl card-shadow p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-3xl">{c.image}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-[#2B1507] line-clamp-2">{c.title}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{supplier?.flag} {supplier?.name}</div>
                      </div>
                    </div>
                    <div className="progress-track mb-1.5">
                      <div className="progress-fill" style={{ width: `${prog}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-3">
                      <span>{prog.toFixed(0)}% de l'objectif</span>
                      <span className="font-bold" style={{ color: c.imageColor }}>
                        {formatPrice(tier.pricePerUnit, tier.currency)}/{c.unit}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link to="/campaigns/$id" params={{ id: c.id }} className="flex-1 text-center py-2 rounded-xl text-xs font-semibold border border-gray-200 hover:border-gray-300 text-gray-700">
                        Voir détails
                      </Link>
                      {c.whatsappEnabled && (
                        <a href={buildWhatsAppLink(c)} target="_blank" rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl text-xs font-semibold text-white flex items-center gap-1"
                          style={{ background: "#25D366" }}>
                          <WhatsAppIcon size={13} /> WA
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#2B1507] text-lg">Mes commandes</h3>
              <button onClick={() => setActiveSection("orders")} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#1B5E3E" }}>
                Toutes <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="bg-white rounded-xl card-shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>{["ID", "Campagne", "Fournisseur", "Quantité", "Montant", "Statut", "Date"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {MY_ORDERS.map((o) => (
                    <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                      <td className="px-4 py-3 font-medium text-[#2B1507] max-w-[160px]">
                        <div className="line-clamp-1">{o.campaign}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{o.supplier}</td>
                      <td className="px-4 py-3 text-gray-600">{o.qty}</td>
                      <td className="px-4 py-3 font-bold text-[#2B1507]">{o.amount}</td>
                      <td className="px-4 py-3">
                        <span className="badge text-[11px]" style={{ background: `${o.statusColor}15`, color: o.statusColor }}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-400">{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* All notifications */}
          <div>
            <h3 className="font-display font-bold text-[#2B1507] text-lg mb-4">Notifications récentes</h3>
            <div className="bg-white rounded-xl card-shadow">
              {NOTIFS.map((n, i) => (
                <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < NOTIFS.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <span className="text-lg shrink-0">{n.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm text-[#2B1507]">{n.text}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── BROWSE CAMPAIGNS ─────────────────────────── */}
      {activeSection === "browse" && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-[#2B1507] text-xl">Explorer les campagnes</h2>
            <Link to="/campaigns" className="btn-primary text-sm">Voir toutes les campagnes</Link>
          </div>
          <div className="flex flex-col gap-4">
            {campaigns.filter((c) => c.status === "active").map((c) => {
              const tier = getCurrentTier(c);
              const prog = getCampaignProgress(c);
              const supplier = getSupplier(c.supplierId);
              const daysLeft = Math.max(0, Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000));
              return (
                <div key={c.id} className="bg-white rounded-xl card-shadow p-5 flex items-start gap-4">
                  <div className="h-14 w-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                    style={{ background: `${c.imageColor}15` }}>{c.image}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="badge badge-terra text-[10px]">🔴 En cours</span>
                      {c.whatsappEnabled && <span className="badge badge-green text-[10px] flex items-center gap-1"><WhatsAppIcon size={9} />WA</span>}
                      <span className="badge badge-blue text-[10px]">{daysLeft}j</span>
                    </div>
                    <h4 className="font-semibold text-sm text-[#2B1507] line-clamp-2 mb-1">{c.title}</h4>
                    <div className="text-xs text-gray-500 mb-2">{supplier?.flag} {supplier?.name}</div>
                    <div className="progress-track" style={{ height: 5 }}>
                      <div className="progress-fill" style={{ width: `${prog}%`, height: "100%" }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>{prog.toFixed(0)}% · {c.participantCount} participants</span>
                      <span className="font-bold" style={{ color: c.imageColor }}>
                        {formatPrice(tier.pricePerUnit, tier.currency)}/{c.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Link to="/campaigns/$id" params={{ id: c.id }} className="btn-primary text-xs" style={{ padding: "8px 14px" }}>
                      Voir <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── WHATSAPP ─────────────────────────────────── */}
      {activeSection === "whatsapp" && (
        <div className="max-w-xl">
          <h2 className="font-display font-bold text-[#2B1507] text-xl mb-6">Mon WhatsApp B2B</h2>
          <div className="bg-white rounded-2xl card-shadow p-6 mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white" style={{ background: "#25D366" }}>
                <WhatsAppIcon size={20} />
              </div>
              <div>
                <div className="font-semibold text-[#2B1507]">+221 77 123 45 67</div>
                <div className="badge badge-forest text-xs w-fit">✓ Connecté</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Vous recevez les notifications de campagnes, les confirmations de commandes et les mises à jour logistiques directement sur WhatsApp.</p>
            <div className="flex flex-col gap-2">
              {["Alertes paliers de prix (2 actifs)", "Confirmation commandes (1 en attente)", "Suivi livraison CMD-2791"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="h-2 w-2 rounded-full bg-green-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <a href="https://wa.me/33612345678?text=Bonjour+Dolly+Trade+B2B%2C+je+voudrais+voir+les+campagnes+actives"
            target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center">
            <WhatsAppIcon size={20} /> Ouvrir WhatsApp Business
          </a>
        </div>
      )}

      {/* Generic fallback */}
      {!["overview", "browse", "whatsapp"].includes(activeSection) && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">{NAV.find((n) => n.id === activeSection)?.icon}</div>
          <h2 className="font-display font-bold text-[#2B1507] text-xl mb-2">{NAV.find((n) => n.id === activeSection)?.label}</h2>
          <p className="text-gray-500 text-sm max-w-sm">Section disponible après connexion complète à votre compte.</p>
          <button onClick={() => setActiveSection("overview")} className="btn-secondary mt-6">Retour</button>
        </div>
      )}
    </DashboardLayout>
  );
}
