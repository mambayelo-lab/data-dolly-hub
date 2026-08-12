import { Link, useLocation } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import {
  Home, Megaphone, LayoutGrid, MessageSquare, Package,
  CreditCard, Store, UserCircle, Settings, Search,
  Bell, ShoppingCart, Globe, ChevronDown, Shield, CheckCircle,
  Menu, X, Zap,
} from "lucide-react";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const MAIN_NAV = [
  { id: "home",      label: "Accueil",      Icon: Home,          href: "/" },
  { id: "campaigns", label: "Campagnes",    Icon: Megaphone,     href: "/campaigns", badge: undefined },
  { id: "catalogue", label: "Catalogue",    Icon: LayoutGrid,    href: "/products" },
  { id: "messages",  label: "Messages",     Icon: MessageSquare, href: "/whatsapp", badge: 5 },
  { id: "commandes", label: "Commandes",    Icon: Package,       href: "#" },
  { id: "paiements", label: "Paiements",    Icon: CreditCard,    href: "#" },
  { id: "suppliers", label: "Fournisseurs", Icon: Store,         href: "/products" },
] as const;

const BOTTOM_NAV = [
  { id: "profile",  label: "Profil",    Icon: UserCircle, href: "/register/client" },
  { id: "settings", label: "Paramètres", Icon: Settings,  href: "#" },
] as const;

/* ── Mobile bottom nav (5 key items) ─────────── */
const MOBILE_NAV = [
  { id: "home",      label: "Accueil",   Icon: Home,          href: "/" },
  { id: "campaigns", label: "Campagnes", Icon: Megaphone,     href: "/campaigns", badge: undefined },
  { id: "messages",  label: "WhatsApp",  Icon: MessageSquare, href: "/whatsapp", badge: 5 },
  { id: "commandes", label: "Commandes", Icon: Package,       href: "#" },
  { id: "profile",   label: "Profil",    Icon: UserCircle,    href: "/register/client" },
] as const;

/* ── Sidebar content ──────────────────────────── */
function SidebarContent({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const isActive = (href: string) =>
    href === "#" ? false : href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <>
      {/* Logo */}
      <div className="px-5 pt-6 pb-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <Link to="/" className="flex items-center gap-3" onClick={onClose}>
          <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>
            W
          </div>
          <div>
            <div className="text-white font-bold text-[14px] leading-none font-display">WAOUMAS</div>
            <div className="text-[9px] text-white/40 leading-none mt-1 tracking-widest">ACHATS GROUPÉS B2B</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-white/50 hover:text-white p-1">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {MAIN_NAV.map(({ id, label, Icon, href, badge }) => {
          const active = isActive(href);
          return (
            <Link key={id} to={href === "#" ? "/" : href} onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all"
              style={{ color: active ? "#F87B52" : "rgba(255,255,255,0.58)", background: active ? "rgba(212,88,28,0.18)" : "transparent" }}>
              <Icon size={17} />
              <span className="flex-1">{label}</span>
              {badge !== undefined && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                  style={{ background: "#D4581C", color: "white" }}>{badge}</span>
              )}
            </Link>
          );
        })}
        <div className="my-2 h-px" style={{ background: "rgba(255,255,255,0.07)" }} />
        {BOTTOM_NAV.map(({ id, label, Icon, href }) => {
          const active = isActive(href);
          return (
            <Link key={id} to={href === "#" ? "/" : href} onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all"
              style={{ color: active ? "#F87B52" : "rgba(255,255,255,0.45)", background: active ? "rgba(212,88,28,0.18)" : "transparent" }}>
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* WhatsApp CTA */}
      <div className="mx-3 mb-3 p-4 rounded-2xl" style={{ background: "rgba(37,211,102,0.08)", border: "1px solid rgba(37,211,102,0.18)" }}>
        <div className="flex items-center gap-2 mb-1.5">
          <span style={{ color: "#25D366" }}><WhatsAppIcon size={15} /></span>
          <span className="text-[12px] font-semibold text-white">Acheter sur WhatsApp</span>
        </div>
        <p className="text-[10px] text-white/45 mb-3 leading-relaxed">Faites vos achats directement depuis WhatsApp</p>
        <Link to="/whatsapp" onClick={onClose}
          className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-bold"
          style={{ background: "#25D366", color: "white" }}>
          <WhatsAppIcon size={11} /> Connecter WhatsApp
        </Link>
      </div>

      {/* User */}
      <div className="px-3 pb-5 border-t" style={{ borderColor: "rgba(255,255,255,0.07)", paddingTop: 12 }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer" style={{ background: "rgba(255,255,255,0.05)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>P</div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-[12px] font-semibold leading-none truncate">PharmaPlus SARL</div>
            <div className="text-white/40 text-[10px] mt-0.5">Acheteur professionnel</div>
          </div>
          <ChevronDown size={13} className="text-white/35 shrink-0" />
        </div>
      </div>
    </>
  );
}

/* ── Desktop sidebar ──────────────────────────── */
function AppSidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40" style={{ width: 220, background: "#2B1507" }}>
      <SidebarContent />
    </aside>
  );
}

