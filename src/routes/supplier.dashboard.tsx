import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, TrendingUp, Users, Package, Bell, ChevronRight, Edit3, Eye, BarChart2, Globe } from "lucide-react";
import { DashboardLayout } from "@/components/B2BLayout";
import { campaigns, sectors, formatPrice, formatQty, getCurrentTier, getCampaignProgress } from "@/data/marketplace";
import { toast } from "sonner";

export const Route = createFileRoute("/supplier/dashboard")({
  head: () => ({ meta: [{ title: "Tableau de bord Fournisseur — WAOUMAS" }] }),
  component: SupplierDashboardPage,
});

const NAV = [
  { id: "overview", label: "Vue d'ensemble", icon: "📊" },
  { id: "campaigns", label: "Mes campagnes", icon: "🔥", badge: 3 },
  { id: "new-campaign", label: "Nouvelle campagne", icon: "➕" },
  { id: "orders", label: "Commandes reçues", icon: "📦", badge: 12 },
  { id: "clients", label: "Mes acheteurs", icon: "🤝" },
  { id: "whatsapp", label: "WhatsApp", icon: "📱" },
  { id: "analytics", label: "Analytiques", icon: "📈" },
  { id: "catalog", label: "Mon catalogue", icon: "🗂️" },
  { id: "settings", label: "Paramètres", icon: "⚙️" },
];

const MOCK_SUPPLIER_CAMPAIGNS = campaigns.slice(0, 3);

type CampaignFormData = {
  title: string;
  sectorId: string;
  description: string;
  image: string;
  origin: string;
  unit: string;
  moq: string;
  endDate: string;
  deliveryZones: string[];
  certifications: string;
  tier1qty: string; tier1price: string;
  tier2qty: string; tier2price: string;
  tier3qty: string; tier3price: string;
  tier4qty: string; tier4price: string;
  whatsapp: boolean;
};

