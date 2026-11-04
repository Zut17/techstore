import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../services/productService";
import { usePageTitle } from "../hooks/usePageTitle";
import "./Home.css";

// Image représentative de chaque catégorie (dans public/images)
const CATEGORY_IMAGES = {
  "PC portables": "/images/laptop-pro.webp",
  "PC de bureau": "/images/pc-gamer.webp",
  Composants: "/images/ram-16go.webp",
  Accessoires: "/images/casque-gaming.webp",
  Écrans: "/images/ecran-27.webp",
  Électronique: "/images/smartphone-nova.webp",
};

// Sélection variée pour « Produits en vedette » (un peu de chaque catégorie)
const FEATURED_IDS = [1, 5, 15, 11, 3, 7, 16, 12];

// Icônes des engagements (décoratives)
const ICONS = {
  truck: <><path d="M3 7h11v9H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  wallet: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M16 12.5h2" /><path d="M3 9h18" /></>,
  rotate: <><path d="M4 12a8 8 0 0 1 14-5.3L20 9" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 0 1-14 5.3L4 15" /><path d="M4 20v-5h5" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h8M8 13h5" /></>,
};
function AssureIcon({ name }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {ICONS[name]}
    </svg>
  );
}

function Home() {
  usePageTitle("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getCategories(), getProducts()])
      .then(([cats, list]) => {
        setCategories(cats);
        setProducts(list);
      })
      .catch(() => setError("Impossible de charger les produits pour le moment."))
      .finally(() => setLoading(false));
  }, []);

  // Nombre de produits par catégorie, et sélection mise en avant
  const countIn = (category) => products.filter((p) => p.category === category).length;
  const featured = FEATURED_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <main id="contenu">
      {/* ===== Bannière : texte au-dessus d'une image de fond ===== */}
      <section className="home-hero" aria-labelledby="home-title">
        <img
          className="home-hero-bg"
          src="/images/hero-1920.webp"
          srcSet="/images/hero-960.webp 960w, /images/hero-1920.webp 1920w"
          sizes="100vw"
          width="1920"
          height="1000"
          alt=""
          fetchPriority="high"
        />
        <div className="container home-hero-content">
          <h1 id="home-title">Votre matériel informatique, livré en 48 heures</h1>
          <p>
            PC portables, composants, écrans et accessoires au juste prix en FCFA. Livraison à Douala et
            Yaoundé, paiement à la livraison ou par Mobile Money.
          </p>
          <div className="home-hero-actions">
            <Link to="/produits" className="btn">Voir les produits</Link>
            <Link to="/produits?category=PC%20portables" className="btn btn-ghost">Découvrir les PC portables</Link>
          </div>
          <ul className="home-hero-facts">
            <li><strong>{products.length || 18}</strong> produits disponibles</li>
            <li><strong>{categories.length || 6}</strong> catégories</li>
            <li><strong>7 jours</strong> pour changer d'avis</li>
          </ul>
        </div>
      </section>

      {/* ===== Catégories ===== */}
      <section className="section container" aria-labelledby="home-cats-title">
        <div className="home-head">
          <h2 id="home-cats-title" className="section-title">Acheter par catégorie</h2>
          <Link to="/produits" className="btn-link">Tout le catalogue</Link>
        </div>
        <div className="home-cats">
          {categories.map((category) => (
            <Link key={category} to={`/produits?category=${encodeURIComponent(category)}`} className="home-cat">
              <img src={CATEGORY_IMAGES[category]} alt="" width="400" height="300" loading="lazy" decoding="async" />
              <span className="home-cat-name">{category}</span>
              <span className="home-cat-count">{countIn(category)} produits</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Offres du moment ===== */}
      <section className="section container" aria-labelledby="home-offers-title">
        <h2 id="home-offers-title" className="section-title">Nos offres du moment</h2>
        <div className="home-promos">
          <Link to="/produits?search=gamer" className="home-promo home-promo-dark">
            <span className="home-promo-text">
              <strong>Passez au niveau supérieur</strong>
              <span>PC, écrans et périphériques gamer pour jouer sans compromis.</span>
              <span className="home-promo-cta">Voir la sélection gamer</span>
            </span>
            <img src="/images/promo-gamer.webp" alt="" width="800" height="600" loading="lazy" decoding="async" />
          </Link>
          <Link to="/produits?category=PC%20portables" className="home-promo home-promo-light">
            <span className="home-promo-text">
              <strong>Travaillez où vous voulez</strong>
              <span>Des portables légers et autonomes pour les études et le bureau.</span>
              <span className="home-promo-cta">Voir les PC portables</span>
            </span>
            <img src="/images/promo-pro.webp" alt="" width="800" height="600" loading="lazy" decoding="async" />
          </Link>
        </div>
      </section>

      {/* ===== Produits en vedette ===== */}
      <section className="section container" aria-labelledby="home-featured-title">
        <div className="home-head">
          <h2 id="home-featured-title" className="section-title">Produits en vedette</h2>
          <Link to="/produits" className="btn-link">Voir tous les produits</Link>
        </div>
        {loading && <p className="state">Chargement...</p>}
        {error && <p className="state form-error">{error}</p>}
        <div className="home-featured">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== Engagements ===== */}
      <section className="home-assure" aria-labelledby="home-assure-title">
        <div className="container">
          <h2 id="home-assure-title" className="sr-only">Nos engagements</h2>
          <ul className="home-assure-list">
            <li><AssureIcon name="truck" /><strong>Livraison en 24 à 48 h</strong><span>À Douala et Yaoundé, suivi par SMS</span></li>
            <li><AssureIcon name="wallet" /><strong>Paiement à votre choix</strong><span>À la livraison, Mobile Money ou carte</span></li>
            <li><AssureIcon name="rotate" /><strong>Retours sous 7 jours</strong><span>Produit défectueux échangé gratuitement</span></li>
            <li><AssureIcon name="chat" /><strong>Une équipe qui répond</strong><span>Réponse à vos messages sous 24 heures</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}

export default Home;
