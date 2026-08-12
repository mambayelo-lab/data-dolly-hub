import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle, Shield, ChevronRight, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { sectors } from "@/data/marketplace";

export const Route = createFileRoute("/register/supplier")({
  head: () => ({ meta: [{ title: "Inscription Fournisseur — Dolly Trade B2B" }] }),
  component: RegisterSupplierPage,
});

const STEPS = [
  { id: 1, label: "Informations société", icon: "🏢" },
  { id: 2, label: "Données légales", icon: "📄" },
  { id: 3, label: "Secteurs & Produits", icon: "📦" },
  { id: 4, label: "Paramètres WhatsApp", icon: "📱" },
  { id: 5, label: "Confirmation", icon: "✅" },
];

const COUNTRIES = [
  "Allemagne", "France", "Chine", "Inde", "Turquie", "Italie", "Espagne",
  "États-Unis", "Royaume-Uni", "Pays-Bas", "Belgique", "Suisse", "Brésil",
  "Maroc", "Tunisie", "Sénégal", "Nigeria", "Ghana", "Afrique du Sud", "Kenya",
];

const CURRENCIES = ["USD", "EUR", "GBP", "CNY", "MAD", "XOF", "XAF", "NGN", "ZAR"];

type FormData = {
  companyName: string;
  country: string;
  city: string;
  website: string;
  established: string;
  employeeCount: string;
  description: string;
  legalForm: string;
  registrationNumber: string;
  vatNumber: string;
  legalRepName: string;
  legalRepTitle: string;
  email: string;
  phone: string;
  password: string;
  sectorIds: string[];
  certifications: string;
  moqDescription: string;
  currency: string;
  exportCountries: string;
  whatsappNumber: string;
  whatsappNotifCampaigns: boolean;
  whatsappNotifOrders: boolean;
  whatsappAutoReply: boolean;
  acceptTerms: boolean;
};

