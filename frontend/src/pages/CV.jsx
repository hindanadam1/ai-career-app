import { useState } from "react";
import AppLayout from "../components/AppLayout";
import AppIcon from "../components/AppIcon";
import { apiUrl } from "../utils/api";
import { getUserFromToken } from "../utils/auth";

function CV() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ prenom: "", nom: "", poste: "", competences: "", experience: "" });

  const handleChange = (event) => {
    setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult("");
    const user = getUserFromToken();

    if (!user?.id) {
      setError("Votre session a expiré. Reconnectez-vous pour continuer.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl("ai/generate-cv"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Le CV n’a pas pu être généré.");
      setResult(data.cv || "");
    } catch (requestError) {
      setError(requestError.message || "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Votre CV, votre histoire" subtitle="Rassemblez les informations qui montrent ce que vous savez faire.">
      <section className="form-panel">
        <div className="panel-heading">
          <div><p className="eyebrow">DOCUMENT PROFESSIONNEL</p><h2>Construisez votre profil</h2><p>Restez précis et mettez en avant ce qui compte pour le poste visé.</p></div>
          <span className="panel-step">CV <span>01</span></span>
        </div>

        <form className="app-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="cv-first-name">Prénom</label>
              <input id="cv-first-name" name="prenom" className="form-control" placeholder="Ex. Amira" value={form.prenom} onChange={handleChange} autoComplete="given-name" required />
            </div>
            <div className="field-group">
              <label htmlFor="cv-last-name">Nom</label>
              <input id="cv-last-name" name="nom" className="form-control" placeholder="Ex. Martin" value={form.nom} onChange={handleChange} autoComplete="family-name" required />
            </div>
            <div className="field-group field-span">
              <label htmlFor="cv-target-role">Poste recherché</label>
              <input id="cv-target-role" name="poste" className="form-control" placeholder="Ex. Développeuse web en alternance" value={form.poste} onChange={handleChange} required />
            </div>
            <div className="field-group field-span">
              <label htmlFor="cv-skills">Compétences <span>— séparez-les par des virgules</span></label>
              <textarea id="cv-skills" name="competences" className="form-control" rows="3" placeholder="Ex. React, JavaScript, travail en équipe…" value={form.competences} onChange={handleChange} required />
            </div>
            <div className="field-group field-span">
              <label htmlFor="cv-experience">Expériences et projets</label>
              <textarea id="cv-experience" name="experience" className="form-control" rows="5" placeholder="Décrivez vos missions, projets, formations ou réalisations." value={form.experience} onChange={handleChange} required />
              <small className="field-hint">Un projet de formation ou personnel peut aussi illustrer votre expérience.</small>
            </div>
          </div>

          <div className="form-actions">
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? <><span className="button-spinner" /> Création en cours…</> : <>Générer mon CV <AppIcon name="arrow" size={18} /></>}
            </button>
            <span className="form-secure-note"><AppIcon name="check" size={15} /> Vous pourrez relire le résultat avant de l’utiliser.</span>
          </div>
        </form>

        {error && <p className="feedback feedback-error" role="alert">{error}</p>}
        {result && <section className="generated-result" aria-live="polite"><div className="result-heading"><div><p className="eyebrow">VOTRE DOCUMENT</p><h3>CV généré</h3></div><span className="result-ready"><i /> Prêt à relire</span></div><pre className="result-block">{result}</pre></section>}
      </section>
    </AppLayout>
  );
}

export default CV;
