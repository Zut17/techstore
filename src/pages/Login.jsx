import { usePageTitle } from "../hooks/usePageTitle";

function Login() {
  usePageTitle("Connexion");

  return (
    <main id="contenu" className="container section">
      <h1 className="page-title">Connexion</h1>
      <p className="state">Page en construction (Membre 4).</p>
    </main>
  );
}

export default Login;
