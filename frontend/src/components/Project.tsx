import CycleGrid, { Cycle } from "./CycleGrid";
import ActivityGrid, { Activity } from "./ActivityGrid";

const cycle = [
  {
    id: "1",
    name: "ICT302S1",
    notes: "Semester 1",
    startDate: new Date("2025-03-01"),
  },
  {
    id: "2",
    name: "ICT302S2",
    notes: "Semester 2",
    startDate: new Date("2025-03-01"),
  },
  {
    id: "3",
    name: "ICT303S1",
    notes: "Semester 1",
    startDate: new Date("2025-03-01"),
  },
  {
    id: "4",
    name: "ICT303S2",
    notes: "Semester 2",
    startDate: new Date("2025-03-01"),
  },
  {
    id: "5",
    name: "ICT304S1",
    notes: "Semester 1",
    startDate: new Date("2025-03-01"),
  },
] satisfies Array<Cycle>;

const activities: Activity[] = [
  {
    id: "1",
    name: "Conference on AI",
    notes: "A 3-day conference on AI and Machine Learning",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-03"),
    noDays: 3,
  },
  {
    id: "2",
    name: "Web Development Workshop",
    notes: "A full-day workshop on modern web development",
    startDate: new Date("2025-03-10"),
    endDate: new Date("2025-03-10"),
    noDays: 1,
  },
  {
    id: "3",
    name: "Project Management Seminar",
    notes: "A two-day seminar on effective project management techniques",
    startDate: new Date("2025-04-05"),
    endDate: new Date("2025-04-06"),
    noDays: 2,
  },
  {
    id: "4",
    name: "Software Engineering Bootcamp",
    notes: "A week-long bootcamp for aspiring software engineers",
    startDate: new Date("2025-05-01"),
    endDate: new Date("2025-05-07"),
    noDays: 7,
  },
  {
    id: "5",
    name: "Marketing Strategy Course",
    notes: "An intensive 5-day course on modern marketing strategies",
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-06-19"),
    noDays: 5,
  },
];

export default function Project() {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <div className="border border-black w-4/5">
        {/* Project */}show project details
      </div>
      <div className="border border-black w-4/5">
        <button>Add new cycle</button>
        {/* Cycle */}
        <CycleGrid rows={cycle} />
      </div>
      <div className="border border-black w-4/5">
        <button>Add new activity</button>
        {/* Activities */}
        <ActivityGrid rows={activities} />
      </div>
      <div>{/* Task */}</div> {/** pending */}
    </div>
  );
}
