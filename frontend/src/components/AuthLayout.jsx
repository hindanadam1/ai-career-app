import { Link } from "react-router-dom";
import Brand from "./Brand";

function AuthLayout({ eyebrow, title, subtitle, children, footer }) {
  return (
    <main className="auth-shell">
      <section className="auth-showcase">
        <Link to="/" className="auth-brand" aria-label="AI Career, accueil">
          <Brand />
        </Link>

        <div className="auth-showcase-copy">
          <p className="eyebrow">L'ATELIER DE VOTRE PARCOURS</p>
          <h1>Le prochain chapitre <span>commence ici.</span></h1>
          <p className="auth-showcase-lead">
            Un espace pour clarifier vos idées, valoriser votre parcours et préparer chaque étape avec confiance.
          </p>
        </div>

        <div className="auth-art" aria-hidden="true">
          <div className="auth-art-ring auth-art-ring-one" />
          <div className="auth-art-ring auth-art-ring-two" />
          <div className="auth-art-card">
            <span className="auth-art-kicker">VOTRE PROCHAIN OBJECTIF</span>
            <span className="auth-art-title">Un parcours qui vous ressemble.</span>
            <span className="auth-art-line"><i /><i /><i /></span>
            <span className="auth-art-footer"><b /> Prêt à prendre forme</span>
          </div>
          <span className="auth-art-star">✳</span>
        </div>

        <p className="auth-showcase-foot">Chaque expérience compte. Faites-la ressortir.</p>
      </section>

      <section className="auth-main">
        <div className="auth-card">
          <Link to="/" className="auth-mobile-brand" aria-label="AI Career, accueil">
            <Brand />
          </Link>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="auth-intro">{subtitle}</p>
          {children}
          <div className="auth-footer">{footer}</div>
        </div>
        <p className="auth-legal">AI Career Studio <span>·</span> Votre espace, votre trajectoire.</p>
      </section>
    </main>
  );
}

export default AuthLayout;
