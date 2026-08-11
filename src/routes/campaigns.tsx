import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Filter, Search } from "lucide-react";
import { PageLayout } from "@/components/B2BLayout";
import { campaigns, sectors, getSupplier, getCurrentTier, getCampaignProgress, formatQty, formatPrice, buildWhatsAppLink, type Campaign } from "@/data/marketplace";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [{ title: "Campagnes d'achats groupés — Dolly Trade B2B" }],
  }),
  component: CampaignsPage,
});

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function CampaignRow({ c }: { c: Campaign }) {
  const supplier = getSupplier(c.supplierId);
  const sector = sectors.find((s) => s.id === c.sectorId);
  const tier = getCurrentTier(c);
  const progress = getCampaignProgress(c);
  const daysLeft = Math.max(0, Math.ceil((new Date(c.endDate).getTime() - Date.now()) / 86400000));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-shadow hover:card-shadow-lg transition-all" style={{ borderTop: `3px solid ${c.imageColor}` }}>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${c.imageColor}15` }}>
            {c.image}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              {c.status === "active" && <span className="badge badge-terra">🔴 En cours</span>}
              {c.status === "upcoming" && <span className="badge badge-blue">🔵 À venir</span>}
              {c.whatsappEnabled && <span className="badge badge-green flex items-center gap-1"><WhatsAppIcon size={10} />WhatsApp</span>}
              {sector && <span className="badge" style={{ background: `${c.imageColor}15`, color: c.imageColor }}>{sector.icon} {sector.name}</span>}
            </div>
            <h3 className="font-display font-bold text-[#1A1630] text-lg leading-snug mb-1 line-clamp-2">
              {c.title}
            </h3>
            <div className="text-sm text-gray-500">{supplier?.flag} {supplier?.name} · {supplier?.city}, {supplier?.country}</div>
          </div>
          <div className="shrink-0 text-right hidden sm:block">
            <div className="text-xs text-gray-400 mb-1">{daysLeft}j restants</div>
            <div className="font-bold text-xl" style={{ color: c.imageColor }}>
              {formatPrice(tier.pricePerUnit, tier.currency)}
            </div>
            <div className="text-xs text-gray-500">/{c.unit}</div>
            {tier.discount > 0 && (
              <div className="text-green-600 font-bold text-sm">-{tier.discount}%</div>
            )}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>{formatQty(c.currentQty, c.unit)} collectés</span>
            <span className="font-semibold text-gray-700">{progress.toFixed(0)}% de l'objectif</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{c.participantCount} participants</span>
            <span>Objectif : {formatQty(c.targetQty, c.unit)}</span>
          </div>
        </div>

        {/* Tiers mini */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {c.priceTiers.map((t) => {
            const isCurrentT = t === tier;
            return (
              <div key={t.label} className="px-3 py-1.5 rounded-lg text-center"
                style={isCurrentT
                  ? { background: "linear-gradient(135deg, #C14B1D, #E05520)", color: "white" }
                  : { background: "#F4F1EC" }}>
                <div className="text-[10px] font-bold">{t.label}</div>
                <div className="text-xs font-semibold">{formatPrice(t.pricePerUnit, t.currency)}</div>
                {t.discount > 0 && <div className="text-[10px]" style={isCurrentT ? { color: "rgba(255,255,255,0.8)" } : { color: "#C14B1D" }}>-{t.discount}%</div>}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex gap-3 items-center">
          <div className="text-xs text-gray-500">
            <span className="font-semibold">MOQ:</span> {c.moq.toLocaleString("fr-FR")} {c.unit}
          </div>
          <div className="text-xs text-gray-500">
            <span className="font-semibold">Origine:</span> {c.origin}
          </div>
          <div className="ml-auto flex gap-2">
            {c.whatsappEnabled && (
              <a href={buildWhatsAppLink(c)} target="_blank" rel="noopener noreferrer"
                className="btn-whatsapp text-xs" style={{ padding: "8px 12px" }}>
                <WhatsAppIcon size={14} /> Commander
              </a>
            )}
            <Link to="/campaigns/$id" params={{ id: c.id }}
              className="btn-primary text-xs" style={{ padding: "8px 16px" }}>
              Détails <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = campaigns.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.sectorId.includes(q);
    const matchSector = filterSector === "all" || c.sectorId === filterSector;
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    return matchSearch && matchSector && matchStatus;
  });

  const activeCampaigns = campaigns.filter((c) => c.status === "active");
  const upcomingCampaigns = campaigns.filter((c) => c.status === "upcoming");

  return (
    <PageLayout>
      {/* Header */}
      <div className="py-16 px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #1A1630, #2D2050)" }}>
        <div className="kente-bg absolute inset-0 opacity-5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 text-orange-400">Achats groupés</div>
          <h1 className="font-display text-4xl lg:text-5xl text-white mb-3">
            Campagnes en cours
          </h1>
          <p className="text-white/65 max-w-xl">
            Rejoignez une commande collective et bénéficiez de paliers de prix dégressifs. Plus la quantité augmente, plus le prix baisse pour tous.
          </p>
          <div className="flex gap-4 mt-6">
            <div className="stat-pill text-white text-sm">
              <span className="font-bold">{activeCampaigns.length}</span> <span className="text-white/55">campagnes actives</span>
            </div>
            <div className="stat-pill text-white text-sm">
              <span className="font-bold">{upcomingCampaigns.length}</span> <span className="text-white/55">à venir</span>
            </div>
            <div className="stat-pill text-white text-sm">
              <span className="font-bold">-42%</span> <span className="text-white/55">max réduction</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une campagne..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": "#C14B1D" } as React.CSSProperties}
            />
          </div>
          <select
            value={filterSector}
            onChange={(e) => setFilterSector(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="all">Tous les secteurs</option>
            {sectors.map((s) => (
              <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">🔴 En cours</option>
            <option value="upcoming">🔵 À venir</option>
            <option value="completed">✅ Terminées</option>
          </select>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-gray-500">{filtered.length} campagne{filtered.length !== 1 ? "s" : ""}</div>
          <Link to="/register/supplier" className="text-sm font-semibold flex items-center gap-1" style={{ color: "#C14B1D" }}>
            Lancer ma campagne <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Campaign list */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-4">🔍</div>
            <div className="font-semibold">Aucune campagne trouvée</div>
            <div className="text-sm mt-1">Essayez d'autres filtres</div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {filtered.map((c) => <CampaignRow key={c.id} c={c} />)}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
