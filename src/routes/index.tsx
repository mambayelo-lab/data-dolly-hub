import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Globe, Zap, TrendingDown, Users, CheckCircle, Star, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/B2BLayout";
import {
  sectors, campaigns, suppliers,
  getCurrentTier, getCampaignProgress, formatQty, formatPrice,
  buildWhatsAppLink, getSupplier,
} from "@/data/marketplace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dolly Trade B2B — Marketplace Internationale Achats Groupés Afrique" },
      { name: "description", content: "Plateforme B2B spécialisée achats groupés via WhatsApp. Fournisseurs mondiaux, acheteurs africains. Santé, mécanique, agro-alimentaire et plus." },
    ],
  }),
  component: HomePage,
});

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const platformStats = [
  { value: "1 240+", label: "Fournisseurs vérifiés", icon: Shield },
  { value: "12 000+", label: "Références produits", icon: Globe },
  { value: "64", label: "Campagnes actives", icon: Zap },
  { value: "45", label: "Pays acheteurs", icon: Users },
];

const howItWorks = [
  {
    step: "01",
    icon: "🔍",
    title: "Parcourez les campagnes",
    desc: "Explorez nos campagnes d'achats groupés actives par secteur. Chaque campagne propose des paliers de prix dégressifs.",
    color: "#C14B1D",
  },
  {
    step: "02",
    icon: "📱",
    title: "Rejoignez via WhatsApp",
    desc: "Commandez directement depuis WhatsApp ou notre plateforme. Recevez des notifications en temps réel sur votre téléphone.",
    color: "#1B5E3E",
  },
  {
    step: "03",
    icon: "💰",
    title: "Plus on est nombreux, moins on paie",
    desc: "Quand les paliers sont atteints, le prix baisse pour tous les participants. Jusqu'à -42% sur le prix unitaire.",
    color: "#E8A820",
  },
  {
    step: "04",
    icon: "🚢",
    title: "Livraison CIF dans toute l'Afrique",
    desc: "Nous gérons la logistique internationale. Livraison CIF vers 32 ports africains. Dédouanement assisté disponible.",
    color: "#1E4D8C",
  },
];

const testimonials = [
  {
    name: "Dr. Fatoumata Kouyaté",
    role: "Directrice, Clinique Santé Plus",
    country: "🇬🇳 Conakry, Guinée",
    text: "Grâce à Dolly Trade, on a économisé 38% sur nos consommables médicaux en rejoignant une campagne groupée. La communication WhatsApp est parfaite.",
    rating: 5,
  },
  {
    name: "Moussa Traoré",
    role: "Gérant, Garage Sahel Auto",
    country: "🇲🇱 Bamako, Mali",
    text: "Je commande mes pièces détachées directement depuis mon téléphone via WhatsApp. Livraison en 3 semaines à Bamako, qualité irréprochable.",
    rating: 5,
  },
  {
    name: "Aïcha Diallo",
    role: "PDG, Minoterie du Sahel",
    country: "🇸🇳 Dakar, Sénégal",
    text: "Nous avons consolidé nos achats de grains avec 12 autres minoteries africaines. Économie de 22% par rapport aux prix du marché habituel.",
    rating: 5,
  },
];

const featuredCampaigns = campaigns.filter((c) => c.status === "active").slice(0, 3);
const featuredSectors = sectors.filter((s) => s.featured);

