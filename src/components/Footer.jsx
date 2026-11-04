import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-cols">
          <div>
            <p className="footer-brand">
              Tech<span>Store</span>
            </p>
            <p>Ordinateurs, composants et électronique au meilleur prix.</p>
          </div>

          <nav aria-labelledby="footer-shop">
            <h2 id="footer-shop">Boutique</h2>
            <Link to="/produits">Tous les produits</Link>
            <Link to="/produits?category=PC%20portables">PC portables</Link>
            <Link to="/produits?category=Composants">Composants</Link>
          </nav>

          <nav aria-labelledby="footer-account">
            <h2 id="footer-account">Mon compte</h2>
            <Link to="/connexion">Connexion</Link>
            <Link to="/panier">Mon panier</Link>
            <Link to="/commandes">Mes commandes</Link>
          </nav>

          <nav aria-labelledby="footer-help">
            <h2 id="footer-help">Aide</h2>
            <Link to="/aide#livraison">Livraison</Link>
            <Link to="/aide#retours">Retours</Link>
            <Link to="/aide#contact">Contact</Link>
          </nav>
        </div>

        <p className="footer-copy">© 2026 TechStore. Projet étudiant.</p>
      </div>
    </footer>
  );
}

export default Footer;
