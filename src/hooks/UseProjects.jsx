import { useState } from "react";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectProjectId, setSelectProjectId] = useState();

  const addProject = (projectData) => {
    const projectId = Math.random();
    setProjects((prevState) => [
      ...prevState,
      { ...projectData, id: projectId, tasks: [] },
    ]);
    setSelectProjectId(projectId);
  };

  const deleteProject = () => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== selectProjectId)
    );
    setSelectProjectId(undefined);
  };

  const addTaskToProject = (text) => {
    const taskId = Math.random();
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectProjectId
          ? {
              ...project,
              tasks: [...project.tasks, { id: taskId, text }],
            }
          : project
      )
    );
  };

  const deleteTaskFromProject = (id) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectProjectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== id),
            }
          : project
      )
    );
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
};
