import { useState, useEffect } from "react";
import axios from "axios";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [selectProjectId, setSelectProjectId] = useState(undefined);

  // Obtener proyectos desde el backend
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Agregar un nuevo proyecto
  const addProject = (newProject) => {
    const projectToSend = {
      name: newProject.title, // Cambiar 'title' por 'name'
      description: newProject.description,
      dueDate: newProject.dueDate,
      tasks: [], // Asegúrate de que el proyecto tenga una lista de tareas vacía por defecto
    };

    if (!projectToSend.name) {
      alert("El nombre del proyecto es obligatorio");
      return;
    }

    axios
      .post("http://localhost:5001/api/projects", projectToSend)
      .then((res) => {
        setProjects((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        console.error(
          "Error al agregar el proyecto:",
          err.response?.data || err
        );
      });
  };

  // Eliminar un proyecto
  const deleteProject = (id) => {
    axios
      .delete(`http://localhost:5001/api/projects/${id}`)
      .then(() =>
        setProjects((prev) => prev.filter((project) => project._id !== id))
      )
      .catch((err) => console.error(err));
  };

  // Agregar tarea a un proyecto
  const addTaskToProject = (taskText) => {
    if (!taskText.trim()) {
      alert("El texto de la tarea no puede estar vacío");
      return;
    }

    // Crear un nuevo objeto de tarea
    const newTask = {
      id: new Date().toISOString(), // Crear un ID único para la tarea
      text: taskText,
    };

    axios
      .put(
        `http://localhost:5001/api/projects/${selectProjectId}/tasks`,
        newTask
      ) // Llamada PUT para agregar tarea
      .then((res) => {
        const updatedProjects = projects.map((project) =>
          project._id === selectProjectId
            ? { ...project, tasks: [...project.tasks, res.data] }
            : project
        );
        setProjects(updatedProjects);
      })
      .catch((err) => console.error("Error al agregar tarea:", err));
  };

  // Eliminar tarea de un proyecto
  const deleteTaskFromProject = (taskId) => {
    axios
      .delete(
        `http://localhost:5001/api/projects/${selectProjectId}/tasks/${taskId}`
      )
      .then(() => {
        const updatedProjects = projects.map((project) =>
          project._id === selectProjectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task._id !== taskId),
              }
            : project
        );
        setProjects(updatedProjects);
      })
      .catch((err) => console.error("Error al eliminar tarea:", err));
  };

  return {
    projects,
    selectProjectId,
    setSelectProjectId,
    addProject,
    deleteProject,
    addTaskToProject,
    deleteTaskFromProject,
  };
}
