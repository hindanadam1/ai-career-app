import { useNavigate } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import AppIcon from "../components/AppIcon";

const tools = [
  {
    number: "01",
    title: "Créer mon CV",
    description: "Mettez en valeur vos compétences et vos expériences dans un document clair.",
    icon: "cv",
    tone: "mint",
    path: "/cv",
    action: "Construire mon CV",
  },
  {
    number: "02",
    title: "Écrire une lettre",
    description: "Présentez votre motivation et votre profil à une entreprise.",
    icon: "letter",
    tone: "lilac",
    path: "/lettre",
    action: "Rédiger une lettre",
  },
  {
    number: "03",
    title: "Préparer un entretien",
    description: "Entraînez-vous avec des questions liées au poste que vous visez.",
    icon: "interview",
    tone: "peach",
    path: "/entretien",
    action: "M'entraîner",
  },
  {
    number: "04",
    title: "Voir mon historique",
    description: "Retrouvez les documents et les questions déjà enregistrés.",
    icon: "history",
    tone: "blue",
    path: "/historique",
    action: "Ouvrir l'historique",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("nom") || "Utilisateur";
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <AppLayout
      title={`Bonjour, ${firstName}`}
      subtitle="Prenez le temps de préparer chaque étape de votre recherche d’emploi."
    >
      <section className="dashboard-hero">
        <div className="hero-copy">
          <p className="hero-kicker"><span /> VOTRE ESPACE CANDIDATURE</p>
          <h2>Faites place à<br /><em>la prochaine étape.</em></h2>
          <p className="hero-description">
            Un bon parcours se raconte avec clarté. Préparez vos documents, entraînez-vous et avancez à votre rythme.
          </p>
          <button className="button button-primary hero-button" type="button" onClick={() => navigate("/cv")}>
            Créer mon CV <AppIcon name="arrow" size={18} />
          </button>
          <div className="hero-footnote"><span className="hero-check"><AppIcon name="check" size={14} /></span> Vos contenus restent modifiables avant utilisation</div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />
          <span className="hero-floating-tag tag-top"><i /> CANDIDATURE EN COURS</span>
          <div className="resume-preview">
            <div className="resume-preview-top"><span>PROFIL PROFESSIONNEL</span><span>01 — 04</span></div>
            <div className="resume-person">
              <span className="resume-avatar">AM</span>
              <span><b>Amira Martin</b><small>Développeuse web</small></span>
            </div>
            <div className="resume-lines"><i /><i /><i /></div>
            <div className="resume-divider" />
            <div className="resume-section-label">COMPÉTENCES CLÉS</div>
            <div className="resume-tags"><i>React</i><i>JavaScript</i><i>UI design</i></div>
            <div className="resume-bottom"><span><b /> DOCUMENT PRÊT À PERSONNALISER</span><AppIcon name="arrow" size={16} /></div>
          </div>
          <span className="hero-floating-tag tag-bottom"><span className="tag-spark">✳</span> Votre expérience a de la valeur</span>
        </div>
      </section>

      <section className="tools-section" aria-labelledby="tools-heading">
        <div className="section-heading">
          <div><p className="eyebrow">VOS OUTILS</p><h2 id="tools-heading">Avancer, étape par étape</h2></div>
          <span className="section-count">04 ESPACES</span>
        </div>
        <div className="feature-grid">
          {tools.map((tool) => (
            <article key={tool.number} className={`feature-card feature-card--${tool.tone}`}>
              <div className="feature-card-top">
                <span className="feature-icon"><AppIcon name={tool.icon} size={22} /></span>
                <span className="feature-number">{tool.number}</span>
              </div>
              <div className="feature-card-copy">
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
              </div>
              <button className="card-action" type="button" onClick={() => navigate(tool.path)}>
                {tool.action}<AppIcon name="arrow" size={17} />
              </button>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}

export default Dashboard;
