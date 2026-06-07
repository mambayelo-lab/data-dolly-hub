/**
 * Wordmarks inspirés (non identiques) des éditeurs réels — couleurs, formes et typographies
 * caractéristiques pour la reconnaissance visuelle. Utilisés à la fois sur le hub (grille
 * cliquable) et dans la topbar de chaque application mockée.
 */

import type { CSSProperties } from "react";

export type BrandKey =
  | "sap"
  | "cegid"
  | "shopify"
  | "manhattan"
  | "salesforce"
  | "o9"
  | "saje"
  | "agroware"
  | "qualiplus"
  | "tracelink"
  | "divento"
  | "dataforge";

type Props = { brand: BrandKey; size?: "sm" | "md" | "lg"; onDark?: boolean };

const SIZE: Record<NonNullable<Props["size"]>, { font: string; pad: string; h: string }> = {
  sm: { font: "text-[13px]", pad: "px-2 py-1", h: "h-6" },
  md: { font: "text-[15px]", pad: "px-2.5 py-1.5", h: "h-7" },
  lg: { font: "text-[22px]", pad: "px-3 py-2", h: "h-10" },
};

export function VendorLogo({ brand, size = "md", onDark = false }: Props) {
  const s = SIZE[size];
  const text = (color: string, style?: CSSProperties, children?: React.ReactNode) => (
    <span className={`${s.font} font-bold tracking-tight`} style={{ color: onDark ? "#fff" : color, ...style }}>
      {children}
    </span>
  );

  switch (brand) {
    case "sap":
      return (
        <span className={`inline-flex items-center ${s.h}`}>
          <span className={`${s.font} font-extrabold tracking-tight px-1.5 py-0.5 rounded-sm`} style={{ background: "#0a6ed1", color: "#fff" }}>
            SAP
          </span>
        </span>
      );
    case "cegid":
      return text("#e30613", { fontFamily: "var(--font-display)", fontStyle: "italic", letterSpacing: "-0.02em" }, "cegid");
    case "shopify":
      return (
        <span className={`inline-flex items-center gap-1.5 ${s.h}`}>
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="#95bf47"><path d="M19 6c-.3-.3-1-.2-1.3-.2-.2 0-2.4.7-2.4.7s-1.5-1.5-1.7-1.7c-.2-.2-.6-.2-.7-.1L11.6 5c-.7-2.1-2-3-3-3-.1 0-.2 0-.3.1C7.4 1.3 6.5 1 5.5 1.2 3.6 1.5 1.7 3.3 1 5.8L0 23l16-3 4-12c-.3-1-.7-1.7-1-2zM9.2 4.2c0-.1.1-.3.1-.5-.5.2-1.1.5-1.7 1 .2-.6.6-1.2 1-1.6.4-.3.8-.5 1.2-.5 0 .3-.1.6-.1 1 0 .2-.2.3-.5.6zM8 5.6c1-.3 1.9-.5 2.6-.4-.2.5-.4 1-.6 1.7-.6-.2-1.2-.3-1.7-.2-.6 0-.6.3-.6.4 0 .5 1.4 1 2.3 1.8 1.2 1 2 2 1.7 3.5-.4 1.9-1.6 3.2-3.3 3.3-2 .1-3.2-1.1-3.2-1.1L5.6 13s1.3 1 2.3 1c.6 0 1.3-.5 1.3-1.2 0-1-1.4-1.5-2.2-2.5C5.7 9 5.4 7.6 5.5 6.7 5.7 5.7 6.8 6 8 5.6z"/></svg>
          {text("#1a1a1a", { fontWeight: 700 }, "shopify")}
        </span>
      );
    case "manhattan":
      return (
        <span className={`inline-flex items-baseline ${s.h}`}>
          {text("#000", { fontWeight: 900, letterSpacing: "-0.01em" }, "MANHATTAN")}
          <span className={s.font} style={{ color: "#ef7d00", fontWeight: 900 }}>.</span>
        </span>
      );
    case "salesforce":
      return (
        <span className={`inline-flex items-center gap-1.5 ${s.h}`}>
          <span className="grid place-items-center rounded-full" style={{ background: "#00a1e0", color: "#fff", width: 22, height: 22, fontSize: 10, fontWeight: 900 }}>
            ☁
          </span>
          {text("#032d60", { fontWeight: 700, fontStyle: "italic" }, "salesforce")}
        </span>
      );
    case "o9":
      return (
        <span className={`inline-flex items-center ${s.h}`}>
          <span className="grid place-items-center rounded-full" style={{ background: "#7c3aed", color: "#fff", width: 26, height: 26, fontWeight: 900, fontSize: 12 }}>
            o9
          </span>
        </span>
      );
    case "saje":
      return text("#00ad4d", { fontWeight: 900, letterSpacing: "0.04em" }, "SAJE");
    case "agroware":
      return (
        <span className={`inline-flex items-center gap-1 ${s.h}`}>
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="#2e7d32"><path d="M8 1c-3 3-5 6-5 9a5 5 0 0 0 10 0c0-3-2-6-5-9zm0 14a4 4 0 0 1-4-4c0-2 1-4 4-7 3 3 4 5 4 7a4 4 0 0 1-4 4z"/></svg>
          {text("#2e7d32", { fontWeight: 700 }, "AgroWare")}
        </span>
      );
    case "qualiplus":
      return (
        <span className={`inline-flex items-baseline ${s.h}`}>
          {text("#0066b3", { fontWeight: 800 }, "Quali")}
          <span className={s.font} style={{ color: "#f39200", fontWeight: 800 }}>plus</span>
        </span>
      );
    case "tracelink":
      return (
        <span className={`inline-flex items-center gap-1 ${s.h}`}>
          <span className="rounded-full" style={{ background: "#003a70", width: 8, height: 8 }} />
          {text("#003a70", { fontWeight: 800 }, "TraceLink")}
        </span>
      );
    case "divento":
      return text("#0072ce", { fontWeight: 800, fontStyle: "italic" }, "Divento");
    case "dataforge":
      return (
        <span className={`inline-flex items-center gap-1 ${s.h}`}>
          <span className="block" style={{ width: 0, height: 0, borderLeft: "6px solid #ff3621", borderTop: "5px solid transparent", borderBottom: "5px solid transparent" }} />
          {text("#1f1212", { fontWeight: 800 }, "DataForge")}
        </span>
      );
  }
}

export const ALL_BRANDS: BrandKey[] = [
  "sap", "cegid", "shopify", "manhattan", "salesforce", "o9",
  "saje", "agroware", "qualiplus", "tracelink", "divento", "dataforge",
];
