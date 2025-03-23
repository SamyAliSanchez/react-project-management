import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import projectRoutes from "../react-project-management/src/routes/projectRoutes.js"; 

const app = express();

console.log(process.env.MONGO_URI);

// Configuración de CORS para permitir solicitudes desde tu frontend
const corsOptions = {
  origin: "http://localhost:5173", // Permitir solicitudes desde el frontend
  methods: "GET,POST,DELETE,PUT", // Agregar PUT aquí
  allowedHeaders: "Content-Type,Authorization", // Cabeceras permitidas
};

app.use(cors(corsOptions)); // Usa CORS con las opciones configuradas

// Otras configuraciones de tu servidor
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
