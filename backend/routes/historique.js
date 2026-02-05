import express from "express";
import db from "../config/db.js";

const router = express.Router();

router.get("/documents/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const [rows] = await db.execute(
      "SELECT type, output_text, created_at FROM documents WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur coté serveur" });
  }
});

export default router;
