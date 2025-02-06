import { ProjectDetails } from "../types";

export default function Dashboard({
  projectDetails,
}: {
  projectDetails: ProjectDetails | undefined;
}) {
  return (
    <div>
      {projectDetails === undefined ? (
        <div className="flex justify-center">Select a project to view</div>
      ) : (
        <div className="grid grid-cols-4 gap-4 pl-6">
          <div>Project Name: {projectDetails.name}</div>
          <div>Start Date: {projectDetails.startDate}</div>
          <div>End Date: {projectDetails.endDate}</div>
          <div>Number of Activity: {projectDetails.numActivity}</div>
          <div>Number of Tasks: {projectDetails.numTask}</div>
          <div>Status :{projectDetails.status}</div>
        </div>
      )}
    </div>
  );
}
