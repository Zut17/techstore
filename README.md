# TechStore

Site e-commerce d'informatique et d'électronique.
Stack : React (Vite) pour le frontend, Node + Express pour l'API, fichiers JSON pour les données.

## Équipe

| Membre | Rôle |
| --- | --- |
| Membre 1 | Fondations (backend de base, services API, AuthContext, styles globaux), Navbar, Footer, page d'accueil |
| Membre 2 | Catalogue : page Produits, filtres, fiche produit, ProductCard, produits associés |
| Membre 3 | Panier, comptes (inscription, connexion), commandes |

## Installation

```bash
# 1. Frontend (à la racine)
npm install

# 2. Backend
cd backend
npm install
cd ..

# 3. Variables d'environnement
cp .env.example .env
```

## Lancement (deux terminaux)

**Terminal 1 : frontend** (http://localhost:5173)

```bash
npm run dev
```

**Terminal 2 : API** (http://localhost:5000/api)

```bash
cd backend
npm run dev
```

## Contrat d'API

| Route | Rôle | Réponse |
| --- | --- | --- |
| GET /api/products?search=&category=&sort=&limit= | Liste filtrée (sort : price_asc ou price_desc) | Tableau de produits |
| GET /api/products/:id | Un produit | Produit, ou 404 {message} |
| GET /api/categories | Liste des catégories | ["PC portables", ...] |
| POST /api/auth/register | Inscription {name, email, password} | {user, token} |
| POST /api/auth/login | Connexion {email, password} | {user, token} |
| POST /api/orders | Créer une commande | {order} |
| GET /api/orders/mine | Mes commandes (token requis) | Tableau de commandes |

En cas d'erreur, l'API répond avec un code HTTP (400, 401, 404) et `{ "message": "..." }`.

## Navigation entre pages

- Recherche : `/produits?search=texte`
- Catégorie : `/produits?category=PC%20portables` (avec `encodeURIComponent`)

## Règles Git

- Ne jamais travailler directement sur `main`.
- Chaque matin : `git checkout main`, `git pull origin main`, `git checkout ma-branche`, `git merge main`.
- Sauvegarde : `git add .`, `git commit -m "feat: description"`, `git push origin ma-branche`.
- Les modifications des fichiers d'un autre membre se demandent à son propriétaire.