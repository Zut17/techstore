import products from "../data/products.json";

// Les produits viennent du fichier src/data/products.json (pas de serveur).
// Chaque fonction renvoie une Promesse (mot-clé async) : les pages l'utilisent
// avec .then() ou await, exactement comme si les données venaient d'Internet.

// filters = { search, category, sort, maxPrice, inStock, limit }
// category peut contenir plusieurs catégories séparées par des virgules : "Écrans,Accessoires"
export async function getProducts(filters = {}) {
  const { search, category, sort, maxPrice, inStock, limit } = filters;
  let list = [...products]; // copie : on ne modifie jamais le tableau d'origine

  // Recherche dans le nom, sans tenir compte des majuscules
  if (search) {
    list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // Une ou plusieurs catégories
  if (category) {
    const categories = category.split(",");
    list = list.filter((p) => categories.includes(p.category));
  }

  // Prix maximum et disponibilité
  if (maxPrice) list = list.filter((p) => p.price <= Number(maxPrice));
  if (inStock) list = list.filter((p) => p.stock > 0);

  // Tri par prix
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

// Produits de la même catégorie, sauf le produit lui-même (4 maximum)
export async function getRelatedProducts(id) {
  const product = await getProductById(id);
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
}

// Catégories calculées à partir des produits, sans doublons
export async function getCategories() {
  return [...new Set(products.map((p) => p.category))];
}