import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyOrders } from "../services/orderService";
import { formatPrice } from "../utils/formatPrice";
import { usePageTitle } from "../hooks/usePageTitle";
import "./Orders.css";
 
const PAYMENT_LABELS = {
  livraison: "Paiement à la livraison",
  mobile_money: "Mobile Money",
  carte: "Carte bancaire",
};
 
// Date lisible : « 3 novembre 2026 à 19:42 »
function formatDate(iso) {
  return new Date(iso).toLocaleString("fr-FR", { dateStyle: "long", timeStyle: "short" });
}
 
function Orders() {
  usePageTitle("Mes commandes");
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
 
  // [user] : si l'utilisateur se connecte ou se déconnecte, on recharge
  useEffect(() => {
    if (!user) return;
    getMyOrders(user)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);
 
  // Visiteur non connecté : on l'invite à se connecter, puis on le ramène ici
  if (!user) {
    return (
      <main id="contenu" className="container section orders-empty">
        <h1>Mes commandes</h1>
        <p>Connectez-vous pour voir l'historique de vos commandes.</p>
        <Link to="/connexion" state={{ from: "/commandes" }} className="btn">Se connecter</Link>
      </main>
    );
  }
 
  return (
    <main id="contenu" className="container">
      <nav aria-label="Fil d'Ariane" className="crumb">
        <Link to="/">Accueil</Link> / <span aria-current="page">Mes commandes</span>
      </nav>
      <h1 className="page-title">Mes commandes</h1>
 
      {loading && <p className="state">Chargement...</p>}
 
      {!loading && orders.length === 0 && (
        <div className="state orders-none">
          <p>Vous n'avez pas encore passé de commande.</p>
          <Link to="/produits" className="btn">Découvrir les produits</Link>
        </div>
      )}
 
      <div className="orders-list">
        {orders.map((order) => (
          <article key={order.id} className="order-card" aria-labelledby={`order-${order.id}`}>
            <header className="order-card-head">
              <h2 id={`order-${order.id}`}>Commande n° {order.id}</h2>
              <p><time dateTime={order.date}>{formatDate(order.date)}</time></p>
            </header>
            <ul className="order-card-items">
              {order.items.map((item) => (
                <li key={item.productId}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <footer className="order-card-foot">
              <span>{PAYMENT_LABELS[order.paymentMethod]} · Livraison : {order.customer.address}</span>
              <strong className="price">{formatPrice(order.total)}</strong>
            </footer>
          </article>
        ))}
      </div>
    </main>
  );
}
 
export default Orders;
