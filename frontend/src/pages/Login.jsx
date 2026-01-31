function Login() {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div
        className="card bg-dark text-light p-4 shadow"
        style={{ width: "420px" }}
      >
        <h3 className="text-center mb-4">
          Accédez à votre <span className="text-primary">espace carrière IA</span>
        </h3>

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control bg-secondary text-light border-0"
              placeholder="Veuillez saisir votre adresse e-mail"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              className="form-control bg-secondary text-light border-0"
              placeholder="Veuillez saisir votre mot de passe"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 fw-bold"
          >
            Se connecter
          </button>
        </form>

      </div>
    </div>
  );
}

export default Login;
