
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/authService";
import { usePageTitle } from "../hooks/usePageTitle";
import "./Login.css";

function Login() {
  const [activeView, setActiveView] = useState("login");

  usePageTitle(
    activeView === "login" ? "Connexion" : "Créer un compte"
  );

  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/";

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [loading, setLoading] = useState(false);

  // Changement entre connexion et inscription
  function changeView(view) {
    setActiveView(view);
    setLoginError("");
    setRegisterError("");
  }

  // Connexion après succès
  function onSuccess({ user }) {
    login(user);
    navigate(redirectTo);
  }

  // Traitement de la connexion
  async function handleLogin(e) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      const result = await loginUser(loginForm);
      onSuccess(result);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Traitement de l'inscription
  async function handleRegister(e) {
    e.preventDefault();
    setRegisterError("");
    setLoading(true);

    try {
      const result = await registerUser(registerForm);
      onSuccess(result);
    } catch (err) {
      setRegisterError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Utilisateur déjà connecté
  if (user) {
    return (
      <main className="auth-done">
        <div className="auth-done-card">
          <div className="auth-success-icon">✓</div>

          <h1>Bienvenue, {user.name} !</h1>

          <p>
            Vous êtes déjà connecté à votre compte TechStore.
          </p>

          <div className="auth-done-actions">
            <Link to="/commandes" className="auth-primary-btn">
              Mes commandes
            </Link>

            <button
              type="button"
              className="auth-secondary-btn"
              onClick={logout}
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="contenu" className="auth-page">

      {/* Logo TechStore */}
      <Link to="/" className="auth-logo" aria-label="TechStore - Accueil">
        <span>Tech</span>
        <span>Store</span>
      </Link>

      {/* Carte d'authentification */}
      <section className="auth-card">

        <div className="auth-card-content">

          {/* En-tête du formulaire */}
          <div className="auth-heading">

            <div className="auth-user-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                  fill="currentColor"
                />
                <path
                  d="M4 21C4 16.6 7.6 13 12 13C16.4 13 20 16.6 20 21"
                  fill="currentColor"
                />
              </svg>
            </div>

            <h1>
              {activeView === "login"
                ? "Bienvenue !"
                : "Créer un compte"}
            </h1>

            <p>
              {activeView === "login"
                ? "Connectez-vous à votre espace personnel."
                : "Rejoignez TechStore et profitez de nos services."}
            </p>

          </div>

          {/* Formulaire de connexion */}
          {activeView === "login" && (
            <div className="auth-form-content" key="login">

              <form onSubmit={handleLogin}>

                <div className="auth-field">
                  <label htmlFor="li-email">
                    Adresse e-mail
                  </label>

                  <input
                    id="li-email"
                    type="email"
                    placeholder="Entrez votre adresse e-mail"
                    autoComplete="email"
                    required
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="li-pass">
                    Mot de passe
                  </label>

                  <input
                    id="li-pass"
                    type="password"
                    placeholder="Entrez votre mot de passe"
                    autoComplete="current-password"
                    required
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                {loginError && (
                  <p className="auth-error" role="alert">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  className="auth-primary-btn"
                  disabled={loading}
                >
                  {loading ? "Connexion en cours..." : "Se connecter"}
                  {!loading && <span>→</span>}
                </button>

              </form>

              {/* Passage à l'inscription */}
              <div className="auth-switch">

                <div className="auth-switch-label">
                  <span></span>
                  <p>Vous n'avez pas encore de compte ?</p>
                  <span></span>
                </div>

                <button
                  type="button"
                  className="auth-outline-btn"
                  onClick={() => changeView("register")}
                >
                  Créer un compte
                </button>

              </div>

              {/* Compte de démonstration */}
              <div className="auth-demo">
                <span className="auth-demo-icon">✓</span>

                <p>
                  <strong>Compte de démonstration :</strong>
                  <br />
                  demo@techstore.cm / demo123
                </p>
              </div>

            </div>
          )}

          {/* Formulaire d'inscription */}
          {activeView === "register" && (
            <div className="auth-form-content" key="register">

              <form onSubmit={handleRegister}>

                <div className="auth-field">
                  <label htmlFor="re-name">
                    Nom complet
                  </label>

                  <input
                    id="re-name"
                    type="text"
                    placeholder="Entrez votre nom complet"
                    autoComplete="name"
                    required
                    value={registerForm.name}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="re-email">
                    Adresse e-mail
                  </label>

                  <input
                    id="re-email"
                    type="email"
                    placeholder="exemple@email.com"
                    autoComplete="email"
                    required
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="re-pass">
                    Mot de passe
                  </label>

                  <input
                    id="re-pass"
                    type="password"
                    placeholder="Créez un mot de passe"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    aria-describedby="re-pass-help"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                  />

                  <span
                    id="re-pass-help"
                    className="auth-field-help"
                  >
                    6 caractères minimum.
                  </span>
                </div>

                {registerError && (
                  <p className="auth-error" role="alert">
                    {registerError}
                  </p>
                )}

                <button
                  type="submit"
                  className="auth-primary-btn"
                  disabled={loading}
                >
                  {loading ? "Création en cours..." : "Créer mon compte"}
                  {!loading && <span>→</span>}
                </button>

              </form>

              {/* Retour à la connexion */}
              <div className="auth-switch">

                <div className="auth-switch-label">
                  <span></span>
                  <p>Vous avez déjà un compte ?</p>
                  <span></span>
                </div>

                <button
                  type="button"
                  className="auth-outline-btn"
                  onClick={() => changeView("login")}
                >
                  Se connecter
                </button>

              </div>

            </div>
          )}

        </div>

      </section>

      {/* Pied de page */}
      <footer className="auth-footer">
        © {new Date().getFullYear()} TechStore. Tous droits réservés.
      </footer>

    </main>
  );
}

export default Login;
