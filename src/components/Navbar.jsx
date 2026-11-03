import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="container section">
      <Link to="/">TechStore</Link> ·{" "}
      <Link to="/produits">Produits</Link> ·{" "}
      <Link to="/panier">Panier</Link> ·{" "}
      <Link to="/connexion">Connexion</Link>
    </header>
  );
}

export default Navbar;
