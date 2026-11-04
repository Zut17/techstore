import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";
import { readStorage, writeStorage } from "../utils/storage";
import "./Help.css";

// Les trois onglets de la page ; l'identifiant sert aussi d'ancre (/aide#retours)
const TABS = [
  { id: "livraison", label: "Livraison" },
  { id: "retours", label: "Retours" },
  { id: "contact", label: "Contact" },
];

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Renvoie un objet { champ: "message d'erreur" } (vide si tout est bon)
function validate(form) {
  const errors = {};
  if (form.name.trim().length < 2) errors.name = "Indiquez votre nom (2 caractères minimum).";
  if (!EMAIL_REGEX.test(form.email.trim())) errors.email = "Adresse e-mail invalide.";
  if (!form.subject) errors.subject = "Choisissez un sujet.";
  if (form.message.trim().length < 20) errors.message = "Votre message doit contenir au moins 20 caractères.";
  return errors;
}

// Message d'erreur affiché sous un champ (relié au champ par aria-describedby)
function FieldError({ errors, name }) {
  return errors[name] ? <span id={`contact-${name}-error`} className="field-error">{errors[name]}</span> : null;
}

function Help() {
  usePageTitle("Aide et contact");
  const { hash } = useLocation();
  const navigate = useNavigate();
  const tabsRef = useRef(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  // L'onglet ouvert vient de l'adresse : /aide#contact ouvre « Contact »
  const fromHash = TABS.find((t) => t.id === hash.slice(1));
  const active = fromHash ? fromHash.id : "livraison";

  // Arrivée depuis un lien du pied de page : on descend jusqu'aux onglets
  useEffect(() => {
    if (fromHash) tabsRef.current?.scrollIntoView({ block: "start" });
  }, [fromHash]);

  function openTab(id) {
    navigate(`#${id}`, { replace: true });
  }

  // Clavier : flèches gauche/droite, Début et Fin pour passer d'un onglet à l'autre
  function handleTabKey(e) {
    const i = TABS.findIndex((t) => t.id === active);
    let next = null;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    if (next === null) return;
    e.preventDefault();
    openTab(TABS[next].id);
    document.getElementById(`tab-${TABS[next].id}`)?.focus();
  }

  // Un seul gestionnaire pour tous les champs, grâce à l'attribut name
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    setSent(false);
    if (Object.keys(found).length > 0) {
      // On place le curseur sur le premier champ en erreur
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    // Pas de serveur : on garde le message dans le localStorage
    writeStorage("messages", [...readStorage("messages", []), { ...form, date: new Date().toISOString() }]);
    setForm(EMPTY_FORM);
    setSent(true);
  }

  // Attributs communs à chaque champ : lien vers son message d'erreur
  function fieldProps(name) {
    return {
      id: `contact-${name}`,
      name,
      value: form[name],
      onChange: handleChange,
      "aria-invalid": errors[name] ? "true" : undefined,
      "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    };
  }

  return (
    <main id="contenu" className="container">
      <nav aria-label="Fil d'Ariane" className="crumb">
        <Link to="/">Accueil</Link> / <span aria-current="page">Aide</span>
      </nav>
      <h1 className="page-title">Aide et contact</h1>
      <p className="help-intro">
        Retrouvez ici nos conditions de livraison et de retour, ou écrivez-nous : nous répondons sous 24 heures.
      </p>

      <div className="help-tabs" role="tablist" aria-label="Rubriques d'aide" ref={tabsRef}>
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            className="help-tab"
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => openTab(t.id)}
            onKeyDown={handleTabKey}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ===== Livraison ===== */}
      <section id="panel-livraison" role="tabpanel" aria-labelledby="tab-livraison" className="help-panel" hidden={active !== "livraison"}>
        <h2 className="help-panel-title">Livraison</h2>
        <p>Toutes les commandes passées avant 14 h sont préparées le jour même. Un SMS vous prévient le jour de la livraison.</p>
        <table className="help-table">
          <caption className="sr-only">Délais et frais de livraison par zone</caption>
          <thead>
            <tr><th scope="col">Zone</th><th scope="col">Délai</th><th scope="col">Frais</th></tr>
          </thead>
          <tbody>
            <tr><td>Douala et Yaoundé</td><td>24 à 48 heures</td><td>Gratuite dès 100 000 FCFA, sinon 2 000 FCFA</td></tr>
            <tr><td>Autres villes du Cameroun</td><td>3 à 5 jours ouvrés</td><td>Confirmés par téléphone selon la ville</td></tr>
          </tbody>
        </table>
        <ul className="help-list">
          <li>Paiement à la livraison, par Mobile Money (MTN, Orange) ou par carte.</li>
          <li>Vérifiez le produit devant le livreur avant de signer le bon de réception.</li>
          <li>En cas d'absence, le livreur vous rappelle pour fixer un nouveau rendez-vous.</li>
        </ul>
      </section>

      {/* ===== Retours ===== */}
      <section id="panel-retours" role="tabpanel" aria-labelledby="tab-retours" className="help-panel" hidden={active !== "retours"}>
        <h2 className="help-panel-title">Retours</h2>
        <p>Vous disposez de 7 jours après la réception pour changer d'avis et retourner un produit dans son emballage d'origine.</p>
        <ol className="help-steps">
          <li><span><strong>Contactez-nous</strong> depuis l'onglet Contact en indiquant votre numéro de commande.</span></li>
          <li><span><strong>Emballez le produit</strong> complet, avec ses accessoires et sa notice.</span></li>
          <li><span><strong>Remettez-le au livreur</strong> qui passe le récupérer à votre adresse.</span></li>
          <li><span><strong>Recevez votre remboursement</strong> sous 5 jours ouvrés, par Mobile Money.</span></li>
        </ol>
        <p className="help-note">Un produit défectueux est échangé gratuitement, même après 7 jours, pendant toute la durée de sa garantie.</p>
      </section>

      {/* ===== Contact ===== */}
      <section id="panel-contact" role="tabpanel" aria-labelledby="tab-contact" className="help-panel" hidden={active !== "contact"}>
        <h2 className="help-panel-title">Nous contacter</h2>
        <div className="help-contact">
          <ul className="help-coords">
            <li><strong>Téléphone et WhatsApp</strong>+237 6 99 00 00 00</li>
            <li><strong>E-mail</strong>contact@techstore.cm</li>
            <li><strong>Horaires</strong>Du lundi au samedi, de 8 h à 18 h</li>
          </ul>

          <div>
            {sent && (
              <p className="help-success" role="status">
                Merci, votre message a bien été envoyé. Nous vous répondrons sous 24 heures.
              </p>
            )}

            {/* noValidate : on affiche nos propres messages d'erreur, en français */}
            <form className="help-form" onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label htmlFor="contact-name">Nom complet</label>
                <input type="text" autoComplete="name" {...fieldProps("name")} />
                <FieldError errors={errors} name="name" />
              </div>
              <div className="field">
                <label htmlFor="contact-email">Adresse e-mail</label>
                <input type="email" autoComplete="email" {...fieldProps("email")} />
                <FieldError errors={errors} name="email" />
              </div>
              <div className="field help-form-full">
                <label htmlFor="contact-subject">Sujet</label>
                <select {...fieldProps("subject")}>
                  <option value="">Choisir un sujet</option>
                  <option value="commande">Ma commande</option>
                  <option value="livraison">Livraison</option>
                  <option value="retour">Retour ou échange</option>
                  <option value="autre">Autre question</option>
                </select>
                <FieldError errors={errors} name="subject" />
              </div>
              <div className="field help-form-full">
                <label htmlFor="contact-message">Message</label>
                <textarea rows="5" {...fieldProps("message")} />
                <FieldError errors={errors} name="message" />
              </div>
              <button type="submit" className="btn help-form-full">Envoyer le message</button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Help;
