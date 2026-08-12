import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Users, Shield, CheckCircle } from "lucide-react";
import { AppLayoutHome, HomepageRightPanel } from "@/components/B2BLayout";
import { campaigns, sectors, getCurrentTier, getNextTier, formatPrice } from "@/data/marketplace";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dolly Trade B2B — Achats groupés inter-entreprises" },
      { name: "description", content: "Rejoignez des campagnes d'achats groupés B2B. Paliers de prix dégressifs jusqu'à -43%. Paiement sécurisé par escrow — vos fonds sont bloqués jusqu'à livraison." },
    ],
  }),
  component: HomePage,
});

function getBadge(participantCount: number) {
  if (participantCount >= 40) return { text: "Populaire", color: "#D4581C", bg: "rgba(212,88,28,0.1)" };
  if (participantCount >= 20) return { text: "Très demandé", color: "#B45309", bg: "rgba(245,190,37,0.12)" };
  return { text: "Nouveau", color: "#15803D", bg: "rgba(21,128,61,0.1)" };
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

function CampaignCard({ c }: { c: (typeof campaigns)[0] }) {
  const tier = getCurrentTier(c);
  const next = getNextTier(c);
  const badge = getBadge(c.participantCount);
  const progress = next
    ? Math.min(100, (c.currentQty / next.minQty) * 100)
    : 100;
  const toNext = next ? next.minQty - c.currentQty : 0;

  return (
    <Link
      to="/campaigns/$id"
      params={{ id: c.id }}
      className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)", border: "1px solid #E9E1D3" }}
    >
      {/* Badge row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span
          className="text-[11px] font-bold px-2.5 py-1 rounded-full"
          style={{ background: badge.bg, color: badge.color }}
        >
          {badge.text}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Clock size={11} />
          {countdown(c.endDate)}
        </span>
      </div>

      {/* Image + title */}
      <div className="px-4 pb-3 flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: `${c.imageColor}12` }}
        >
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
          <div className="flex-1 px-3 py-3" style={{ background: "rgba(212,88,28,0.04)" }}>
            <div className="text-[9px] uppercase tracking-wide font-bold mb-0.5" style={{ color: "#D4581C" }}>Si vous rejoignez</div>
            <div className="text-[17px] font-bold leading-none" style={{ color: "#D4581C" }}>{formatPrice(next.pricePerUnit, next.currency)}</div>
            <div
              className="inline-block text-[9px] font-bold px-1.5 py-0.5 rounded-full mt-1 text-white"
              style={{ background: "#D4581C" }}
            >
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
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, #D4581C, #F5BE25)" }}
          />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-4 pb-4">
        <div
          className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl text-[13px] font-bold text-white"
          style={{
            background: "linear-gradient(135deg, #D4581C 0%, #E8722E 50%, #F5BE25 100%)",
            boxShadow: "0 3px 12px rgba(212,88,28,0.35)",
          }}
        >
          {next ? `Acheter à ${formatPrice(next.pricePerUnit, next.currency)}` : "Rejoindre la campagne"}
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}

const STEPS = [
  { n: "01", icon: "🛒", title: "Rejoignez la campagne", desc: "Choisissez votre quantité ≥ MOQ. Le prix affiché est votre prix garanti minimum." },
  { n: "02", icon: "🔒", title: "Paiement en escrow", desc: "Vos fonds sont bloqués sur un compte séquestre. Ni le fournisseur ni la plateforme ne peut y accéder." },
  { n: "03", icon: "🎯", title: "Palier atteint", desc: "Quand la campagne clôt, le prix baisse automatiquement pour tous si le palier est dépassé." },
  { n: "04", icon: "✅", title: "Livraison → Paiement", desc: "À la réception confirmée, l'escrow se libère et le fournisseur est payé. Zéro risque." },
];

const activeCampaigns = campaigns.filter((c) => c.status === "active");
const totalParticipants = campaigns.reduce((s, c) => s + c.participantCount, 0);

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
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold mb-5"
            style={{ background: "rgba(245,190,37,0.18)", color: "#F5BE25", border: "1px solid rgba(245,190,37,0.30)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {activeCampaigns.length} campagnes actives en ce moment
          </div>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            Plus nombreux,{" "}
            <span style={{ color: "#F5BE25" }}>meilleur prix.</span>
          </h1>
          <p className="text-white/65 text-[14px] leading-relaxed mb-6 max-w-lg">
            Rejoignez des commandes collectives B2B. Le prix baisse automatiquement à chaque palier. Paiement sécurisé par escrow — jusqu'à <strong className="text-white font-bold">−43%</strong> sur le prix marché.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/campaigns"
              className="btn-primary text-sm"
              style={{ boxShadow: "0 4px 20px rgba(212,88,28,0.5)" }}
            >
              Voir les campagnes <ArrowRight size={15} />
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
            { val: "−43%", label: "économie max", emoji: "💰" },
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
      <section className="py-5 px-6 border-b" style={{ borderColor: "#E9E1D3", background: "white" }}>
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

      {/* ── ACTIVE CAMPAIGNS ── */}
      <section className="px-6 pt-6 pb-8" style={{ background: "#FAF6EF" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-[18px] font-bold text-[#2B1507]">Campagnes en cours</h2>
            <p className="text-[12px] text-gray-500 mt-0.5">Plus vous êtes nombreux, plus le prix baisse pour tous</p>
          </div>
          <Link to="/campaigns" className="flex items-center gap-1 text-[12px] font-semibold" style={{ color: "#D4581C" }}>
            Toutes <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {activeCampaigns.slice(0, 3).map((c) => (
            <CampaignCard key={c.id} c={c} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-[18px] font-bold text-[#2B1507]">Comment ça marche ?</h2>
            <Shield size={20} className="text-green-600" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-0.5 z-0"
                    style={{ background: "linear-gradient(90deg, #D4581C40, #F5BE2540)", width: "calc(100% - 3rem)" }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-start">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-3"
                    style={{ background: "linear-gradient(135deg, rgba(212,88,28,0.1), rgba(245,190,37,0.1))", border: "1px solid rgba(212,88,28,0.15)" }}
                  >
                    {s.icon}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#D4581C" }}>{s.n}</div>
                  <div className="font-semibold text-[13px] text-[#2B1507] mb-1">{s.title}</div>
                  <div className="text-[11px] text-gray-500 leading-relaxed">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 p-4 rounded-xl flex items-center gap-3"
            style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}
          >
            <CheckCircle size={16} className="text-green-600 shrink-0" />
            <p className="text-[12px] text-green-700">
              Fonds libérés uniquement après livraison confirmée. Remboursement intégral automatique en cas de non-livraison.
            </p>
          </div>
        </div>
      </section>

      {/* ── DUAL CTA ── */}
      <section className="px-6 py-8" style={{ background: "#FAF6EF" }}>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #2B1507, #3D1E0C)" }}>
            <div className="text-3xl mb-3">🏭</div>
            <h3 className="font-display text-[17px] font-bold mb-2">Vous êtes fournisseur ?</h3>
            <p className="text-white/60 text-[13px] leading-relaxed mb-4">
              Lancez vos campagnes, définissez vos paliers et vendez en volume. Les fonds sont sécurisés avant production.
            </p>
            <Link to="/register/supplier" className="btn-gold text-sm self-start inline-flex">
              Créer un compte fournisseur <ArrowRight size={14} />
            </Link>
          </div>
          <div className="rounded-2xl p-6" style={{ background: "white", border: "1px solid #E9E1D3" }}>
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-display text-[17px] font-bold text-[#2B1507] mb-2">Vous êtes acheteur ?</h3>
            <p className="text-gray-500 text-[13px] leading-relaxed mb-4">
              Rejoignez des campagnes actives, mutualisez vos achats et économisez jusqu'à 43% grâce au volume collectif.
            </p>
            <Link to="/register/client" className="btn-primary text-sm self-start inline-flex">
              Rejoindre comme acheteur <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </AppLayoutHome>
  );
}
