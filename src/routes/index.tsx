import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Shield, Lock, TrendingDown, Users, CheckCircle, Zap, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/B2BLayout";
import { campaigns, sectors, getCurrentTier, getCampaignProgress, formatQty, formatPrice, getSupplier } from "@/data/marketplace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dolly Trade B2B — Achats groupés inter-entreprises" },
      { name: "description", content: "Rejoignez des campagnes d'achats groupés B2B. Plus vous êtes nombreux, moins vous payez. Paliers dégressifs jusqu'à -42%. Paiement sécurisé par escrow." },
    ],
  }),
  component: HomePage,
});

const TIER_COLORS = [
  { name: "Starter", color: "#6B7280", bg: "#F9FAFB", border: "#E5E7EB" },
  { name: "Bronze", color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  { name: "Silver", color: "#6B7280", bg: "#F8FAFC", border: "#CBD5E1" },
  { name: "Or", color: "#C14B1D", bg: "#FFF7ED", border: "#FED7AA" },
];

function TierProgressDemo() {
  const c = campaigns[0];
  const progress = getCampaignProgress(c);
  const tiers = c.priceTiers;
  const currentTier = tiers[1]; // Bronze for demo
  const starter = tiers[0];

  return (
    <div className="bg-white rounded-2xl p-5 card-shadow border border-orange-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{c.image}</span>
          <div>
            <div className="font-semibold text-sm text-[#1A1630] line-clamp-1">{c.title}</div>
            <div className="text-xs text-gray-400">{c.unit}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Prix actuel</div>
          <div className="font-display text-lg font-bold" style={{ color: "#C14B1D" }}>
            {formatPrice(currentTier.pricePerUnit, currentTier.currency)}<span className="text-xs font-normal text-gray-400">/{c.unit}</span>
          </div>
        </div>
      </div>

      {/* Tier track */}
      <div className="flex gap-1 mb-3">
        {tiers.map((t, i) => {
          const isActive = i === 1;
          const isDone = i === 0;
          const tc = TIER_COLORS[i];
          return (
            <div key={t.label} className="flex-1 rounded-lg p-2 text-center border transition-all"
              style={{ borderColor: isActive ? "#C14B1D" : tc.border, background: isActive ? "#FFF7ED" : tc.bg, boxShadow: isActive ? "0 0 0 2px rgba(193,75,29,0.2)" : "none" }}>
              <div className="text-[9px] font-bold uppercase tracking-wide mb-0.5" style={{ color: isActive ? "#C14B1D" : tc.color }}>
                {isDone ? "✓ " : ""}{t.label}
              </div>
              <div className="text-xs font-bold" style={{ color: isActive ? "#C14B1D" : "#374151" }}>
                {formatPrice(t.pricePerUnit, t.currency)}
              </div>
              {t.discountPct > 0 && <div className="text-[9px] font-semibold" style={{ color: isActive ? "#C14B1D" : tc.color }}>-{t.discountPct}%</div>}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="progress-track mb-2">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        {tiers.map((t, i) => i > 0 && (
          <div key={i} className="absolute top-0 bottom-0 flex items-center" style={{ left: `${(t.minQty / c.priceTiers[c.priceTiers.length - 1].minQty) * 100}%` }}>
            <div className="w-px h-full bg-white/60" />
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-gray-400">
        <span>{formatQty(Math.round(c.currentQty))} inscrits</span>
        <span className="font-medium" style={{ color: "#C14B1D" }}>+{formatQty(tiers[2].minQty - c.currentQty)} → Silver (-{tiers[2].discountPct}%)</span>
      </div>

      <div className="mt-3 flex gap-2">
        <Link to="/campaigns/$id" params={{ id: c.id }} className="flex-1 text-center py-2 rounded-xl text-xs font-bold text-white"
          style={{ background: "linear-gradient(135deg, #C14B1D, #E8A820)" }}>
          Rejoindre la campagne →
        </Link>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <PageLayout>
      {/* ── HERO ── */}
      <section className="hero-gradient relative overflow-hidden pt-20 pb-16">
        <div className="kente-bg absolute inset-0 opacity-8" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6"
                style={{ background: "rgba(232,168,32,0.15)", color: "#E8A820", border: "1px solid rgba(232,168,32,0.3)" }}>
                <Zap className="h-3 w-3" /> Paiements sécurisés par escrow · Zéro risque
              </div>

              <h1 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                Achetez ensemble.
                <br />
                <span style={{ color: "#E8A820" }}>Payez beaucoup moins.</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Rejoignez des campagnes d'achats groupés B2B. Chaque participant fait baisser le prix pour tout le monde — jusqu'à <strong className="text-white">-42%</strong>. Vos fonds sont bloqués en escrow jusqu'à livraison.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/campaigns" className="btn-primary text-base px-5 py-3">
                  Voir les campagnes <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/register/supplier" className="btn-secondary text-base px-5 py-3">
                  Je suis fournisseur
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: <Lock className="h-3.5 w-3.5" />, text: "Escrow sécurisé" },
                  { icon: <Shield className="h-3.5 w-3.5" />, text: "Fournisseurs vérifiés" },
                  { icon: <TrendingDown className="h-3.5 w-3.5" />, text: "Jusqu'à -42%" },
                  { icon: <Users className="h-3.5 w-3.5" />, text: "1 240+ fournisseurs" },
                ].map((b) => (
                  <div key={b.text} className="flex items-center gap-1.5 text-xs text-white/60">
                    <span style={{ color: "#E8A820" }}>{b.icon}</span>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Live campaign demo */}
            <div className="lg:pl-8">
              <div className="text-xs text-white/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Campagne en direct
              </div>
              <TierProgressDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ── ESCROW FLOW ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-[#1A1630] mb-3">Comment ça fonctionne</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Un système simple et sécurisé : votre argent n'est jamais à risque</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5"
              style={{ background: "linear-gradient(90deg, #C14B1D, #E8A820, #C14B1D, #1B5E3E)" }} />

            {[
              {
                step: "01",
                icon: "🛒",
                title: "Rejoignez la campagne",
                desc: "Choisissez votre quantité (≥ MOQ) et confirmez votre inscription. Le prix affiché est votre prix garanti minimum.",
                color: "#C14B1D",
              },
              {
                step: "02",
                icon: "🔒",
                title: "Paiement en escrow",
                desc: "Votre paiement est bloqué sur un compte séquestre neutre. Ni le fournisseur ni Dolly Trade ne peut le toucher.",
                color: "#E8A820",
              },
              {
                step: "03",
                icon: "🎯",
                title: "Palier atteint",
                desc: "Quand la campagne clôt, si le palier est atteint, le prix baisse pour tous. Vous payez le meilleur prix possible.",
                color: "#C14B1D",
              },
              {
                step: "04",
                icon: "✅",
                title: "Livraison → Paiement",
                desc: "À la réception confirmée des marchandises, l'escrow se débloque et le fournisseur est payé. Zéro risque pour vous.",
                color: "#1B5E3E",
              },
            ].map((s) => (
              <div key={s.step} className="relative">
                <div className="w-20 h-20 rounded-2xl flex flex-col items-center justify-center mx-auto mb-4 relative z-10"
                  style={{ background: `${s.color}10`, border: `2px solid ${s.color}25` }}>
                  <div className="text-3xl">{s.icon}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: s.color }}>{s.step}</div>
                  <div className="font-display font-semibold text-[#1A1630] mb-2">{s.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-4 rounded-2xl flex items-center gap-3 max-w-lg mx-auto"
            style={{ background: "rgba(27,94,62,0.06)", border: "1px solid rgba(27,94,62,0.15)" }}>
            <Shield className="h-5 w-5 text-green-600 shrink-0" />
            <p className="text-sm text-green-700">
              Fonds libérés uniquement à la livraison confirmée. En cas de non-livraison, remboursement intégral automatique.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICE TIERS EXPLAINER ── */}
      <section className="py-16" style={{ background: "#F8F2E8" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#1A1630] mb-4">
                Les paliers : plus on est nombreux,
                <br />
                <span style={{ color: "#C14B1D" }}>plus le prix baisse</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Chaque campagne a 4 niveaux de prix. Le prix est automatiquement recalculé au meilleur palier atteint à la clôture.
                Vous ne payez jamais plus que votre prix d'inscription.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Vous vous inscrivez au prix Starter", icon: "👤" },
                  { label: "D'autres acheteurs rejoignent → palier Bronze débloqué → prix baisse", icon: "👥" },
                  { label: "La communauté atteint Silver, puis Or → -42% pour tous", icon: "🏆" },
                  { label: "Vous êtes remboursé de la différence si le palier change après paiement", icon: "💰" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-700 leading-relaxed">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual tier comparison */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="text-xs text-gray-400 uppercase tracking-widest mb-4">Exemple — Gants chirurgicaux stériles</div>

              {[
                { label: "Starter", qty: "100 000+", price: "0,085$", pct: 0, active: false, achieved: false, color: "#6B7280" },
                { label: "Bronze", qty: "500 000+", price: "0,072$", pct: -15, active: true, achieved: true, color: "#B45309" },
                { label: "Silver", qty: "1 000 000+", price: "0,062$", pct: -27, active: false, achieved: false, color: "#6B7280" },
                { label: "Or 🏆", qty: "3 000 000+", price: "0,049$", pct: -42, active: false, achieved: false, color: "#C14B1D" },
              ].map((tier) => (
                <div key={tier.label} className={`flex items-center gap-3 p-3 rounded-xl mb-2 border-2 transition-all ${tier.active ? "border-orange-200 bg-orange-50" : "border-gray-100"}`}>
                  <div className="w-16 text-center">
                    <div className="text-xs font-bold" style={{ color: tier.color }}>{tier.label}</div>
                    <div className="text-[10px] text-gray-400">{tier.qty}</div>
                  </div>
                  <div className="flex-1 h-2 rounded-full overflow-hidden bg-gray-100">
                    <div className="h-full rounded-full" style={{ width: tier.achieved ? "100%" : "0%", background: `${tier.color}` }} />
                  </div>
                  <div className="text-right w-24">
                    <div className="font-bold text-sm text-[#1A1630]">{tier.price}<span className="text-xs font-normal text-gray-400">/u</span></div>
                    {tier.pct !== 0 && <div className="text-xs font-bold" style={{ color: tier.active ? "#C14B1D" : "#10B981" }}>{tier.pct}%</div>}
                  </div>
                  {tier.achieved && <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />}
                  {tier.active && <div className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0" style={{ background: "#C14B1D", color: "white" }}>EN COURS</div>}
                </div>
              ))}

              <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                <span className="text-gray-500">Prix marché habituel</span>
                <span className="line-through text-gray-400">0,12$/u</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span style={{ color: "#1B5E3E" }}>Votre économie (Bronze)</span>
                <span style={{ color: "#1B5E3E" }}>-40%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACTIVE CAMPAIGNS ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-display text-2xl font-bold text-[#1A1630]">Campagnes en cours</h2>
              <p className="text-gray-500 text-sm mt-1">Rejoignez maintenant et faites baisser le prix pour tous</p>
            </div>
            <Link to="/campaigns" className="btn-secondary text-sm">
              Toutes les campagnes <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {campaigns.slice(0, 3).map((campaign) => {
              const tier = getCurrentTier(campaign);
              const nextTier = campaign.priceTiers.find((t) => t.minQty > campaign.currentQty);
              const progress = getCampaignProgress(campaign);
              const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / 86400000));

              return (
                <Link key={campaign.id} to="/campaigns/$id" params={{ id: campaign.id }}
                  className="campaign-card bg-white rounded-2xl overflow-hidden card-shadow border border-gray-100 flex flex-col">
                  {/* Header */}
                  <div className="p-5 pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-4xl">{campaign.image}</div>
                      <div className="flex gap-1 items-center">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: "#FFF7ED", color: "#C14B1D", border: "1px solid #FED7AA" }}>
                          {tier.label}
                        </span>
                        <span className="text-xs text-gray-400">{daysLeft}j</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-[#1A1630] text-sm leading-snug mb-1">{campaign.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                      <Users className="h-3 w-3" />
                      {formatQty(campaign.currentQty)} {campaign.unit} inscrits
                    </div>

                    {/* Progress */}
                    <div className="progress-track mb-1.5">
                      <div className="progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    {nextTier && (
                      <div className="text-[10px] text-gray-400">
                        <span className="font-semibold" style={{ color: "#C14B1D" }}>+{formatQty(nextTier.minQty - campaign.currentQty)} {campaign.unit}</span> pour {nextTier.label} ({nextTier.discountPct > 0 ? `-${nextTier.discountPct}%` : "base"})
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="mt-auto px-5 py-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-400">Prix actuel</div>
                      <div className="font-display text-lg font-bold" style={{ color: "#C14B1D" }}>
                        {formatPrice(tier.pricePerUnit, tier.currency)}
                        <span className="text-xs font-normal text-gray-400">/{campaign.unit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl" style={{ background: "#C14B1D", color: "white" }}>
                      Rejoindre <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="py-16" style={{ background: "#F8F2E8" }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-2xl font-bold text-[#1A1630] mb-2">Secteurs couverts</h2>
          <p className="text-gray-500 text-sm mb-8">De l'équipement médical aux pièces industrielles</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sectors.map((sector) => (
              <Link key={sector.id} to="/campaigns" className="sector-card bg-white rounded-2xl p-5 card-shadow flex items-center gap-3 hover:shadow-md transition-all">
                <span className="text-3xl">{sector.icon}</span>
                <div>
                  <div className="font-semibold text-sm text-[#1A1630]">{sector.name}</div>
                  <div className="text-xs text-gray-400">{sector.stats.campaigns} campagnes</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 text-white flex flex-col gap-4" style={{ background: "linear-gradient(135deg, #1A1630, #2D2050)" }}>
            <div className="text-4xl">🏭</div>
            <h3 className="font-display text-xl font-bold">Vous êtes fournisseur ?</h3>
            <p className="text-white/70 text-sm leading-relaxed">Lancez vos campagnes, fixez vos paliers de prix et vendez en volume. Les fonds sont garantis avant la production.</p>
            <Link to="/register/supplier" className="btn-gold self-start">
              Créer un compte fournisseur <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl p-8 flex flex-col gap-4" style={{ background: "linear-gradient(135deg, #FFF7ED, #FFFBEB)", border: "2px solid #FED7AA" }}>
            <div className="text-4xl">🛒</div>
            <h3 className="font-display text-xl font-bold text-[#1A1630]">Vous achetez ?</h3>
            <p className="text-gray-600 text-sm leading-relaxed">Rejoignez des campagnes actives, combinez vos achats avec d'autres professionnels et économisez jusqu'à 42%.</p>
            <Link to="/register/client" className="btn-primary self-start">
              Rejoindre en tant qu'acheteur <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
