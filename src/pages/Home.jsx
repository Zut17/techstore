import { usePageTitle } from "../hooks/usePageTitle";

function Home() {
  usePageTitle("");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Bienvenue sur TechStore</h1>
      <p className="state">Page en construction (Membre 1).</p>
    </main>
  );
}

export default Home;
