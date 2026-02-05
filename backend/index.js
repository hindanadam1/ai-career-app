import express from "express";
const app = express();
import "./config/db.js"; 
import authRoutes from "./routes/auth.js"; 
import aiRoutes from "./routes/ai.js";
import historiqueRoutes from "./routes/historique.js"; 

import entretienRoutes from "./routes/entretien.js";
import cors from 'cors' ;


app.use(express.json());


app.use(cors());
app.use("/api", authRoutes);
app.use("/api/ai/", aiRoutes);
app.use("/api/ai/", entretienRoutes);
app.use("/api", historiqueRoutes);



app.listen(3001, () => {
  console.log("Serveur backend lancé sur http://localhost:3001");
}); 