/* ── Mobile sidebar overlay ───────────────────── */
function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* Drawer */}
      <aside className="absolute inset-y-0 left-0 flex flex-col" style={{ width: 260, background: "#2B1507" }}>
        <SidebarContent onClose={onClose} />
      </aside>
    </div>
  );
}

/* ── Mobile bottom nav ────────────────────────── */
function MobileBottomNav() {
  const location = useLocation();
  const isActive = (href: string) =>
    href === "#" ? false : href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch"
      style={{ background: "#2B1507", borderTop: "1px solid rgba(255,255,255,0.08)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      {MOBILE_NAV.map(({ id, label, Icon, href, badge }) => {
        const active = isActive(href);
        return (
          <Link key={id} to={href === "#" ? "/" : href}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 relative"
            style={{ color: active ? "#F5BE25" : "rgba(255,255,255,0.45)" }}>
            <Icon size={20} />
            <span className="text-[9px] font-medium">{label}</span>
            {badge !== undefined && (
              <span className="absolute top-1.5 right-[calc(50%-14px)] text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: "#D4581C", color: "white" }}>{badge}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

/* ── Top bar ──────────────────────────────────── */
function AppTopBar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="h-14 bg-white flex items-center px-4 gap-3 shrink-0 sticky top-0 z-30"
      style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
      {/* Hamburger (mobile/tablet) */}
      <button className="lg:hidden p-2 -ml-1 rounded-lg hover:bg-gray-100 transition-colors" onClick={onMenuClick}>
        <Menu size={20} className="text-gray-600" />
      </button>

      {/* Logo (mobile only) */}
      <Link to="/" className="lg:hidden flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>W</div>
        <span className="font-bold text-[14px]" style={{ color: "#2B1507" }}>WAOUMAS</span>
      </Link>

      {/* Search */}
      <div className="flex-1 max-w-md relative hidden sm:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
        <input
          placeholder="Rechercher un produit, secteur..."
          className="w-full pl-9 pr-4 py-2 text-[13px] rounded-xl border bg-gray-50 focus:outline-none focus:bg-white transition-all"
          style={{ borderColor: "#E5E7EB" }}
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <button className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] text-gray-600 hover:bg-gray-100 transition-colors">
          <Globe size={14} /> Fra <ChevronDown size={11} />
        </button>
        <div className="hidden md:block w-px h-5 bg-gray-200 mx-1" />
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <Bell size={18} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center"
            style={{ background: "#D4581C", color: "white" }}>2</span>
        </button>
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ShoppingCart size={18} className="text-gray-500" />
          <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full text-[8px] font-bold flex items-center justify-center"
            style={{ background: "#F5BE25", color: "#2B1507" }}>4</span>
        </button>
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>P</div>
          <div className="hidden xl:block">
            <div className="text-[12px] font-semibold text-gray-800 leading-none">PharmaPlus SARL</div>
            <div className="text-[10px] text-gray-400 mt-0.5">Acheteur pro</div>
          </div>
          <ChevronDown size={12} className="text-gray-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}

/* ── Right Panel ──────────────────────────────── */
export function HomepageRightPanel() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white border-l" style={{ borderColor: "#E9E1D3" }}>
      <div className="flex gap-2 p-4 border-b" style={{ borderColor: "#E9E1D3" }}>
        <Link to="/register/supplier"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold border transition-colors hover:bg-gray-50"
          style={{ borderColor: "#E5E7EB", color: "#374151" }}>
          <Store size={13} /> Espace Fournisseur
        </Link>
        <Link to="/supplier/dashboard"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-semibold text-white transition-colors"
          style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>
          <LayoutGrid size={13} /> Tableau de bord
        </Link>
      </div>

      <div className="mx-4 mt-4 rounded-2xl p-5 overflow-hidden relative" style={{ background: "linear-gradient(135deg, #2D1810 0%, #4A2510 100%)" }}>
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-20" style={{ background: "#F5BE25" }} />
        <div className="relative z-10">
          <h3 className="text-white font-display font-bold text-[15px] mb-1">Êtes-vous fournisseur ?</h3>
          <p className="text-white/60 text-[11px] mb-4 leading-relaxed">Lancez vos campagnes et vendez à des acheteurs du monde entier.</p>
          <div className="flex flex-col gap-2 mb-4">
            {["Créez vos campagnes", "Gérez vos paliers de prix", "Suivez vos ventes en temps réel"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle size={13} className="text-green-400 shrink-0" />
                <span className="text-[11px] text-white/75">{t}</span>
              </div>
            ))}
          </div>
          <Link to="/register/supplier"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[12px] font-bold"
            style={{ background: "#F5BE25", color: "#2B1507" }}>
            Devenir fournisseur →
          </Link>
        </div>
      </div>

      <div className="mx-4 mt-4 rounded-2xl overflow-hidden border" style={{ borderColor: "#E5E7EB" }}>
        <div className="px-3 py-2.5 flex items-center gap-2.5" style={{ background: "#25D366" }}>
          <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center text-white text-xs font-bold">W</div>
          <div>
            <div className="text-white font-semibold text-[12px]">WAOUMAS</div>
            <div className="text-green-100 text-[9px]">● En ligne</div>
          </div>
        </div>
        <div className="p-3" style={{ background: "#ECE5DD" }}>
          <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm max-w-[90%]">
            <div className="text-[10px] text-gray-700 font-semibold mb-2">🎯 Nouveau palier atteint !</div>
            <div className="flex items-center gap-2 p-2 rounded-lg mb-2" style={{ background: "#FAF6EF" }}>
              <span className="text-xl">🧤</span>
              <div>
                <div className="text-[10px] font-semibold text-gray-800">Gants médicaux nitrile</div>
                <div className="font-bold text-xs" style={{ color: "#D4581C" }}>8,50 € <span className="line-through text-gray-400 font-normal">12,00 €</span></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-gray-200">
                <div className="h-full rounded-full" style={{ width: "63%", background: "linear-gradient(90deg, #D4581C, #F5BE25)" }} />
              </div>
              <span className="ml-2 text-[9px] font-bold text-gray-500 shrink-0">63%</span>
            </div>
            <button className="mt-2 w-full py-1.5 rounded-lg text-[10px] font-bold text-center"
              style={{ background: "rgba(212,88,28,0.1)", color: "#D4581C" }}>
              Voir la campagne →
            </button>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-4 mb-4 rounded-2xl p-4 border" style={{ borderColor: "#E5E7EB", background: "#FAFAFA" }}>
        <div className="flex items-center gap-2 mb-2">
          <Shield size={14} className="text-green-600" />
          <span className="text-[12px] font-semibold text-gray-800">Paiement 100% sécurisé</span>
        </div>
        <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">Vos paiements sont protégés jusqu'à la livraison confirmée.</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {["VISA", "MC", "PayPal", "Stripe"].map((p) => (
            <span key={p} className="px-2.5 py-1 rounded-md text-[10px] font-bold border"
              style={{ borderColor: "#E5E7EB", color: "#374151", background: "white" }}>{p}</span>
          ))}
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: "#15803D" }}>
          <Shield size={11} /> Votre argent est bloqué jusqu'à la livraison
        </div>
      </div>
    </div>
  );
}

