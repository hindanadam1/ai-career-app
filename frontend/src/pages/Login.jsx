import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AppIcon from "../components/AppIcon";
import { apiUrl } from "../utils/api";

function Login() {
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
      const response = await fetch(apiUrl("login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Adresse e-mail ou mot de passe incorrect.");

      localStorage.setItem("token", data.token);
      localStorage.setItem("nom", data.nom || "Utilisateur");
      navigate("/dashboard");
    } catch (requestError) {
      setError(requestError.message || "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      eyebrow="HEUREUX DE VOUS REVOIR"
      title="Reprenez là où vous en étiez."
      subtitle="Connectez-vous pour retrouver votre espace de candidature."
      footer={<><span>Pas encore de compte ?</span><Link to="/register">Créer un compte <AppIcon name="arrow" size={16} /></Link></>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="login-email">Adresse e-mail</label>
          <input id="login-email" className="form-control" type="email" placeholder="vous@exemple.fr" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
        </div>
        <div className="field-group">
          <label htmlFor="login-password">Mot de passe</label>
          <input id="login-password" className="form-control" type="password" placeholder="Votre mot de passe" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </div>
        {error && <p className="feedback feedback-error" role="alert">{error}</p>}
        <button className="button button-primary auth-submit" type="submit" disabled={loading}>
          {loading ? <><span className="button-spinner" /> Connexion…</> : <>Accéder à mon espace <AppIcon name="arrow" size={18} /></>}
        </button>
      </form>
    </AuthLayout>
  );
}

export default Login;
