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


router.post("/generate-letter", async (req, res) => {
  try {
    const { userId, poste, entreprise, profil } = req.body;

    const letter = `
Objet : Candidature au poste de ${poste}

Madame, Monsieur,

Actuellement ${profil}, je souhaite vous proposer ma candidature au poste de ${poste} au sein de votre entreprise ${entreprise}.

Motivé(e), sérieux(se) et impliqué(e), je souhaite mettre mes compétences au service de votre équipe et contribuer activement au développement de votre organisation.

Je reste à votre disposition pour un entretien.

Cordialement,
`;

    await db.execute(
      "INSERT INTO documents (user_id, type, input_data, output_text) VALUES (?, 'letter', ?, ?)",
      [
        userId,
        JSON.stringify({ poste, entreprise, profil }),
        letter,
      ]
    );

    res.json({ letter });
  } catch (error) {
  console.error("❌ ERREUR GENERATE CV :", error);
  res.status(500).json({ message: "Erreur serveur" });
}
});

export default router;