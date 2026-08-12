import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Shield, Star, ChevronRight } from "lucide-react";
import { PageLayout } from "@/components/B2BLayout";
import { products, sectors, suppliers, getSupplier, getSector, formatPrice, type Product } from "@/data/marketplace";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Catalogue Produits B2B — Dolly Trade" }] }),
  component: ProductsPage,
});

function ProductCard({ p }: { p: Product }) {
  const supplier = getSupplier(p.supplierId);
  const sector = getSector(p.sectorId);

  return (
    <div className="bg-white rounded-2xl card-shadow overflow-hidden group hover:card-shadow-lg transition-all">
      <div className="h-1.5" style={{ background: p.imageColor }} />
      <div className="p-5">
        <div className="h-20 rounded-xl flex items-center justify-center text-5xl mb-4"
          style={{ background: `${p.imageColor}10` }}>
          {p.image}
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {sector && <span className="badge" style={{ background: `${p.imageColor}12`, color: p.imageColor }}>{sector.icon}</span>}
          <span className="badge badge-blue text-[10px]">{p.subcategory}</span>
          {p.inStock && <span className="badge badge-forest text-[10px]">✓ Stock</span>}
          {p.featured && <span className="badge badge-gold text-[10px]">⭐ Featured</span>}
        </div>
        <h3 className="font-semibold text-[#2B1507] text-sm leading-snug mb-1 line-clamp-2">{p.name}</h3>
        <div className="text-xs text-gray-500 mb-2">{supplier?.flag} {supplier?.name}</div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">{p.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs text-gray-400">À partir de</div>
            <div className="font-bold text-base" style={{ color: p.imageColor }}>
              {formatPrice(p.basePrice, p.currency)}
              <span className="text-xs font-normal text-gray-500 ml-1">/{p.unit}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">MOQ</div>
            <div className="text-sm font-semibold text-gray-700">{p.moq.toLocaleString("fr-FR")}</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {p.certifications.slice(0, 2).map((c) => (
            <span key={c} className="badge badge-forest text-[10px] flex items-center gap-0.5">
              <Shield className="h-2.5 w-2.5" />{c}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>🌍 {p.origin}</span>
          <Link to="/campaigns" className="font-semibold text-xs flex items-center gap-0.5 hover:underline"
            style={{ color: p.imageColor }}>
            Voir campagnes <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SupplierCard({ s }: { s: typeof suppliers[0] }) {
  return (
    <div className="bg-white rounded-2xl card-shadow p-5 flex items-start gap-4">
      <div className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-bold shrink-0"
        style={{ background: `linear-gradient(135deg, ${s.logoColor}, ${s.logoColor}aa)` }}>
        {s.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="font-semibold text-[#2B1507] text-sm">{s.name}</span>
          {s.verified && <span className="badge badge-forest text-[10px] flex items-center gap-0.5"><Shield className="h-2.5 w-2.5" />Vérifié</span>}
        </div>
        <div className="text-xs text-gray-500 mb-1">{s.flag} {s.city}, {s.country}</div>
        <p className="text-xs text-gray-500 line-clamp-2 mb-2">{s.description}</p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <Star className="h-3 w-3 fill-current" style={{ color: "#F5BE25" }} />
            <span className="font-semibold text-[#2B1507]">{s.rating}</span>
            <span className="text-gray-400">({s.reviewCount} avis)</span>
          </div>
          <span className="badge badge-terra text-[10px]">{s.activeCampaigns} campagnes</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {s.certifications.slice(0, 3).map((c) => (
            <span key={c} className="px-2 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600">{c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductsPage() {
  const [tab, setTab] = useState<"products" | "suppliers">("products");
  const [search, setSearch] = useState("");
  const [filterSector, setFilterSector] = useState("all");

  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      (filterSector === "all" || p.sectorId === filterSector) &&
      (!q || p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    );
  });

  const filteredSuppliers = suppliers.filter((s) => {
    const q = search.toLowerCase();
    return (
      (filterSector === "all" || s.sectorIds.includes(filterSector)) &&
      (!q || s.name.toLowerCase().includes(q) || s.country.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    );
  });

  return (
    <PageLayout>
      {/* Header */}
      <div className="py-14 px-6 lg:px-8" style={{ background: "linear-gradient(135deg, #15803D, #0D3B22)" }}>
        <div className="kente-bg absolute inset-0 opacity-5" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs font-bold uppercase tracking-widest mb-3 text-green-400">Catalogue B2B</div>
          <h1 className="font-display text-4xl lg:text-5xl text-white mb-3">Produits & Fournisseurs</h1>
          <p className="text-white/65 max-w-xl">
            Catalogue B2B international — 6 secteurs, 12 000+ références, 1 240+ fournisseurs vérifiés du monde entier.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-white card-shadow mb-6 w-fit">
          {(["products", "suppliers"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
              style={tab === t ? { background: "#2B1507", color: "white" } : { color: "#6B7280" }}>
              {t === "products" ? `📦 Produits (${filteredProducts.length})` : `🏭 Fournisseurs (${filteredSuppliers.length})`}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder={tab === "products" ? "Rechercher un produit..." : "Rechercher un fournisseur..."}
              value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none" />
          </div>
          <select value={filterSector} onChange={(e) => setFilterSector(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none">
            <option value="all">Tous les secteurs</option>
            {sectors.map((s) => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
          </select>
        </div>

        {/* Sector pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button onClick={() => setFilterSector("all")}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={filterSector === "all" ? { background: "#2B1507", color: "white" } : { background: "white", color: "#6B7280", border: "1px solid #E5E7EB" }}>
            Tout
          </button>
          {sectors.map((s) => (
            <button key={s.id} onClick={() => setFilterSector(s.id)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={filterSector === s.id ? { background: s.color, color: "white" } : { background: "white", color: "#6B7280", border: "1px solid #E5E7EB" }}>
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {tab === "products" && (
          filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">📦</div>
              <div className="font-semibold">Aucun produit trouvé</div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((p) => <ProductCard key={p.id} p={p} />)}
            </div>
          )
        )}

        {/* Suppliers grid */}
        {tab === "suppliers" && (
          filteredSuppliers.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <div className="text-5xl mb-4">🏭</div>
              <div className="font-semibold">Aucun fournisseur trouvé</div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {filteredSuppliers.map((s) => <SupplierCard key={s.id} s={s} />)}
            </div>
          )
        )}

        {/* Sector info cards */}
        <div className="mt-16">
          <h2 className="font-display font-bold text-[#2B1507] text-2xl mb-6">Explorer par secteur</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((s) => (
              <button key={s.id} onClick={() => { setFilterSector(s.id); setTab("products"); }}
                className="sector-card text-left" style={{ background: s.bgGradient }}>
                <div className="relative p-5 z-10">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <h3 className="font-display font-bold text-white text-base mb-1">{s.name}</h3>
                  <p className="text-white/65 text-xs mb-3 line-clamp-2">{s.description}</p>
                  <div className="flex gap-2">
                    <span className="badge text-[10px]" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                      {s.stats.suppliers} fournisseurs
                    </span>
                    <span className="badge text-[10px]" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
                      {s.stats.products.toLocaleString("fr-FR")} produits
                    </span>
                  </div>
                  <div className="mt-3 text-xs text-white/70">
                    {s.subcategories.slice(0, 3).join(" · ")}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
