import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        await fetch("http://localhost:3001/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nom: nom,
                email: email,
                password: password,
            }),
        });

        navigate("/");
    };


    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card bg-dark text-light p-4 shadow" style={{ width: "420px" }}>

                <h3 className="text-center mb-4">
                    Rejoignez <span className="text-primary">AI Career</span>
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control bg-secondary text-light border-0"
                            placeholder="Entrez votre nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}

                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control bg-secondary text-light border-0"
                            placeholder="Entrez votre adresse e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control bg-secondary text-light border-0"
                            placeholder="Entrez votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold"
                    >
                        S'inscrire
                    </button>
                </form>

            </div>
        </div>
    );
}

export default Register;
