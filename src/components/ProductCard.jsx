import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { showPlaceholder } from "../utils/imageFallback";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const outOfStock = product.stock === 0;
  const lowStock = product.stock > 0 && product.stock <= 6;

  // Après un ajout, le bouton affiche « Ajouté » pendant 1,5 seconde
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  function handleAdd() {
    addToCart(product);
    setAdded(true);
  }

  return (
    <article className="product-card">
      <Link to={`/produits/${product.id}`} className="product-card-media" tabIndex={-1} aria-hidden="true">
        {/* width/height réservent la place (pas de saut de page), loading="lazy" charge l'image au besoin */}
        <img className="product-card-image" src={product.image} alt="" width="400" height="300"
          loading="lazy" decoding="async" onError={showPlaceholder} />
        {lowStock && <span className="product-card-badge">Plus que {product.stock}</span>}
      </Link>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3 className="product-card-name">
          <Link to={`/produits/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="product-card-desc">{product.description}</p>

        <div className="product-card-foot">
          <p className="price product-card-price">{formatPrice(product.price)}</p>
          <button
            type="button"
            className={`product-card-button${added ? " is-added" : ""}`}
            onClick={handleAdd}
            disabled={outOfStock}
          >
            {outOfStock ? "Épuisé" : added ? "Ajouté" : "Ajouter"}
            {!outOfStock && <span className="sr-only"> au panier : {product.name}</span>}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
