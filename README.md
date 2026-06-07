# Aura SI Hub

Portail des SI témoins mockés pour démontrer **Aura Decision Compass** sur des cas
réels. 3 entreprises fictives, 18 applications avec identité visuelle fidèle aux
éditeurs et **données 100 % cohérentes cross-systèmes** (mêmes SKU, mêmes
commandes, mêmes clients propagés dans chaque app).

## Statut

- ✅ **Hub** (portail des 3 entreprises)
- ✅ **Secteur Retail · Maison Lumen** — 6 apps en profondeur :
  SAP S/4HANA · Cegid Retail Y2 · Shopify Admin · Manhattan Active Omni ·
  Salesforce Sales Cloud · o9 Demand Planning
- ⏳ **Agro-alimentaire · Fromagerie du Val** — à venir
- ⏳ **Manufacturing · Helvex** — à venir

## Routes

```
/                       Portail principal
/sector/retail          Vue d'ensemble du SI Maison Lumen
/apps/sap               SAP S/4HANA
/apps/cegid-y2          Cegid Retail Y2
/apps/shopify           Shopify Admin
/apps/manhattan         Manhattan Active Omni
/apps/salesforce        Salesforce Sales Cloud
/apps/o9                o9 Demand Planning
```

## Source unique de vérité

Tous les écrans consomment `src/data/maisonLumen.ts` :

- `products[]` — 14 SKU couvrant prêt-à-porter F/H, maroquinerie, accessoires, lifestyle
- `stores[]` — 10 points de vente (flagship, standard, outlet, e-shop FR/EU)
- `customers[]` — 8 clients dont 1 B2B (Hôtel Lutetia)
- `orders[]` — 10 commandes — la commande **SO-2026-018472** apparaît à l'identique
  dans Shopify (création), SAP (facturation), Manhattan (préparation) et
  Salesforce (historique)
- `stock[]` — stocks SKU × magasin (vue Manhattan)
- `forecast[]` — 8 semaines glissantes de prévisions o9

Modifier une donnée à un seul endroit la propage dans toutes les apps.

## Développement local

```bash
bun install
bun run dev
```

## Build statique

Le projet est une app TanStack Start. Pour un déploiement statique sur nginx
(Lightsail / VPS), build et copie du dossier sortie :

```bash
bun run build
# Sortie : .output/public/ (assets statiques) + .output/server/ (worker SSR)
```

### Option A — Déploiement statique (recommandé pour ce hub)

Le hub est entièrement statique côté usage (pas de server functions). Build
puis pré-rendre les routes :

```bash
bun run build
# Servir .output/public/ directement avec nginx
```

Exemple `nginx.conf` :

```nginx
server {
  listen 80;
  server_name hub.aura-mambaye.duckdns.org;
  root /var/www/aura-hub/public;
  index index.html;

  # SPA fallback pour TanStack Router côté client
  location / {
    try_files $uri $uri/ /index.html;
  }

  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

### Option B — Déploiement SSR (Node)

```bash
bun run build
node .output/server/index.mjs
# Reverse proxy nginx sur le port 3000
```

## Déploiement Lightsail (copie pour Claude)

```bash
# Sur la machine de build
bun run build
tar czf aura-hub.tar.gz .output/

# Sur le Lightsail
scp aura-hub.tar.gz ubuntu@lightsail:/tmp/
ssh ubuntu@lightsail
sudo mkdir -p /var/www/aura-hub
sudo tar xzf /tmp/aura-hub.tar.gz -C /var/www/aura-hub --strip-components=1
sudo systemctl reload nginx
```

## Ajouter un secteur

1. Ajouter le dataset `src/data/<secteur>.ts` sur le même modèle que `maisonLumen.ts`.
2. Créer les composants d'app dans `src/apps/<editeur>.tsx`.
3. Brancher dans `src/routes/apps.$appId.tsx` et `src/routes/sector.$slug.tsx`.
4. Activer le secteur dans `src/routes/index.tsx` (`status: "ready"`).

## Crédits

Mocks pédagogiques. Toutes les marques citées (SAP, Cegid, Shopify, Manhattan,
Salesforce, o9, Sage, Siemens, IBM, Dassault, Databricks, Trace One, Agriware,
Qualipro, Divalto) sont la propriété de leurs ayants droit respectifs.