export function TierBadge({ label, discount, active }: { label: string; discount: number; active: boolean }) {
  if (active) {
    return (
      <span className="tier-badge-active px-2.5 py-1 rounded-full text-[11px] font-bold">
        {label} — {discount > 0 ? `-${discount}%` : "Prix base"}
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-500">
      {label}
    </span>
  );
}

function CampaignCard({ campaign }: { campaign: (typeof campaigns)[0] }) {
  const supplier = getSupplier(campaign.supplierId);
  const currentTier = getCurrentTier(campaign);
  const progress = getCampaignProgress(campaign);
  const daysLeft = Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / 86_400_000);

  return (
    <div className="campaign-card">
      {/* Header band */}
      <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${campaign.imageColor}, ${campaign.imageColor}80)` }} />

      <div className="p-5">
        {/* Meta */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {campaign.status === "active" && (
              <span className="badge badge-terra">🔴 En cours</span>
            )}
            {campaign.whatsappEnabled && (
              <span className="badge badge-green flex items-center gap-1">
                <WhatsAppIcon size={11} /> WhatsApp
              </span>
            )}
            <span className="badge badge-blue">{daysLeft}j restants</span>
          </div>
          <div className="text-2xl shrink-0">{campaign.image}</div>
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[#1A1630] text-base leading-tight mb-1 line-clamp-2">
          {campaign.title}
        </h3>
        <div className="text-xs text-gray-500 mb-4">
          {supplier?.flag} {supplier?.name} · {supplier?.country}
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs text-gray-600">{formatQty(campaign.currentQty, campaign.unit)}</span>
            <span className="text-xs font-semibold text-gray-900">{progress.toFixed(0)}% atteint</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-right text-[10px] text-gray-400 mt-1">
            Objectif: {formatQty(campaign.targetQty, campaign.unit)}
          </div>
        </div>

        {/* Current price */}
        <div className="flex items-center justify-between mb-4 p-3 rounded-xl" style={{ background: `${campaign.imageColor}10`, border: `1px solid ${campaign.imageColor}25` }}>
          <div>
            <div className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">Prix actuel</div>
            <div className="font-bold text-lg" style={{ color: campaign.imageColor }}>
              {formatPrice(currentTier.pricePerUnit, currentTier.currency)}
              <span className="text-xs font-normal text-gray-500 ml-1">/{campaign.unit}</span>
            </div>
          </div>
          {currentTier.discount > 0 && (
            <div className="text-right">
              <div className="text-[10px] text-gray-500">Économie</div>
              <div className="font-bold text-lg text-green-600">-{currentTier.discount}%</div>
            </div>
          )}
        </div>

        {/* Price tiers */}
        <div className="flex gap-1.5 flex-wrap mb-4">
          {campaign.priceTiers.map((tier) => {
            const isCurrent = tier === currentTier;
            return (
              <TierBadge key={tier.label} label={tier.label} discount={tier.discount} active={isCurrent} />
            );
          })}
        </div>

        {/* MOQ + participants */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Min. commande: <strong className="text-gray-800">{campaign.moq.toLocaleString("fr-FR")} {campaign.unit}</strong></span>
          <span><strong className="text-gray-800">{campaign.participantCount}</strong> participants</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to="/campaigns/$id"
            params={{ id: campaign.id }}
            className="flex-1 btn-primary text-center text-sm justify-center"
            style={{ padding: "10px 16px", fontSize: 13 }}
          >
            Voir la campagne <ChevronRight className="h-3.5 w-3.5" />
          </Link>
          {campaign.whatsappEnabled && (
            <a
              href={buildWhatsAppLink(campaign)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm"
              style={{ padding: "10px 14px" }}
              aria-label="Commander via WhatsApp"
            >
              <WhatsAppIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <PageLayout>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Kente pattern overlay */}
        <div className="kente-bg absolute inset-0 opacity-[0.07]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-24 lg:pt-28 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-semibold mb-6 stat-pill text-white/80">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                64 campagnes actives maintenant
              </div>

              <h1 className="font-display text-4xl lg:text-6xl text-white leading-[1.05] mb-6">
                Le B2B mondial
                <br />
                <span style={{ background: "linear-gradient(90deg, #E8A820, #F5C842)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  pensé pour l'Afrique
                </span>
              </h1>

              <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
                Achats groupés internationaux avec rabais dégressifs. Fournisseurs du monde entier, acheteurs professionnels africains. Commandez via <strong className="text-white">WhatsApp</strong> ou notre plateforme.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/campaigns" className="btn-primary">
                  Voir les campagnes <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="/whatsapp" className="btn-whatsapp">
                  <WhatsAppIcon size={18} /> Commander via WhatsApp
                </a>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-4">
                {platformStats.map((stat) => (
                  <div key={stat.label} className="stat-pill text-white text-sm">
                    <span className="font-bold text-white">{stat.value}</span>
                    <span className="text-white/55 ml-1.5">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Live campaign preview */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-4 -right-4 h-72 w-72 rounded-full opacity-20 blur-3xl"
                style={{ background: "radial-gradient(#E8A820, transparent)" }} />
              <div className="campaign-card" style={{ position: "relative", zIndex: 1 }}>
                <div className="h-2" style={{ background: "linear-gradient(90deg, #C14B1D, #E8A820)" }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge badge-terra text-[11px]">🔴 Campagne Live</span>
                    <span className="badge badge-green text-[11px] flex items-center gap-1"><WhatsAppIcon size={10} />WhatsApp</span>
                  </div>
                  <div className="text-4xl mb-3">🧤</div>
                  <div className="font-display font-bold text-[#1A1630] text-base mb-1 leading-snug">
                    Gants chirurgicaux latex stériles — Hôpitaux Africains Q3
                  </div>
                  <div className="text-xs text-gray-500 mb-4">🇩🇪 MedEquip Global · Allemagne</div>
                  <div className="progress-track mb-2">
                    <div className="progress-fill" style={{ width: "77%" }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mb-4">
                    <span>3 850 000 paires</span>
                    <span className="font-semibold text-gray-800">77% atteint</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[{ label: "Starter", p: "$0.085", disc: "0%", active: false }, { label: "Bronze", p: "$0.072", disc: "-15%", active: false }, { label: "Silver", p: "$0.062", disc: "-27%", active: false }, { label: "Gold ✦", p: "$0.049", disc: "-42%", active: true }].map((t) => (
                      <div key={t.label} className="p-2.5 rounded-xl text-center" style={t.active ? { background: "linear-gradient(135deg, #C14B1D, #E05520)", color: "white" } : { background: "#F4F1EC" }}>
                        <div className="text-[10px] font-semibold mb-0.5">{t.label}</div>
                        <div className="font-bold text-sm">{t.p}</div>
                        <div className="text-[10px]" style={t.active ? { color: "rgba(255,255,255,0.8)" } : { color: "#C14B1D" }}>{t.disc}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <div className="flex-1 text-center py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #C14B1D, #E05520)" }}>
                      Rejoindre
                    </div>
                    <div className="py-2.5 px-3 rounded-xl text-sm font-bold text-white" style={{ background: "#25D366" }}>
                      <WhatsAppIcon size={16} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KENTE DIVIDER ─────────────────────────────── */}
      <div className="kente-border" />

      {/* ── COMMENT ÇA MARCHE ─────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C14B1D" }}>Notre modèle</div>
            <h2 className="font-display text-3xl lg:text-4xl" style={{ color: "#1A1630" }}>
              Les achats groupés, ça marche comment ?
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Plus il y a d'acheteurs sur une campagne, plus le prix baisse pour tout le monde.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative">
                <div className="kpi-tile card-shadow text-center p-6" style={{ borderTop: `3px solid ${step.color}` }}>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-[10px] font-bold tracking-widest mb-2" style={{ color: step.color }}>
                    ÉTAPE {step.step}
                  </div>
                  <h3 className="font-display font-bold text-[#1A1630] text-base mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
                {step.step !== "04" && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 h-6 w-6 rounded-full items-center justify-center text-white text-xs"
                    style={{ background: "#1A1630" }}>
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PALIERS EXPLICATION ───────────────────────── */}
      <section className="py-20 px-6 lg:px-8 adinkra-bg" style={{ background: "#F8F2E8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#1B5E3E" }}>Paliers dégressifs</div>
              <h2 className="font-display text-3xl lg:text-4xl mb-4" style={{ color: "#1A1630" }}>
                Jusqu'à <span style={{ color: "#C14B1D" }}>-42%</span> sur les prix unitaires
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nos campagnes fonctionnent par paliers. Chaque fois qu'un seuil de quantité est atteint par l'ensemble des participants, le prix baisse automatiquement pour tous. Rejoignez tôt, bénéficiez du meilleur prix final.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { tier: "Starter", qty: "100K – 499K unités", price: "$0.085", discount: "Prix de base", color: "#6B7280", bg: "#F9FAFB" },
                  { tier: "Bronze", qty: "500K – 999K unités", price: "$0.072", discount: "-15%", color: "#92400E", bg: "#FFFBEB" },
                  { tier: "Silver", qty: "1M – 2,9M unités", price: "$0.062", discount: "-27%", color: "#374151", bg: "#F9FAFB" },
                  { tier: "Gold ✦", qty: "3M+ unités", price: "$0.049", discount: "-42%", color: "white", bg: "linear-gradient(135deg, #C14B1D, #E05520)" },
                ].map((t) => (
                  <div key={t.tier} className="flex items-center justify-between p-4 rounded-xl"
                    style={{ background: t.bg, border: t.tier === "Gold ✦" ? "none" : "1px solid rgba(0,0,0,0.06)" }}>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-sm" style={{ color: t.tier === "Gold ✦" ? "white" : t.color }}>
                        {t.tier}
                      </div>
                      <div className="text-sm" style={{ color: t.tier === "Gold ✦" ? "rgba(255,255,255,0.75)" : "#6B7280" }}>
                        {t.qty}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold" style={{ color: t.tier === "Gold ✦" ? "white" : "#1A1630" }}>
                        {t.price}
                      </div>
                      <div className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{
                          background: t.tier === "Gold ✦" ? "rgba(255,255,255,0.2)" : "rgba(193,75,29,0.1)",
                          color: t.tier === "Gold ✦" ? "white" : "#C14B1D",
                        }}>
                        {t.discount}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="kpi-tile card-shadow-lg p-6 rounded-2xl" style={{ background: "white" }}>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "#C14B1D" }}>
                  📊 Exemple concret
                </div>
                <h3 className="font-display font-bold text-[#1A1630] text-lg mb-1">
                  Campagne gants chirurgicaux
                </h3>
                <p className="text-sm text-gray-500 mb-5">Si vous commandez 500 000 paires :</p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Prix marché standard", val: "$0.12", cross: true },
                    { label: "Palier Bronze (-15%)", val: "$0.072", cross: false },
                    { label: "Palier Gold si objectif atteint (-42%)", val: "$0.049", cross: false, highlight: true },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                      <span className={`text-sm ${r.highlight ? "font-semibold text-[#1A1630]" : "text-gray-500"}`}>
                        {r.label}
                      </span>
                      <span className={`font-bold text-base ${r.cross ? "line-through text-gray-400" : r.highlight ? "text-green-600" : "text-[#1A1630]"}`}>
                        {r.val}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(27,94,62,0.08)" }}>
                  <div className="text-xs text-green-800 font-semibold">
                    ✅ Économie potentielle sur 500K paires : <strong>+$35 500 USD</strong>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl flex gap-3 items-start" style={{ background: "#1A1630" }}>
                <div className="text-2xl shrink-0">📱</div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">Notification WhatsApp automatique</div>
                  <div className="text-white/60 text-xs">Vous êtes notifié en temps réel quand un nouveau palier est atteint. Plus besoin de revenir sur le site.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAMPAGNES EN COURS ────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C14B1D" }}>Maintenant</div>
              <h2 className="font-display text-3xl lg:text-4xl" style={{ color: "#1A1630" }}>
                Campagnes en cours
              </h2>
              <p className="text-gray-500 mt-2">Rejoignez une commande groupée et bénéficiez de prix dégressifs</p>
            </div>
            <Link to="/campaigns" className="btn-secondary hidden sm:flex">
              Toutes les campagnes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampaigns.map((c) => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/campaigns" className="btn-secondary">
              Voir toutes les campagnes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTEURS ──────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: "#F8F2E8" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#E8A820" }}>Nos marchés</div>
            <h2 className="font-display text-3xl lg:text-4xl" style={{ color: "#1A1630" }}>
              6 secteurs B2B à haute valeur
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredSectors.map((sector) => (
              <Link key={sector.id} to="/products" className="sector-card block" style={{ background: sector.bgGradient }}>
                <div className="relative p-6 z-10">
                  <div className="text-4xl mb-4">{sector.icon}</div>
                  <h3 className="font-display text-white font-bold text-xl mb-1">{sector.name}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{sector.description}</p>
                  <div className="flex gap-3 text-white/80 text-xs">
                    <span className="badge" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
                      {sector.stats.suppliers} fournisseurs
                    </span>
                    <span className="badge" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
                      {sector.stats.campaigns} campagnes
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link to="/products" className="btn-secondary">
              Tous les secteurs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHATSAPP ──────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: "#1A1630" }}>
        <div className="kente-bg absolute w-full opacity-5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4 text-green-400">WhatsApp Business</div>
              <h2 className="font-display text-3xl lg:text-4xl text-white mb-4">
                Commandez directement
                <br />
                <span style={{ color: "#25D366" }}>depuis WhatsApp</span>
              </h2>
              <p className="text-white/65 mb-8 leading-relaxed">
                Pas besoin d'ordinateur. Parcourez les campagnes, rejoignez un achat groupé et suivez votre commande directement depuis votre téléphone via WhatsApp. Disponible 24h/24 dans 180+ pays.
              </p>
              <div className="flex flex-col gap-3 mb-8">
                {[
                  "Rejoindre une campagne groupée en 3 messages",
                  "Recevoir les alertes de nouveaux paliers en temps réel",
                  "Suivre l'avancement de votre commande",
                  "Obtenir vos documents export (facture, BL) sur WhatsApp",
                  "Chat direct avec le fournisseur vérifié",
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-white/80 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                    {feat}
                  </div>
                ))}
              </div>
              <a href="/whatsapp" className="btn-whatsapp">
                <WhatsAppIcon size={20} /> Démarrer sur WhatsApp
              </a>
            </div>

            {/* WhatsApp preview */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-72 rounded-2xl overflow-hidden card-shadow-lg" style={{ background: "#ECE5DD" }}>
                {/* Chat header */}
                <div className="px-4 py-3 flex items-center gap-3" style={{ background: "#075E54" }}>
                  <div className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                    style={{ background: "linear-gradient(135deg, #C14B1D, #E8A820)" }}>D</div>
                  <div>
                    <div className="text-white font-semibold text-sm">Dolly Trade B2B</div>
                    <div className="text-green-300 text-[11px]">✓ Compte Business vérifié</div>
                  </div>
                </div>

                {/* Messages */}
                <div className="p-4 flex flex-col gap-3">
                  {[
                    { from: "bot", text: "👋 Bonjour! Bienvenue sur Dolly Trade B2B. Je suis votre assistant campagnes. Tapez:\n1️⃣ Voir campagnes actives\n2️⃣ Rejoindre une campagne\n3️⃣ Mes commandes" },
                    { from: "user", text: "1" },
                    { from: "bot", text: "🔥 3 campagnes actives maintenant:\n\n1. 🧤 Gants chirurgicaux — 77% atteint — $0.062/paire actuel\n\n2. 🔧 Filtres diesel — 50% — $9.20/pièce\n\n3. 🌾 Sucre roux — 85% — $248/tonne\n\nTapez le numéro pour rejoindre!" },
                  ].map((msg, i) => (
                    <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-[85%] px-3 py-2 rounded-xl text-[12px] leading-relaxed whitespace-pre-line"
                        style={{
                          background: msg.from === "user" ? "#DCF8C6" : "white",
                          borderRadius: msg.from === "user" ? "12px 12px 0 12px" : "12px 12px 12px 0",
                        }}>
                        {msg.text}
                        <div className="text-right text-[9px] text-gray-400 mt-1">
                          {msg.from === "user" ? "14:32 ✓✓" : "14:31"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAUX ──────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8" style={{ background: "white" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#C14B1D" }}>Ils nous font confiance</div>
            <h2 className="font-display text-3xl lg:text-4xl" style={{ color: "#1A1630" }}>
              Ce que disent nos clients
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="kpi-tile card-shadow p-6 rounded-2xl">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" style={{ color: "#E8A820" }} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, #1A1630, #C14B1D)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-[#1A1630]">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{t.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA DOUBLE ─────────────────────────────────── */}
      <section className="py-20 px-6 lg:px-8 adinkra-bg" style={{ background: "#F8F2E8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Supplier CTA */}
            <div className="rounded-2xl p-8 text-white relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1A1630 0%, #2D2050 100%)" }}>
              <div className="kente-bg absolute inset-0 opacity-10" />
              <div className="relative">
                <div className="text-4xl mb-4">🏭</div>
                <h3 className="font-display text-2xl font-bold mb-2">Vous êtes fournisseur ?</h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  Lancez vos campagnes d'achats groupés et accédez à des milliers d'acheteurs professionnels en Afrique et dans le monde.
                </p>
                <div className="flex flex-col gap-2 mb-6 text-sm text-white/80">
                  {["Auto-inscription en 15 minutes", "Publication catalogue illimitée", "Tableau de bord campagnes avancé", "Intégration WhatsApp Business"].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/register/supplier" className="btn-gold inline-flex">
                  Créer mon espace fournisseur <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Client CTA */}
            <div className="rounded-2xl p-8 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1B5E3E 0%, #0D3B22 100%)" }}>
              <div className="kente-bg absolute inset-0 opacity-10" />
              <div className="relative">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="font-display text-2xl font-bold text-white mb-2">Vous êtes acheteur B2B ?</h3>
                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                  Inscrivez-vous gratuitement et rejoignez des campagnes d'achats groupés pour réduire vos coûts d'approvisionnement jusqu'à 42%.
                </p>
                <div className="flex flex-col gap-2 mb-6 text-sm text-white/80">
                  {["Inscription Pro gratuite", "Accès à toutes les campagnes", "Notification WhatsApp en temps réel", "Documents export (facture, BL, CO)"].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle className="h-3.5 w-3.5 text-green-300 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link to="/register/client" className="btn-whatsapp inline-flex">
                  <WhatsAppIcon size={18} /> S'inscrire acheteur
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