/* ── Shared layout shell ──────────────────────── */
function LayoutShell({ children, rightPanel }: { children: ReactNode; rightPanel?: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: "#FAF6EF" }}>
      {/* Desktop sidebar */}
      <AppSidebar />

      {/* Mobile sidebar overlay */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area — offset on lg+ */}
      <div className="lg:pl-[220px] flex flex-col min-h-screen">
        <AppTopBar onMenuClick={() => setSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden">
          {/* Page content */}
          <main className="flex-1 overflow-y-auto min-w-0 pb-16 lg:pb-0">
            {children}
          </main>

          {/* Right panel — only xl+ on homepage */}
          {rightPanel && (
            <aside className="hidden xl:flex flex-col shrink-0 sticky top-0"
              style={{ width: 300, height: "calc(100vh - 56px)", overflowY: "auto" }}>
              {rightPanel}
            </aside>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
}

/* ── Public layouts ───────────────────────────── */
export function AppLayout({ children }: { children: ReactNode }) {
  return <LayoutShell>{children}</LayoutShell>;
}

export function AppLayoutHome({ children, rightPanel }: { children: ReactNode; rightPanel?: ReactNode }) {
  return <LayoutShell rightPanel={rightPanel}>{children}</LayoutShell>;
}

export function PageLayout({ children }: { children: ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}

/* ── Dashboard layout ─────────────────────────── */
export function DashboardLayout({
  children, title, subtitle, role, navItems, activeItem, onNavClick, stats,
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
  const accentColor = role === "supplier" ? "#D4581C" : "#15803D";

  return (
    <div className="min-h-screen flex" style={{ background: "#FAF6EF" }}>
      <aside className="dash-sidebar shrink-0 hidden lg:flex flex-col" style={{ width: 256 }}>
        <div className="px-5 py-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>W</div>
            <div>
              <div className="text-white font-bold text-sm font-display">WAOUMAS</div>
              <div className="text-[9px] text-white/40 tracking-wider">ACHATS GROUPÉS B2B</div>
            </div>
          </Link>
        </div>
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
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => onNavClick(item.id)}
              className={`dash-nav-item w-full text-left ${activeItem === item.id ? "active" : ""}`}>
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background: accentColor, color: "white" }}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="px-4 py-4 border-t border-white/10">
          <Link to="/" className="dash-nav-item text-sm">← Retour à l'accueil</Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 gap-4 shrink-0 card-shadow">
          <div className="min-w-0">
            <h1 className="font-display text-base sm:text-lg font-bold text-gray-900 truncate">{title}</h1>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="text-gray-500" size={18} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full" style={{ background: "#D4581C" }} />
            </button>
            <div className="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)` }}>
              {role === "supplier" ? "F" : "A"}
            </div>
          </div>
        </header>
        {stats && (
          <div className="bg-white border-b border-gray-100 px-4 sm:px-6 py-3 flex items-center gap-4 sm:gap-6 overflow-x-auto">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2 shrink-0">
                <div className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-xs text-gray-500">{s.label}</span>
                <span className="text-sm font-bold text-gray-900">{s.value}</span>
              </div>
            ))}
          </div>
        )}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