function NewCampaignForm() {
  const [form, setForm] = useState<CampaignFormData>({
    title: "", sectorId: "", description: "", image: "", origin: "",
    unit: "pièces", moq: "", endDate: "", deliveryZones: [],
    certifications: "", tier1qty: "", tier1price: "", tier2qty: "", tier2price: "",
    tier3qty: "", tier3price: "", tier4qty: "", tier4price: "", whatsapp: true,
  });

  const set = (f: keyof CampaignFormData, v: unknown) => setForm((p) => ({ ...p, [f]: v }));
  const str = (key: keyof CampaignFormData): string => { const v = form[key]; return typeof v === 'string' ? v : ''; };
  const ZONES = ["Afrique de l'Ouest", "Afrique de l'Est", "Afrique Centrale", "Afrique du Nord", "Afrique du Sud", "Moyen-Orient", "Europe", "Monde entier"];
  const toggleZone = (z: string) => set("deliveryZones", form.deliveryZones.includes(z)
    ? form.deliveryZones.filter((x) => x !== z)
    : [...form.deliveryZones, z]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.sectorId || !form.tier1price) {
      toast.error("Remplissez au minimum le titre, le secteur et le premier palier de prix");
      return;
    }
    toast.success("Campagne publiée!", { description: "Votre campagne est maintenant visible par les acheteurs et sur WhatsApp." });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>
          <Plus className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-display font-bold text-[#2B1507] text-xl">Lancer une nouvelle campagne</h2>
          <p className="text-sm text-gray-500">Créez une campagne d'achat groupé avec vos paliers de prix</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Basic info */}
        <div className="bg-white rounded-2xl card-shadow p-6">
          <h3 className="font-semibold text-[#2B1507] mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold">1</span>
            Informations de base
          </h3>
          <div className="flex flex-col gap-4">
            <div className="field-group">
              <label>Titre de la campagne *</label>
              <input type="text" placeholder="Ex: Gants chirurgicaux latex premium — Lot hôpitaux" value={form.title} onChange={(e) => set("title", e.target.value)} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="field-group">
                <label>Secteur *</label>
                <select value={form.sectorId} onChange={(e) => set("sectorId", e.target.value)}>
                  <option value="">Sélectionnez un secteur</option>
                  {sectors.map((s) => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Emoji produit</label>
                <input type="text" placeholder="Ex: 🧤 ou 🔧" value={form.image} onChange={(e) => set("image", e.target.value)} maxLength={2} />
              </div>
              <div className="field-group">
                <label>Unité de vente *</label>
                <input type="text" placeholder="Ex: paires, pièces, tonnes, kg, litres" value={form.unit} onChange={(e) => set("unit", e.target.value)} />
              </div>
              <div className="field-group">
                <label>Quantité minimum (MOQ) *</label>
                <input type="number" placeholder="Ex: 500" min="1" value={form.moq} onChange={(e) => set("moq", e.target.value)} />
              </div>
              <div className="field-group">
                <label>Pays / Région d'origine</label>
                <input type="text" placeholder="Ex: Allemagne, Chine, Brésil" value={form.origin} onChange={(e) => set("origin", e.target.value)} />
              </div>
              <div className="field-group">
                <label>Date de clôture *</label>
                <input type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} />
              </div>
            </div>
            <div className="field-group">
              <label>Description détaillée</label>
              <textarea rows={4} placeholder="Décrivez le produit, ses spécifications, les conditions de livraison, le conditionnement..." value={form.description} onChange={(e) => set("description", e.target.value)} />
            </div>
            <div className="field-group">
              <label>Certifications (séparées par virgule)</label>
              <input type="text" placeholder="Ex: CE, ISO 9001, Halal, FSSC 22000" value={form.certifications} onChange={(e) => set("certifications", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Price tiers */}
        <div className="bg-white rounded-2xl card-shadow p-6">
          <h3 className="font-semibold text-[#2B1507] mb-1 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold">2</span>
            Prix dégressifs par quantité
          </h3>
          <p className="text-sm text-gray-500 mb-4">Définissez vos prix par quantité. Plus les quantités augmentent, plus le prix unitaire baisse.</p>
          <div className="flex flex-col gap-3">
            {([
              { n: "1", label: "Palier Starter" },
              { n: "2", label: "Palier Bronze (-%) " },
              { n: "3", label: "Palier Silver (-%)" },
              { n: "4", label: "Palier Gold (-%)" },
            ] as const).map((tier) => (
              <div key={tier.n} className="grid grid-cols-3 gap-3 items-end">
                <div className="field-group mb-0">
                  <label className="text-[11px]">{tier.label} — Qté min.</label>
                  <input type="number" placeholder="Ex: 500" min="1"
                    value={str(`tier${tier.n}qty` as keyof CampaignFormData)}
                    onChange={(e) => set(`tier${tier.n}qty` as keyof CampaignFormData, e.target.value)} />
                </div>
                <div className="field-group mb-0">
                  <label className="text-[11px]">Prix unitaire</label>
                  <input type="number" step="0.01" placeholder="Ex: 12.50"
                    value={str(`tier${tier.n}price` as keyof CampaignFormData)}
                    onChange={(e) => set(`tier${tier.n}price` as keyof CampaignFormData, e.target.value)} />
                </div>
                {tier.n !== "1" && (
                  <div className="text-sm text-green-600 font-semibold pb-2">
                    {str("tier1price") && str(`tier${tier.n}price` as keyof CampaignFormData)
                      ? `-${(100 - (Number(str(`tier${tier.n}price` as keyof CampaignFormData)) / Number(str("tier1price"))) * 100).toFixed(0)}%`
                      : "—%"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Delivery & WhatsApp */}
        <div className="bg-white rounded-2xl card-shadow p-6">
          <h3 className="font-semibold text-[#2B1507] mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-orange-100 text-orange-600 text-xs flex items-center justify-center font-bold">3</span>
            Zones de livraison & WhatsApp
          </h3>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#2B1507] mb-2">Zones de livraison couvertes</label>
            <div className="flex flex-wrap gap-2">
              {ZONES.map((z) => (
                <button key={z} type="button" onClick={() => toggleZone(z)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border-2 transition-all"
                  style={form.deliveryZones.includes(z)
                    ? { background: "#D4581C", color: "white", borderColor: "#D4581C" }
                    : { background: "white", color: "#6B7280", borderColor: "#E5E7EB" }}>
                  {z}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all"
            style={{ borderColor: form.whatsapp ? "#25D366" : "#E5E7EB", background: form.whatsapp ? "rgba(37,211,102,0.05)" : "white" }}
            onClick={() => set("whatsapp", !form.whatsapp)}>
            <div className="h-5 w-5 rounded border-2 flex items-center justify-center shrink-0"
              style={{ borderColor: form.whatsapp ? "#25D366" : "#D1D5DB", background: form.whatsapp ? "#25D366" : "white" }}>
              {form.whatsapp && <span className="text-white text-xs font-bold">✓</span>}
            </div>
            <div>
              <div className="font-semibold text-sm text-[#2B1507]">Activer les commandes WhatsApp</div>
              <div className="text-xs text-gray-500">Les acheteurs pourront rejoindre cette campagne directement depuis WhatsApp</div>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-primary text-base py-4 justify-center">
          🚀 Publier la campagne <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

function SupplierDashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");

  const kpis = [
    { label: "Revenu total", value: "€ 847 230", sub: "+18% ce mois", color: "#D4581C", icon: "💰" },
    { label: "Campagnes actives", value: "3", sub: "2 clôturent dans 30j", color: "#15803D", icon: "🔥" },
    { label: "Commandes reçues", value: "127", sub: "12 en attente", color: "#F5BE25", icon: "📦" },
    { label: "Pays acheteurs", value: "18", sub: "Sénégal, Nigeria...", color: "#1E4D8C", icon: "🌍" },
    { label: "Participants totaux", value: "492", sub: "+42 ce mois", color: "#8B1A4A", icon: "👥" },
    { label: "Note moyenne", value: "4.8 ⭐", sub: "312 avis", color: "#7C5C38", icon: "⭐" },
  ];

  const recentOrders = [
    { id: "CMD-2847", company: "Pharmacie Centrale Dakar", country: "🇸🇳", qty: "500 000 paires", amount: "€ 31 000", status: "Confirmée", date: "11 Août 2026" },
    { id: "CMD-2846", company: "Clinique Saint-Louis", country: "🇨🇮", qty: "200 000 paires", amount: "€ 12 400", status: "En attente", date: "10 Août 2026" },
    { id: "CMD-2845", company: "CHU de Lagos", country: "🇳🇬", qty: "1 000 000 paires", amount: "€ 62 000", status: "Confirmée", date: "9 Août 2026" },
    { id: "CMD-2844", company: "Labo BioSahel", country: "🇬🇳", qty: "150 000 paires", amount: "€ 9 300", status: "Livraison en cours", date: "8 Août 2026" },
  ];

  return (
    <DashboardLayout
      title="Espace Fournisseur"
      subtitle="MedEquip Global — Francfort, 🇩🇪"
      role="supplier"
      navItems={NAV}
      activeItem={activeSection}
      onNavClick={setActiveSection}
      stats={[
        { label: "Campagnes actives", value: "3", color: "#D4581C" },
        { label: "Commandes en attente", value: "12", color: "#F5BE25" },
        { label: "Revenu ce mois", value: "€ 127K", color: "#15803D" },
        { label: "Pays clients", value: "18", color: "#1E4D8C" },
      ]}
    >
      {/* ── OVERVIEW ─────────────────────────────────── */}
      {activeSection === "overview" && (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-[#2B1507] text-xl">Bonjour, MedEquip! 👋</h2>
              <p className="text-sm text-gray-500">Lundi 11 août 2026 · 3 campagnes actives</p>
            </div>
            <button onClick={() => setActiveSection("new-campaign")} className="btn-primary">
              <Plus className="h-4 w-4" /> Nouvelle campagne
            </button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {kpis.map((k) => (
              <div key={k.label} className="kpi-tile" style={{ borderTop: `3px solid ${k.color}` }}>
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{k.label}</div>
                  <span className="text-xl">{k.icon}</span>
                </div>
                <div className="font-bold text-2xl" style={{ color: k.color }}>{k.value}</div>
                <div className="text-xs text-gray-400 mt-1">{k.sub}</div>
              </div>
            ))}
          </div>

          {/* Active campaigns */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#2B1507] text-lg">Campagnes actives</h3>
              <button onClick={() => setActiveSection("campaigns")} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#D4581C" }}>
                Toutes <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {MOCK_SUPPLIER_CAMPAIGNS.map((c) => {
                const tier = getCurrentTier(c);
                const prog = getCampaignProgress(c);
                return (
                  <div key={c.id} className="bg-white rounded-xl card-shadow p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: `${c.imageColor}15` }}>{c.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-[#2B1507] line-clamp-1 mb-1">{c.title}</div>
                      <div className="progress-track" style={{ height: 6 }}>
                        <div className="progress-fill" style={{ width: `${prog}%`, height: "100%" }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{prog.toFixed(0)}% · {c.participantCount} participants</span>
                        <span className="font-semibold text-gray-700">{formatPrice(tier.pricePerUnit, tier.currency)}/{c.unit}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button onClick={() => toast.info("Voir détails", { description: c.title })}
                        className="p-2 rounded-lg hover:bg-gray-100"><Eye className="h-4 w-4 text-gray-500" /></button>
                      <button onClick={() => toast.info("Modifier campagne")}
                        className="p-2 rounded-lg hover:bg-gray-100"><Edit3 className="h-4 w-4 text-gray-500" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent orders */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-[#2B1507] text-lg">Commandes récentes</h3>
              <button onClick={() => setActiveSection("orders")} className="text-sm font-semibold flex items-center gap-1" style={{ color: "#D4581C" }}>
                Toutes <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="bg-white rounded-xl card-shadow overflow-hidden">
              <table className="w-full text-sm">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                  <tr>
                    {["ID", "Acheteur", "Quantité", "Montant", "Statut", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{o.id}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#2B1507]">{o.country} {o.company}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{o.qty}</td>
                      <td className="px-4 py-3 font-bold text-[#2B1507]">{o.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-[11px] ${o.status === "Confirmée" ? "badge-forest" : o.status === "En attente" ? "badge-gold" : "badge-blue"}`}>
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
        </div>
      )}

      {/* ── NEW CAMPAIGN ─────────────────────────────── */}
      {activeSection === "new-campaign" && <NewCampaignForm />}

      {/* ── WHATSAPP ─────────────────────────────────── */}
      {activeSection === "whatsapp" && (
        <div className="max-w-2xl">
          <h2 className="font-display font-bold text-[#2B1507] text-xl mb-6">Configuration WhatsApp Business</h2>
          <div className="bg-white rounded-2xl card-shadow p-6 mb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white" style={{ background: "#25D366" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#2B1507]">WhatsApp Business API</div>
                <div className="badge badge-forest text-xs flex items-center gap-1 w-fit"><span>✓</span> Connecté</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              {[{ label: "Messages envoyés", val: "1 284" }, { label: "Commandes via WA", val: "38" }, { label: "Taux de lecture", val: "94%" }].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-bold text-xl" style={{ color: "#25D366" }}>{s.val}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl card-shadow p-6">
            <h3 className="font-semibold text-[#2B1507] mb-4">Messages automatiques actifs</h3>
            {["Confirmation de réception commande", "Alerte palier de prix atteint", "Mise à jour statut expédition", "Facture pro-forma envoyée"].map((m) => (
              <div key={m} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                <div className="h-2 w-2 rounded-full bg-green-400 shrink-0" />
                <div className="flex-1 text-sm text-gray-700">{m}</div>
                <span className="badge badge-forest text-[10px]">Actif</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Generic placeholder sections */}
      {!["overview", "new-campaign", "whatsapp"].includes(activeSection) && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">{NAV.find((n) => n.id === activeSection)?.icon}</div>
          <h2 className="font-display font-bold text-[#2B1507] text-xl mb-2">{NAV.find((n) => n.id === activeSection)?.label}</h2>
          <p className="text-gray-500 text-sm max-w-sm">Cette section est en cours de développement. Les données réelles seront disponibles après connexion à l'API.</p>
          <button onClick={() => setActiveSection("overview")} className="btn-secondary mt-6">
            Retour à l'accueil
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
