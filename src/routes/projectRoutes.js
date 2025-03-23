import express from "express";
import Project from "../models/Project.js";
const router = express.Router();

// Obtener todos los proyectos
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); // Consultar proyectos en la base de datos
    res.json(projects); // Devolver los proyectos encontrados en formato JSON
  } catch (err) {
    console.error(err);  // Agregar esto para imprimir el error y obtener más detalles
    res.status(500).json({ message: "Error al obtener proyectos", error: err.message });
  }
});

// Crear un nuevo proyecto
router.post("/", async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    if (!name) {
      return res.status(400).json({ message: "El nombre del proyecto es obligatorio" });
    }

    const newProject = new Project({ name, description, dueDate });
    await newProject.save(); // Guardar el proyecto en la base de datos
    res.status(201).json(newProject); // Devolver el proyecto creado en formato JSON
  } catch (err) {
    console.error(err);  // Imprimir el error para mayor claridad
    res.status(500).json({ message: "Error al crear el proyecto", error: err.message });
  }
});

// Eliminar un proyecto
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id); // Eliminar proyecto por ID
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json({ message: "Proyecto eliminado" }); // Confirmar eliminación
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el proyecto", error: err.message });
  }
});

router.put("/:projectId/tasks", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    
    const newTask = { text: req.body.text, completed: false };  // Suponiendo que quieres agregar una nueva tarea
    project.tasks.push(newTask);
    
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error al agregar tarea", error: err });
  }
});

// Eliminar una tarea de un proyecto
router.delete("/:projectId/tasks/:taskId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    const taskId = req.params.taskId;
    project.tasks = project.tasks.filter((task) => task._id.toString() !== taskId);
    await project.save();
    res.json({ message: "Tarea eliminada" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar tarea" });
  }
});


export default router;
