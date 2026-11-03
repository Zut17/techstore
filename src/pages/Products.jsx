import { usePageTitle } from "../hooks/usePageTitle";

function Products() {
  usePageTitle("Produits");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Nos produits</h1>
      <p className="state">Page en construction (Membre 1).</p>
    </main>
  );
}

export default Products;
