import { usePageTitle } from "../hooks/usePageTitle";

function Help() {
  usePageTitle("Aide");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Aide</h1>
      <p className="state">Page en construction (Membre 1).</p>
    </main>
  );
}

export default Help;
