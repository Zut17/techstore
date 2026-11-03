import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";
import { getProductById, getRelatedProducts } from "../services/productService";
import { formatPrice } from "../utils/formatPrice";
import { showPlaceholder } from "../utils/imageFallback";
import { usePageTitle } from "../hooks/usePageTitle";
import "./ProductDetail.css";

function ProductDetail() {
  const { id } = useParams(); // l'id lu dans l'URL (c'est un texte)
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);

  usePageTitle(product ? product.name : notFound ? "Produit introuvable" : "Produit");

  // [id] : si on clique sur un produit similaire, on recharge avec le nouvel id
  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    setQuantity(1);
    setAdded(false);
    getProductById(id)
      .then(setProduct)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
    getRelatedProducts(id).then(setRelated).catch(() => setRelated([]));
  }, [id]);

  if (loading) {
    return <main id="contenu" className="container section"><p className="state">Chargement...</p></main>;
  }

  if (notFound) {
    return (
      <main id="contenu" className="container section product-detail-missing">
        <h1>Produit introuvable</h1>
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>
        <Link to="/produits" className="btn">Retour aux produits</Link>
      </main>
    );
  }

  function handleAdd() {
    addToCart(product, quantity);
    setAdded(true);
  }

  const inStock = product.stock > 0;

  return (
    <main id="contenu" className="container">
      <nav aria-label="Fil d'Ariane" className="crumb">
        <Link to="/">Accueil</Link> /{" "}
        <Link to={`/produits?category=${encodeURIComponent(product.category)}`}>{product.category}</Link> /{" "}
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-detail">
        {/* Image principale : pas de lazy, elle est visible tout de suite */}
        <img className="product-detail-image" src={product.image} alt={product.name}
          width="800" height="600" onError={showPlaceholder} />

        <div className="product-detail-info">
          <p className="product-detail-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price product-detail-price">{formatPrice(product.price)}</p>
          <p className={inStock ? "product-detail-stock" : "form-error"}>
            {inStock ? `En stock (${product.stock} disponibles)` : "Rupture de stock"}
          </p>
          <p className="product-detail-description">{product.description}</p>

          <div className="product-detail-actions">
            <div className="product-detail-qty" role="group" aria-label="Quantité">
              <button type="button" aria-label="Diminuer la quantité" disabled={quantity <= 1}
                onClick={() => setQuantity(quantity - 1)}>−</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" aria-label="Augmenter la quantité" disabled={quantity >= product.stock}
                onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button type="button" className="btn" onClick={handleAdd} disabled={!inStock}>
              Ajouter au panier
            </button>
          </div>
          {added && (
            <p className="product-detail-added" role="status">
              Produit ajouté au panier. <Link to="/panier">Voir le panier</Link>
            </p>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="product-detail-related" aria-labelledby="related-title">
          <h2 id="related-title" className="section-title">Produits similaires</h2>
          <div className="product-detail-related-grid">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetail;