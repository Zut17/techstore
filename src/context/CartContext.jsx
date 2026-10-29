import { createContext, useContext, useState, useEffect } from "react";

// 1. On crée le "contexte" : une boîte partagée entre tous les composants.
const CartContext = createContext();

// 2. Le Provider : il contient l'état du panier et les fonctions pour le modifier.
export function CartProvider({ children }) {
  // Au démarrage, on lit le panier sauvegardé dans localStorage.
  // S'il n'y a rien, on commence avec un tableau vide.
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // À chaque fois que cartItems change, on le sauvegarde dans localStorage.
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Ajouter un produit.
  // S'il est déjà dans le panier, on augmente sa quantité de 1.
  // Sinon on l'ajoute avec quantity: 1.
  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  // Retirer complètement un produit (on garde tous les autres).
  function removeFromCart(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  // Changer la quantité d'un produit.
  // Si la quantité devient inférieure à 1, on retire le produit.
  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  // Vider le panier (après une commande).
  function clearCart() {
    setCartItems([]);
  }

  // Valeurs calculées à partir du panier :
  // total = somme de (prix x quantité) de chaque ligne
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  // itemCount = nombre total d'articles (pour la pastille de la Navbar)
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 3. On met tout à disposition des composants enfants.
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 4. Un petit hook pour utiliser le panier facilement dans n'importe quel composant.
export function useCart() {
  return useContext(CartContext);
}