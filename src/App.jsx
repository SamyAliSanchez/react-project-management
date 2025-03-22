import { useProjects } from "./hooks/UseProjects.jsx";

import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import ProjectSidebar from "./components/ProjectsSidebar.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const {
    projects,
    selectProjectId,
    setSelectProjectId,
    addProject,
    deleteProject,
    addTaskToProject,
    deleteTaskFromProject,
  } = useProjects();

  const selectedProject = projects?.find(
    (project) => project.id === selectProjectId
  );

  const renderContent = () => {
    if (selectProjectId === null)
      return (
        <NewProject
          onAdd={addProject}
          onCancel={() => setSelectProjectId(undefined)}
        />
      );
    else if (selectProjectId === undefined)
      return (
        <NoProjectSelected onStartAddProject={() => setSelectProjectId(null)} />
      );
    else if (selectedProject) {
      return (
        <SelectedProject
          project={selectedProject}
          onDelete={deleteProject}
          onAddTask={addTaskToProject}
          onDeleteTask={deleteTaskFromProject}
          tasks={selectedProject.tasks}
        />
      );
    }
  };

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onSelectProject={setSelectProjectId}
        onStartAddProject={() => setSelectProjectId(null)}
        projects={projects}
        selectedProjectId={selectProjectId}
      />
      {renderContent()}
    </main>
  );
}

export default App;
