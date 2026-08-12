import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { sectors } from "@/data/marketplace";

export const Route = createFileRoute("/register/client")({
  head: () => ({ meta: [{ title: "Inscription Acheteur B2B — WAOUMAS" }] }),
  component: RegisterClientPage,
});

const STEPS = [
  { id: 1, label: "Votre entreprise", icon: "🏢" },
  { id: 2, label: "Données légales", icon: "📄" },
  { id: 3, label: "Besoins d'achat", icon: "🛒" },
  { id: 4, label: "WhatsApp & Notifs", icon: "📱" },
  { id: 5, label: "Confirmation", icon: "✅" },
];

const BUSINESS_TYPES = [
  "Pharmacie / Officine", "Clinique / Hôpital", "Laboratoire", "Grossiste distributeur",
  "Garage / Atelier mécanique", "Industrie / Usine", "Agroalimentaire / Minoterie",
  "BTP / Construction", "Commerce de gros", "Importateur / Exportateur", "Revendeur B2B",
  "ONG / Organisation internationale", "Administration publique", "Autre",
];

const AFRICA_COUNTRIES = [
  "France", "Belgique", "Allemagne", "Espagne", "Italie", "Royaume-Uni",
  "Pologne", "Pays-Bas", "Portugal", "Suisse", "Turquie", "Émirats arabes unis",
  "Arabie Saoudite", "Qatar", "Inde", "Chine", "Brésil", "Canada", "États-Unis",
  "Maroc", "Tunisie", "Algérie", "Sénégal", "Côte d'Ivoire", "Nigeria", "Ghana",
  "Kenya", "Égypte", "Afrique du Sud", "Autre",
];

type ClientForm = {
  companyName: string;
  country: string;
  city: string;
  businessType: string;
  email: string;
  phone: string;
  password: string;
  registrationNumber: string;
  taxId: string;
  legalRepName: string;
  annualBudget: string;
  sectorIds: string[];
  orderFrequency: string;
  importExperience: string;
  whatsappNumber: string;
  notifCampaigns: boolean;
  notifNewProducts: boolean;
  acceptTerms: boolean;
};

