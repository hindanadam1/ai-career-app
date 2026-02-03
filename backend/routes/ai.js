import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/generate-cv", async (req, res) => {
  try {
    const { userId, prenom, nom, poste, competences, experience } = req.body;

    const cv = `
   Curriculum Vitae 
   
${prenom} ${nom}
Poste recherché : ${poste}

Compétences :
${competences}

Expériences :
${experience}
`;

    await db.execute(
      "INSERT INTO documents (user_id, type, input_data, output_text) VALUES (?, 'cv', ?, ?)",
      [
        userId,
        JSON.stringify({ prenom, nom, poste, competences, experience }),
        cv,
      ]
    );

    res.json({ cv });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
