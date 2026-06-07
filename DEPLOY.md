# Déploiement sur Lightsail (hub.aura-mambaye.duckdns.org)

Le projet est un site **TanStack Start**. Pour l'héberger sur ton Lightsail
derrière nginx (à côté de ton hub actuel), tu as **deux modes** :

- **Mode A — Statique (recommandé, le plus simple)** : on prérend tout le site
  en HTML/JS/CSS, et nginx sert les fichiers. Pas de Node sur le serveur.
- **Mode B — Node SSR** : si plus tard tu veux des server functions
  (auth, vraies API). Plus complexe, pas nécessaire ici.

On part sur **Mode A**.

---

## 1. Préparer le projet (une seule fois)

Dans `vite.config.ts` (ou via la CLI), activer le prérender pour générer du
HTML statique. TanStack Start expose `prerender: { enabled: true, crawlLinks: true }`.

Le build produit alors un dossier `dist/` avec :
- `dist/client/` — assets (JS/CSS/images)
- `dist/server/` — handler Node (qu'on ignore en Mode A)
- `dist/prerender/` ou les HTML générés à la racine selon la config

> Demande à Claude (sur Lightsail) de lancer `npm install && npm run build`,
> puis de ne garder que le dossier qui contient les `index.html` et les
> assets.

## 2. Workflow de mise à jour (le plus simple)

**Recette en 3 commandes** que Claude exécute sur ton Lightsail à chaque
update :

```bash
cd /var/www/aura-si-hub          # repo cloné une fois depuis GitHub
git pull
npm ci && npm run build
sudo rsync -a --delete dist/client/ /var/www/aura-si-hub-public/
sudo systemctl reload nginx
```

C'est tout. Le `rsync --delete` garantit qu'on n'a plus de vieux fichiers.

## 3. Le bloc nginx (à ajouter à côté de ton hub actuel)

Sur ton Lightsail dans `/etc/nginx/sites-available/aura-hub.conf` :

```nginx
server {
  listen 443 ssl http2;
  server_name hub.aura-mambaye.duckdns.org;

  # ssl_certificate / ssl_certificate_key : ceux que Certbot a déjà posés

  root /var/www/aura-si-hub-public;
  index index.html;

  # SPA fallback : toutes les routes TanStack tombent sur index.html
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache long sur les assets hashés
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

Active-le :
```bash
sudo ln -s /etc/nginx/sites-available/aura-hub.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 4. Récupérer le code sur Lightsail (une seule fois)

Tu as deux options pour transférer le projet depuis Lovable vers Lightsail :

### Option A — via GitHub (recommandée)
1. Dans Lovable, clique **GitHub → Connect to GitHub** et pousse le repo.
2. Sur le Lightsail :
   ```bash
   sudo mkdir -p /var/www && cd /var/www
   sudo git clone https://github.com/<toi>/<repo>.git aura-si-hub
   sudo chown -R $USER /var/www/aura-si-hub
   sudo mkdir -p /var/www/aura-si-hub-public
   ```
3. Ensuite, les MAJ = juste **`git pull && npm run build && rsync`** (étape 2).

### Option B — Lovable publish + zip
1. Clique **Publish** dans Lovable → tu obtiens une URL `*.lovable.app`.
2. Tu peux soit garder l'URL Lovable directement (puis CNAME ton DuckDNS
   dessus — plus simple), soit télécharger un zip du repo et `scp` vers
   Lightsail.

## 5. Pour Claude — résumé minimal

Donne-lui ce prompt :

> Sur mon Lightsail (`ssh ubuntu@<ip>`), récupère le repo depuis
> `https://github.com/<moi>/aura-si-hub`, clone-le dans
> `/var/www/aura-si-hub`, fais `npm ci && npm run build`, puis `rsync -a
> --delete dist/client/ /var/www/aura-si-hub-public/`. Crée ensuite le
> vhost nginx `hub.aura-mambaye.duckdns.org` (template ci-dessus) avec
> Certbot SSL, et vérifie avec `curl -I https://hub.aura-mambaye.duckdns.org`.
> Pour les futures MAJ, écris-moi un script `deploy.sh` qui ré-exécute les
> 4 commandes de l'étape 2.

C'est la version la plus courte qui fonctionne. Si plus tard tu veux du
SSR (server functions, auth Lovable Cloud), passe en Mode B (Node + pm2
+ nginx reverse proxy port 3000).
