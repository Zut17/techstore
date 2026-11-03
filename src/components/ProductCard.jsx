import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { showPlaceholder } from "../utils/imageFallback";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const outOfStock = product.stock === 0;

  return (
    <article className="product-card">
      <Link to={`/produits/${product.id}`} className="product-card-image-link" tabIndex={-1} aria-hidden="true">
        {/* width/height réservent la place (pas de saut de page), loading="lazy" charge l'image au besoin */}
        <img className="product-card-image" src={product.image} alt="" width="400" height="300"
          loading="lazy" decoding="async" onError={showPlaceholder} />
      </Link>
      <p className="product-card-category">{product.category}</p>
      <h3 className="product-card-name">
        <Link to={`/produits/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="price product-card-price">{formatPrice(product.price)}</p>
      <button type="button" className="product-card-button" onClick={() => addToCart(product)} disabled={outOfStock}>
        {outOfStock ? "Rupture de stock" : "Ajouter au panier"}
        {!outOfStock && <span className="sr-only"> : {product.name}</span>}
      </button>
    </article>
  );
}

export default ProductCard;