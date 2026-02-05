import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Entretien() {
    const [poste, setPoste] = useState("");
    const [niveau, setNiveau] = useState("junior");
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token.split(".")[1]));

        const res = await fetch("http://localhost:3001/api/ai/generation-entretien", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: payload.id,
                poste,
                niveau,
            }),
        });
        if (!res.ok) {
            console.error("Erreur serveur", res.status);
            return;
        }

        const data = await res.json();
        setQuestions(data.questions);
    };

    return (
        <div className="container mt-4 text-light">
            <h2>Préparer un entretien</h2>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control mb-2"
                    placeholder="Poste ciblé"
                    value={poste}
                    onChange={(e) => setPoste(e.target.value)}
                />

                <select
                    className="form-control mb-2"
                    value={niveau}
                    onChange={(e) => setNiveau(e.target.value)}
                >
                    <option value="junior">Junior</option>
                    <option value="intermediaire">Intermédiaire</option>
                    <option value="senior">Senior</option>
                </select>

                <button className="btn btn-primary">
                    Générer les questions
                </button>

                   <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/Dashboard")}
        > Retourne au Dashboard </button>

            </form>


            <ul className="mt-4">
                {questions.map((q, i) => (
                    <li key={i}>{q}</li>
              
                ))}
            </ul>
        </div>
    );
}

export default Entretien;
;
