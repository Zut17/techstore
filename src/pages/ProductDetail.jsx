import { usePageTitle } from "../hooks/usePageTitle";

function ProductDetail() {
  usePageTitle("Produit");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Détail du produit</h1>
      <p className="state">Page en construction (Membre 2).</p>
    </main>
  );
}

export default ProductDetail;
