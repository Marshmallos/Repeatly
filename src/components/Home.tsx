import { useQuery } from "@tanstack/react-query";
import { ProjectDetails } from "../types";
import { ChangeEvent, useState } from "react";
import { Dashboard } from "../components";
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
  ] satisfies Array<ProjectDetails>;
}

export default function Home() {
  const [displayData, setDisplayData] = useState<ProjectDetails | undefined>(
    undefined
  );
  const [filterTags, setFilterTags] = useState<Array<string>>([]);

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

  return (
    <div className="pt-12 px-2">
      <div className="border-3 rounded-lg">
        <Dashboard projectDetails={displayData} />
      </div>
      <div className="grid md:grid-flow-row lg:grid-flow-col grid-rows-6 gap-4 pt-4">
        <div className="row-span-6 border-1 rounded-lg shadow-md">
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
        </div>
        <div className="col-span-3 row-span-6 border-1 rounded-lg shadow-md">
          <table className="w-full border-separate border-spacing-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start</th>
                <th>End</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {projectQuery.isSuccess &&
                filterData(projectQuery.data).map((project) => {
                  return (
                    <tr key={project.id}>
                      <td
                        className="text-start pl-2"
                        onClick={() => showProjectDetails(project)}
                      >
                        {project.name}
                      </td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                      <td>{project.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
