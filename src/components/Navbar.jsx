import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getCategories } from "../services/productService";
import "./Navbar.css";

// Petites icônes SVG (décoratives : le texte ou l'aria-label porte le sens)
const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {d}
  </svg>
);
const SEARCH = <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>;
const USER = <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>;
const BAG = <><path d="M5 8h14l-1.2 12H6.2z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>;

function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  // Catégorie affichée en ce moment (pour la souligner dans le menu)
  const activeCategory = new URLSearchParams(location.search).get("category");
  const onProducts = location.pathname === "/produits";

  // Charge les catégories une seule fois, au premier affichage
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Envoie vers la page produits avec le texte recherché dans l'URL
  function handleSearch(event) {
    event.preventDefault();
    navigate(`/produits?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="navbar">
      <div className="container navbar-top">
        <Link to="/" className="navbar-logo" aria-label="TechStore, retour à l'accueil">
          Tech<span>Store</span>
        </Link>

        <form className="navbar-search" role="search" onSubmit={handleSearch}>
          <label htmlFor="navbar-q" className="sr-only">
            Rechercher un produit
          </label>
          <input
            id="navbar-q"
            type="search"
            placeholder="Rechercher un ordinateur, un écran, un accessoire…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" aria-label="Rechercher">
            <Icon d={SEARCH} />
          </button>
        </form>

        <div className="navbar-actions">
          {user ? (
            <>
              <Link to="/commandes" className="navbar-link">
                <Icon d={USER} />
                <span className="navbar-label">Mes commandes</span>
              </Link>
              <button type="button" className="navbar-link navbar-logout" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link to="/connexion" className="navbar-link">
              <Icon d={USER} />
              <span className="navbar-label">Connexion</span>
            </Link>
          )}

          <Link to="/panier" className="navbar-link navbar-cart" aria-label={`Panier, ${itemCount} article(s)`}>
            <Icon d={BAG} />
            <span className="navbar-label" aria-hidden="true">Panier</span>
            <span className="navbar-badge" aria-hidden="true">{itemCount}</span>
          </Link>
        </div>
      </div>

      <nav className="navbar-menu" aria-label="Catégories">
        <div className="container navbar-menu-inner">
          <Link to="/produits" aria-current={onProducts && !activeCategory ? "page" : undefined}>
            Tous les produits
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/produits?category=${encodeURIComponent(category)}`}
              aria-current={activeCategory === category ? "page" : undefined}
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