export default function RegisterClientPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ClientForm>({
    companyName: "", country: "", city: "", businessType: "", email: "", phone: "",
    password: "", registrationNumber: "", taxId: "", legalRepName: "", annualBudget: "",
    sectorIds: [], orderFrequency: "", importExperience: "",
    whatsappNumber: "", notifCampaigns: true, notifNewProducts: false, acceptTerms: false,
  });

  const set = (f: keyof ClientForm, v: unknown) => setForm((prev) => ({ ...prev, [f]: v }));
  const toggleSector = (id: string) => set("sectorIds", form.sectorIds.includes(id)
    ? form.sectorIds.filter((s) => s !== id)
    : [...form.sectorIds, id]);

  const next = () => {
    if (step === 1 && (!form.companyName || !form.country || !form.email || !form.businessType)) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    if (step < STEPS.length) setStep(step + 1);
  };

  const submit = () => {
    if (!form.acceptTerms) { toast.error("Veuillez accepter les CGU"); return; }
    toast.success("Inscription réussie!", { description: "Votre compte acheteur est activé. Explorez les campagnes!" });
    setTimeout(() => navigate({ to: "/client/dashboard" }), 1000);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF" }}>
      <div className="py-4 px-6 border-b" style={{ background: "#15803D" }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>D</div>
            <span className="text-white font-bold text-sm font-display">DOLLY TRADE B2B</span>
          </Link>
          <span className="text-white/60 text-xs">Inscription Acheteur Pro</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Steps */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1 shrink-0">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium"
                style={step === s.id ? { background: "#15803D", color: "white" }
                  : step > s.id ? { background: "rgba(21,128,61,0.1)", color: "#15803D" }
                  : { background: "white", color: "#9CA3AF" }}>
                <span>{step > s.id ? "✓" : s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className="h-px w-4 shrink-0" style={{ background: step > s.id ? "#15803D" : "#E5E7EB" }} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl card-shadow p-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Votre entreprise</h2>
              <p className="text-gray-500 text-sm mb-6">Seules les entreprises professionnelles peuvent s'inscrire sur WAOUMAS.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field-group sm:col-span-2">
                  <label>Nom de l'entreprise *</label>
                  <input type="text" placeholder="Pharmacie Centrale / Garage du Sahel / ..." value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Type d'activité *</label>
                  <select value={form.businessType} onChange={(e) => set("businessType", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Pays *</label>
                  <select value={form.country} onChange={(e) => set("country", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {AFRICA_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Ville *</label>
                  <input type="text" placeholder="Ex: Dakar, Lagos, Abidjan..." value={form.city} onChange={(e) => set("city", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Email professionnel *</label>
                  <input type="email" placeholder="vous@entreprise.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Téléphone</label>
                  <input type="tel" placeholder="+221 77 123 45 67" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Mot de passe *</label>
                  <input type="password" placeholder="Min. 8 caractères" value={form.password} onChange={(e) => set("password", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Données légales</h2>
              <p className="text-gray-500 text-sm mb-6">Nécessaire pour les documents export (factures, BL, certificats d'origine).</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field-group">
                  <label>N° d'immatriculation / RCCM *</label>
                  <input type="text" placeholder="Ex: SN-DKR-2019-B-1234" value={form.registrationNumber} onChange={(e) => set("registrationNumber", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>N° Fiscal / TVA</label>
                  <input type="text" placeholder="Ex: SN-00123456789" value={form.taxId} onChange={(e) => set("taxId", e.target.value)} />
                </div>
                <div className="field-group sm:col-span-2">
                  <label>Nom du responsable achats *</label>
                  <input type="text" placeholder="Prénom et Nom du responsable" value={form.legalRepName} onChange={(e) => set("legalRepName", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Budget annuel d'achat estimé</label>
                  <select value={form.annualBudget} onChange={(e) => set("annualBudget", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {["< 10 000 USD", "10 000 – 50 000 USD", "50 000 – 200 000 USD", "200 000 – 1M USD", "> 1M USD"].map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Expérience import international</label>
                  <select value={form.importExperience} onChange={(e) => set("importExperience", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {["Débutant (première import)", "1-3 ans", "3-10 ans", "10+ ans"].map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl flex gap-3" style={{ background: "rgba(21,128,61,0.05)", border: "1px solid rgba(21,128,61,0.12)" }}>
                <Shield className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <div className="text-xs text-green-700">Données sécurisées · Conformité RGPD · Jamais partagées sans votre accord</div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Vos besoins d'achat</h2>
              <p className="text-gray-500 text-sm mb-6">Sélectionnez les secteurs qui correspondent à vos besoins d'approvisionnement.</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {sectors.map((s) => {
                  const selected = form.sectorIds.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleSector(s.id)}
                      className="flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all"
                      style={selected ? { borderColor: s.color, background: `${s.color}08` } : { borderColor: "#E5E7EB", background: "white" }}>
                      <span className="text-xl">{s.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm" style={selected ? { color: s.color } : { color: "#2B1507" }}>{s.name}</div>
                        <div className="text-xs text-gray-400">{s.stats.campaigns} campagnes en cours</div>
                      </div>
                      {selected && <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              <div className="field-group">
                <label>Fréquence d'achat</label>
                <select value={form.orderFrequency} onChange={(e) => set("orderFrequency", e.target.value)}>
                  <option value="">Sélectionnez...</option>
                  {["Ponctuel (1 commande)", "Mensuel", "Trimestriel", "Semestriel", "Annuel"].map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">WhatsApp & Notifications</h2>
              <p className="text-gray-500 text-sm mb-6">Recevez les alertes de campagnes et les confirmations de commandes sur votre téléphone.</p>
              <div className="field-group mb-6">
                <label>Votre numéro WhatsApp</label>
                <input type="tel" placeholder="+221 77 123 45 67" value={form.whatsappNumber} onChange={(e) => set("whatsappNumber", e.target.value)} />
                <div className="text-xs text-gray-400 mt-1">Vous pourrez passer des commandes directement depuis WhatsApp</div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { key: "notifCampaigns" as const, label: "Alertes nouvelles campagnes dans mes secteurs", desc: "Recevoir une notification quand une nouvelle campagne est lancée dans vos secteurs d'intérêt" },
                  { key: "notifNewProducts" as const, label: "Nouveaux fournisseurs et produits", desc: "Être alerté des nouveaux fournisseurs vérifiés et produits disponibles" },
                ].map((item) => (
                  <div key={item.key} className="p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3"
                    style={{ borderColor: form[item.key] ? "#25D366" : "#E5E7EB", background: form[item.key] ? "rgba(37,211,102,0.04)" : "white" }}
                    onClick={() => set(item.key, !form[item.key])}>
                    <div className="h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5"
                      style={{ borderColor: form[item.key] ? "#25D366" : "#D1D5DB", background: form[item.key] ? "#25D366" : "white" }}>
                      {form[item.key] && <span className="text-white text-xs font-bold">✓</span>}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-[#2B1507]">{item.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="text-center">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-2">Prêt à rejoindre WAOUMAS ?</h2>
              <p className="text-gray-500 text-sm mb-6">Vérifiez vos informations et activez votre compte acheteur professionnel.</p>
              <div className="text-left bg-gray-50 rounded-xl p-5 mb-6 flex flex-col gap-3">
                {[
                  { label: "Entreprise", val: form.companyName },
                  { label: "Type", val: form.businessType },
                  { label: "Pays", val: form.country },
                  { label: "Email", val: form.email },
                  { label: "Secteurs", val: form.sectorIds.map((id) => sectors.find((s) => s.id === id)?.icon + " " + sectors.find((s) => s.id === id)?.name).join(", ") || "—" },
                  { label: "WhatsApp", val: form.whatsappNumber || "Non renseigné" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between gap-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">{r.label}</span>
                    <span className="text-sm text-[#2B1507] text-right">{r.val || "—"}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl mb-6 text-left bg-gray-50">
                <input type="checkbox" id="terms2" checked={form.acceptTerms} onChange={(e) => set("acceptTerms", e.target.checked)} className="mt-0.5" />
                <label htmlFor="terms2" className="text-sm text-gray-600 cursor-pointer">
                  J'accepte les <a href="#" className="underline" style={{ color: "#15803D" }}>Conditions générales</a> et la <a href="#" className="underline" style={{ color: "#15803D" }}>Politique de confidentialité</a>. Je certifie être un professionnel B2B.
                </label>
              </div>
              <button onClick={submit} className="w-full justify-center font-bold py-3.5 rounded-xl text-white" style={{ background: "linear-gradient(135deg, #15803D, #2E7D32)", fontSize: 15 }}>
                Créer mon compte acheteur <ChevronRight className="h-4 w-4 inline ml-1" />
              </button>
              <div className="mt-3 text-xs text-gray-400">Activation immédiate · Accès à toutes les campagnes</div>
            </div>
          )}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
            ) : (
              <Link to="/login" className="btn-secondary">Déjà inscrit?</Link>
            )}
            {step < STEPS.length && (
              <button onClick={next} className="btn-primary" style={{ background: "linear-gradient(135deg, #15803D, #2E7D32)", boxShadow: "0 4px 16px rgba(21,128,61,0.35)" }}>
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
