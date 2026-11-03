# TechStore

Site e-commerce d'informatique et d'électronique, réalisé dans le cadre du cours de développement d'interfaces front-end.

Stack : React (Vite) et React Router. Pas de serveur ni d'API : les produits sont dans des fichiers JSON, le panier, les comptes et les commandes sont enregistrés dans le localStorage du navigateur.

## Équipe

| Membre | Rôle |
| --- | --- |
| Membre 1 | Fondations (données, services de base, contextes, styles globaux, routes), Navbar, Footer, Accueil, page 404, images, relecture et fusion des Pull Requests |
| Membre 2 | Catalogue : service produits complet, ProductCard, page Produits (filtres, tri, pagination), fiche produit, page Aide et contact |
| Membre 3 | Comptes et commandes : services auth et commandes, panier, page Commande, Connexion et inscription, Mes commandes |

## Installation et lancement

```bash
npm install
npm run dev        # développement : http://localhost:5173
npm run build      # version de production dans dist/
npm run preview    # tester la version de production : http://localhost:4173
```

## Pages

| Adresse | Page | Membre |
| --- | --- | --- |
| `/` | Accueil | 1 |
| `/produits?search=&category=` | Liste des produits | 2 |
| `/produits/:id` | Fiche produit | 2 |
| `/aide` (`#livraison`, `#retours`, `#contact`) | Aide et contact | 2 |
| `/panier` | Panier | 3 |
| `/commande` | Commande | 3 |
| `/connexion` | Connexion et inscription | 3 |
| `/commandes` | Mes commandes | 3 |
| toute autre adresse | Page 404 | 1 |

## Les données

| Donnée | Emplacement |
| --- | --- |
| Produits (les catégories sont calculées à partir des produits) | `src/data/products.json` |
| Images des produits | `public/images/` |
| Compte de démonstration | `src/data/users.json` (demo@techstore.cm / demo123) |
| Comptes créés sur le site | localStorage, clé `users` (mot de passe haché en SHA-256) |
| Panier | localStorage, clé `cart` |
| Utilisateur connecté | localStorage, clé `user` |
| Commandes | localStorage, clé `orders` |
| Messages du formulaire de contact | localStorage, clé `messages` |

Les pages ne lisent jamais les JSON directement : elles passent par les services de `src/services`.

Chaque fonction de service renvoie une Promesse (on l'utilise avec `.then()` ou `await`) et lève une erreur avec un message clair en cas de problème.

Pour remettre le site à zéro : F12 → Application → Local Storage → http://localhost:5173 → Clear.

## Qualité

- Validation W3C : 0 erreur sur le HTML de chaque page (validator.w3.org/nu) et sur les fichiers CSS (jigsaw.w3.org/css-validator).
- Responsive testé à 1280 px, 768 px et 390 px, sans défilement horizontal.
- Chargement : pages chargées à la demande (React.lazy), images en `loading="lazy"` avec dimensions réservées.
- Accessibilité : un seul `h1` par page, un `label` par champ, navigation au clavier, lien « Aller au contenu ».

## Règles Git

- On ne travaille jamais directement sur `main`.
- Chaque matin : `git checkout main`, `git pull origin main`, `git checkout ma-branche`, `git merge main`.
- Sauvegarde : `git add` des fichiers concernés, `git commit -m "type: description"`, `git push origin ma-branche`.
- Types de commit : `feat` (fonctionnalité), `fix` (correction), `style` (CSS), `docs` (documentation), `chore` (configuration).
- On ne modifie pas les fichiers d'un autre membre : on lui demande.

Vérifie que .gitignore contient bien node_modules et dist (c'est le cas avec le modèle Vite).
