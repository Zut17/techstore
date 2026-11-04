import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import { usePageTitle } from "../hooks/usePageTitle";
import "./Cart.css";
 
function Cart() {
  usePageTitle("Mon panier");
  const { cartItems, clearCart, total, itemCount } = useCart();
 
  if (cartItems.length === 0) {
    return (
      <main id="contenu" className="container cart-empty">
        <h1>Votre panier est vide</h1>
        <p>Découvrez nos produits et ajoutez vos favoris.</p>
        <Link to="/produits" className="btn">Voir les produits</Link>
      </main>
    );
  }
 
  return (
    <main id="contenu" className="container">
      <nav aria-label="Fil d'Ariane" className="crumb">
        <Link to="/">Accueil</Link> / <span aria-current="page">Panier</span>
      </nav>
      <h1 className="page-title">Mon panier</h1>
 
      <div className="cart-layout">
        <section className="cart-list" aria-label="Articles du panier">
          {cartItems.map((item) => <CartItem key={item.id} item={item} />)}
          <div className="cart-actions">
            <Link to="/produits" className="btn-link">Continuer mes achats</Link>
            <button type="button" className="btn-link" onClick={clearCart}>Vider le panier</button>
          </div>
        </section>
 
        <aside className="cart-summary" aria-labelledby="cart-summary-title">
          <h2 id="cart-summary-title">Récapitulatif</h2>
          <div><span>Articles ({itemCount})</span><span>{formatPrice(total)}</span></div>
          <div><span>Livraison</span><span>À définir</span></div>
          <div className="cart-total"><span>Total</span><span>{formatPrice(total)}</span></div>
          <Link to="/commande" className="btn">Passer la commande</Link>
        </aside>
      </div>
    </main>
  );
}
 
export default Cart;
