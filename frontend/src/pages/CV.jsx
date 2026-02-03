import { useState } from "react";

function CV() {
  const [result, setResult] = useState("");

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    poste: "",
    competences: "",
    experience: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;

    const res = await fetch("http://localhost:3001/api/generate-cv", {
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
        <input name="prenom" placeholder="Prénom" onChange={handleChange} />
        <input name="nom" placeholder="Nom" onChange={handleChange} />
        <input name="poste" placeholder="Poste recherché" onChange={handleChange} />
        <textarea name="competences" placeholder="Compétences" onChange={handleChange} />
        <textarea name="experience" placeholder="Expériences" onChange={handleChange} />
        <button className="btn btn-primary mt-2">Générer</button>
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
