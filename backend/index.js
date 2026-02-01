import express from "express";
const app = express();
import "./config/db.js"; 
import authRoutes from "./routes/auth.js";
import cors from 'cors' ;

app.use(express.json());


app.use(cors());
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Serveur backend lancé sur http://localhost:3001");
}); 

