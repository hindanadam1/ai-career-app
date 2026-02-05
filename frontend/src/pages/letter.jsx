import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Letter() {
  const [result, setResult] = useState("");
      const navigate = useNavigate();

  const [form, setForm] = useState({
    poste: "",
    entreprise: "",
    profil: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = JSON.parse(
      atob(localStorage.getItem("token").split(".")[1])
    ).id;

    const res = await fetch("http://localhost:3001/api/ai/generate-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId }),
    });

    const data = await res.json();
    setResult(data.letter);
  };

  return (
    <div className="container mt-4 text-light">
      <h2>Lettre de motivation</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="poste"
          placeholder="Poste"
          onChange={handleChange}
        />
        <input
          name="entreprise"
          placeholder="Entreprise"
          onChange={handleChange}
        />
        <textarea
          name="profil"
          placeholder="Profil du candidat"
          onChange={handleChange}
        />

        <button className="btn btn-primary mt-2">
          Générer la lettre
        </button> <br /> <br />
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

export default Letter;









