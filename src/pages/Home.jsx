import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getCategories, getProducts } from "../services/productService";
import "./Home.css";

function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getCategories(), getProducts({ limit: 8 })])
      .then(([cats, products]) => {
        setCategories(cats);
        setFeatured(products);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <section className="home-hero" aria-labelledby="home-title">
        <div className="container home-hero-inner">
          <div>
            <h1 id="home-title">Bienvenue dans mon site e-commerce TechStore</h1>
            <p>
              Votre boutique en ligne d'ordinateurs, de composants, d'accessoires
              informatiques et de produits électroniques.
            </p>
            <Link to="/produits" className="btn">Voir les produits</Link>
          </div>
          <div className="home-hero-visual">Visuel de bannière</div>
        </div>
      </section>

      <section className="section container" aria-labelledby="home-cats-title">
        <h2 id="home-cats-title" className="section-title">Nos catégories</h2>
        <div className="home-cats">
          {categories.map((c) => (
            <Link key={c} to={`/produits?category=${encodeURIComponent(c)}`} className="home-cat">
              <span className="home-cat-circle" aria-hidden="true">{c.slice(0, 2)}</span>
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" aria-labelledby="home-offers-title">
        <h2 id="home-offers-title" className="section-title">Nos offres du moment</h2>
        <div className="home-promos">
          <Link to="/produits?category=PC%20portables" className="home-promo home-promo-1">
            <strong>PC portables</strong><span>Découvrez la sélection</span>
          </Link>
          <Link to="/produits?category=Accessoires" className="home-promo home-promo-2">
            <strong>Setup gaming</strong><span>Claviers, souris, casques</span>
          </Link>
        </div>
      </section>

      <section className="section container" aria-labelledby="home-featured-title">
        <h2 id="home-featured-title" className="section-title">Produits en vedette</h2>
        {loading && <p className="state">Chargement...</p>}
        {error && <p className="state form-error">{error}</p>}
        <div className="home-featured">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="section container home-assure" aria-label="Nos engagements">
        <div><strong>Livraison rapide</strong>Suivi de votre commande</div>
        <div><strong>Paiement sécurisé</strong>Plusieurs moyens de paiement</div>
        <div><strong>Retours faciles</strong>Un souci ? On s'en occupe</div>
        <div><strong>Service client</strong>Une équipe à votre écoute</div>
      </section>
    </main>
  );
}

export default Home;