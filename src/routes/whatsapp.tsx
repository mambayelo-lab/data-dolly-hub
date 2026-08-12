import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Bell, ShoppingCart, Zap, CheckCircle, Phone, ArrowRight, Globe } from "lucide-react";
import { PageLayout } from "../components/B2BLayout";
import { campaigns, getCurrentTier, getNextTier, formatPrice, buildWhatsAppLink } from "@/data/marketplace";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({ meta: [{ title: "WhatsApp B2B — WAOUMAS" }] }),
  component: WhatsAppPage,
});

function WhatsAppPage() {
  const demoMessages = [
    { from: "supplier", text: "🏭 Nouvelle campagne lancée!\nGants chirurgicaux stériles EN455\n📦 Palier actuel: Bronze (-15%)\n💰 Prix: 0,072$/unité\n📊 2 847 acheteurs déjà inscrits\n⏰ Fermeture dans 14 jours" },
    { from: "client", text: "Je souhaite rejoindre la campagne. Quantité: 50 000 unités" },
    { from: "supplier", text: "✅ Inscription confirmée!\n\nRécapitulatif:\n• Produit: Gants EN455 stériles\n• Qté: 50 000 unités\n• Prix unitaire: 0,072$ (palier Bronze)\n• Total estimé: 3 600$\n\n🎯 Vous contribuez à atteindre le palier Silver (-27%)\nEncore 152 153 unités pour débloquer le prix réduit!\n\nVotre référence: CAM-2024-GLV-007" },
    { from: "client", text: "Quand sera-t-il confirmé que le palier Silver est atteint?" },
    { from: "supplier", text: "🔔 ALERTE PALIER ATTEINT!\n\n🥈 Palier SILVER débloqué!\n\nBonne nouvelle pour tous les participants:\n💰 Nouveau prix: 0,062$/unité (au lieu de 0,072$)\n💵 Votre économie: 500$ sur votre commande\n\nLa campagne continue!\n📊 Prochain palier OR dans 847 000 unités supplémentaires" },
  ];

  const automations = [
    { icon: "🚀", title: "Lancement de campagne", desc: "Notification automatique à tous vos clients abonnés lors du lancement d'une nouvelle campagne" },
    { icon: "🎯", title: "Palier atteint", desc: "Alerte instantanée quand un nouveau palier de prix est débloqué pour tous les participants" },
    { icon: "⏰", title: "Rappels J-7 et J-1", desc: "Rappels automatiques avant la fermeture d'une campagne pour maximiser la participation" },
    { icon: "✅", title: "Confirmation de commande", desc: "Confirmation immédiate avec récapitulatif et référence unique pour chaque inscription" },
    { icon: "📦", title: "Mise à jour livraison", desc: "Suivi de livraison en temps réel avec statuts automatiques depuis l'entrepôt" },
    { icon: "💳", title: "Facture et paiement", desc: "Envoi automatique des factures proforma et confirmation des paiements reçus" },
  ];

  const steps = [
    { num: "01", title: "Créez votre compte fournisseur", desc: "Enregistrez votre entreprise avec vos données légales et votre numéro WhatsApp Business", icon: "🏭" },
    { num: "02", title: "Configurez votre WhatsApp Business", desc: "Connectez votre API WhatsApp Business ou utilisez notre numéro partagé pour commencer immédiatement", icon: "📱" },
    { num: "03", title: "Lancez votre première campagne", desc: "Créez une campagne d'achats groupés avec vos paliers de prix et regardez les acheteurs arriver", icon: "🚀" },
    { num: "04", title: "Gérez tout depuis le tableau de bord", desc: "Suivez en temps réel les inscriptions, paliers atteints et expédiez en un clic", icon: "📊" },
  ];

  const countries = ["🇫🇷 France", "🇩🇪 Allemagne", "🇪🇸 Espagne", "🇬🇧 Royaume-Uni", "🇮🇹 Italie", "🇵🇱 Pologne", "🇧🇷 Brésil", "🇦🇪 Émirats", "🇸🇦 Arabie Saoudite", "🇮🇳 Inde", "🇨🇳 Chine", "🇹🇷 Turquie"];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-20 text-white">
        <div className="kente-bg absolute inset-0 opacity-10" />
        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: "rgba(37,211,102,0.2)", color: "#25D366", border: "1px solid rgba(37,211,102,0.4)" }}>
            <MessageCircle className="h-4 w-4" />
            WhatsApp Business intégré nativement
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Vos campagnes B2B
            <br />
            <span style={{ color: "#25D366" }}>directement sur WhatsApp</span>
          </h1>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            WhatsApp est le canal d'affaires numéro 1 dans le monde. WAOUMAS intègre nativement WhatsApp pour gérer vos campagnes d'achats groupés B2B sans friction.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register/supplier" className="btn-whatsapp text-base px-6 py-3">
              <MessageCircle className="h-5 w-5" />
              Connecter WhatsApp
            </Link>
            <Link to="/campaigns" className="btn-secondary text-base px-6 py-3">
              Voir les campagnes
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats WhatsApp Africa */}
      <section className="py-12" style={{ background: "#FAF6EF" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: "2,8 Mds", label: "Utilisateurs WhatsApp dans le monde", icon: "🌍" },
              { val: "98%", label: "Taux d'ouverture des messages WhatsApp", icon: "📬" },
              { val: "180+ pays", label: "Pays où nos fournisseurs livrent", icon: "🌍" },
              { val: "< 2 min", label: "Temps de réponse moyen de nos fournisseurs", icon: "⚡" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-display text-2xl font-bold text-[#2B1507] mb-1">{s.val}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live chat demo */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#2B1507] mb-4">
                Une expérience d'achat
                <br />
                <span style={{ color: "#25D366" }}>100% conversationnelle</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Vos clients commandent, reçoivent les alertes paliers et suivent leurs livraisons sans jamais quitter WhatsApp. Zéro friction, zéro formation nécessaire.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Bell className="h-4 w-4" />, text: "Alertes instantanées quand un palier est atteint" },
                  { icon: <ShoppingCart className="h-4 w-4" />, text: "Commande confirmée en 30 secondes" },
                  { icon: <Zap className="h-4 w-4" />, text: "Taux d'ouverture 98% vs 22% pour l'email" },
                  { icon: <Globe className="h-4 w-4" />, text: "Disponible dans 180+ pays à travers le monde" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(37,211,102,0.1)", color: "#25D366" }}>
                      {item.icon}
                    </div>
                    <span className="text-gray-700 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/register/client" className="btn-whatsapp">
                  <MessageCircle className="h-4 w-4" />
                  Recevoir les alertes WhatsApp
                </Link>
              </div>
            </div>

            {/* WhatsApp chat mockup */}
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 max-w-sm mx-auto" style={{ background: "#ECE5DD" }}>
              {/* Chat header */}
              <div className="px-4 py-3 flex items-center gap-3" style={{ background: "#25D366" }}>
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center text-white font-bold text-sm">DT</div>
                <div>
                  <div className="font-semibold text-white text-sm">WAOUMAS</div>
                  <div className="text-green-100 text-xs">● En ligne</div>
                </div>
                <Phone className="h-4 w-4 text-white ml-auto" />
              </div>

              {/* Messages */}
              <div className="p-4 flex flex-col gap-3 max-h-96 overflow-y-auto">
                {demoMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === "client" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line shadow-sm
                      ${msg.from === "client"
                        ? "text-gray-800"
                        : "text-gray-800"
                      }`}
                      style={{
                        background: msg.from === "client" ? "#DCF8C6" : "white",
                        borderRadius: msg.from === "client" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input bar */}
              <div className="px-4 py-3 flex items-center gap-2 bg-white border-t">
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-xs text-gray-400">Écrivez un message...</div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#25D366" }}>
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automations */}
      <section className="py-16" style={{ background: "#FAF6EF" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#2B1507] mb-3">Automatisations incluses</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Toutes ces notifications sont envoyées automatiquement — aucune action manuelle requise de votre part</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automations.map((a) => (
              <div key={a.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{a.icon}</div>
                <div className="font-semibold text-[#2B1507] mb-2">{a.title}</div>
                <div className="text-sm text-gray-500 leading-relaxed">{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to set up */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#2B1507] mb-3">Démarrez en 4 étapes</h2>
            <p className="text-gray-600">Configuration WhatsApp Business complète en moins de 15 minutes</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-green-200 transition-colors">
                <div className="font-display text-4xl font-bold shrink-0" style={{ color: "rgba(37,211,102,0.3)" }}>{step.num}</div>
                <div>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <div className="font-semibold text-[#2B1507] mb-1">{step.title}</div>
                  <div className="text-sm text-gray-500 leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #2B1507 0%, #3D1E0C 60%, #15803D 100%)" }}>
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="kente-bg absolute inset-0 opacity-5 pointer-events-none" />
          <h2 className="font-display text-3xl font-bold text-white mb-3">Présent dans le monde entier</h2>
          <p className="text-white/60 mb-10">Vos clients peuvent recevoir des alertes WhatsApp depuis n'importe quel pays</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {countries.map((c) => (
              <span key={c} className="px-4 py-2 rounded-full text-sm font-medium text-white"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}>
                {c}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "rgba(37,211,102,0.2)", color: "#25D366", border: "1px solid rgba(37,211,102,0.3)" }}>
              + 168 pays supplémentaires
            </span>
          </div>
        </div>
      </section>

      {/* ── Campagnes disponibles via WhatsApp ── */}
      <section className="px-6 py-10" style={{ background: "#FAF6EF" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#25D366", letterSpacing: "0.12em" }}>
                Disponibles maintenant
              </div>
              <h2 className="font-display text-[20px] font-bold text-[#2B1507]">Rejoindre une campagne via WhatsApp</h2>
              <p className="text-[13px] text-gray-500 mt-1">Cliquez sur "Commander via WhatsApp" — on vous guide en moins de 2 minutes.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {campaigns.filter(c => c.status === "active").map((c) => {
              const tier = getCurrentTier(c);
              const next = getNextTier(c);
              const waLink = buildWhatsAppLink(c);
              return (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl overflow-hidden"
                  style={{ border: "1px solid #E9E1D3", boxShadow: "0 2px 12px rgba(43,21,7,0.06)" }}
                >
                  <div className="p-4 pb-3">
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                        style={{ background: `${c.imageColor}15` }}
                      >
                        {c.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold text-[#2B1507] line-clamp-1">{c.title}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{c.participantCount} participants</div>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-1 mb-1">
                      <span className="text-[20px] font-bold" style={{ color: "#D4581C" }}>
                        {formatPrice(tier.pricePerUnit, tier.currency)}
                      </span>
                      <span className="text-[11px] text-gray-400">/{c.unit}</span>
                    </div>
                    {next && (
                      <div className="text-[11px] text-green-600 font-semibold">
                        Prochain palier : {formatPrice(next.pricePerUnit, next.currency)} (−{next.discount}%)
                      </div>
                    )}
                  </div>

                  <div className="px-4 pb-4 flex flex-col gap-2">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold text-white"
                      style={{ background: "#25D366", boxShadow: "0 3px 10px rgba(37,211,102,0.30)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      Commander via WhatsApp
                    </a>
                    <Link
                      to="/campaigns/$id"
                      params={{ id: c.id }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[12px] font-semibold text-gray-600"
                      style={{ background: "#FAF6EF" }}
                    >
                      Voir la campagne
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="mt-6 p-4 rounded-xl flex items-center gap-3"
            style={{ background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.15)" }}
          >
            <span className="text-lg">💬</span>
            <p className="text-[12px] text-green-800">
              <strong>Comment ça marche :</strong> Envoyez votre numéro de commande sur WhatsApp → notre équipe confirme votre réservation → vous recevez un lien de paiement sécurisé. Aucun achat individuel — uniquement du groupé.
            </p>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#2B1507] mb-3">Options d'intégration WhatsApp</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Starter",
                price: "Gratuit",
                features: ["Numéro WhatsApp partagé WAOUMAS", "200 messages/mois", "Notifications campagnes", "Templates pré-approuvés"],
                cta: "Commencer gratuitement",
                highlighted: false,
              },
              {
                name: "Business",
                price: "49€/mois",
                features: ["Votre propre numéro WhatsApp Business", "5 000 messages/mois", "Chatbot de qualification", "Analytics détaillés", "Templates personnalisés"],
                cta: "Essai 14 jours gratuit",
                highlighted: true,
              },
              {
                name: "Enterprise",
                price: "Sur devis",
                features: ["Volume illimité", "Intégration API complète", "Numéros multi-pays", "SLA 99,9% garanti", "Account manager dédié"],
                cta: "Contacter les ventes",
                highlighted: false,
              },
            ].map((plan) => (
              <div key={plan.name} className={`rounded-2xl p-6 ${plan.highlighted ? "text-white shadow-xl" : "border border-gray-100"}`}
                style={plan.highlighted ? { background: "linear-gradient(135deg, #15803D, #25D366)" } : {}}>
                <div className={`text-sm font-semibold mb-1 ${plan.highlighted ? "text-green-200" : "text-gray-500"}`}>{plan.name}</div>
                <div className={`font-display text-2xl font-bold mb-4 ${plan.highlighted ? "text-white" : "text-[#2B1507]"}`}>{plan.price}</div>
                <div className="flex flex-col gap-2 mb-6">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-2">
                      <CheckCircle className={`h-4 w-4 shrink-0 mt-0.5 ${plan.highlighted ? "text-green-200" : "text-green-500"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-white/90" : "text-gray-600"}`}>{f}</span>
                    </div>
                  ))}
                </div>
                <button className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-white text-green-700 hover:bg-green-50"
                    : "border border-green-500 text-green-700 hover:bg-green-50"
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: "#FAF6EF" }}>
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="text-5xl mb-4">📱</div>
          <h2 className="font-display text-3xl font-bold text-[#2B1507] mb-4">Prêt à commercer sur WhatsApp?</h2>
          <p className="text-gray-600 mb-8">Rejoignez plus de 1 240 fournisseurs qui utilisent déjà WAOUMAS pour leurs campagnes d'achats groupés</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register/supplier" className="btn-whatsapp text-base px-6 py-3">
              <MessageCircle className="h-5 w-5" />
              Je suis fournisseur
            </Link>
            <Link to="/register/client" className="btn-primary text-base px-6 py-3">
              Je suis acheteur
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
