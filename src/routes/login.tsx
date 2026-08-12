import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff, Shield } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Connexion — Dolly Trade B2B" }] }),
  component: LoginPage,
});

function LoginPage() {
  const [role, setRole] = useState<"supplier" | "client">("client");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Veuillez remplir tous les champs"); return; }
    toast.success("Connexion réussie!", { description: `Bienvenue sur votre espace ${role === "supplier" ? "fournisseur" : "acheteur"}.` });
    setTimeout(() => navigate({ to: role === "supplier" ? "/supplier/dashboard" : "/client/dashboard" }), 800);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#FAF6EF" }}>
      {/* Left: form */}
      <div className="w-full max-w-md mx-auto flex flex-col justify-center px-8 py-12 lg:mx-0 lg:w-1/2">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-bold"
            style={{ background: "linear-gradient(135deg, #D4581C, #F5BE25)" }}>D</div>
          <div>
            <div className="font-display font-bold text-[#2B1507] text-base">DOLLY TRADE B2B</div>
            <div className="text-[10px] text-gray-400 tracking-wider">MARKETPLACE INTERNATIONALE</div>
          </div>
        </Link>

        <h1 className="font-display text-3xl text-[#2B1507] mb-2">Connexion</h1>
        <p className="text-gray-500 text-sm mb-8">Accédez à votre espace professionnel</p>

        {/* Role switcher */}
        <div className="flex gap-1 p-1 rounded-xl mb-6" style={{ background: "rgba(43,21,7,0.08)" }}>
          {(["client", "supplier"] as const).map((r) => (
            <button key={r} onClick={() => setRole(r)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
              style={role === r ? { background: "#2B1507", color: "white" } : { color: "#6B7280" }}>
              {r === "client" ? "🛒 Acheteur" : "🏭 Fournisseur"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="field-group">
            <label>Email professionnel</label>
            <input type="email" placeholder="vous@entreprise.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>

          <div className="field-group relative">
            <label>Mot de passe</label>
            <input type={showPwd ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-[34px] text-gray-400 hover:text-gray-600">
              {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded" />
              Se souvenir de moi
            </label>
            <a href="#" className="text-sm font-medium" style={{ color: "#D4581C" }}>Mot de passe oublié?</a>
          </div>

          <button type="submit" className="btn-primary w-full justify-center mt-2">
            Se connecter
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-sm text-gray-500">Pas encore de compte? </span>
          <Link to={role === "supplier" ? "/register/supplier" : "/register/client"}
            className="text-sm font-semibold" style={{ color: "#D4581C" }}>
            S'inscrire
          </Link>
        </div>

        <div className="mt-8 p-4 rounded-xl flex items-start gap-3" style={{ background: "rgba(21,128,61,0.06)", border: "1px solid rgba(21,128,61,0.15)" }}>
          <Shield className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
          <div className="text-xs text-green-700">Plateforme sécurisée SSL 256 bits · Données chiffrées · Conforme RGPD</div>
        </div>
      </div>

      {/* Right: brand panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center p-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #2B1507 0%, #3D1E0C 60%, #15803D 100%)" }}>
        <div className="kente-bg absolute inset-0 opacity-10" />
        <div className="relative z-10">
          <div className="text-4xl mb-6">🌍</div>
          <h2 className="font-display text-3xl font-bold mb-4">
            Le commerce B2B
            <br />
            <span style={{ color: "#F5BE25" }}>sans frontières</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-md">
            Rejoignez des milliers de fournisseurs et d'acheteurs professionnels. Campagnes d'achats groupés avec paliers de prix dégressifs jusqu'à -42%.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { icon: "📦", val: "12 000+", label: "Références produits" },
              { icon: "🏭", val: "1 240+", label: "Fournisseurs vérifiés" },
              { icon: "📱", val: "WhatsApp", label: "Intégré nativement" },
              { icon: "🌍", val: "180+", label: "Pays desservis" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-4 stat-pill">
                <div className="text-xl">{s.icon}</div>
                <div className="font-bold text-white">{s.val}</div>
                <div className="text-white/55 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
