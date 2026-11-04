import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { createOrder } from "../services/orderService";
import { formatPrice } from "../utils/formatPrice";
import { usePageTitle } from "../hooks/usePageTitle";
import "./Checkout.css";
 
const PAYMENTS = [
  ["livraison", "Paiement à la livraison"],
  ["mobile_money", "Mobile Money"],
  ["carte", "Carte bancaire"],
];
// Numéro camerounais : 9 chiffres commençant par 6, avec ou sans +237 (les espaces sont ignorés)
const PHONE_REGEX = /^(\+?237)?6\d{8}$/;
 
// Renvoie { champ: "message" } pour chaque champ invalide
function validate({ name, phone, address }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = "Indiquez votre nom complet.";
  if (!PHONE_REGEX.test(phone.replace(/\s/g, ""))) errors.phone = "Numéro invalide (ex. 6 99 11 22 33).";
  if (address.trim().length < 5) errors.address = "Indiquez une adresse de livraison précise.";
  return errors;
}
 
function Checkout() {
  usePageTitle("Commande");
  const { cartItems, total, clearCart } = useCart();
  const { user } = useAuth();
 
  // Formulaire contrôlé : un seul objet d'état pour les trois champs
  const [form, setForm] = useState({ name: user ? user.name : "", phone: "", address: "" });
  const [payment, setPayment] = useState("livraison");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
 
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.getElementById(`co-${Object.keys(found)[0]}`)?.focus();
      return;
    }
 
    setLoading(true);
    try {
      const data = await createOrder(
        {
          customer: { name: form.name.trim(), phone: form.phone.trim(), address: form.address.trim() },
          paymentMethod: payment,
          items: cartItems.map((i) => ({ productId: i.id, quantity: i.quantity })),
        },
        user
      );
      setOrder(data.order);
      clearCart();
    } catch (err) {
      setError(err.message); // par exemple : stock insuffisant
    } finally {
      setLoading(false);
    }
  }
 
  // Attributs communs d'un champ texte
  function fieldProps(name) {
    return {
      id: `co-${name}`,
      name,
      value: form[name],
      onChange: handleChange,
      "aria-invalid": errors[name] ? "true" : undefined,
      "aria-describedby": errors[name] ? `co-${name}-error` : undefined,
    };
  }
 
  // 1. Commande confirmée
  if (order) {
    return (
      <main id="contenu" className="container">
        <div className="checkout-success" role="status">
          <h1>Merci, votre commande a bien été enregistrée</h1>
          <p>Numéro de commande : <strong>{order.id}</strong></p>
          <p>Total : <strong>{formatPrice(order.total)}</strong></p>
          <div className="checkout-success-actions">
            <Link to="/produits" className="btn">Continuer mes achats</Link>
            {user && <Link to="/commandes" className="btn btn-dark">Voir mes commandes</Link>}
          </div>
        </div>
      </main>
    );
  }
 
  // 2. Panier vide
  if (cartItems.length === 0) {
    return (
      <main id="contenu" className="container section checkout-empty">
        <h1>Votre panier est vide</h1>
        <Link to="/produits" className="btn">Voir les produits</Link>
      </main>
    );
  }
 
  // 3. Formulaire
  return (
    <main id="contenu" className="container">
      <nav aria-label="Fil d'Ariane" className="crumb">
        <Link to="/">Accueil</Link> / <Link to="/panier">Panier</Link> / <span aria-current="page">Commande</span>
      </nav>
      <h1 className="page-title">Finaliser ma commande</h1>
 
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <legend>Mes coordonnées</legend>
            <div className="field">
              <label htmlFor="co-name">Nom complet</label>
              <input type="text" autoComplete="name" {...fieldProps("name")} />
              {errors.name && <span id="co-name-error" className="field-error">{errors.name}</span>}
            </div>
            <div className="field">
              <label htmlFor="co-phone">Téléphone</label>
              <input type="tel" autoComplete="tel" inputMode="tel" placeholder="6 99 11 22 33" {...fieldProps("phone")} />
              {errors.phone && <span id="co-phone-error" className="field-error">{errors.phone}</span>}
            </div>
            <div className="field">
              <label htmlFor="co-address">Adresse de livraison</label>
              <input type="text" autoComplete="address-line1" placeholder="Quartier, rue, repère" {...fieldProps("address")} />
              {errors.address && <span id="co-address-error" className="field-error">{errors.address}</span>}
            </div>
          </fieldset>
 
          <fieldset>
            <legend>Mode de paiement</legend>
            {PAYMENTS.map(([value, label]) => (
              <label key={value} className="checkout-radio">
                <input type="radio" name="payment" value={value}
                  checked={payment === value} onChange={() => setPayment(value)} /> {label}
              </label>
            ))}
          </fieldset>
 
          {error && <p className="form-error" role="alert">{error}</p>}
          <button type="submit" className="btn checkout-submit" disabled={loading}>
            {loading ? "Enregistrement..." : "Confirmer la commande"}
          </button>
        </form>
 
        <aside className="checkout-summary" aria-labelledby="checkout-summary-title">
          <h2 id="checkout-summary-title">Votre commande</h2>
          {cartItems.map((i) => (
            <div key={i.id}><span>{i.name} × {i.quantity}</span><span>{formatPrice(i.price * i.quantity)}</span></div>
          ))}
          <div className="checkout-total"><span>Total</span><span>{formatPrice(total)}</span></div>
        </aside>
      </div>
    </main>
  );
}
 
export default Checkout;
