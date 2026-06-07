/**
 * Coffre-fort de credentials — mock OAuth 2.0 / OIDC / API key par application.
 * Aucun secret réel : valeurs factices conçues pour montrer une vraie posture sécu
 * (PKCE, rotation de tokens, scopes minimaux, mTLS, JWT bearer) sans en exposer un.
 */

import type { BrandKey } from "@/components/VendorLogo";

export type AuthScheme = "OAuth 2.0 · Auth Code + PKCE" | "OAuth 2.0 · Client Credentials" | "OIDC" | "JWT Bearer · mTLS" | "API Key · HMAC";
export type Status = "Connecté" | "Expire bientôt" | "À reconnecter";

export type Credential = {
  appId: string;
  brand: BrandKey;
  appName: string;
  vendor: string;
  scheme: AuthScheme;
  authority: string;
  clientId: string;
  scopes: string[];
  tokenExpiresIn: string;
  lastRotated: string;
  status: Status;
  owner: string;
  vaultPath: string;
};

export const credentials: Credential[] = [
  // Retail
  { appId: "sap", brand: "sap", appName: "SAP S/4HANA", vendor: "SAP", scheme: "OAuth 2.0 · Client Credentials", authority: "auth.sap.aura/oauth2/token", clientId: "aura-svc-sap-prd-7c41", scopes: ["sales:read", "billing:read", "material:read"], tokenExpiresIn: "53 min", lastRotated: "2026-06-04", status: "Connecté", owner: "platform@aura.io", vaultPath: "vault://retail/sap" },
  { appId: "cegid-y2", brand: "cegid", appName: "Cegid Retail Y2", vendor: "Cegid", scheme: "OAuth 2.0 · Auth Code + PKCE", authority: "id.cegid.aura/oauth2", clientId: "aura-cegid-y2-9af2", scopes: ["pos:read", "loyalty:read", "stock:read"], tokenExpiresIn: "2h 14min", lastRotated: "2026-05-28", status: "Connecté", owner: "platform@aura.io", vaultPath: "vault://retail/cegid-y2" },
  { appId: "shopify", brand: "shopify", appName: "Shopify Admin", vendor: "Shopify", scheme: "OAuth 2.0 · Auth Code + PKCE", authority: "maison-lumen.myshopify.com/admin/oauth", clientId: "aura-app-mlumen-3b1c", scopes: ["read_orders", "read_products", "read_customers"], tokenExpiresIn: "Permanent", lastRotated: "2026-04-12", status: "Connecté", owner: "ecom@aura.io", vaultPath: "vault://retail/shopify" },
  { appId: "manhattan", brand: "manhattan", appName: "Manhattan Active Omni", vendor: "Manhattan", scheme: "JWT Bearer · mTLS", authority: "auth.eu.manh.aura", clientId: "MLUMEN-OMS-PRD", scopes: ["oms:read", "inventory:read", "ship-from-store:read"], tokenExpiresIn: "47 min", lastRotated: "2026-06-05", status: "Connecté", owner: "supply@aura.io", vaultPath: "vault://retail/manhattan" },
  { appId: "salesforce", brand: "salesforce", appName: "Salesforce Sales Cloud", vendor: "Salesforce", scheme: "OAuth 2.0 · Auth Code + PKCE", authority: "login.salesforce.com/services/oauth2", clientId: "3MVG9..aura..MLUMEN", scopes: ["api", "refresh_token", "offline_access"], tokenExpiresIn: "1h 38min", lastRotated: "2026-05-30", status: "Connecté", owner: "crm@aura.io", vaultPath: "vault://retail/salesforce" },
  { appId: "o9", brand: "o9", appName: "o9 Demand Planning", vendor: "o9 Solutions", scheme: "OIDC", authority: "tenant-mlumen.o9.aura/.well-known/openid", clientId: "aura-o9-planner-22e8", scopes: ["forecast:read", "plan:read", "scenario:write"], tokenExpiresIn: "6 min", lastRotated: "2026-05-20", status: "Expire bientôt", owner: "supply@aura.io", vaultPath: "vault://retail/o9" },

  // Agro
  { appId: "saje-x-cube", brand: "saje", appName: "Saje X-Cube", vendor: "Saje", scheme: "OAuth 2.0 · Client Credentials", authority: "id.saje.aura/connect/token", clientId: "aura-saje-fdv-prd", scopes: ["mo:read", "bom:read", "stock:read", "fi:read"], tokenExpiresIn: "59 min", lastRotated: "2026-06-02", status: "Connecté", owner: "platform@aura.io", vaultPath: "vault://agro/saje-x-cube" },
  { appId: "agroware", brand: "agroware", appName: "AgroWare 365", vendor: "AgroWare", scheme: "OAuth 2.0 · Auth Code + PKCE", authority: "auth.agroware365.aura", clientId: "aura-fdv-collect", scopes: ["collect:read", "producer:read", "lab:read"], tokenExpiresIn: "1h 02min", lastRotated: "2026-06-01", status: "Connecté", owner: "amont@aura.io", vaultPath: "vault://agro/agroware" },
  { appId: "qualiplus", brand: "qualiplus", appName: "QualiPlus QHSE", vendor: "QualiPlus", scheme: "API Key · HMAC", authority: "api.qualiplus.aura/v3", clientId: "ak_live_fdv_qhse_8f", scopes: ["nc:read", "audit:read", "capa:read"], tokenExpiresIn: "Permanent", lastRotated: "2026-03-18", status: "À reconnecter", owner: "qualite@aura.io", vaultPath: "vault://agro/qualiplus" },
  { appId: "tracelink", brand: "tracelink", appName: "TraceLink PLM", vendor: "TraceLink", scheme: "OIDC", authority: "id.tracelink.aura", clientId: "aura-fdv-plm", scopes: ["recipe:read", "spec:read", "supplier:read"], tokenExpiresIn: "2h 41min", lastRotated: "2026-05-25", status: "Connecté", owner: "rnd@aura.io", vaultPath: "vault://agro/tracelink" },
  { appId: "divento", brand: "divento", appName: "Divento Distribution", vendor: "Divento", scheme: "OAuth 2.0 · Client Credentials", authority: "auth.divento.aura/oauth2", clientId: "aura-divento-fdv", scopes: ["order:read", "tour:read", "invoice:read"], tokenExpiresIn: "44 min", lastRotated: "2026-06-03", status: "Connecté", owner: "adv@aura.io", vaultPath: "vault://agro/divento" },
  { appId: "dataforge", brand: "dataforge", appName: "DataForge Lakehouse", vendor: "DataForge", scheme: "OAuth 2.0 · Client Credentials", authority: "accounts.dataforge.aura/oidc", clientId: "aura-df-fdv-ws", scopes: ["sql:execute", "catalog:read", "model:read"], tokenExpiresIn: "1h 12min", lastRotated: "2026-06-01", status: "Connecté", owner: "data@aura.io", vaultPath: "vault://agro/dataforge" },
];