export default function RegisterSupplierPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    companyName: "", country: "", city: "", website: "", established: "", employeeCount: "",
    description: "", legalForm: "", registrationNumber: "", vatNumber: "", legalRepName: "",
    legalRepTitle: "", email: "", phone: "", password: "", sectorIds: [], certifications: "",
    moqDescription: "", currency: "USD", exportCountries: "",
    whatsappNumber: "", whatsappNotifCampaigns: true, whatsappNotifOrders: true,
    whatsappAutoReply: false, acceptTerms: false,
  });

  const set = (field: keyof FormData, value: unknown) => setForm((f) => ({ ...f, [field]: value }));
  const toggleSector = (id: string) => set("sectorIds", form.sectorIds.includes(id)
    ? form.sectorIds.filter((s) => s !== id)
    : [...form.sectorIds, id]);

  const next = () => {
    if (step === 1 && (!form.companyName || !form.country || !form.city || !form.email)) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    if (step === 2 && (!form.legalForm || !form.registrationNumber || !form.legalRepName)) {
      toast.error("Veuillez remplir les données légales obligatoires");
      return;
    }
    if (step < STEPS.length) setStep(step + 1);
  };

  const submit = () => {
    if (!form.acceptTerms) { toast.error("Veuillez accepter les conditions générales"); return; }
    toast.success("Demande d'inscription envoyée!", {
      description: "Notre équipe va vérifier votre dossier sous 24-48h. Vous recevrez un email de confirmation.",
    });
    setTimeout(() => navigate({ to: "/supplier/dashboard" }), 1200);
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF" }}>
      {/* Top bar */}
      <div className="py-4 px-6 border-b border-white/20" style={{ background: "#2B1507" }}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>D</div>
            <span className="text-white font-bold text-sm font-display">DOLLY TRADE B2B</span>
          </Link>
          <span className="text-white/50 text-xs">Inscription Fournisseur</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Steps */}
        <div className="flex items-center gap-1 mb-10 overflow-x-auto pb-2">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1 shrink-0">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all ${step === s.id ? "text-white" : step > s.id ? "text-green-700" : "text-gray-400"}`}
                style={step === s.id ? { background: "#D4581C" } : step > s.id ? { background: "rgba(21,128,61,0.12)" } : { background: "white" }}>
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
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Informations de votre société</h2>
              <p className="text-gray-500 text-sm mb-6">Ces informations seront visibles par les acheteurs sur votre profil.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field-group sm:col-span-2">
                  <label>Nom de la société *</label>
                  <input type="text" placeholder="Ex: MedEquip International Ltd" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Pays *</label>
                  <select value={form.country} onChange={(e) => set("country", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Ville *</label>
                  <input type="text" placeholder="Ex: Frankfurt" value={form.city} onChange={(e) => set("city", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Email professionnel *</label>
                  <input type="email" placeholder="contact@societe.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Téléphone international</label>
                  <input type="tel" placeholder="+49 69 12345678" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Site web</label>
                  <input type="url" placeholder="https://www.societe.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Année de création</label>
                  <input type="number" placeholder="Ex: 2005" min="1800" max="2025" value={form.established} onChange={(e) => set("established", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Nombre d'employés</label>
                  <select value={form.employeeCount} onChange={(e) => set("employeeCount", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {["1-10", "11-50", "51-200", "201-500", "501-2000", "2000+"].map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="field-group sm:col-span-2">
                  <label>Description de votre activité</label>
                  <textarea rows={3} placeholder="Décrivez votre activité, vos produits phares et votre expérience export..." value={form.description} onChange={(e) => set("description", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Mot de passe *</label>
                  <input type="password" placeholder="Minimum 8 caractères" value={form.password} onChange={(e) => set("password", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Pays d'exportation cibles</label>
                  <input type="text" placeholder="Ex: Sénégal, Côte d'Ivoire, Nigeria..." value={form.exportCountries} onChange={(e) => set("exportCountries", e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Données légales</h2>
              <p className="text-gray-500 text-sm mb-6">Informations requises pour la vérification de votre compte. Restent confidentielles.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="field-group">
                  <label>Forme juridique *</label>
                  <select value={form.legalForm} onChange={(e) => set("legalForm", e.target.value)}>
                    <option value="">Sélectionnez...</option>
                    {["SA / S.A.S", "SARL / GmbH / LLC", "SNC", "Entreprise individuelle", "Coopérative", "ONG / Association", "Autre"].map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>N° d'immatriculation / SIREN / RC *</label>
                  <input type="text" placeholder="Ex: 12345678" value={form.registrationNumber} onChange={(e) => set("registrationNumber", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>N° TVA / VAT (si applicable)</label>
                  <input type="text" placeholder="Ex: DE123456789" value={form.vatNumber} onChange={(e) => set("vatNumber", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Devise principale *</label>
                  <select value={form.currency} onChange={(e) => set("currency", e.target.value)}>
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="field-group">
                  <label>Nom du représentant légal *</label>
                  <input type="text" placeholder="Prénom et Nom" value={form.legalRepName} onChange={(e) => set("legalRepName", e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Titre / Poste *</label>
                  <input type="text" placeholder="Ex: Directeur Général, PDG..." value={form.legalRepTitle} onChange={(e) => set("legalRepTitle", e.target.value)} />
                </div>
                <div className="field-group sm:col-span-2">
                  <label>Certifications qualité / export</label>
                  <input type="text" placeholder="Ex: ISO 9001, CE, FDA, Halal, Kosher, FSSC 22000..." value={form.certifications} onChange={(e) => set("certifications", e.target.value)} />
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl flex gap-3 items-start" style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}>
                <Shield className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <div className="text-xs text-green-700">Vos données légales sont chiffrées et ne sont jamais partagées avec les acheteurs sans votre accord. Elles servent uniquement à la vérification de votre compte.</div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Secteurs & Produits</h2>
              <p className="text-gray-500 text-sm mb-6">Sélectionnez vos secteurs d'activité pour apparaître dans les bonnes catégories.</p>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {sectors.map((s) => {
                  const selected = form.sectorIds.includes(s.id);
                  return (
                    <button key={s.id} onClick={() => toggleSector(s.id)}
                      className="flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all"
                      style={selected
                        ? { borderColor: s.color, background: `${s.color}10` }
                        : { borderColor: "#E5E7EB", background: "white" }}>
                      <div className="text-2xl shrink-0">{s.icon}</div>
                      <div>
                        <div className="font-semibold text-sm" style={selected ? { color: s.color } : { color: "#2B1507" }}>{s.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{s.description}</div>
                        <div className="text-xs mt-1 text-gray-400">{s.stats.products.toLocaleString("fr-FR")} produits · {s.stats.suppliers} fournisseurs</div>
                      </div>
                      {selected && <CheckCircle className="h-4 w-4 shrink-0 mt-0.5 ml-auto text-green-600" />}
                    </button>
                  );
                })}
              </div>
              <div className="field-group">
                <label>Quantité minimum de commande (MOQ) — description</label>
                <input type="text" placeholder="Ex: Minimum 1 FCL (20 pieds) ou 5 000 EUR par commande"
                  value={form.moqDescription} onChange={(e) => set("moqDescription", e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-1">Paramètres WhatsApp Business</h2>
              <p className="text-gray-500 text-sm mb-6">Connectez votre WhatsApp Business pour recevoir les commandes et notifier vos acheteurs.</p>
              <div className="field-group mb-6">
                <label>Numéro WhatsApp Business (international)</label>
                <input type="tel" placeholder="+49 69 12345678" value={form.whatsappNumber} onChange={(e) => set("whatsappNumber", e.target.value)} />
                <div className="text-xs text-gray-400 mt-1">Format international avec l'indicatif pays. Ex: +33612345678</div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="p-4 rounded-xl border flex items-start gap-3 cursor-pointer"
                  style={{ borderColor: form.whatsappNotifCampaigns ? "#25D366" : "#E5E7EB", background: form.whatsappNotifCampaigns ? "rgba(37,211,102,0.05)" : "white" }}
                  onClick={() => set("whatsappNotifCampaigns", !form.whatsappNotifCampaigns)}>
                  <div className="h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ borderColor: form.whatsappNotifCampaigns ? "#25D366" : "#D1D5DB", background: form.whatsappNotifCampaigns ? "#25D366" : "white" }}>
                    {form.whatsappNotifCampaigns && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#2B1507]">Notifications de paliers atteints</div>
                    <div className="text-xs text-gray-500 mt-0.5">Recevoir un message WhatsApp quand une campagne change de palier de prix</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border flex items-start gap-3 cursor-pointer"
                  style={{ borderColor: form.whatsappNotifOrders ? "#25D366" : "#E5E7EB", background: form.whatsappNotifOrders ? "rgba(37,211,102,0.05)" : "white" }}
                  onClick={() => set("whatsappNotifOrders", !form.whatsappNotifOrders)}>
                  <div className="h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ borderColor: form.whatsappNotifOrders ? "#25D366" : "#D1D5DB", background: form.whatsappNotifOrders ? "#25D366" : "white" }}>
                    {form.whatsappNotifOrders && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#2B1507]">Notifications de nouvelles commandes</div>
                    <div className="text-xs text-gray-500 mt-0.5">Recevoir un message WhatsApp quand un acheteur rejoint votre campagne</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl border flex items-start gap-3 cursor-pointer"
                  style={{ borderColor: form.whatsappAutoReply ? "#25D366" : "#E5E7EB", background: form.whatsappAutoReply ? "rgba(37,211,102,0.05)" : "white" }}
                  onClick={() => set("whatsappAutoReply", !form.whatsappAutoReply)}>
                  <div className="h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5"
                    style={{ borderColor: form.whatsappAutoReply ? "#25D366" : "#D1D5DB", background: form.whatsappAutoReply ? "#25D366" : "white" }}>
                    {form.whatsappAutoReply && <span className="text-white text-xs">✓</span>}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#2B1507]">Réponse automatique aux acheteurs</div>
                    <div className="text-xs text-gray-500 mt-0.5">Activer un bot WhatsApp pour répondre aux premières questions des acheteurs 24h/24</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className="text-center">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="font-display text-2xl text-[#2B1507] mb-2">Vérifiez votre inscription</h2>
              <p className="text-gray-500 text-sm mb-8">Vérifiez vos informations avant de soumettre votre dossier.</p>
              <div className="text-left bg-gray-50 rounded-xl p-5 mb-6 flex flex-col gap-3">
                {[
                  { label: "Société", val: form.companyName },
                  { label: "Pays", val: form.country },
                  { label: "Email", val: form.email },
                  { label: "Forme juridique", val: form.legalForm },
                  { label: "Représentant", val: `${form.legalRepName} (${form.legalRepTitle})` },
                  { label: "Secteurs", val: form.sectorIds.map((id) => sectors.find((s) => s.id === id)?.name).filter(Boolean).join(", ") || "Aucun sélectionné" },
                  { label: "WhatsApp", val: form.whatsappNumber || "Non renseigné" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-start gap-4">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide shrink-0">{r.label}</span>
                    <span className="text-sm text-[#2B1507] text-right">{r.val || "—"}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl mb-6 text-left" style={{ background: "#F9F7F4" }}>
                <input type="checkbox" id="terms" checked={form.acceptTerms} onChange={(e) => set("acceptTerms", e.target.checked)} className="mt-0.5" />
                <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                  J'accepte les <a href="#" className="underline" style={{ color: "#D4581C" }}>Conditions générales d'utilisation</a> et la <a href="#" className="underline" style={{ color: "#D4581C" }}>Politique de confidentialité</a> de Dolly Trade B2B. Je certifie que les informations fournies sont exactes.
                </label>
              </div>
              <button onClick={submit} className="btn-primary w-full justify-center text-base py-3.5">
                Soumettre mon inscription <ChevronRight className="h-5 w-5" />
              </button>
              <div className="mt-4 text-xs text-gray-400">
                Délai de vérification : 24-48h ouvrées · Notification par email et WhatsApp
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">
                <ChevronLeft className="h-4 w-4" /> Précédent
              </button>
            ) : (
              <Link to="/login" className="btn-secondary">Déjà inscrit?</Link>
            )}
            {step < STEPS.length && (
              <button onClick={next} className="btn-primary">
                Suivant <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
