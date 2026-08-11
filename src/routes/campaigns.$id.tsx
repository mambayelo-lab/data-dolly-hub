import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Shield, Clock, Package, CheckCircle, Users, ChevronRight, Lock, TrendingDown, AlertCircle } from "lucide-react";
import { PageLayout } from "@/components/B2BLayout";
import { getCampaign, getSupplier, getSector, getCurrentTier, getNextTier, getCampaignProgress, formatQty, formatPrice, buildWhatsAppLink, campaigns } from "@/data/marketplace";
import { toast } from "sonner";

export const Route = createFileRoute("/campaigns/$id")({
  head: ({ params }) => {
    const c = getCampaign(params.id);
    return { meta: [{ title: c ? `${c.title} — Dolly Trade B2B` : "Campagne — Dolly Trade B2B" }] };
  },
  component: CampaignDetailPage,
});

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const TIER_META = [
  { color: "#6B7280", bg: "#F9FAFB", ring: "#D1D5DB", label: "Starter" },
  { color: "#92400E", bg: "#FFFBEB", ring: "#FCD34D", label: "Bronze" },
  { color: "#475569", bg: "#F8FAFC", ring: "#94A3B8", label: "Silver" },
  { color: "#C14B1D", bg: "#FFF7ED", ring: "#FB923C", label: "Or" },
];

