import { Link } from "react-router-dom";
import { formatPrice } from "../utils/formatPrice";

function ProductCard({ product }) {
  return (
    <article>
      <h3>
        <Link to={`/produits/${product.id}`}>{product.name}</Link>
      </h3>
      <p className="price">{formatPrice(product.price)}</p>
    </article>
  );
}

export default ProductCard;
