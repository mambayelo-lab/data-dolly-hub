import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Users, Shield, CheckCircle, Zap, TrendingDown, Star } from "lucide-react";
import { AppLayoutHome, HomepageRightPanel } from "@/components/B2BLayout";
import { campaigns, sectors, getCurrentTier, getNextTier, formatPrice } from "@/data/marketplace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WAOUMAS — Plus on est, moins on paye 🔥" },
      { name: "description", content: "Rejoins une campagne d'achats groupés B2B. Le prix baisse à chaque nouveau participant — jusqu'à −43%. Paiement 100% sécurisé." },
    ],
  }),
  component: HomePage,
});

function getBadge(participantCount: number) {
  if (participantCount >= 40) return { text: "🔥 Populaire", color: "#D4581C", bg: "rgba(212,88,28,0.1)" };
  if (participantCount >= 20) return { text: "⚡ Très demandé", color: "#B45309", bg: "rgba(245,190,37,0.12)" };
  return { text: "✨ Nouveau", color: "#15803D", bg: "rgba(21,128,61,0.1)" };
}

function countdown(endDate: string): string {
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return "Terminée";
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return d > 0 ? `${d}j ${h}h` : `${h}h ${m}m`;
}

function fmtQty(qty: number): string {
  if (qty >= 1_000_000) return `${(qty / 1_000_000).toFixed(1)}M`;
  if (qty >= 1_000) return `${(qty / 1_000).toFixed(0)}k`;
  return qty.toLocaleString("fr-FR");
}

function CampaignCard({ c, showUpsell = false }: { c: (typeof campaigns)[0]; showUpsell?: boolean }) {
  const tier = getCurrentTier(c);
  const next = getNextTier(c);
  const badge = getBadge(c.participantCount);
  const progress = next ? Math.min(100, (c.currentQty / next.minQty) * 100) : 100;
  const toNext = next ? next.minQty - c.currentQty : 0;
  const isAlmostNextTier = next && progress >= 70;

  return (
    <Link
      to="/campaigns/$id"
      params={{ id: c.id }}
      className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)", border: `1px solid ${isAlmostNextTier ? "rgba(212,88,28,0.3)" : "#E9E1D3"}` }}
    >
      {/* Upsell urgency banner */}
      {showUpsell && isAlmostNextTier && (
        <div className="px-4 py-2 flex items-center gap-1.5 text-[11px] font-bold" style={{ background: "linear-gradient(90deg, rgba(212,88,28,0.12), rgba(245,190,37,0.1))", color: "#D4581C" }}>
          <Zap size={11} fill="#D4581C" /> Encore {fmtQty(toNext)} {c.unit} pour débloquer −{next!.discount}% !
        </div>
      )}

      {/* Badge row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: badge.bg, color: badge.color }}>
          {badge.text}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Clock size={11} />
          {countdown(c.endDate)}
        </span>
      </div>

      {/* Image + title */}
      <div className="px-4 pb-3 flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${c.imageColor}12` }}>
          {c.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-[#2B1507] leading-snug line-clamp-2">{c.title}</div>
          <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
            <Users size={10} />
            {c.participantCount} participants
          </div>
        </div>
      </div>

      {/* Dual price */}
      <div className="mx-4 mb-3 flex rounded-xl overflow-hidden" style={{ border: "1.5px solid #E9E1D3" }}>
        <div className="flex-1 px-3 py-3" style={{ background: "#FAFAFA" }}>
          <div className="text-[9px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">Prix actuel</div>
          <div className="text-[17px] font-bold text-[#2B1507] leading-none">{formatPrice(tier.pricePerUnit, tier.currency)}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">/{c.unit}</div>
        </div>
        <div className="w-px" style={{ background: "#E9E1D3" }} />
        {next ? (
          <div className="flex-1 px-3 py-3 relative overflow-hidden" style={{ background: "rgba(212,88,28,0.04)" }}>
            <div className="text-[9px] uppercase tracking-wide font-bold mb-0.5" style={{ color: "#D4581C" }}>Si tu rejoins</div>
            <div className="text-[17px] font-bold leading-none" style={{ color: "#D4581C" }}>{formatPrice(next.pricePerUnit, next.currency)}</div>
            <div className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 text-white" style={{ background: "#D4581C" }}>
              −{next.discount}%
            </div>
          </div>
        ) : (
          <div className="flex-1 px-3 py-3" style={{ background: "rgba(21,128,61,0.05)" }}>
            <div className="text-[9px] uppercase tracking-wide font-bold mb-0.5" style={{ color: "#15803D" }}>Meilleur prix</div>
            <div className="text-[17px] font-bold leading-none" style={{ color: "#15803D" }}>{formatPrice(tier.pricePerUnit, tier.currency)}</div>
            <div className="text-[10px] font-semibold mt-1" style={{ color: "#15803D" }}>−{tier.discount}% ✓</div>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="px-4 pb-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gray-400">
            {next ? (
              <>encore <span className="font-semibold text-gray-600">{fmtQty(toNext)} {c.unit}</span> pour {next.label}</>
            ) : (
              <span className="font-semibold text-green-600">Palier max atteint ✓</span>
            )}
          </span>
          <span className="text-[10px] font-bold" style={{ color: "#D4581C" }}>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "#EDE5D8" }}>
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #D4581C, #F5BE25)" }} />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-4 pb-4">
        <div
          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-[13px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #D4581C 0%, #E8722E 50%, #F5BE25 100%)", boxShadow: "0 3px 12px rgba(212,88,28,0.35)" }}
        >
          {next ? `Rejoindre — ${formatPrice(next.pricePerUnit, next.currency)}/u` : "Rejoindre la campagne"}
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

function CrossSellCard({ c }: { c: (typeof campaigns)[0] }) {
  const tier = getCurrentTier(c);
  const next = getNextTier(c);
  return (
    <Link
      to="/campaigns/$id"
      params={{ id: c.id }}
      className="flex items-center gap-3 p-3 rounded-xl bg-white hover:-translate-y-0.5 transition-all"
      style={{ border: "1px solid #E9E1D3", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
    >
      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0" style={{ background: `${c.imageColor}14` }}>
        {c.image}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-semibold text-[#2B1507] line-clamp-1">{c.title}</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-[11px] text-gray-400 flex items-center gap-0.5"><Users size={9} /> {c.participantCount}</span>
          {next && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "#D4581C" }}>−{next.discount}%</span>}
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="text-[13px] font-bold" style={{ color: next ? "#D4581C" : "#15803D" }}>
          {formatPrice(next ? next.pricePerUnit : tier.pricePerUnit, tier.currency)}
        </div>
        <div className="text-[10px] text-gray-400">/{c.unit}</div>
      </div>
    </Link>
  );
}

const STEPS = [
  { n: "01", icon: "🛒", title: "Tu rejoins", desc: "Choisis ta quantité. Ce prix est ton maximum — il peut seulement baisser." },
  { n: "02", icon: "🔒", title: "Argent bloqué", desc: "Tes fonds sont sécurisés. Personne ne peut y toucher avant la livraison." },
  { n: "03", icon: "🎯", title: "Prix collectif", desc: "La campagne se termine, le prix chute pour tout le groupe. Automatique." },
  { n: "04", icon: "✅", title: "Livré → payé", desc: "Tu confirmes la réception, le fournisseur est payé. Zéro risque." },
];

const activeCampaigns = campaigns.filter((c) => c.status === "active");
const totalParticipants = campaigns.reduce((s, c) => s + c.participantCount, 0);
const hotCampaigns = [...activeCampaigns].sort((a, b) => b.participantCount - a.participantCount);
const urgentCampaigns = [...activeCampaigns].sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()).slice(0, 3);

function HomePage() {
  return (
    <AppLayoutHome rightPanel={<HomepageRightPanel />}>
      {/* ── HERO ── */}
      <section
        className="px-6 pt-8 pb-6"
        style={{
          background: "linear-gradient(145deg, #2B1507 0%, #3A1A08 40%, #1D3B28 100%)",
          borderBottom: "1px solid rgba(212,88,28,0.2)",
        }}
      >
        <div className="max-w-2xl">
          {/* Live pill */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-4"
            style={{ background: "rgba(245,190,37,0.18)", color: "#F5BE25", border: "1px solid rgba(245,190,37,0.30)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {activeCampaigns.length} campagnes actives en ce moment
          </div>

          {/* Big "Achats Groupés" label */}
          <div
            className="text-[15px] font-black uppercase tracking-[0.18em] mb-3"
            style={{ color: "#F5BE25", letterSpacing: "0.18em" }}
          >
            ⚡ Achats Groupés B2B
          </div>

          {/* Hero H1 — fun & punchy */}
          <h1 className="font-display font-black text-white leading-[1.05] mb-2" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Plus on est nombreux,{" "}
            <span
              className="relative inline-block"
              style={{
                color: "#F5BE25",
                textShadow: "0 0 40px rgba(245,190,37,0.4)",
              }}
            >
              moins on paye.
            </span>
          </h1>
          <p className="font-bold text-white/80 text-[16px] mb-5" style={{ letterSpacing: "-0.01em" }}>
            C'est dingue, non ? 🤯
          </p>

          <p className="text-white/60 text-[14px] leading-relaxed mb-6 max-w-lg">
            Rejoins une commande collective. Chaque nouveau participant fait baisser le prix pour{" "}
            <strong className="text-white">tout le groupe</strong>. Aucun achat solo — que du groupé, jusqu'à{" "}
            <strong className="text-white">−43%</strong>.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/campaigns" className="btn-primary text-sm" style={{ boxShadow: "0 4px 20px rgba(212,88,28,0.5)" }}>
              Je rejoins une campagne <ArrowRight size={15} />
            </Link>
            <Link
              to="/register/supplier"
              className="btn-secondary text-sm"
              style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.18)" }}
            >
              Espace fournisseur
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-2 mt-8">
          {[
            { val: activeCampaigns.length.toString(), label: "campagnes actives", emoji: "🔥" },
            { val: totalParticipants.toString(), label: "participants", emoji: "👥" },
            { val: "−43%", label: "économie max", emoji: "💸" },
            { val: "180+", label: "pays desservis", emoji: "🌍" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-3 py-2 rounded-xl"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <span className="text-[13px]">{s.emoji}</span>
              <span className="font-bold text-white text-[13px]">{s.val}</span>
              <span className="text-white/45 text-[11px]">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTORS ── */}
      <section className="py-4 px-6 border-b" style={{ borderColor: "#E9E1D3", background: "white" }}>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <button
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white"
            style={{ background: "#2B1507" }}
          >
            Toutes les catégories
          </button>
          {sectors.map((s) => (
            <Link
              key={s.id}
              to="/campaigns"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              style={{ background: "#FAF6EF", whiteSpace: "nowrap" }}
            >
              {s.icon} {s.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ── ACTIVE CAMPAIGNS (with upsell) ── */}
      <section className="px-6 pt-6 pb-6" style={{ background: "#FAF6EF" }}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display text-[18px] font-bold text-[#2B1507] flex items-center gap-2">
              <TrendingDown size={18} style={{ color: "#D4581C" }} /> Campagnes en cours
            </h2>
            <p className="text-[12px] text-gray-500 mt-0.5">
              Chaque participant fait baisser le prix · aucun achat individuel
            </p>
          </div>
          <Link to="/campaigns" className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: "#D4581C" }}>
            Toutes <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {hotCampaigns.slice(0, 3).map((c) => (
            <CampaignCard key={c.id} c={c} showUpsell />
          ))}
        </div>
      </section>

      {/* ── URGENCY / FOMO — closing soon ── */}
      <section className="px-6 py-5" style={{ background: "white", borderTop: "1px solid #E9E1D3", borderBottom: "1px solid #E9E1D3" }}>
        <div className="flex items-center gap-2 mb-4">
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black text-white"
            style={{ background: "linear-gradient(90deg, #D4581C, #E8722E)" }}
          >
            <Clock size={11} /> Se termine bientôt
          </div>
          <span className="text-[12px] text-gray-500">Rejoins maintenant avant que les paliers soient fermés</span>
        </div>

        <div className="flex flex-col gap-2">
          {urgentCampaigns.map((c) => {
            const next = getNextTier(c);
            const tier = getCurrentTier(c);
            const diff = new Date(c.endDate).getTime() - Date.now();
            const h = Math.floor(diff / 3600000);
            return (
              <Link
                key={c.id}
                to="/campaigns/$id"
                params={{ id: c.id }}
                className="flex items-center gap-3 p-3 rounded-xl hover:-translate-y-0.5 transition-all"
                style={{ background: "rgba(212,88,28,0.04)", border: "1px solid rgba(212,88,28,0.15)" }}
              >
                <div className="text-xl">{c.image}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-[#2B1507] line-clamp-1">{c.title}</div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                    <Users size={9} /> {c.participantCount} participants · {h < 48 ? `⚠️ Ferme dans ${countdown(c.endDate)}` : `Ferme dans ${countdown(c.endDate)}`}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[13px] font-bold" style={{ color: "#D4581C" }}>
                    {formatPrice(next ? next.pricePerUnit : tier.pricePerUnit, tier.currency)}
                  </div>
                  {next && <div className="text-[10px] text-white font-bold mt-0.5 px-1.5 py-0.5 rounded-full inline-block" style={{ background: "#D4581C" }}>−{next.discount}%</div>}
                </div>
                <ArrowRight size={14} style={{ color: "#D4581C" }} className="shrink-0" />
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── CROSS-SELL — "Ils achètent aussi" ── */}
      <section className="px-6 py-6" style={{ background: "#FAF6EF" }}>
        <div className="flex items-center gap-2 mb-4">
          <Star size={15} style={{ color: "#F5BE25" }} fill="#F5BE25" />
          <h3 className="font-display text-[15px] font-bold text-[#2B1507]">Les membres achètent aussi</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {activeCampaigns.slice(0, 4).map((c) => (
            <CrossSellCard key={c.id} c={c} />
          ))}
        </div>
        <Link
          to="/campaigns"
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold"
          style={{ background: "white", color: "#2B1507", border: "1px solid #E9E1D3" }}
        >
          Voir toutes les campagnes <ArrowRight size={14} />
        </Link>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-10 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#D4581C", letterSpacing: "0.12em" }}>
                Simple &amp; Transparent
              </div>
              <h2 className="font-display text-[20px] font-bold text-[#2B1507]">Comment ça marche ?</h2>
            </div>
            <Shield size={20} className="text-green-600" />
          </div>

          {/* Timeline grid with continuous line */}
          <div className="relative">
            <div
              className="hidden lg:block absolute h-0.5 z-0"
              style={{ top: "24px", left: "12.5%", right: "12.5%", background: "linear-gradient(90deg, #D4581C, #F5BE25)" }}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex flex-col items-center text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl mb-4 relative z-10"
                    style={{
                      background: i === 0 ? "linear-gradient(135deg, #D4581C, #E8722E)" : "white",
                      border: `2px solid ${i === 0 ? "transparent" : "#E9E1D3"}`,
                      boxShadow: i === 0 ? "0 4px 14px rgba(212,88,28,0.40)" : "0 2px 8px rgba(43,21,7,0.08)",
                    }}
                  >
                    {s.icon}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#D4581C" }}>{s.n}</div>
                  <div className="font-semibold text-[14px] text-[#2B1507] mb-1.5">{s.title}</div>
                  <div className="text-[12px] text-gray-500 leading-relaxed">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="mt-8 p-4 rounded-xl flex items-center gap-3"
            style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}
          >
            <CheckCircle size={16} className="text-green-600 shrink-0" />
            <p className="text-[12px] text-green-700 font-medium">
              Ton argent est libéré <strong>uniquement après livraison confirmée</strong>. Remboursement intégral automatique en cas de non-livraison.
            </p>
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="px-6 py-8" style={{ background: "#FAF6EF" }}>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #2B1507, #3D1E0C)" }}>
            <div className="text-3xl mb-3">🏭</div>
            <h3 className="font-display text-[17px] font-bold mb-2">Tu es fournisseur ?</h3>
            <p className="text-white/60 text-[13px] leading-relaxed mb-4">
              Lance tes campagnes, définis tes paliers et vends en volume. Les fonds sont sécurisés avant production.
            </p>
            <Link to="/register/supplier" className="btn-gold text-sm self-start inline-flex">
              Créer mon compte fournisseur <ArrowRight size={14} />
            </Link>
          </div>
          <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #E9E1D3" }}>
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-display text-[17px] font-bold text-[#2B1507] mb-2">Tu es acheteur ?</h3>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-4">
              Rejoins des campagnes actives, mutualise tes achats et économise jusqu'à 43% grâce au volume collectif.
            </p>
            <Link to="/register/client" className="btn-primary text-sm self-start inline-flex">
              Je rejoins comme acheteur <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </AppLayoutHome>
  );
}
