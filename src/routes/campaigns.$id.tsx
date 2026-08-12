import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronRight, Shield, Lock, CheckCircle, Clock, Users, TrendingDown } from "lucide-react";
import { AppLayout } from "@/components/B2BLayout";
import {
  getCampaign, getSupplier, getSector, getCurrentTier, getNextTier,
  formatQty, formatPrice, buildWhatsAppLink, campaigns,
} from "@/data/marketplace";
import { toast } from "sonner";

export const Route = createFileRoute("/campaigns/$id")({
  head: ({ params }) => {
    const c = getCampaign(params.id);
    return { meta: [{ title: c ? `${c.title} — WAOUMAS` : "Campagne — WAOUMAS" }] };
  },
  component: CampaignDetailPage,
});

/* ── Helpers ──────────────────────────────────────── */
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function useCountdown(endDate: string) {
  const calc = () => {
    const diff = new Date(endDate).getTime() - Date.now();
    return {
      d: Math.max(0, Math.floor(diff / 86400000)),
      h: Math.max(0, Math.floor((diff % 86400000) / 3600000)),
      m: Math.max(0, Math.floor((diff % 3600000) / 60000)),
      s: Math.max(0, Math.floor((diff % 60000) / 1000)),
      ended: diff <= 0,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [endDate]);
  return time;
}

/* ── Circular progress ───────────────────────────── */
function CircleProgress({ pct }: { pct: number }) {
  const r = 60;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - Math.min(pct, 100) / 100);
  return (
    <svg width={152} height={152} viewBox="0 0 152 152">
      <defs>
        <linearGradient id="cpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4581C" />
          <stop offset="100%" stopColor="#F5BE25" />
        </linearGradient>
      </defs>
      <circle cx="76" cy="76" r={r} fill="none" stroke="#E9E1D3" strokeWidth="12" />
      <circle
        cx="76" cy="76" r={r} fill="none"
        stroke="url(#cpGrad)" strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 76 76)"
      />
      <text x="76" y="70" textAnchor="middle" fill="#2B1507" style={{ fontSize: 30, fontWeight: 700 }}>
        {Math.round(pct)}
      </text>
      <text x="76" y="86" textAnchor="middle" fill="#2B1507" style={{ fontSize: 14, fontWeight: 600 }}>
        %
      </text>
      <text x="76" y="102" textAnchor="middle" fill="#9CA3AF" style={{ fontSize: 10 }}>
        de l'objectif
      </text>
    </svg>
  );
}

