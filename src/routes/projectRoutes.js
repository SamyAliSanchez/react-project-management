import express from "express";
import Project from "../models/Project.js";
const router = express.Router();
import validateProject from "../middleware/validateProject.js"

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find(); // query projects in the db
    res.json(projects); // return the found projects in JSON format
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener proyectos", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json(project); // return the found project
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el proyecto", error: err.message });
  }
});

router.post("/", validateProject, async (req, res) => {
  try {
    const { name, description, dueDate } = req.body;
    if (!name) {
      return res.status(400).json({ message: "El nombre del proyecto es obligatorio" });
    }

    const newProject = new Project({ name, description, dueDate });
    await newProject.save(); // save in the db
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear el proyecto", error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }
    res.json({ message: "Project removed" }); 
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

    const newTask = { text: req.body.text, completed: false };
    project.tasks.push(newTask);
    
    await project.save();
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: "Error al agregar tarea", error: err });
  }
});

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
