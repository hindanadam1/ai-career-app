import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import AppIcon from "./AppIcon";
import Brand from "./Brand";

const navigation = [
  { to: "/dashboard", label: "Vue d’ensemble", icon: "dashboard" },
  { to: "/cv", label: "Mon CV", icon: "cv" },
  { to: "/lettre", label: "Lettre de motivation", icon: "letter" },
  { to: "/entretien", label: "Préparation entretien", icon: "interview" },
  { to: "/historique", label: "Historique", icon: "history" },
];

function AppLayout({ title, subtitle, children }) {
  const navigate = useNavigate();
  const name = localStorage.getItem("nom") || "Utilisateur";
  const initials = name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  useEffect(() => {
    if (!isAuthenticated()) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nom");
    navigate("/");
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink to="/dashboard" className="sidebar-brand" aria-label="AI Career, tableau de bord">
          <Brand />
        </NavLink>

        <p className="sidebar-label">VOTRE ESPACE</p>
        <nav className="sidebar-nav" aria-label="Navigation principale">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/dashboard"}
              className={({ isActive }) => `nav-item ${isActive ? "is-active" : ""}`}>
              <AppIcon name={item.icon} />
              <span>{item.label}</span>
              {item.to === "/dashboard" && <span className="nav-active-mark" />}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-note">
          <span className="sidebar-note-orb" aria-hidden="true" />
          <p className="eyebrow">UN PAS À LA FOIS</p>
          <p>Une candidature réussie commence par des idées bien présentées.</p>
        </div>

        <div className="sidebar-bottom">
          <span className="avatar avatar-small">{initials}</span>
          <span className="sidebar-user-copy"><strong>{name}</strong><small>Espace personnel</small></span>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <div className="topbar-breadcrumb"><span className="status-dot" /><span>ESPACE CANDIDATURE</span></div>
          <div className="topbar-actions">
            <span className="topbar-greeting">Espace personnel</span>
            <span className="avatar">{initials}</span>
            <button className="logout-button" type="button" onClick={handleLogout}>
              <AppIcon name="logout" size={18} /><span>Déconnexion</span>
            </button>
          </div>
        </header>

        <main className="page-content">
          <section className="page-heading">
            <div className="page-heading-copy">
              <p className="eyebrow">AI CAREER <span>/</span> ESPACE DE TRAVAIL</p>
              <h1>{title}</h1>
              {subtitle && <p className="page-subtitle">{subtitle}</p>}
            </div>
            <div className="heading-accent" aria-hidden="true"><span /><span /><span /></div>
          </section>

          {children}

          <footer className="app-footer">
            <span>AI Career Studio</span><span className="footer-divider">·</span><span>Donnez forme à votre prochain chapitre.</span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
