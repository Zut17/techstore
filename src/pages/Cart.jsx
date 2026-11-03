import { usePageTitle } from "../hooks/usePageTitle";

function Cart() {
  usePageTitle("Mon panier");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Mon panier</h1>
      <p className="state">Page en construction (Membre 3).</p>
    </main>
  );
}

export default Cart;
