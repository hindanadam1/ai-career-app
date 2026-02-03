import express from "express";
import bcrypt from "bcryptjs";
import db from "../config/db.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO users (nom, email, password) VALUES (?, ?, ?)",
      [nom, email, hashedPassword]
    );

    res.json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});


export default router;
