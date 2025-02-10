import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ProjectDetails } from "../types";
import { ChangeEvent, useState } from "react";
import { Dashboard } from "../components";
import ProjectModal, { ProjectModalData } from "./ProjectModal";
function getTags() {
  return [
    "In Progress",
    "Completed",
    "On Hold",
    "Backlog",
    "Pending Approval",
    "Under Review",
    "High Priority",
    "Low Priority",
    "Urgent",
    "Delayed",
    "Not Started",
  ];
}

function getProjects() {
  return [
    {
      id: 1,
      name: "Website Redesign",
      startDate: "2024-01-15",
      endDate: "2024-04-30",
      numTask: 4,
      numActivity: 3,
      status: "Completed",
    },
    {
      id: 2,
      name: "Mobile App Development",
      startDate: "2024-03-01",
      endDate: "2024-08-15",
      status: "In Progress",
    },
    {
      id: 3,
      name: "E-commerce Platform Migration",
      startDate: "2023-09-05",
      endDate: "2024-01-10",
      status: "Completed",
    },
    {
      id: 4,
      name: "Data Warehouse Implementation",
      startDate: "2024-02-01",
      endDate: "2024-12-15",
      status: "Not Started",
    },
    {
      id: 5,
      name: "Customer Relationship Management (CRM) System",
      startDate: "2023-11-01",
      endDate: "2024-05-20",
      status: "In Progress",
    },
    {
      id: 6,
      name: "Customer Relationship Management (CRM) System",
      startDate: "2023-11-01",
      endDate: "2024-05-20",
      status: "Delayed",
    },
  ] satisfies Array<ProjectDetails>;
}

const defaultProjectModalData = { id: 1, name: "House viewing 3D renderer" };

export default function Home() {
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState<ProjectDetails | undefined>(
    undefined
  );
  const [filterTags, setFilterTags] = useState<Array<string>>([]);
  const [projectFormData, setProjectFormData] = useState<ProjectModalData>(
    defaultProjectModalData
  );
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);

  async function handleSubmit(projectData: ProjectModalData): Promise<void> {
    setProjectFormData(projectData);

    setIsProjectModalOpen(false);
    const valid = true;
    if (valid) {
      // navigate(`/project?id=${projectData.id}`);
      navigate(`/project/${projectData.id}`);
    }
  }

  function handleOpenProjectModal() {
    setIsProjectModalOpen(true);
  }

  function handleCloseProjectModal() {
    setIsProjectModalOpen(false);
  }

  function handleCheckbox(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.checked) {
      setFilterTags([...filterTags, event.target.value]);
    } else {
      const newFilter = filterTags.filter(
        (item) => item !== event.target.value
      );
      setFilterTags(newFilter);
    }
  }
  function showProjectDetails(projectDetails: ProjectDetails) {
    setDisplayData(projectDetails);
  }

  const tagsQuery = useQuery({
    queryKey: ["data"],
    queryFn: getTags,
  });

  const projectQuery = useQuery({
    queryKey: ["projectData"],
    queryFn: getProjects,
  });

  function filterData(projectList: Array<ProjectDetails>) {
    if (filterTags.length < 1) {
      return projectList;
    }

    return projectList.filter((project) => filterTags.includes(project.status));
  }
  const headerStyle = "p-2";
  return (
    <div className="pt-12 px-2">
      <div className="border-3 rounded-lg">
        <Dashboard projectDetails={displayData} />
      </div>
      <div className="flex pt-4 justify-between">
        {/* <div className="flex flex-col border-1 rounded-lg p-2">
          <input type="text" placeholder="Search tags..."></input>
          {tagsQuery.isSuccess &&
            tagsQuery.data.map((item) => {
              return (
                <div key={item} className="px-2">
                  <input
                    type="checkbox"
                    id={item}
                    name={item}
                    value={item}
                    onChange={(event) => handleCheckbox(event)}
                  />
                  <label htmlFor={item} className="pl-1">
                    {item}
                  </label>
                </div>
              );
            })}
        </div> */}
        <div className="pl-4 flex flex-col w-full">
          <div className="pb-2 grid grid-cols-7 gap-2">
            <button
              className="border p-2 rounded-lg bg-green-400 hover:bg-white"
              onClick={handleOpenProjectModal}
            >
              Create new project
            </button>
            <ProjectModal
              isOpen={isProjectModalOpen}
              modalData={projectFormData}
              onClose={handleCloseProjectModal}
              onSubmit={handleSubmit}
            />
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full p-2 col-span-2"
            ></input>
          </div>
          {/* <table className="border-1">
            <thead>
              <tr>
                <th className={headerStyle}>Name</th>
                <th className={headerStyle}>Start</th>
                <th className={headerStyle}>End</th>
                <th className={headerStyle}>Status</th>
                <th className={headerStyle}>View</th>
                <th className={headerStyle}>Edit</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {projectQuery.isSuccess &&
                filterData(projectQuery.data).map((project) => {
                  return (
                    <tr key={project.id}>
                      <td
                        className="text-start p-3.5"
                        onClick={() => showProjectDetails(project)}
                      >
                        {project.name}
                      </td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                      <td>{project.status}</td>
                      <td>
                        <button>View</button>
                      </td>
                      <td>
                        <button>Edit</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table> */}
        </div>
      </div>
    </div>
  );
}