/* ── Tier progress bar ───────────────────────────── */
function TierProgressBar({ campaign }: { campaign: NonNullable<ReturnType<typeof getCampaign>> }) {
  const currentTier = getCurrentTier(campaign);
  const currentIdx = campaign.priceTiers.indexOf(currentTier);
  const maxQty = campaign.priceTiers[campaign.priceTiers.length - 1].minQty;
  const progress = Math.min(100, (campaign.currentQty / maxQty) * 100);
  const n = campaign.priceTiers.length;

  return (
    <div>
      {/* Track + nodes */}
      <div className="relative h-3 rounded-full mb-8 mt-4" style={{ background: "#E9E1D3" }}>
        <div
          className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, #D4581C, #F5BE25)" }}
        />
        {campaign.priceTiers.map((tier, i) => {
          const isAchieved = i < currentIdx;
          const isCurrent = i === currentIdx;
          const leftPct = i === 0 ? 0 : i === n - 1 ? 100 : (tier.minQty / maxQty) * 100;
          return (
            <div
              key={tier.label}
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${leftPct}%` }}
            >
              <div
                className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                style={{
                  background: isAchieved ? "#F5BE25" : isCurrent ? "#D4581C" : "white",
                  borderColor: isAchieved ? "#F5BE25" : isCurrent ? "#D4581C" : "#E5E7EB",
                  boxShadow: isCurrent ? "0 0 0 3px rgba(212,88,28,0.2)" : "none",
                }}
              >
                {(isAchieved || isCurrent) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
        {campaign.priceTiers.map((tier, i) => {
          const isAchieved = i < currentIdx;
          const isCurrent = i === currentIdx;
          return (
            <div key={tier.label} className="text-center px-1">
              <div className="font-bold text-[12px]" style={{ color: isCurrent ? "#D4581C" : isAchieved ? "#92400E" : "#9CA3AF" }}>
                {tier.label}
              </div>
              <div className="text-[10px] text-gray-400 mt-0.5">{formatQty(tier.minQty)} {campaign.unit}</div>
              <div className="font-semibold text-[12px] mt-0.5" style={{ color: isCurrent ? "#D4581C" : "#374151" }}>
                {formatPrice(tier.pricePerUnit, tier.currency)}
              </div>
              <div className="mt-2">
                {isAchieved ? (
                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-green-600">
                    <CheckCircle className="w-3 h-3" /> Atteint
                  </span>
                ) : isCurrent ? (
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background: "#D4581C" }}>
                    En cours
                  </span>
                ) : (
                  <span className="text-[10px] text-gray-400">À venir</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Order widget (right panel) ──────────────────── */
function OrderWidget({ campaign }: { campaign: NonNullable<ReturnType<typeof getCampaign>> }) {
  const [qty, setQty] = useState(campaign.moq);
  const [joined, setJoined] = useState(false);
  const countdown = useCountdown(campaign.endDate);
  const currentTier = getCurrentTier(campaign);
  const nextTier = getNextTier(campaign);
  const total = qty * currentTier.pricePerUnit;
  const supplier = getSupplier(campaign.supplierId);

  const handleJoin = () => {
    if (qty < campaign.moq) {
      toast.error(`Minimum : ${formatQty(campaign.moq)} ${campaign.unit}`);
      return;
    }
    setJoined(true);
    toast.success("Inscription confirmée !", {
      description: `${formatQty(qty)} ${campaign.unit} · ${formatPrice(total, currentTier.currency)} — fonds bloqués jusqu'à livraison.`,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4 h-full overflow-y-auto" style={{ background: "white", borderLeft: "1px solid #E9E1D3" }}>

      {/* Countdown */}
      <div className="rounded-2xl p-4 border" style={{ borderColor: "#E9E1D3" }}>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-3">
          <Clock size={10} /> Fin de la campagne dans
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { n: countdown.d, label: "Jours" },
            { n: countdown.h, label: "Heures" },
            { n: countdown.m, label: "Min" },
            { n: countdown.s, label: "Sec" },
          ].map(({ n, label }) => (
            <div key={label} className="text-center rounded-xl py-2.5" style={{ background: "#2B1507" }}>
              <div className="font-display font-bold text-[22px] text-white leading-none">
                {String(n).padStart(2, "0")}
              </div>
              <div className="text-[8px] text-white/45 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="font-display font-bold text-[15px] text-[#2B1507]">Participer à cette campagne</div>

      {!joined ? (
        <>
          {/* Current price */}
          <div className="rounded-xl p-3 border" style={{ background: "rgba(212,88,28,0.04)", borderColor: "rgba(212,88,28,0.12)" }}>
            <div className="text-[10px] text-gray-500 mb-0.5">Prix actuel — {currentTier.label}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[24px] font-bold" style={{ color: "#D4581C" }}>
                {formatPrice(currentTier.pricePerUnit, currentTier.currency)}
              </span>
              <span className="text-[12px] text-gray-400">/ {campaign.unit}</span>
            </div>
            {nextTier && (
              <div className="flex items-center gap-1 text-[10px] text-green-600 mt-1 font-semibold">
                <TrendingDown size={11} />
                Palier suivant : {formatPrice(nextTier.pricePerUnit, nextTier.currency)} (-{nextTier.discount}%)
              </div>
            )}
          </div>

          {/* Qty input */}
          <div>
            <div className="text-[11px] font-semibold text-gray-700 mb-2 flex items-center justify-between">
              <span>Votre réservation</span>
              <span className="text-gray-400 font-normal">min. {formatQty(campaign.moq)} {campaign.unit}</span>
            </div>
            <div
              className="flex items-center rounded-xl border-2 overflow-hidden"
              style={{ borderColor: qty >= campaign.moq ? "#D4581C" : "#E5E7EB" }}
            >
              <button
                onClick={() => setQty(Math.max(campaign.moq, qty - campaign.moq))}
                className="px-3 py-2.5 text-[20px] text-gray-500 hover:bg-gray-50 transition-colors leading-none"
              >
                −
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Math.max(campaign.moq, Number(e.target.value) || campaign.moq))}
                className="flex-1 text-center py-2.5 font-semibold text-[14px] focus:outline-none min-w-0"
              />
              <span className="text-[11px] text-gray-400 pr-1">{campaign.unit}</span>
              <button
                onClick={() => setQty(qty + campaign.moq)}
                className="px-3 py-2.5 text-[20px] text-gray-500 hover:bg-gray-50 transition-colors leading-none"
              >
                +
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="rounded-xl p-3" style={{ background: "#FAF6EF" }}>
            <div className="flex items-baseline justify-between">
              <span className="text-[12px] text-gray-500">Total estimé</span>
              <span className="font-display text-[18px] font-bold text-[#2B1507]">
                {formatPrice(total, currentTier.currency)}
              </span>
            </div>
            <div className="text-[10px] text-gray-400 mt-0.5">
              {formatQty(qty)} × {formatPrice(currentTier.pricePerUnit, currentTier.currency)}/{campaign.unit}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleJoin}
            className="w-full py-4 rounded-2xl text-[15px] font-bold text-white transition-all hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #D4581C 0%, #E8722E 50%, #F5BE25 100%)",
              boxShadow: "0 4px 20px rgba(212,88,28,0.45), 0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            Réserver maintenant — {formatPrice(total, currentTier.currency)}
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
            <Lock size={10} />
            Paiement 100% sécurisé · Fonds bloqués jusqu'à livraison confirmée
          </div>

          {campaign.whatsappEnabled && (
            <a
              href={buildWhatsAppLink(campaign)}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp w-full justify-center text-[12px]"
            >
              <WhatsAppIcon size={14} /> Commander via WhatsApp
            </a>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center py-3">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl" style={{ background: "rgba(21,128,61,0.08)" }}>
            🎉
          </div>
          <div className="font-bold text-[15px] text-[#2B1507]">Vous avez rejoint !</div>
          <div className="text-[12px] text-gray-500">
            {formatQty(qty)} {campaign.unit} · {formatPrice(total, currentTier.currency)}
          </div>
          <div className="text-[11px] text-gray-400 p-3 rounded-xl" style={{ background: "#FAF6EF" }}>
            Vous allez recevoir un lien de paiement sécurisé. Vos fonds seront bloqués jusqu'à la livraison confirmée.
          </div>
        </div>
      )}

      {/* Supplier mini */}
      {supplier && (
        <div className="rounded-xl p-3 border" style={{ borderColor: "#E9E1D3" }}>
          <div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-2.5">À propos du fournisseur</div>
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-[13px] shrink-0"
              style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}
            >
              {supplier.name[0]}
            </div>
            <div className="min-w-0">
              <div className="text-[12px] font-semibold text-[#2B1507] flex items-center gap-1">
                <span className="truncate">{supplier.name}</span>
                {supplier.verified && <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />}
              </div>
              <div className="text-[10px] text-gray-400">{supplier.flag} {supplier.city}, {supplier.country}</div>
            </div>
          </div>
          <div className="flex gap-4 mt-2.5 pt-2.5 border-t" style={{ borderColor: "#E9E1D3" }}>
            <div>
              <div className="text-[12px] font-bold text-[#2B1507]">⭐ {supplier.rating}</div>
              <div className="text-[9px] text-gray-400">{supplier.reviewCount} avis</div>
            </div>
            <div>
              <div className="text-[12px] font-bold text-[#2B1507]">{supplier.established}</div>
              <div className="text-[9px] text-gray-400">Depuis</div>
            </div>
            <div>
              <div className="text-[12px] font-bold text-green-600">Vérifié ✓</div>
              <div className="text-[9px] text-gray-400">Fournisseur</div>
            </div>
          </div>
        </div>
      )}

      {/* Guarantees */}
      <div className="rounded-xl p-3 border" style={{ borderColor: "#E5E7EB", background: "#FAFAFA" }}>
        <div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold mb-2.5 flex items-center gap-1">
          <Shield size={10} className="text-green-600" /> Nos garanties
        </div>
        {[
          "Meilleurs prix grâce aux achats groupés",
          "Paiement 100% sécurisé",
          "Livraison garantie dans les délais",
        ].map((g) => (
          <div key={g} className="flex items-center gap-2 mb-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
            <span className="text-[10px] text-gray-600">{g}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ───────────────────────────────────── */
const TABS = ["Le produit", "Les prix", "Fournisseur", "Livraison & Paiement"];

function CampaignDetailPage() {
  const { id } = Route.useParams();
  const campaign = getCampaign(id);
  const [activeTab, setActiveTab] = useState("Le produit");

  if (!campaign) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="font-display text-2xl text-[#2B1507] mb-2">Campagne introuvable</h1>
          <Link to="/campaigns" className="btn-primary mt-4">← Retour aux campagnes</Link>
        </div>
      </AppLayout>
    );
  }

  const supplier = getSupplier(campaign.supplierId);
  const sector = getSector(campaign.sectorId);
  const currentTier = getCurrentTier(campaign);
  const nextTier = getNextTier(campaign);
  const progress = Math.min(100, (campaign.currentQty / campaign.targetQty) * 100);
  const similarCampaigns = campaigns.filter((c) => c.sectorId === campaign.sectorId && c.id !== campaign.id).slice(0, 3);
  const maxDiscount = Math.max(...campaign.priceTiers.map((t) => t.discount));

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-54px)]">

        {/* ── Scrollable main content ── */}
        <div className="flex-1 overflow-y-auto" style={{ background: "#FAF6EF" }}>

          {/* Breadcrumb */}
          <div className="px-6 py-3 bg-white border-b flex items-center gap-2 text-[12px] text-gray-500" style={{ borderColor: "#E9E1D3" }}>
            <Link to="/campaigns" className="flex items-center gap-1 hover:text-gray-700">
              <ArrowLeft size={13} /> Campagnes
            </Link>
            {sector && (
              <>
                <ChevronRight size={12} />
                <span>{sector.icon} {sector.name}</span>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-gray-800 font-medium truncate max-w-xs">{campaign.title}</span>
          </div>

          <div className="p-5 flex flex-col gap-4 max-w-4xl">

            {/* ── 1. Product header card ── */}
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)" }}>
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${campaign.imageColor}, #F5BE25)` }} />
              <div className="p-5">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shrink-0"
                    style={{ background: `${campaign.imageColor}12`, border: `1px solid ${campaign.imageColor}20` }}
                  >
                    {campaign.image}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {sector && (
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: `${campaign.imageColor}12`, color: campaign.imageColor }}>
                          {sector.icon} {sector.name}
                        </span>
                      )}
                      <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full" style={{ background: campaign.status === "active" ? "rgba(21,128,61,0.1)" : "#F3F4F6", color: campaign.status === "active" ? "#15803D" : "#6B7280" }}>
                        {campaign.status === "active" ? "● Actif" : campaign.status === "upcoming" ? "Bientôt" : "Terminé"}
                      </span>
                    </div>
                    <h1 className="font-display text-[18px] font-bold text-[#2B1507] leading-snug mb-2">{campaign.title}</h1>
                    {supplier && (
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>{supplier.name[0]}</div>
                        <span className="text-[12px] font-semibold text-gray-700">Par {supplier.name}</span>
                        {supplier.verified && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1" style={{ background: "rgba(21,128,61,0.1)", color: "#15803D" }}>
                            <CheckCircle size={10} /> Fournisseur vérifié
                          </span>
                        )}
                      </div>
                    )}
                    {/* Cert badges */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {campaign.certifications.map((c) => (
                        <span key={c} className="text-[10px] px-2 py-0.5 rounded-md border font-medium" style={{ borderColor: "#E5E7EB", color: "#374151", background: "white" }}>
                          {c}
                        </span>
                      ))}
                      {campaign.deliveryZones.includes("Monde entier") && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md border font-medium" style={{ borderColor: "#E5E7EB", color: "#374151", background: "white" }}>
                          🌍 Livraison mondiale
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">{campaign.description}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t" style={{ borderColor: "#E9E1D3" }}>
                  {campaign.tags.map((tag) => (
                    <span key={tag} className="text-[11px] px-2.5 py-1 rounded-lg text-gray-600" style={{ background: "#FAF6EF" }}>
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto text-[11px] text-gray-400 flex items-center gap-1">
                    <Users size={11} />
                    {campaign.participantCount} participants · MOQ {formatQty(campaign.moq)} {campaign.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* ── 2. Progress card ── */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)" }}>
              <h2 className="font-display font-bold text-[15px] text-[#2B1507] mb-4">Progression de la campagne</h2>

              <div className="flex items-center gap-6">
                {/* Left stats */}
                <div className="flex-1">
                  <div className="text-[11px] text-gray-400 mb-1">Quantité réservée</div>
                  <div className="font-display text-[26px] font-bold text-[#2B1507] leading-none">
                    {formatQty(campaign.currentQty)}
                  </div>
                  <div className="text-[12px] text-gray-400 mt-0.5">
                    {campaign.unit} <span className="text-gray-300">sur</span> {formatQty(campaign.targetQty)} {campaign.unit}
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users size={13} className="text-gray-400" />
                      <span className="text-[12px] text-gray-500">Participants</span>
                    </div>
                    <div className="font-display text-[22px] font-bold text-[#2B1507]">{campaign.participantCount}</div>
                  </div>

                  <div className="mt-3 p-3 rounded-xl" style={{ background: "rgba(212,88,28,0.05)", border: "1px solid rgba(212,88,28,0.1)" }}>
                    <div className="text-[10px] font-semibold mb-0.5" style={{ color: "#D4581C" }}>
                      Prix actuel — {currentTier.label}
                    </div>
                    <div className="font-bold text-[15px]" style={{ color: "#D4581C" }}>
                      {formatPrice(currentTier.pricePerUnit, currentTier.currency)}/{campaign.unit}
                    </div>
                    {nextTier && (
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        Palier suivant : {formatPrice(nextTier.pricePerUnit, nextTier.currency)} (-{nextTier.discount}%)
                      </div>
                    )}
                  </div>
                </div>

                {/* Circle progress */}
                <div className="shrink-0">
                  <CircleProgress pct={progress} />
                </div>

                {/* Right info */}
                <div className="flex-1">
                  <div className="text-[11px] text-gray-400 mb-1">Économie maximum</div>
                  <div className="font-display text-[26px] font-bold leading-none" style={{ color: "#D4581C" }}>
                    -{maxDiscount}%
                  </div>
                  <div className="text-[12px] text-gray-400 mt-0.5">au palier {campaign.priceTiers[campaign.priceTiers.length - 1].label}</div>

                  {nextTier && (
                    <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.12)" }}>
                      <div className="text-[10px] font-semibold text-green-700 mb-1 flex items-center gap-1">
                        <TrendingDown size={11} /> Prochain palier
                      </div>
                      <div className="text-[12px] text-green-800 font-semibold">
                        encore {formatQty(nextTier.minQty - campaign.currentQty)} {campaign.unit}
                      </div>
                      <div className="text-[10px] text-green-600 mt-0.5">
                        → {formatPrice(nextTier.pricePerUnit, nextTier.currency)} pour tout le monde
                      </div>
                    </div>
                  )}

                  <div className="mt-3">
                    <div className="text-[11px] text-gray-400 mb-1.5">Zones de livraison</div>
                    <div className="flex flex-wrap gap-1">
                      {campaign.deliveryZones.slice(0, 3).map((z) => (
                        <span key={z} className="text-[10px] px-2 py-0.5 rounded-md border" style={{ borderColor: "#E5E7EB", color: "#6B7280" }}>{z}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tier progress bar */}
              <div className="mt-6 pt-6 border-t" style={{ borderColor: "#E9E1D3" }}>
                <TierProgressBar campaign={campaign} />
              </div>
            </div>

            {/* ── 3. Tabs + content ── */}
            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)" }}>
              {/* Tab nav */}
              <div className="flex border-b overflow-x-auto" style={{ borderColor: "#E9E1D3" }}>
                {[...TABS, `Participants (${campaign.participantCount})`].map((tab) => {
                  const isActive = tab === activeTab || (activeTab === "Le produit" && tab === "Le produit");
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="shrink-0 px-5 py-3.5 text-[12px] font-semibold border-b-2 transition-colors"
                      style={{
                        borderColor: isActive ? "#D4581C" : "transparent",
                        color: isActive ? "#D4581C" : "#6B7280",
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div className="p-5">
                {(activeTab === "Le produit" || activeTab === "Les prix") && (
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b" style={{ borderColor: "#E9E1D3" }}>
                        <th className="text-left py-2.5 text-gray-500 font-semibold">Palier</th>
                        <th className="text-center py-2.5 text-gray-500 font-semibold">Quantité totale</th>
                        <th className="text-center py-2.5 text-gray-500 font-semibold">Prix / {campaign.unit}</th>
                        <th className="text-center py-2.5 text-gray-500 font-semibold">Économie</th>
                        <th className="text-right py-2.5 text-gray-500 font-semibold">Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaign.priceTiers.map((tier, i) => {
                        const currentTierIdx = campaign.priceTiers.indexOf(currentTier);
                        const isAchieved = i < currentTierIdx;
                        const isCurrent = i === currentTierIdx;
                        return (
                          <tr key={tier.label} className="border-b" style={{ borderColor: "#FAF6EF", background: isCurrent ? "rgba(212,88,28,0.03)" : "transparent" }}>
                            <td className="py-3 font-semibold" style={{ color: isCurrent ? "#D4581C" : "#374151" }}>
                              {tier.label}
                              {isCurrent && (
                                <span className="ml-2 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white" style={{ background: "#D4581C" }}>
                                  Palier actuel
                                </span>
                              )}
                            </td>
                            <td className="py-3 text-center text-gray-600">{formatQty(tier.minQty)} {campaign.unit}</td>
                            <td className="py-3 text-center font-bold" style={{ color: isCurrent ? "#D4581C" : "#374151" }}>
                              {formatPrice(tier.pricePerUnit, tier.currency)}
                            </td>
                            <td className="py-3 text-center">
                              {tier.discount > 0 ? (
                                <span className="font-bold" style={{ color: "#15803D" }}>-{tier.discount}%</span>
                              ) : (
                                <span className="text-gray-400">—</span>
                              )}
                            </td>
                            <td className="py-3 text-right">
                              {isAchieved ? (
                                <span className="text-green-600 font-semibold">Atteint ✓</span>
                              ) : isCurrent ? (
                                <span className="font-semibold" style={{ color: "#D4581C" }}>En cours</span>
                              ) : (
                                <span className="text-gray-400">À venir</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}

                {activeTab === "Fournisseur" && supplier && (
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0" style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>
                      {supplier.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[#2B1507] text-[15px]">{supplier.name}</span>
                        {supplier.verified && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <div className="text-[12px] text-gray-500 mb-3">{supplier.flag} {supplier.city}, {supplier.country} · Membre depuis {supplier.established}</div>
                      <div className="flex gap-4 mb-3">
                        <div><div className="font-bold text-[#2B1507]">⭐ {supplier.rating}/5</div><div className="text-[11px] text-gray-400">{supplier.reviewCount} avis</div></div>
                        <div><div className="font-bold text-[#2B1507]">{supplier.activeCampaigns}</div><div className="text-[11px] text-gray-400">Campagnes</div></div>
                      </div>
                      <p className="text-[12px] text-gray-600 leading-relaxed mb-3">{supplier.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {supplier.certifications.map((c) => (
                          <span key={c} className="text-[10px] px-2 py-0.5 rounded-md border font-medium" style={{ borderColor: "#E5E7EB", color: "#374151" }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "Livraison & Paiement" && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-[#2B1507] mb-2 text-[13px]">Zones de livraison</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {campaign.deliveryZones.map((z) => (
                          <span key={z} className="text-[11px] px-2.5 py-1 rounded-lg border" style={{ borderColor: "#E5E7EB" }}>{z}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2B1507] mb-2 text-[13px]">Conditions de paiement</h3>
                      {supplier && (
                        <div className="flex flex-col gap-1">
                          {supplier.paymentTerms.map((p) => (
                            <div key={p} className="flex items-center gap-2 text-[12px] text-gray-600">
                              <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" /> {p}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2 p-3 rounded-xl flex items-center gap-2" style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}>
                      <Shield className="w-4 h-4 text-green-600 shrink-0" />
                      <span className="text-[12px] text-green-700">Paiement 100% sécurisé — les fonds sont libérés uniquement à la réception confirmée de votre commande.</span>
                    </div>
                  </div>
                )}

                {activeTab.startsWith("Participants") && (
                  <div className="text-center py-8">
                    <div className="font-display text-[48px] font-bold text-[#2B1507]">{campaign.participantCount}</div>
                    <div className="text-gray-500 mt-1">acheteurs ont rejoint cette campagne</div>
                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                      {campaign.deliveryZones.map((z) => (
                        <span key={z} className="text-[11px] px-3 py-1.5 rounded-lg" style={{ background: "#FAF6EF", color: "#6B7280" }}>🌍 {z}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tagline */}
                <div className="mt-4 pt-4 border-t text-center text-[12px] text-gray-400" style={{ borderColor: "#FAF6EF" }}>
                  💡 Plus la quantité totale augmente, plus le prix baisse pour <strong className="text-gray-600">tous</strong> !
                </div>
              </div>
            </div>

            {/* ── 4. Escrow card ── */}
            <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 20px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-2 mb-4">
                <Lock size={16} style={{ color: "#D4581C" }} />
                <h2 className="font-display font-bold text-[15px] text-[#2B1507]">Votre paiement est sécurisé</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { icon: "🔒", title: "Votre argent est protégé", desc: "Votre paiement est bloqué sur un compte neutre jusqu'à livraison confirmée." },
                  { icon: "📉", title: "Ce prix — ou encore moins", desc: "Si un palier supérieur est atteint, la différence vous est remboursée automatiquement." },
                  { icon: "🚫", title: "Zéro risque", desc: "Le fournisseur est payé uniquement après réception vérifiée des marchandises." },
                  { icon: "↩️", title: "Remboursement intégral", desc: "Si la campagne échoue ou la livraison n'a pas lieu, vous êtes remboursé automatiquement." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "#FAF6EF" }}>
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <div className="font-semibold text-[12px] text-[#2B1507] mb-0.5">{item.title}</div>
                      <div className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── 5. Similar campaigns ── */}
            {similarCampaigns.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-[15px] text-[#2B1507] mb-3">Campagnes similaires</h2>
                <div className="flex flex-col gap-2">
                  {similarCampaigns.map((c) => {
                    const t = getCurrentTier(c);
                    const p = Math.min(100, (c.currentQty / c.targetQty) * 100);
                    return (
                      <Link key={c.id} to="/campaigns/$id" params={{ id: c.id }}
                        className="bg-white rounded-xl p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-all"
                        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)" }}>
                        <div className="text-2xl">{c.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[12px] text-[#2B1507] truncate">{c.title}</div>
                          <div className="h-1.5 rounded-full overflow-hidden mt-1.5" style={{ background: "#E9E1D3" }}>
                            <div className="h-full rounded-full" style={{ width: `${p}%`, background: "linear-gradient(90deg, #D4581C, #F5BE25)" }} />
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-[13px]" style={{ color: "#D4581C" }}>{formatPrice(t.pricePerUnit, t.currency)}</div>
                          <div className="text-[10px] text-gray-400">/{c.unit}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ── Sticky right panel (order widget) — desktop only ── */}
        <div className="hidden lg:block" style={{ width: 320, position: "sticky", top: 0, height: "calc(100vh - 54px)", overflowY: "auto", flexShrink: 0 }}>
          <OrderWidget campaign={campaign} />
        </div>

        {/* ── Order widget inline — mobile only (below main content) ── */}
        <div className="lg:hidden" style={{ borderTop: "1px solid #E9E1D3" }}>
          <OrderWidget campaign={campaign} />
        </div>

      </div>
    </AppLayout>
  );
}
