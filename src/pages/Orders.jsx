import { usePageTitle } from "../hooks/usePageTitle";

function Orders() {
  usePageTitle("Mes commandes");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Mes commandes</h1>
      <p className="state">Page en construction (Membre 4).</p>
    </main>
  );
}

export default Orders;