function TierBar({ tiers, currentQty, unit }: { tiers: ReturnType<typeof getCampaign>["priceTiers"]; currentQty: number; unit: string }) {
  const maxQty = tiers[tiers.length - 1].minQty;
  const currentTierIdx = [...tiers].reverse().findIndex((t) => currentQty >= t.minQty);
  const activeTierIdx = currentTierIdx === -1 ? 0 : tiers.length - 1 - currentTierIdx;
  const nextTierIdx = activeTierIdx < tiers.length - 1 ? activeTierIdx + 1 : null;
  const progressPct = Math.min(100, (currentQty / maxQty) * 100);

  return (
    <div>
      {/* Tier pills */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {tiers.map((tier, i) => {
          const meta = TIER_META[i];
          const isActive = i === activeTierIdx;
          const isAchieved = i < activeTierIdx;
          const isNext = i === nextTierIdx;
          return (
            <div key={tier.label} className={`rounded-xl p-3 text-center border-2 transition-all relative`}
              style={{
                borderColor: isActive ? meta.ring : isAchieved ? "#10B981" : "#E5E7EB",
                background: isActive ? meta.bg : isAchieved ? "#F0FDF4" : "white",
                boxShadow: isActive ? `0 0 0 3px ${meta.ring}40` : "none",
              }}>
              {isAchieved && (
                <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              )}
              {isNext && (
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded text-[9px] font-bold text-white whitespace-nowrap"
                  style={{ background: "#C14B1D" }}>PROCHAIN</div>
              )}
              <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: isAchieved ? "#10B981" : meta.color }}>
                {isAchieved ? "✓ " : ""}{tier.label}
              </div>
              <div className="font-display text-base font-bold" style={{ color: isActive ? meta.color : "#374151" }}>
                {formatPrice(tier.pricePerUnit, tier.currency)}
              </div>
              <div className="text-[10px] text-gray-400">/{unit}</div>
              {tier.discountPct > 0 && (
                <div className="text-[10px] font-bold mt-1 px-1 py-0.5 rounded" style={{ background: isAchieved ? "#D1FAE5" : isActive ? `${meta.ring}30` : "#F3F4F6", color: isAchieved ? "#059669" : meta.color }}>
                  -{tier.discountPct}%
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="progress-track" style={{ height: 14 }}>
          <div className="progress-fill transition-all duration-700" style={{ width: `${progressPct}%` }} />
          {tiers.slice(1).map((t) => (
            <div key={t.label} className="absolute top-0 bottom-0 w-0.5 bg-white/60"
              style={{ left: `${(t.minQty / maxQty) * 100}%` }} />
          ))}
        </div>

        {/* Milestone markers */}
        <div className="flex justify-between mt-1">
          {tiers.map((t) => (
            <div key={t.label} className="text-[10px] text-gray-400">{formatQty(t.minQty)}</div>
          ))}
        </div>
      </div>

      {/* Status line */}
      <div className="mt-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-gray-400" />
          <span className="font-semibold text-[#1A1630]">{formatQty(currentQty)}</span>
          <span className="text-gray-400">{unit} inscrits</span>
        </div>
        {nextTierIdx !== null && (
          <div className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: "rgba(193,75,29,0.08)", color: "#C14B1D" }}>
            +{formatQty(tiers[nextTierIdx].minQty - currentQty)} → {tiers[nextTierIdx].label} (-{tiers[nextTierIdx].discountPct}%)
          </div>
        )}
      </div>
    </div>
  );
}

function EscrowFlow({ joined }: { joined: boolean }) {
  const steps = [
    { icon: "🛒", label: "Inscription", desc: "Vous rejoignez", done: true },
    { icon: "🔒", label: "Paiement escrow", desc: "Fonds bloqués", done: joined },
    { icon: "🎯", label: "Palier atteint", desc: "Prix optimisé", done: false },
    { icon: "✅", label: "Livraison", desc: "Fournisseur payé", done: false },
  ];

  return (
    <div className="flex items-center gap-1 mt-4">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1 text-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm mb-1 transition-all ${s.done ? "text-white" : ""}`}
              style={{ background: s.done ? "#1B5E3E" : "#F3F4F6" }}>
              {s.icon}
            </div>
            <div className="text-[9px] font-bold" style={{ color: s.done ? "#1B5E3E" : "#9CA3AF" }}>{s.label}</div>
            <div className="text-[8px] text-gray-400">{s.desc}</div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-shrink-0 w-4 h-px mt-[-20px]" style={{ background: s.done ? "#1B5E3E" : "#E5E7EB" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function CampaignDetailPage() {
  const { id } = Route.useParams();
  const campaign = getCampaign(id);
  const [qty, setQty] = useState(campaign?.moq ?? 0);
  const [joined, setJoined] = useState(false);

  if (!campaign) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="text-5xl mb-4">❌</div>
          <h1 className="font-display text-2xl text-[#1A1630] mb-2">Campagne introuvable</h1>
          <Link to="/campaigns" className="btn-primary mt-4">Retour aux campagnes</Link>
        </div>
      </PageLayout>
    );
  }

  const supplier = getSupplier(campaign.supplierId);
  const sector = getSector(campaign.sectorId);
  const currentTier = getCurrentTier(campaign);
  const nextTier = getNextTier(campaign);
  const progress = getCampaignProgress(campaign);
  const daysLeft = Math.max(0, Math.ceil((new Date(campaign.endDate).getTime() - Date.now()) / 86400000));
  const totalPrice = qty * currentTier.pricePerUnit;
  const similarCampaigns = campaigns.filter((c) => c.sectorId === campaign.sectorId && c.id !== campaign.id).slice(0, 3);

  const handleJoin = () => {
    if (qty < campaign.moq) {
      toast.error(`Quantité minimum : ${formatQty(campaign.moq)} ${campaign.unit}`);
      return;
    }
    setJoined(true);
    toast.success("Inscription confirmée !", {
      description: `${formatQty(qty)} ${campaign.unit} · ${formatPrice(totalPrice, currentTier.currency)}. Vos fonds seront placés en escrow.`,
    });
  };

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/campaigns" className="flex items-center gap-1 hover:text-gray-700">
            <ArrowLeft className="h-3.5 w-3.5" /> Campagnes
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium line-clamp-1">{campaign.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Main column ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Hero */}
            <div className="bg-white rounded-2xl overflow-hidden card-shadow">
              <div className="h-2 kente-border" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-6xl">{campaign.image}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {sector && <span className="badge badge-terra text-xs">{sector.icon} {sector.name}</span>}
                      <span className={`badge text-xs ${campaign.status === "active" ? "badge-forest" : "badge-blue"}`}>
                        {campaign.status === "active" ? "● Actif" : "Terminé"}
                      </span>
                      {campaign.certifications.slice(0, 2).map((c) => (
                        <span key={c} className="badge badge-blue text-xs">{c}</span>
                      ))}
                    </div>
                    <h1 className="font-display text-xl lg:text-2xl font-bold text-[#1A1630] leading-tight mb-2">{campaign.title}</h1>
                    <p className="text-gray-500 text-sm leading-relaxed">{campaign.description}</p>
                  </div>
                </div>

                {/* Key stats bar */}
                <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                      <Clock className="h-3 w-3" /> Fermeture
                    </div>
                    <div className="font-bold text-[#1A1630]">{daysLeft}j</div>
                    <div className="text-[10px] text-gray-400">{new Date(campaign.endDate).toLocaleDateString("fr-FR")}</div>
                  </div>
                  <div className="text-center border-x border-gray-100">
                    <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                      <Package className="h-3 w-3" /> MOQ
                    </div>
                    <div className="font-bold text-[#1A1630]">{formatQty(campaign.moq)}</div>
                    <div className="text-[10px] text-gray-400">{campaign.unit}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-gray-400 text-xs mb-1">
                      <TrendingDown className="h-3 w-3" /> Max. économie
                    </div>
                    <div className="font-bold" style={{ color: "#C14B1D" }}>
                      -{campaign.priceTiers[campaign.priceTiers.length - 1].discountPct}%
                    </div>
                    <div className="text-[10px] text-gray-400">palier Or</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PRICE TIERS GAMIFIED ── */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-display font-bold text-[#1A1630] text-lg">Paliers de prix</h2>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  Niveau actif :
                  <span className="font-bold ml-1" style={{ color: "#C14B1D" }}>{currentTier.label}</span>
                </div>
              </div>

              <TierBar tiers={campaign.priceTiers} currentQty={campaign.currentQty} unit={campaign.unit} />

              {nextTier && (
                <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: "rgba(193,75,29,0.06)", border: "1px solid rgba(193,75,29,0.15)" }}>
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: "#C14B1D" }} />
                  <p className="text-xs leading-relaxed" style={{ color: "#C14B1D" }}>
                    <strong>+{formatQty(nextTier.minQty - campaign.currentQty)} {campaign.unit}</strong> manquants pour débloquer le palier <strong>{nextTier.label}</strong> et faire passer le prix à <strong>{formatPrice(nextTier.pricePerUnit, nextTier.currency)}/{campaign.unit}</strong> (-{nextTier.discountPct}%) pour <strong>tous les participants</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* ── ESCROW EXPLAINER ── */}
            <div className="bg-white rounded-2xl p-6 card-shadow">
              <h2 className="font-display font-bold text-[#1A1630] text-lg mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" style={{ color: "#C14B1D" }} />
                Votre paiement est sécurisé
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: "🔒", title: "Fonds en escrow", desc: "Votre paiement est bloqué sur un compte neutre. Ni le fournisseur ni Dolly Trade n'y accèdent avant livraison." },
                  { icon: "📉", title: "Prix garanti ou moins", desc: "Si un palier supérieur est atteint après votre paiement, la différence vous est remboursée automatiquement." },
                  { icon: "🚫", title: "Zéro risque fournisseur", desc: "Le fournisseur est payé uniquement à la réception des marchandises, vérifiée par notre équipe." },
                  { icon: "↩️", title: "Remboursement automatique", desc: "Si la campagne n'atteint pas le palier minimum ou si la livraison échoue, vous êtes remboursé intégralement." },
                ].map((item) => (
                  <div key={item.title} className="p-3 rounded-xl" style={{ background: "#F8F2E8" }}>
                    <div className="text-xl mb-1">{item.icon}</div>
                    <div className="font-semibold text-xs text-[#1A1630] mb-1">{item.title}</div>
                    <div className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: "rgba(27,94,62,0.06)", border: "1px solid rgba(27,94,62,0.15)" }}>
                <Shield className="h-4 w-4 text-green-600 shrink-0" />
                <p className="text-xs text-green-700">Tous les fournisseurs sont vérifiés (documents légaux, références clients, visite usine).</p>
              </div>
            </div>

            {/* Supplier */}
            {supplier && (
              <div className="bg-white rounded-2xl p-6 card-shadow">
                <h2 className="font-display font-bold text-[#1A1630] text-lg mb-4">Le fournisseur</h2>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0"
                    style={{ background: "linear-gradient(135deg, #C14B1D, #E8A820)" }}>
                    {supplier.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#1A1630]">{supplier.name}</span>
                      {supplier.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                      <span className="badge badge-forest text-xs">Vérifié</span>
                    </div>
                    <div className="text-sm text-gray-400 mb-3">📍 {supplier.country} · {supplier.origin}</div>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <div className="font-bold text-[#1A1630]">{supplier.rating}/5</div>
                        <div className="text-xs text-gray-400">Note</div>
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1630]">{supplier.completedOrders}+</div>
                        <div className="text-xs text-gray-400">Commandes</div>
                      </div>
                      <div>
                        <div className="font-bold text-[#1A1630]">{supplier.responseTime}</div>
                        <div className="text-xs text-gray-400">Réponse</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {supplier.certifications.slice(0, 4).map((c) => (
                        <span key={c} className="badge badge-blue text-xs">{c}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Similar campaigns */}
            {similarCampaigns.length > 0 && (
              <div>
                <h2 className="font-display font-bold text-[#1A1630] text-lg mb-4">Campagnes similaires</h2>
                <div className="flex flex-col gap-3">
                  {similarCampaigns.map((c) => {
                    const t = getCurrentTier(c);
                    const p = getCampaignProgress(c);
                    return (
                      <Link key={c.id} to="/campaigns/$id" params={{ id: c.id }}
                        className="bg-white rounded-xl p-4 card-shadow flex items-center gap-4 hover:shadow-md transition-all">
                        <div className="text-3xl">{c.image}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-[#1A1630] truncate">{c.title}</div>
                          <div className="progress-track mt-1.5" style={{ height: 4 }}>
                            <div className="progress-fill" style={{ width: `${p}%` }} />
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-sm" style={{ color: "#C14B1D" }}>{formatPrice(t.pricePerUnit, t.currency)}</div>
                          <div className="text-xs text-gray-400">/{c.unit}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* ── STICKY ORDER WIDGET ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="bg-white rounded-2xl card-shadow overflow-hidden">
                {/* Current price header */}
                <div className="p-5 pb-4" style={{ background: "linear-gradient(135deg, #FFF7ED, #FFFBEB)" }}>
                  <div className="text-xs text-gray-500 mb-1">Prix actuel — Palier {currentTier.label}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-3xl font-bold" style={{ color: "#C14B1D" }}>
                      {formatPrice(currentTier.pricePerUnit, currentTier.currency)}
                    </span>
                    <span className="text-gray-400">/{campaign.unit}</span>
                  </div>
                  {currentTier.discountPct > 0 && (
                    <div className="text-xs text-green-600 font-semibold mt-1">
                      -{currentTier.discountPct}% vs prix Starter
                    </div>
                  )}
                  <div className="mt-3 progress-track" style={{ height: 8 }}>
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="text-[10px] text-gray-400 mt-1">
                    {formatQty(campaign.currentQty)} / {formatQty(campaign.priceTiers[campaign.priceTiers.length - 1].minQty)} {campaign.unit}
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  {/* Qty input */}
                  {!joined ? (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-[#1A1630] mb-2">
                          Quantité (min. {formatQty(campaign.moq)} {campaign.unit})
                        </label>
                        <input
                          type="number"
                          min={campaign.moq}
                          step={campaign.moq}
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="w-full px-3 py-2.5 border-2 rounded-xl text-sm font-semibold focus:outline-none transition-colors"
                          style={{ borderColor: qty >= campaign.moq ? "#E8A820" : "#E5E7EB" }}
                        />
                      </div>

                      {/* Total */}
                      <div className="p-3 rounded-xl" style={{ background: "#F8F2E8" }}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">{formatQty(qty)} × {formatPrice(currentTier.pricePerUnit, currentTier.currency)}</span>
                          <span className="font-bold text-[#1A1630]">{formatPrice(totalPrice, currentTier.currency)}</span>
                        </div>
                        {nextTier && qty >= campaign.moq && (
                          <div className="text-[10px] text-green-600 flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" />
                            Si Silver atteint → {formatPrice(qty * nextTier.pricePerUnit, nextTier.currency)} (-{nextTier.discountPct}%)
                          </div>
                        )}
                      </div>

                      <button onClick={handleJoin} className="btn-primary w-full justify-center text-base py-3.5">
                        Rejoindre la campagne →
                      </button>

                      <a href={buildWhatsAppLink(campaign, supplier)} target="_blank" rel="noreferrer"
                        className="btn-whatsapp w-full justify-center">
                        <WhatsAppIcon size={16} />
                        Commander via WhatsApp
                      </a>

                      <div className="flex items-center gap-1.5 justify-center text-xs text-gray-400">
                        <Lock className="h-3 w-3" />
                        Paiement placé en escrow · Remboursement garanti
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <div className="text-4xl mb-3">🎉</div>
                      <div className="font-bold text-[#1A1630] mb-1">Vous avez rejoint !</div>
                      <div className="text-sm text-gray-500 mb-4">
                        {formatQty(qty)} {campaign.unit} · {formatPrice(totalPrice, currentTier.currency)}
                      </div>
                      <div className="text-xs text-gray-400 p-3 rounded-xl" style={{ background: "#F8F2E8" }}>
                        Prochaine étape : paiement et blocage en escrow. Vous recevrez un lien de paiement sécurisé.
                      </div>
                    </div>
                  )}

                  {/* Escrow mini flow */}
                  <EscrowFlow joined={joined} />
                </div>
              </div>

              {/* Countdown */}
              <div className="mt-4 bg-white rounded-2xl p-4 card-shadow flex items-center gap-3">
                <Clock className="h-5 w-5 shrink-0" style={{ color: daysLeft <= 7 ? "#C14B1D" : "#6B7280" }} />
                <div>
                  <div className="font-bold text-[#1A1630] text-sm">{daysLeft} jours restants</div>
                  <div className="text-xs text-gray-400">Clôture le {new Date(campaign.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</div>
                </div>
                {daysLeft <= 7 && (
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: "#FEE2E2", color: "#C14B1D" }}>URGENT</span>
                )}
              </div>

              {/* Certifications */}
              {campaign.certifications.length > 0 && (
                <div className="mt-4 bg-white rounded-2xl p-4 card-shadow">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Certifications</div>
                  <div className="flex flex-wrap gap-1">
                    {campaign.certifications.map((c) => (
                      <span key={c} className="badge badge-blue text-xs">{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
