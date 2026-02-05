import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.post("/generation-entretien", async (req, res) => {
    try {
        const { userId, poste, niveau } = req.body;

        const questions = [
            ' Parlez-moi de vous ',
            `Pourquoi avez-vous choisi le poste de ${poste} ?`,
            `Pourquoi voulez-vous travailler dans notre entreprise ? `,
            `Expliquez un problème technique que vous avez résolu`,
            `Comment gérez-vous les difficultés au travail ?`,
            `c'est quoi votre ${niveau} actuelle `,

        ];

        const result = questions.join("\n- ");

        await db.execute(
            "INSERT INTO documents (user_id, type, input_data, output_text) VALUES (?, 'interview', ?, ?)",
            [
                userId,
                JSON.stringify({ poste, niveau }),
                result,
            ]
        );

        res.json({ questions });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});



export default router;