import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import "./NotFound.css";

function NotFound() {
  usePageTitle("Page introuvable");

  return (
    <main id="contenu" className="container not-found">
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1>Cette page n'existe pas</h1>
      <p>L'adresse est peut-être mal écrite, ou la page a été déplacée.</p>
      <div className="not-found-actions">
        <Link to="/" className="btn">
          Retour à l'accueil
        </Link>
        <Link to="/produits" className="btn btn-dark">
          Voir les produits
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
