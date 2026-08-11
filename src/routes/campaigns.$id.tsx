import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Shield, Clock, MapPin, Package, CheckCircle, Users, AlertCircle, ChevronRight } from "lucide-react";
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

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
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
  const similarCampaigns = campaigns.filter((c) => c.sectorId === campaign.sectorId && c.id !== campaign.id).slice(0, 2);

  const handleJoin = () => {
    if (qty < campaign.moq) {
      toast.error(`Quantité minimum : ${campaign.moq.toLocaleString("fr-FR")} ${campaign.unit}`);
      return;
    }
    setJoined(true);
    toast.success("Vous avez rejoint la campagne!", {
      description: `${qty.toLocaleString("fr-FR")} ${campaign.unit} · ${formatPrice(totalPrice, currentTier.currency)}. Vous recevrez une confirmation WhatsApp.`,
    });
  };

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Accueil</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/campaigns" className="hover:text-gray-700">Campagnes</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-gray-800 font-medium line-clamp-1 max-w-64">{campaign.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Hero card */}
            <div className="bg-white rounded-2xl overflow-hidden card-shadow">
              <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${campaign.imageColor}, ${campaign.imageColor}70)` }} />
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-16 w-16 rounded-2xl flex items-center justify-center text-4xl shrink-0"
                    style={{ background: `${campaign.imageColor}15` }}>
                    {campaign.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {campaign.status === "active" && <span className="badge badge-terra">🔴 En cours</span>}
                      {campaign.whatsappEnabled && <span className="badge badge-green flex items-center gap-1"><WhatsAppIcon size={10} />WhatsApp</span>}
                      {sector && <span className="badge badge-blue">{sector.icon} {sector.name}</span>}
                    </div>
                    <h1 className="font-display font-bold text-[#1A1630] text-xl lg:text-2xl leading-snug">
                      {campaign.title}
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">{campaign.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {campaign.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">#{tag}</span>
                  ))}
                  {campaign.certifications.map((cert) => (
                    <span key={cert} className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                      style={{ background: "rgba(27,94,62,0.08)", color: "#1B5E3E" }}>
                      <Shield className="h-3 w-3" />{cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress & Paliers */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="font-display font-bold text-[#1A1630] text-lg mb-4">Avancement & Paliers de prix</h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-[#1A1630]">{formatQty(campaign.currentQty, campaign.unit)}</span>
                  <span className="text-sm font-bold" style={{ color: campaign.imageColor }}>{progress.toFixed(1)}%</span>
                </div>
                <div className="progress-track" style={{ height: 12 }}>
                  <div className="progress-fill" style={{ width: `${progress}%`, height: "100%" }} />
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">{campaign.participantCount} participants</span>
                  <span className="text-xs text-gray-400">Objectif : {formatQty(campaign.targetQty, campaign.unit)}</span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {campaign.priceTiers.map((tier) => {
                  const isCurrent = tier === currentTier;
                  const isAchieved = campaign.currentQty >= tier.minQty;
                  return (
                    <div key={tier.label} className="relative rounded-xl p-4 border-2 transition-all"
                      style={isCurrent
                        ? { background: "linear-gradient(135deg, #C14B1D, #E05520)", borderColor: "#C14B1D", color: "white" }
                        : { background: isAchieved ? "rgba(27,94,62,0.06)" : "#F9F7F4", borderColor: isAchieved ? "rgba(27,94,62,0.2)" : "transparent" }}>
                      {isCurrent && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white"
                          style={{ color: "#C14B1D" }}>
                          PALIER ACTUEL
                        </div>
                      )}
                      <div className="font-bold text-base mb-1" style={isCurrent ? { color: "white" } : { color: "#1A1630" }}>
                        {tier.label}
                        {isAchieved && !isCurrent && <CheckCircle className="inline h-3.5 w-3.5 text-green-500 ml-2" />}
                      </div>
                      <div className="text-2xl font-bold mb-0.5" style={isCurrent ? { color: "white" } : { color: campaign.imageColor }}>
                        {formatPrice(tier.pricePerUnit, tier.currency)}
                        <span className="text-sm font-normal ml-1" style={isCurrent ? { color: "rgba(255,255,255,0.7)" } : { color: "#6B7280" }}>
                          /{campaign.unit}
                        </span>
                      </div>
                      <div className="text-xs" style={isCurrent ? { color: "rgba(255,255,255,0.75)" } : { color: "#6B7280" }}>
                        Dès {tier.minQty.toLocaleString("fr-FR")} {campaign.unit}
                        {tier.maxQty && ` jusqu'à ${tier.maxQty.toLocaleString("fr-FR")}`}
                        {!tier.maxQty && "+"}
                      </div>
                      {tier.discount > 0 && (
                        <div className="mt-2 text-sm font-bold" style={isCurrent ? { color: "rgba(255,255,255,0.9)" } : { color: "#1B5E3E" }}>
                          Économie : -{tier.discount}%
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {nextTier && (
                <div className="mt-4 p-3 rounded-xl flex items-center gap-3"
                  style={{ background: "rgba(232,168,32,0.1)", border: "1px solid rgba(232,168,32,0.2)" }}>
                  <AlertCircle className="h-4 w-4 shrink-0" style={{ color: "#E8A820" }} />
                  <div className="text-sm">
                    <span className="font-semibold" style={{ color: "#9A6900" }}>Prochain palier : </span>
                    <span style={{ color: "#9A6900" }}>
                      encore {formatQty(nextTier.minQty - campaign.currentQty, campaign.unit)} pour atteindre le palier <strong>{nextTier.label}</strong> à {formatPrice(nextTier.pricePerUnit, nextTier.currency)}/{campaign.unit} (-{nextTier.discount}%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Supplier info */}
            {supplier && (
              <div className="bg-white rounded-2xl card-shadow p-6">
                <h2 className="font-display font-bold text-[#1A1630] text-lg mb-4">Fournisseur</h2>
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-xl flex items-center justify-center text-lg font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${supplier.logoColor}, ${supplier.logoColor}aa)` }}>
                    {supplier.logo}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-display font-bold text-[#1A1630] text-lg">{supplier.name}</span>
                      {supplier.verified && (
                        <span className="badge badge-forest flex items-center gap-1">
                          <Shield className="h-3 w-3" /> Vérifié
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{supplier.flag} {supplier.city}, {supplier.country} · Fondé en {supplier.established}</div>
                    <p className="text-sm text-gray-600 mb-3">{supplier.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {supplier.certifications.map((cert) => (
                        <span key={cert} className="badge badge-blue text-[11px]">{cert}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                  <div className="text-center">
                    <div className="font-bold text-lg" style={{ color: "#C14B1D" }}>{supplier.rating}</div>
                    <div className="text-xs text-gray-500">Note moy.</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg" style={{ color: "#C14B1D" }}>{supplier.reviewCount}</div>
                    <div className="text-xs text-gray-500">Avis</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-lg" style={{ color: "#C14B1D" }}>{supplier.activeCampaigns}</div>
                    <div className="text-xs text-gray-500">Campagnes actives</div>
                  </div>
                </div>
              </div>
            )}

            {/* Infos pratiques */}
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="font-display font-bold text-[#1A1630] text-lg mb-4">Informations pratiques</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <Package className="h-4 w-4" />, label: "Quantité min.", value: `${campaign.moq.toLocaleString("fr-FR")} ${campaign.unit}` },
                  { icon: <MapPin className="h-4 w-4" />, label: "Origine", value: campaign.origin },
                  { icon: <Clock className="h-4 w-4" />, label: "Clôture", value: `${new Date(campaign.endDate).toLocaleDateString("fr-FR")} (${daysLeft}j)` },
                  { icon: <Users className="h-4 w-4" />, label: "Participants", value: `${campaign.participantCount} entreprises` },
                ].map((info) => (
                  <div key={info.label} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#F9F7F4" }}>
                    <div className="text-gray-400">{info.icon}</div>
                    <div>
                      <div className="text-xs text-gray-500">{info.label}</div>
                      <div className="text-sm font-semibold text-[#1A1630]">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-xs text-gray-500 mb-2 font-semibold">Zones de livraison</div>
                <div className="flex flex-wrap gap-2">
                  {campaign.deliveryZones.map((z) => (
                    <span key={z} className="badge badge-gold">{z}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Order widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {/* Order box */}
              <div className="bg-white rounded-2xl card-shadow-lg overflow-hidden">
                <div className="h-2" style={{ background: `linear-gradient(90deg, ${campaign.imageColor}, ${campaign.imageColor}80)` }} />
                <div className="p-5">
                  <div className="text-center mb-4">
                    <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">Prix actuel</div>
                    <div className="font-bold text-3xl" style={{ color: campaign.imageColor }}>
                      {formatPrice(currentTier.pricePerUnit, currentTier.currency)}
                    </div>
                    <div className="text-sm text-gray-500">/{campaign.unit}</div>
                    {currentTier.discount > 0 && (
                      <div className="inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold text-white"
                        style={{ background: "#1B5E3E" }}>
                        Économie -{currentTier.discount}%
                      </div>
                    )}
                  </div>

                  {/* Qty input */}
                  {!joined && (
                    <div className="field-group mb-4">
                      <label>Ma quantité ({campaign.unit})</label>
                      <input
                        type="number"
                        min={campaign.moq}
                        step={campaign.moq}
                        value={qty}
                        onChange={(e) => setQty(Math.max(campaign.moq, Number(e.target.value)))}
                      />
                      <div className="text-xs text-gray-400 mt-1">Min. {campaign.moq.toLocaleString("fr-FR")} {campaign.unit}</div>
                    </div>
                  )}

                  {/* Total */}
                  {!joined && qty > 0 && (
                    <div className="p-3 rounded-xl mb-4" style={{ background: "#F9F7F4" }}>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Total estimé</span>
                        <span className="font-bold text-[#1A1630]">{formatPrice(totalPrice, currentTier.currency)}</span>
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Prix indicatif · final selon palier atteint</div>
                    </div>
                  )}

                  {joined ? (
                    <div className="text-center p-4 rounded-xl mb-4" style={{ background: "rgba(27,94,62,0.08)", border: "1px solid rgba(27,94,62,0.2)" }}>
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <div className="font-bold text-green-700 mb-1">Commande enregistrée!</div>
                      <div className="text-xs text-green-600">Vous recevrez une confirmation WhatsApp</div>
                    </div>
                  ) : (
                    <button onClick={handleJoin} className="btn-primary w-full justify-center mb-3">
                      Rejoindre la campagne <ChevronRight className="h-4 w-4" />
                    </button>
                  )}

                  {campaign.whatsappEnabled && (
                    <a href={buildWhatsAppLink(campaign)} target="_blank" rel="noopener noreferrer"
                      className="btn-whatsapp w-full justify-center">
                      <WhatsAppIcon size={18} /> Commander via WhatsApp
                    </a>
                  )}

                  <div className="mt-4 text-xs text-gray-400 text-center">
                    🔒 Paiement sécurisé · Documents export fournis
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div className="mt-4 p-4 rounded-2xl text-center" style={{ background: "#1A1630" }}>
                <div className="text-white/60 text-xs mb-1 uppercase tracking-wide">Clôture dans</div>
                <div className="text-white font-bold text-2xl font-display">{daysLeft} jours</div>
                <div className="text-white/40 text-xs mt-0.5">
                  {new Date(campaign.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                </div>
              </div>

              {/* Participants */}
              <div className="mt-4 p-4 rounded-2xl bg-white card-shadow">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-[#1A1630]">{campaign.participantCount} acheteurs</div>
                  <div className="flex -space-x-2">
                    {["🇸🇳", "🇨🇮", "🇳🇬", "🇬🇭", "🇨🇲"].map((flag, i) => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-white flex items-center justify-center text-sm bg-gray-100">
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">de 18 pays différents</div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar campaigns */}
        {similarCampaigns.length > 0 && (
          <div className="mt-12">
            <h2 className="font-display font-bold text-[#1A1630] text-xl mb-6">Campagnes similaires</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {similarCampaigns.map((c) => {
                const t = getCurrentTier(c);
                return (
                  <Link key={c.id} to="/campaigns/$id" params={{ id: c.id }}
                    className="bg-white rounded-2xl card-shadow p-5 flex items-start gap-4 hover:card-shadow-lg transition-all">
                    <div className="text-3xl">{c.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#1A1630] text-sm line-clamp-2 mb-1">{c.title}</div>
                      <div className="font-bold" style={{ color: c.imageColor }}>{formatPrice(t.pricePerUnit, t.currency)}/{c.unit}</div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 shrink-0 mt-1" />
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
