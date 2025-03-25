import { useState, useEffect } from "react";
import axios from "axios";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [selectProjectId, setSelectProjectId] = useState(undefined);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (newProject) => {
    const projectToSend = {
      name: newProject.title,
      description: newProject.description,
      dueDate: newProject.dueDate,
      tasks: [],
    };

    try {
      const res = await axios.post(
        "http://localhost:5001/api/projects",
        projectToSend
      );
      setProjects((prev) => [...prev, res.data]);
      setSelectProjectId(res.data._id);
    } catch (err) {
      console.error("Error to add project", err.response?.data || err);
    }
  };

  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/projects/${id}`
      );
      setProjects((prev) => prev.filter((project) => project._id !== id));
      setSelectProjectId(undefined);
    } catch (err) {
      console.error("Error to delete the project", err);
    }
  };

  const addTaskToProject = async (taskText) => {
    if (!taskText.trim()) {
      alert("Text cannot be empty");
      return;
    }
    // Create task object
    const newTask = {
      id: new Date().toISOString(),
      text: taskText,
    };

    try {
      const res = await axios.put(
        `http://localhost:5001/api/projects/${selectProjectId}/tasks`,
        newTask
      );
      const updatedTask = res.data;
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project._id === selectProjectId
            ? // ? { ...project, tasks: [...project.tasks, res.data.tasks] }
              { ...project, tasks: updatedTask.tasks }
            : project
        )
      );
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const deleteTaskFromProject = async (taskId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5001/api/projects/${selectProjectId}/tasks/${taskId}`
      );
      setProjects((prevProjects) => {
        const updateProjects = prevProjects.map((project) =>
          project._id === selectProjectId
            ? {
                ...project,
                tasks: project.tasks.filter((task) => task._id !== taskId),
              }
            : project
        );
        setProjects(updateProjects);
      });
    } catch (err) {
      console.error("Error deleting task", err);
    }
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
