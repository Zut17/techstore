import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { showPlaceholder } from "../utils/imageFallback";
import "./CartItem.css";
 
function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const atMax = item.quantity >= item.stock;
 
  return (
    <article className="cart-item">
      <img className="cart-item-image" src={item.image} alt="" width="96" height="72"
        loading="lazy" decoding="async" onError={showPlaceholder} />
 
      <div className="cart-item-info">
        <h2><Link to={`/produits/${item.id}`}>{item.name}</Link></h2>
        <p>{formatPrice(item.price)} l'unité</p>
        {atMax && <p className="cart-item-max">Stock maximum atteint</p>}
      </div>
 
      <div className="cart-item-quantity" role="group" aria-label={`Quantité de ${item.name}`}>
        <button type="button" aria-label="Diminuer la quantité" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
        <span aria-live="polite">{item.quantity}</span>
        <button type="button" aria-label="Augmenter la quantité" disabled={atMax}
          onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
 
      <p className="price cart-item-subtotal">{formatPrice(item.price * item.quantity)}</p>
 
      <button type="button" className="btn-link cart-item-remove" onClick={() => removeFromCart(item.id)}>
        Supprimer<span className="sr-only"> {item.name}</span>
      </button>
    </article>
  );
}
 
export default CartItem;
