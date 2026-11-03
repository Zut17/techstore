import { usePageTitle } from "../hooks/usePageTitle";

function Checkout() {
  usePageTitle("Commande");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Passer la commande</h1>
      <p className="state">Page en construction (Membre 3).</p>
    </main>
  );
}

export default Checkout;
