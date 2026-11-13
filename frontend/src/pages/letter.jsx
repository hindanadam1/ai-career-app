import { useState } from "react";
import AppLayout from "../components/AppLayout";
import AppIcon from "../components/AppIcon";
import { apiUrl } from "../utils/api";
import { getUserFromToken } from "../utils/auth";

function Letter() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ poste: "", entreprise: "", profil: "" });

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
      const response = await fetch(apiUrl("ai/generate-letter"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId: user.id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "La lettre n’a pas pu être générée.");
      setResult(data.letter || "");
    } catch (requestError) {
      setError(requestError.message || "Impossible de joindre le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout title="Une lettre qui vous ressemble" subtitle="Reliez votre motivation au poste et à l’entreprise que vous souhaitez rejoindre.">
      <section className="form-panel">
        <div className="panel-heading">
          <div><p className="eyebrow">LETTRE DE MOTIVATION</p><h2>Racontez votre motivation</h2><p>Quelques informations concrètes suffisent pour préparer une première version.</p></div>
          <span className="panel-step">LETTRE <span>02</span></span>
        </div>

        <form className="app-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field-group">
              <label htmlFor="letter-role">Poste visé</label>
              <input id="letter-role" name="poste" className="form-control" placeholder="Ex. Chargée de communication" value={form.poste} onChange={handleChange} required />
            </div>
            <div className="field-group">
              <label htmlFor="letter-company">Entreprise</label>
              <input id="letter-company" name="entreprise" className="form-control" placeholder="Ex. N-Vibe" value={form.entreprise} onChange={handleChange} required />
            </div>
            <div className="field-group field-span">
              <label htmlFor="letter-profile">Votre profil et vos expériences</label>
              <textarea id="letter-profile" name="profil" className="form-control" rows="8" placeholder="Présentez vos compétences, vos expériences ou un projet qui vous motive." value={form.profil} onChange={handleChange} required />
              <small className="field-hint">Ajoutez un exemple réel qui montre votre contribution.</small>
            </div>
          </div>

          <div className="form-actions">
            <button className="button button-primary" type="submit" disabled={loading}>
              {loading ? <><span className="button-spinner" /> Rédaction en cours…</> : <>Générer ma lettre <AppIcon name="arrow" size={18} /></>}
            </button>
            <span className="form-secure-note"><AppIcon name="check" size={15} /> Relisez chaque détail avant l’envoi.</span>
          </div>
        </form>

        {error && <p className="feedback feedback-error" role="alert">{error}</p>}
        {result && <section className="generated-result" aria-live="polite"><div className="result-heading"><div><p className="eyebrow">VOTRE DOCUMENT</p><h3>Lettre générée</h3></div><span className="result-ready"><i /> Prête à relire</span></div><pre className="result-block">{result}</pre></section>}
      </section>
    </AppLayout>
  );
}

export default Letter;
