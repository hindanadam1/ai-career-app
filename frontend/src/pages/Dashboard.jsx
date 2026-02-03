import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedNom = localStorage.getItem("nom");

        if (!token) {
            navigate("/");
        } else {
            setNom(storedNom);
        }
    }, []);

    return (
        <div className="container mt-5 text-light">

            <h2 className="mb-2 text-center">
                Tableau de bord – <span className="text-primary">AI Career</span>
            </h2>

            <p className="text-center text-secondary mb-4">
                Bienvenue <strong>{nom}</strong>
            </p>

            <div className="row g-4">

                <div className="col-md-4">
                    <div className="card bg-dark text-light h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Générer un CV</h5>
                            <p className="card-text text-secondary">
                                Créez un CV professionnel à partir de votre profil
                            </p>

                            <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate("/cv")}
                            >
                                Accéder
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-dark text-light h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Lettre de motivation</h5>
                            <p className="card-text text-secondary">
                                Générez une lettre personnalisée pour chaque candidature
                            </p>
                            <button className="btn btn-outline-primary">
                                Accéder
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card bg-dark text-light h-100 shadow">
                        <div className="card-body text-center">
                            <h5 className="card-title">Préparer un entretien</h5>
                            <p className="card-text text-secondary">
                                Entraînez-vous avec des questions d’entretien IA
                            </p>
                            <button className="btn btn-outline-primary">
                                Accéder
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
