import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return;

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("nom", data.nom);
    

    navigate("/dashboard");
  };
    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div
                className="card bg-dark text-light p-4 shadow"
                style={{ width: "420px" }}
            >
                <h3 className="text-center mb-4">
                    Accédez à votre <span className="text-primary">espace carrière IA</span>
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                          
                            type="email"
                            className="form-control bg-secondary text-light border-0"
                            placeholder="Veuillez saisir votre adresse e-mail"
                              value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control bg-secondary text-light border-0"
                            placeholder="Veuillez saisir votre mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold"
                    >
                        Se connecter
                    </button> <br /> <br />

                    <p className="text-primary" >
                        Pas de compte ? <Link to="/register">S'inscrire</Link>
                    </p>
                 
                </form>

            </div>
        </div>
    );
}

export default Login;