import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CV() {
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    poste: "",
    competences: "",
    experience: "",
  });
// ... copy l'ancienne state 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Utilisateur non connecté");
      return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    const res = await fetch("http://localhost:3001/api/ai/generate-cv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    const data = await res.json();
    setResult(data.cv);
  };

  return (
    <div className="container mt-4 text-light">
      <h2>Génération de CV</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="prenom" placeholder="Prénom" onChange={handleChange} />
        <input type="text" name="nom" placeholder="Nom" onChange={handleChange} />
        <input type="text" name="poste" placeholder="Poste recherché" onChange={handleChange} />
        <textarea  name="competences" placeholder="Compétences" onChange={handleChange} />
        <textarea name="experience" placeholder="Expériences" onChange={handleChange} /> <br />
        <button className="btn btn-primary mt-2">Générer</button>
        <br /> <br />
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/Dashboard")}
        > Retourne au Dashboard </button>

      </form>

      {result && (
        <pre className="bg-dark text-light p-3 mt-4">
          {result}
        </pre>
      )}
    </div>
  );
}

export default CV;