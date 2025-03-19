import { useState } from "react";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectsSidebar.jsx";

function App() {
  const [selectProjectId, setSelectProjectId] = useState();
  const [projects, setProjects] = useState([]);

  const handleStartAddProject = () => {
    setSelectProjectId(null);
  };

  const handleAddProject = (projectData) => {
    const projectId = Math.random();
    setProjects((prevState) => [
      ...prevState,
      { ...projectData, id: projectId },
    ]);
    setSelectProjectId(undefined);
  };

  const renderContent = () => {
    if (selectProjectId === null)
      return <NewProject onAdd={handleAddProject} />;
    else if (selectProjectId === undefined)
      return <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projects}
      />
      {renderContent()}
    </main>
  );
}

export default App;
