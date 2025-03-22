import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [selectProjectId, setSelectProjectId] = useState();
  const [projects, setProjects] = useState([]);

  const handleSelectProject = (id) => {
    setSelectProjectId(id);
  };

  const handleStartAddProject = () => {
    setSelectProjectId(null);
  };

  const handleAddProject = (projectData) => {
    const projectId = Math.random();
    setProjects((prevState) => [
      ...prevState,
      { ...projectData, id: projectId, tasks: [] },
    ]);
    setSelectProjectId(undefined);
  };

  const handleCancelAddProject = () => {
    setSelectProjectId(undefined);
  };

  const selectedProject = projects?.find(
    (project) => project.id === selectProjectId
  );

  const handleDeleteProject = () => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== selectProjectId)
    );
    setSelectProjectId(undefined);
  };

  const handleAddTask = (text) => {
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

  const handleDeleteTask = (id) => {
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

  const renderContent = () => {
    if (selectProjectId === null)
      return (
        <NewProject
          onAdd={handleAddProject}
          onCancel={handleCancelAddProject}
        />
      );
    else if (selectProjectId === undefined)
      return <NoProjectSelected onStartAddProject={handleStartAddProject} />;
    else if (selectedProject) {
      return (
        <SelectedProject
          project={selectedProject}
          onDelete={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
          tasks={selectedProject.tasks}
        />
      );
    }
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onSelectProject={handleSelectProject}
        onStartAddProject={handleStartAddProject}
        projects={projects}
        selectedProjectId={selectProjectId}
      />
      {renderContent()}
    </main>
  );
}

export default App;
