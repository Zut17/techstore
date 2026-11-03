import products from "../data/products.json";
 
// Version de base (Membre 1). Le Membre 2 la complète :
// plusieurs catégories, prix maximum, « en stock », produits similaires.
// Chaque fonction renvoie une Promesse (async) : on l'utilise avec .then() ou await.
 
// filters = { search, category, sort, limit }
export async function getProducts(filters = {}) {
  const { search, category, sort, limit } = filters;
  let list = [...products]; // copie : on ne modifie jamais le tableau d'origine
 
  if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  if (category) list = list.filter((p) => p.category === category);
  if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
  if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
  if (limit) list = list.slice(0, Number(limit));
 
  return list;
}
 
// Un produit par son id (l'id lu dans l'URL est un texte, d'où Number)
export async function getProductById(id) {
  const product = products.find((p) => p.id === Number(id));
  if (!product) throw new Error("Produit introuvable");
  return product;
}
 
// Catégories calculées à partir des produits, sans doublons
export async function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}
