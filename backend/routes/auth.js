import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

    const user = rows[0];

    if (!user.password) {
      return res.status(500).json({ message: "Mot de passe manquant" });
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Identifiants incorrects" });
    }

// generation de token 

    const token = jwt.sign(
      { id: user.id, nom: user.nom },
      "SECRET_KEY"
    );

    // les information qui sont dans le token envoyé au front 
    res.json({
      token,
      nom: user.nom,
      userId: user.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});


export default router;