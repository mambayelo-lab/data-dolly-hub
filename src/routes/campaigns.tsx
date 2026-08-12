import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Clock, Users, Shield, HelpCircle } from "lucide-react";
import { AppLayout } from "@/components/B2BLayout";
import { campaigns, sectors, getCurrentTier, getNextTier, formatPrice, type Campaign } from "@/data/marketplace";

export const Route = createFileRoute("/campaigns")({
  head: () => ({
    meta: [{ title: "Campagnes d'achats groupés — Dolly Trade B2B" }],
  }),
  component: CampaignsPage,
});

function getBadge(participantCount: number) {
  if (participantCount >= 40) return { text: "Populaire", color: "#C14B1D", bg: "rgba(193,75,29,0.1)" };
  if (participantCount >= 20) return { text: "Très demandé", color: "#B45309", bg: "rgba(232,168,32,0.12)" };
  return { text: "Nouveau", color: "#1B5E3E", bg: "rgba(27,94,62,0.1)" };
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

function CampaignCard({ c }: { c: Campaign }) {
  const tier = getCurrentTier(c);
  const next = getNextTier(c);
  const badge = getBadge(c.participantCount);
  const progress = next ? Math.min(100, (c.currentQty / next.minQty) * 100) : 100;
  const toNext = next ? next.minQty - c.currentQty : 0;

  return (
    <Link
      to="/campaigns/$id"
      params={{ id: c.id }}
      className="flex flex-col bg-white rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)", border: "1px solid #F0ECE6" }}
    >
      {/* Badge + countdown */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full" style={{ background: badge.bg, color: badge.color }}>
          {badge.text}
        </span>
        <span className="flex items-center gap-1 text-[11px] text-gray-400">
          <Clock size={11} />
          {c.status === "upcoming" ? "À venir" : countdown(c.endDate)}
        </span>
      </div>

      {/* Image + title */}
      <div className="px-4 pb-3 flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: `${c.imageColor}12` }}>
          {c.image}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-[#1A1630] leading-snug line-clamp-2">{c.title}</div>
          <div className="text-[11px] text-gray-400 mt-0.5 flex items-center gap-1">
            <Users size={10} />
            {c.participantCount} participants
          </div>
        </div>
      </div>

      {/* Dual price */}
      <div className="mx-4 mb-3 flex rounded-xl overflow-hidden border" style={{ borderColor: "#F0ECE6" }}>
        <div className="flex-1 px-3 py-2.5 bg-gray-50">
          <div className="text-[9px] uppercase tracking-wide text-gray-400 font-semibold mb-0.5">Palier actuel</div>
          <div className="text-[15px] font-bold text-[#1A1630]">{formatPrice(tier.pricePerUnit, tier.currency)}</div>
          <div className="text-[10px] text-gray-400">/{c.unit}</div>
        </div>
        {next ? (
          <div className="flex-1 px-3 py-2.5" style={{ background: "rgba(193,75,29,0.05)" }}>
            <div className="text-[9px] uppercase tracking-wide font-semibold mb-0.5" style={{ color: "#C14B1D" }}>Prochain palier</div>
            <div className="text-[15px] font-bold" style={{ color: "#C14B1D" }}>{formatPrice(next.pricePerUnit, next.currency)}</div>
            <div className="text-[10px]" style={{ color: "#C14B1D" }}>-{next.discount}%</div>
          </div>
        ) : (
          <div className="flex-1 px-3 py-2.5" style={{ background: "rgba(27,94,62,0.05)" }}>
            <div className="text-[9px] uppercase tracking-wide font-semibold mb-0.5" style={{ color: "#1B5E3E" }}>Palier Max</div>
            <div className="text-[13px] font-bold" style={{ color: "#1B5E3E" }}>-{tier.discount}%</div>
            <div className="text-[10px]" style={{ color: "#1B5E3E" }}>Atteint ✓</div>
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="px-4 pb-3">
        <div className="h-1.5 rounded-full overflow-hidden bg-gray-100 mb-1.5">
          <div className="h-full rounded-full" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C14B1D, #E8A820)" }} />
        </div>
        {next && (
          <div className="text-[10px] text-gray-400">
            encore <span className="font-semibold text-gray-600">{fmtQty(toNext)} {c.unit}</span> pour {next.label}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-auto px-4 pb-4">
        <div
          className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-bold text-white"
          style={{ background: c.status === "upcoming" ? "#6B7280" : "linear-gradient(135deg, #C14B1D, #E8A820)" }}
        >
          {c.status === "upcoming"
            ? "Bientôt disponible"
            : next
            ? `Palier suivant: ${formatPrice(next.pricePerUnit, next.currency)}`
            : "Rejoindre la campagne"}
          {c.status !== "upcoming" && <ArrowRight size={13} />}
        </div>
      </div>
    </Link>
  );
}

const CATEGORY_ALL = { id: "all", name: "Toutes les catégories", icon: "🏷️" };

function CampaignsPage() {
  const [activeSector, setActiveSector] = useState("all");
  const [sort, setSort] = useState<"endDate" | "participants" | "discount">("endDate");

  const filtered = campaigns
    .filter((c) => activeSector === "all" || c.sectorId === activeSector)
    .sort((a, b) => {
      if (sort === "endDate") return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      if (sort === "participants") return b.participantCount - a.participantCount;
      const maxA = Math.max(...a.priceTiers.map((t) => t.discount));
      const maxB = Math.max(...b.priceTiers.map((t) => t.discount));
      return maxB - maxA;
    });

  const activeCnt = campaigns.filter((c) => c.status === "active").length;
  const upcomingCnt = campaigns.filter((c) => c.status === "upcoming").length;

  return (
    <AppLayout>
      {/* ── Page header ── */}
      <div className="px-6 pt-7 pb-5 bg-white border-b" style={{ borderColor: "#F0ECE6" }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: "#C14B1D" }}>
              Achats groupés
            </div>
            <h1 className="font-display text-2xl font-bold text-[#1A1630] mb-1">Campagnes en cours</h1>
            <p className="text-gray-500 text-sm">
              Rejoignez une commande collective · prix dégressifs par paliers · escrow sécurisé
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <div className="px-3 py-1.5 rounded-lg text-[12px] text-gray-600 border" style={{ borderColor: "#F0ECE6" }}>
              <span className="font-bold text-[#1A1630]">{activeCnt}</span> actives
            </div>
            <div className="px-3 py-1.5 rounded-lg text-[12px] text-gray-600 border" style={{ borderColor: "#F0ECE6" }}>
              <span className="font-bold text-[#1A1630]">{upcomingCnt}</span> à venir
            </div>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 mt-5 overflow-x-auto pb-1 scrollbar-hide">
          {[CATEGORY_ALL, ...sectors].map((s) => {
            const isActive = activeSector === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSector(s.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  background: isActive ? "#1A1630" : "#F8F2E8",
                  color: isActive ? "white" : "#6B7280",
                  whiteSpace: "nowrap",
                }}
              >
                {s.icon} {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Filters bar ── */}
      <div className="px-6 py-3 bg-white border-b flex items-center justify-between gap-4" style={{ borderColor: "#F0ECE6" }}>
        <div className="text-[12px] text-gray-500">
          <span className="font-semibold text-gray-800">{filtered.length}</span> campagne{filtered.length !== 1 ? "s" : ""}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-gray-400">Trier par :</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="text-[12px] font-semibold text-gray-700 bg-transparent border-none focus:outline-none cursor-pointer"
          >
            <option value="endDate">Fin bientôt</option>
            <option value="participants">Plus de participants</option>
            <option value="discount">Remise max</option>
          </select>
        </div>
      </div>

      {/* ── Campaign grid ── */}
      <div className="px-6 py-6 pb-28" style={{ background: "#F8F2E8" }}>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="font-semibold">Aucune campagne dans cette catégorie</div>
            <button onClick={() => setActiveSector("all")} className="mt-3 text-sm font-semibold" style={{ color: "#C14B1D" }}>
              Voir toutes les campagnes
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <CampaignCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </div>

      {/* ── Bottom sticky bar ── */}
      <div
        className="fixed bottom-0 left-[220px] right-0 z-50 px-6 py-3 flex items-center gap-4 justify-between"
        style={{ background: "white", boxShadow: "0 -1px 0 #F0ECE6, 0 -8px 24px rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-4 overflow-x-auto">
          <span className="text-[12px] text-gray-500 shrink-0">
            💡 <span className="font-semibold text-gray-700">Plus nous sommes nombreux</span>, moins on paie
          </span>
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
            <Shield size={12} className="text-green-600" /> Paiement 100% sécurisé
          </div>
          <div className="hidden md:flex items-center gap-1 text-[11px] text-gray-400 shrink-0">
            🌍 Livraison mondiale
          </div>
        </div>
        <Link
          to="/"
          className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold"
          style={{ background: "#F8F2E8", color: "#1A1630" }}
        >
          <HelpCircle size={14} /> Comment ça marche ?
        </Link>
      </div>
    </AppLayout>
  );
}
