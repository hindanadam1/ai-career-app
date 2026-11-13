import { useState } from "react";
import AppLayout from "../components/AppLayout";
import AppIcon from "../components/AppIcon";
import { apiUrl } from "../utils/api";
import { getUserFromToken } from "../utils/auth";

function Entretien() {
  const [poste, setPoste] = useState("");
  const [niveau, setNiveau] = useState("junior");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setQuestions([]);
    const user = getUserFromToken();

    if (!user?.id) {
      setError("Votre session a expiré. Reconnectez-vous pour continuer.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl("ai/generation-entretien"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, poste, niveau }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Les questions n’ont pas pu être chargées.");
      setQuestions(Array.isArray(data.questions) ? data.questions : []);
    } catch (requestError) {
      setError(requestError.message || "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Prenez confiance à l’oral" subtitle="Choisissez un poste et un niveau pour préparer votre prochain entretien.">
      <section className="interview-layout">
        <div className="form-panel interview-panel">
          <div className="panel-heading">
            <div><p className="eyebrow">ENTRAÎNEMENT</p><h2>Votre prochaine conversation</h2><p>Préparez-vous à parler de votre parcours et de vos motivations.</p></div>
            <span className="interview-mark" aria-hidden="true">✳</span>
          </div>

          <form className="app-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="field-group field-span">
                <label htmlFor="interview-role">Poste ciblé</label>
                <input id="interview-role" className="form-control" placeholder="Ex. Développeuse Python" value={poste} onChange={(event) => setPoste(event.target.value)} required />
              </div>
              <div className="field-group field-span">
                <label htmlFor="interview-level">Votre niveau</label>
                <select id="interview-level" className="form-control" value={niveau} onChange={(event) => setNiveau(event.target.value)}>
                  <option value="junior">Débutant / junior</option>
                  <option value="intermediaire">Intermédiaire</option>
                  <option value="senior">Expérimenté / senior</option>
                </select>
              </div>
            </div>

            <div className="form-actions interview-actions">
              <button className="button button-primary" type="submit" disabled={loading}>
                {loading ? <><span className="button-spinner" /> Préparation…</> : <>Préparer mes questions <AppIcon name="arrow" size={18} /></>}
              </button>
              <span className="form-secure-note">Prenez le temps de construire vos réponses.</span>
            </div>
          </form>
          {error && <p className="feedback feedback-error" role="alert">{error}</p>}
        </div>

        {questions.length > 0 ? (
          <section className="questions-panel" aria-live="polite" aria-labelledby="questions-heading">
            <div className="questions-heading"><div><p className="eyebrow">VOTRE SÉANCE</p><h2 id="questions-heading">Questions pour {poste}</h2></div><span className="question-count">{String(questions.length).padStart(2, "0")} QUESTIONS</span></div>
            <ol className="question-list">
              {questions.map((question, index) => (
                <li key={`${question}-${index}`} className="question-item">
                  <span className="question-index">{String(index + 1).padStart(2, "0")}</span>
                  <span>{question}</span>
                  <span className="question-check" aria-label="À préparer"><AppIcon name="check" size={16} /></span>
                </li>
              ))}
            </ol>
          </section>
        ) : (
          <aside className="interview-tip"><span className="tip-mark">✳</span><div><strong>Un conseil pour vous préparer</strong><p>Appuyez chaque réponse sur une situation précise : le contexte, votre action et ce que vous en avez retenu.</p></div></aside>
        )}
      </section>
    </AppLayout>
  );
}

export default Entretien;
