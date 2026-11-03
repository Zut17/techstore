import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getProducts, getCategories } from "../services/productService";
import { usePageTitle } from "../hooks/usePageTitle";
import "./Products.css";

const PAGE_SIZE = 9;
const MAX_PRICE = 800000;

function Products() {
  usePageTitle("Produits");

  // Recherche et catégories vivent dans l'URL : /produits?search=...&category=A,B
  // (on peut partager le lien, et le bouton Retour du navigateur fonctionne)
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const selected = category ? category.split(",") : [];

  // Les autres filtres vivent dans l'état du composant
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const listTop = useRef(null);

  // Liste des catégories : une seule fois
  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  // Produits : à chaque changement de filtre
  useEffect(() => {
    setLoading(true);
    setError("");
    getProducts({ search, category, sort, maxPrice, inStock })
      .then((data) => {
        setProducts(data);
        setPage(1); // nouveau filtre : retour à la première page
      })
      .catch(() => setError("Impossible de charger les produits."))
      .finally(() => setLoading(false));
  }, [search, category, sort, maxPrice, inStock]);

  // Cocher ou décocher une catégorie : on met à jour l'URL
  function toggleCategory(name) {
    const next = selected.includes(name) ? selected.filter((c) => c !== name) : [...selected, name];
    const params = new URLSearchParams(searchParams);
    if (next.length) params.set("category", next.join(","));
    else params.delete("category");
    setSearchParams(params);
  }

  function resetFilters() {
    setSearchParams({});
    setSort("");
    setMaxPrice(MAX_PRICE);
    setInStock(false);
  }

  // Changer de page et remonter en haut de la liste
  function goToPage(n) {
    setPage(n);
    listTop.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Pagination côté navigateur : on découpe le tableau
  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const visible = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main id="contenu" className="container">
      <nav aria-label="Fil d'Ariane" className="crumb">
        <Link to="/">Accueil</Link> / <span aria-current="page">Produits</span>
      </nav>
      <h1 className="page-title">
        {search ? `Résultats pour « ${search} »` : "Tous les produits"}
      </h1>

      <div className="products-layout">
        <aside className="products-filters" aria-labelledby="filters-title">
          <h2 id="filters-title" className="sr-only">Filtres</h2>

          <fieldset>
            <legend>Catégories</legend>
            {categories.map((c) => (
              <label key={c}>
                <input type="checkbox" checked={selected.includes(c)} onChange={() => toggleCategory(c)} /> {c}
              </label>
            ))}
          </fieldset>

          <fieldset>
            <legend>Prix maximum</legend>
            <label htmlFor="max-price" className="sr-only">Prix maximum en FCFA</label>
            <input id="max-price" type="range" min="0" max={MAX_PRICE} step="10000" value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))} />
            <output htmlFor="max-price">Jusqu'à {maxPrice.toLocaleString("fr-FR")} FCFA</output>
          </fieldset>

          <fieldset>
            <legend>Disponibilité</legend>
            <label>
              <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} /> En stock uniquement
            </label>
          </fieldset>

          <button type="button" className="btn-link" onClick={resetFilters}>Réinitialiser les filtres</button>
        </aside>

        <section aria-labelledby="list-title" ref={listTop} className="products-list">
          <h2 id="list-title" className="sr-only">Liste des produits</h2>
          <div className="products-toolbar">
            <p role="status">{products.length} produit(s)</p>
            <label htmlFor="sort">Trier par</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Pertinence</option>
              <option value="price_asc">Prix croissant</option>
              <option value="price_desc">Prix décroissant</option>
            </select>
          </div>

          {loading && <p className="state">Chargement...</p>}
          {error && <p className="state form-error" role="alert">{error}</p>}
          {!loading && !error && products.length === 0 && (
            <p className="state">Aucun produit ne correspond à votre recherche.</p>
          )}

          <div className="products-grid">
            {visible.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

          {totalPages > 1 && (
            <nav className="products-pagination" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} type="button" aria-label={`Page ${i + 1}`}
                  aria-current={page === i + 1 ? "page" : undefined} onClick={() => goToPage(i + 1)}>
                  {i + 1}
                </button>
              ))}
            </nav>
          )}
        </section>
      </div>
    </main>
  );
}

export default Products;