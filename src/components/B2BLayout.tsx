import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, ChevronDown, Bell, Search } from "lucide-react";

/* WhatsApp SVG icon */
function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const navLinks = [
  { label: "Secteurs", href: "/products", hasDropdown: true },
  { label: "Campagnes", href: "/campaigns" },
  { label: "WhatsApp", href: "/whatsapp" },
  { label: "Fournisseurs", href: "/products?tab=suppliers" },
];

export function B2BNavbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + "/");

  return (
    <nav className="b2b-nav fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "linear-gradient(135deg, #C14B1D, #E8A820)" }}>
              D
            </div>
            <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-400 border-2 border-[#1A1630]" />
          </div>
          <div>
            <div className="text-white font-bold text-[15px] leading-none font-display">DOLLY TRADE</div>
            <div className="text-[10px] text-white/50 leading-none mt-0.5 tracking-wider">MARKETPLACE B2B</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                color: isActive(link.href) ? "white" : "rgba(255,255,255,0.65)",
                background: isActive(link.href) ? "rgba(193,75,29,0.25)" : "transparent",
              }}
            >
              {link.label}
              {link.hasDropdown && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="/whatsapp"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: "rgba(37,211,102,0.15)", color: "#25D366", border: "1px solid rgba(37,211,102,0.25)" }}
          >
            <WhatsAppIcon size={15} /> Commander
          </a>
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            Connexion
          </Link>
          <Link
            to="/register/supplier"
            className="px-4 py-2 rounded-lg text-sm font-bold text-[#1A1630] transition-all"
            style={{ background: "linear-gradient(135deg, #E8A820, #F5C842)" }}
          >
            Devenir fournisseur
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10" style={{ background: "rgba(26,22,48,0.98)" }}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-white/10 my-2" />
            <Link to="/login" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl text-sm font-medium text-white/75 hover:bg-white/10 hover:text-white">
              Connexion
            </Link>
            <Link to="/register/supplier" onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-bold text-center text-[#1A1630]"
              style={{ background: "linear-gradient(135deg, #E8A820, #F5C842)" }}>
              Devenir fournisseur
            </Link>
            <Link to="/register/client" onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl text-sm font-semibold text-center text-white border border-white/20 hover:bg-white/10">
              S'inscrire comme acheteur
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export function B2BFooter() {
  return (
    <footer style={{ background: "#1A1630", color: "rgba(255,255,255,0.65)" }}>
      <div className="h-1" style={{ background: "linear-gradient(90deg, #C14B1D 0%, #E8A820 33%, #1B5E3E 66%, #C14B1D 100%)" }} />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                style={{ background: "linear-gradient(135deg, #C14B1D, #E8A820)" }}>D</div>
              <div>
                <div className="text-white font-bold text-lg font-display">DOLLY TRADE B2B</div>
                <div className="text-xs text-white/40 tracking-wider">MARKETPLACE B2B INTERNATIONALE</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              Plateforme B2B spécialisée dans les achats groupés à paliers dégressifs. Rejoignez une campagne, payez via escrow sécurisé et bénéficiez de prix de gros.
            </p>
            <a href="/whatsapp" className="btn-whatsapp inline-flex text-sm" style={{ padding: "10px 20px" }}>
              <WhatsAppIcon size={18} /> Commander via WhatsApp
            </a>
          </div>

          {/* Secteurs */}
          <div>
            <div className="text-white font-semibold text-sm mb-4 tracking-wide">SECTEURS</div>
            <div className="flex flex-col gap-2.5 text-sm">
              {["Santé & Cosmétologie", "Pièces Mécaniques", "Agro-Alimentaire", "Construction & BTP", "Électronique & Tech", "Textiles Pro"].map((s) => (
                <Link key={s} to="/products" className="hover:text-white transition-colors">{s}</Link>
              ))}
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <div className="text-white font-semibold text-sm mb-4 tracking-wide">PLATEFORME</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <Link to="/campaigns" className="hover:text-white transition-colors">Campagnes en cours</Link>
              <Link to="/register/supplier" className="hover:text-white transition-colors">Devenir fournisseur</Link>
              <Link to="/register/client" className="hover:text-white transition-colors">S'inscrire acheteur</Link>
              <Link to="/supplier/dashboard" className="hover:text-white transition-colors">Espace fournisseur</Link>
              <Link to="/client/dashboard" className="hover:text-white transition-colors">Espace acheteur</Link>
              <Link to="/whatsapp" className="hover:text-white transition-colors">Intégration WhatsApp</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-white/35">
            © 2026 Dolly Trade B2B — Tous droits réservés · Plateforme sécurisée · 🌍 Mondiale
          </div>
          <div className="flex items-center gap-6 text-xs text-white/35">
            <a href="#" className="hover:text-white/70 transition-colors">Conditions générales</a>
            <a href="#" className="hover:text-white/70 transition-colors">Confidentialité</a>
            <a href="#" className="hover:text-white/70 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageLayout({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <>
      <B2BNavbar />
      <div className={`pt-16 min-h-screen ${className}`} style={{ background: "#F8F2E8" }}>
        {children}
      </div>
      <B2BFooter />
    </>
  );
}

/* Dashboard layout */
export function DashboardLayout({
  children,
  title,
  subtitle,
  role,
  navItems,
  activeItem,
  onNavClick,
  stats,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
  role: "supplier" | "client";
  navItems: { id: string; label: string; icon: string; badge?: number }[];
  activeItem: string;
  onNavClick: (id: string) => void;
  stats?: { label: string; value: string; color: string }[];
}) {
  const accentColor = role === "supplier" ? "#C14B1D" : "#1B5E3E";

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F2E8" }}>
      {/* Sidebar */}
      <aside className="dash-sidebar shrink-0 flex flex-col" style={{ width: 256 }}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg, #C14B1D, #E8A820)" }}>D</div>
            <div>
              <div className="text-white font-bold text-sm font-display">DOLLY TRADE</div>
              <div className="text-[9px] text-white/40 tracking-wider">B2B MARKETPLACE</div>
            </div>
          </Link>
        </div>

        {/* User */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}99)` }}>
              {role === "supplier" ? "F" : "A"}
            </div>
            <div>
              <div className="text-white text-sm font-semibold">{role === "supplier" ? "Espace Fournisseur" : "Espace Acheteur"}</div>
              <div className="text-white/45 text-[11px]">{subtitle}</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className={`dash-nav-item w-full text-left ${activeItem === item.id ? "active" : ""}`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: accentColor, color: "white" }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-white/10">
          <Link to="/" className="dash-nav-item text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-6 gap-4 shrink-0 card-shadow">
          <div>
            <h1 className="font-display text-lg font-bold text-gray-900">{title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="h-4.5 w-4.5 text-gray-500" style={{ width: 18, height: 18 }} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full" style={{ background: "#C14B1D" }} />
            </button>
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)` }}>
              {role === "supplier" ? "F" : "A"}
            </div>
          </div>
        </header>

        {/* Stats bar */}
        {stats && (
          <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-6 overflow-x-auto">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-gray-500">{s.label}</span>
                <span className="text-sm font-bold text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
