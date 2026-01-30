import express from "express";
const app = express();
import "./config/db.js"; //

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend bien installé + sql connecté  ");
});

app.listen(3001, () => {
  console.log("Serveur backend lancé sur http://localhost:3001");
});
