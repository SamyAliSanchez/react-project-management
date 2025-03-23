import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import projectRoutes from "../react-project-management/src/routes/projectRoutes.js"; 

const app = express();

console.log(process.env.MONGO_URI);

const corsOptions = {
  origin: "http://localhost:5173", 
  methods: "GET,POST,DELETE,PUT", 
  allowedHeaders: "Content-Type,Authorization", 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/projects", projectRoutes);

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log("Error al conectar a MongoDB:", err));

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
