import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AppIcon from "../components/AppIcon";
import { apiUrl } from "../utils/api";

function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);
      const response = await fetch(apiUrl("register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "La création du compte a échoué.");
      navigate("/");
    } catch (requestError) {
      setError(requestError.message || "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="VOTRE PROCHAINE ÉTAPE"
      title="Créez votre espace."
      subtitle="En quelques instants, vous pourrez préparer vos documents et vos entretiens."
      footer={<><span>Vous avez déjà un compte ?</span><Link to="/">Se connecter <AppIcon name="arrow" size={16} /></Link></>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="register-name">Nom complet</label>
          <input id="register-name" className="form-control" type="text" placeholder="Ex. Amira Martin" value={nom} onChange={(event) => setNom(event.target.value)} autoComplete="name" required />
        </div>
        <div className="field-group">
          <label htmlFor="register-email">Adresse e-mail</label>
          <input id="register-email" className="form-control" type="email" placeholder="vous@exemple.fr" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        </div>
        <div className="field-group">
          <label htmlFor="register-password">Mot de passe</label>
          <input id="register-password" className="form-control" type="password" placeholder="Choisissez un mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" required />
        </div>
        {error && <p className="feedback feedback-error" role="alert">{error}</p>}
        <button className="button button-primary auth-submit" type="submit" disabled={loading}>
          {loading ? <><span className="button-spinner" /> Création en cours…</> : <>Créer mon compte <AppIcon name="arrow" size={18} /></>}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Register;
