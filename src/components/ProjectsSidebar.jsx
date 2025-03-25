import Button from "./Button.jsx";

export default function ProjectSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Project</Button>
      </div>
      <ul className="mt-8">
        {projects?.map((project) => {
          let cssClasses =
            "w-full text-left py-1 rounded-sm my-1 text-stone-400 hover:text-stone-200 hover:bg-stone-800";

          if (project._id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-400";
          } else {
            cssClasses += " text-stone-400";
          }
          return (
            <li key={project._id}>
              <button
                className={cssClasses}
                onClick={() => onSelectProject(project._id)}
              >
                {project.name}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
