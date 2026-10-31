import { request } from "./api";

// filters = { search, category, sort, limit, maxPrice, inStock }
// Seules les valeurs renseignées sont envoyées à l'API.
export function getProducts(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== "" && value !== false && value != null) params.set(key, value);
  });
  return request(`/products?${params.toString()}`);
}

export const getProductById = (id) => request(`/products/${id}`);
export const getRelatedProducts = (id) => request(`/products/${id}/related`);
export const getCategories = () => request("/categories");
