import { useEffect, useState } from "react";

function History() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;

    fetch("http://localhost:3001/api/documents/" + userId)
      .then((res) => res.json())
      .then((data) => setDocuments(data));
  }, []);

  return (
    <div>
      <h2>Historique</h2>

      {documents.length === 0 && <p>Aucun document</p>}

      {documents.map((docment, index) => (
        <div key={index}>
          <p>Type : {docment.type}</p>
          <p>Date : {docment.created_at}</p>
          <pre>{docment.output_text}</pre>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default History;
