import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import AppIcon from "../components/AppIcon";
import { apiUrl } from "../utils/api";
import { getUserFromToken } from "../utils/auth";

const documentLabels = { cv: "CV", letter: "Lettre de motivation", interview: "Préparation entretien" };

function History() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      const user = getUserFromToken();
      if (!user?.id) {
        setLoading(false);
        setError("Votre session a expiré. Reconnectez-vous.");
        return;
      }

      try {
        const response = await fetch(apiUrl(`documents/${user.id}`));
        if (!response.ok) throw new Error("Impossible de charger l’historique pour le moment.");
        const data = await response.json();
        setDocuments(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <AppLayout title="Tout votre parcours, au même endroit" subtitle="Retrouvez les contenus créés dans votre espace.">
      <section className="history-panel">
        <div className="section-heading history-heading">
          <div><p className="eyebrow">VOTRE BIBLIOTHÈQUE</p><h2>Documents enregistrés</h2></div>
          {!loading && !error && <span className="section-count">{String(documents.length).padStart(2, "0")} ÉLÉMENT{documents.length > 1 ? "S" : ""}</span>}
        </div>

        {loading && <div className="history-loading"><span className="button-spinner" /> Chargement de vos documents…</div>}
        {error && <p className="feedback feedback-error" role="alert">{error}</p>}

        {!loading && !error && documents.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon"><AppIcon name="history" size={26} /></span>
            <h3>Votre espace est prêt à se remplir</h3>
            <p>Les CV, lettres et questions d’entretien que vous générez apparaîtront ici.</p>
          </div>
        )}

        <div className="history-list">
          {documents.map((document, index) => {
            const date = new Date(document.created_at);
            const hasValidDate = !Number.isNaN(date.getTime());
            const formattedDate = hasValidDate ? date.toLocaleString("fr-FR") : document.created_at;
            const typeLabel = documentLabels[document.type] || document.type;

            return (
              <article key={`${document.type}-${document.created_at}-${index}`} className="history-item">
                <span className={`history-type history-type--${document.type}`}><AppIcon name={document.type === "interview" ? "interview" : document.type === "letter" ? "letter" : "cv"} size={19} /></span>
                <div className="history-item-content">
                  <div className="history-item-meta"><span>{typeLabel}</span><time dateTime={hasValidDate ? date.toISOString() : undefined}>{formattedDate}</time></div>
                  <pre className="result-block">{document.output_text}</pre>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
}

export default History;
