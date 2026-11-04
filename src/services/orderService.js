import products from "../data/products.json";
import { readStorage, writeStorage } from "../utils/storage";
 
const PAYMENTS = ["livraison", "mobile_money", "carte"];
 
// Crée une commande et l'enregistre dans le localStorage (clé "orders").
// user : l'utilisateur connecté, ou null pour un invité.
export async function createOrder({ customer, paymentMethod, items }, user = null) {
  if (!customer?.name || !customer?.phone || !customer?.address) {
    throw new Error("Nom, téléphone et adresse sont obligatoires.");
  }
  if (!PAYMENTS.includes(paymentMethod)) throw new Error("Mode de paiement invalide.");
  if (!Array.isArray(items) || items.length === 0) throw new Error("Le panier est vide.");
 
  // On ne fait pas confiance au panier : prix et stock sont relus dans products.json
  const lines = items.map((item) => {
    const product = products.find((p) => p.id === Number(item.productId));
    const quantity = Number(item.quantity);
 
    if (!product) throw new Error(`Produit ${item.productId} introuvable.`);
    if (!Number.isInteger(quantity) || quantity < 1) throw new Error("Quantité invalide.");
    if (quantity > product.stock) {
      throw new Error(`Stock insuffisant pour ${product.name} (${product.stock} disponibles).`);
    }
    return { productId: product.id, name: product.name, price: product.price, quantity };
  });
 
  const order = {
    id: Date.now(),
    date: new Date().toISOString(),
    userId: user ? user.id : null,
    customer,
    paymentMethod,
    items: lines,
    total: lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
  };
 
  writeStorage("orders", [...readStorage("orders", []), order]);
  return { order };
}
 
// Commandes d'un utilisateur, de la plus récente à la plus ancienne
export async function getMyOrders(user) {
  if (!user) throw new Error("Connexion requise.");
  return readStorage("orders", [])
    .filter((o) => o.userId === user.id)
    .sort((a, b) => b.id - a.id);
}
