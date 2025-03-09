import { useEffect, useState } from "react";
import { apiUrl } from "../constants";
// import { useAuth } from "../utils/useAuth";
import CycleModal from "../components/Cycle/CycleModal";

interface Cycle {
  id: string;
  name: string;
  start_date: string;
  duration: number;
  description: string;
  // activities: number;
  // tasks: number;
  // tags: string[];
}

export default function Cycle() {
  // const { user } = useAuth();
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //   useEffect(() => {
  //     fetch(`${apiUrl.server}/cycles`)
  //       .then((res) => res.json())
  //       .then((data) => setCycles(data.cycles))
  //       .catch((error) => console.error("Error fetching cycles:", error));
  //   }, []);

  const filteredCycles = cycles.filter((cycle) =>
    cycle.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Your Cycles</h1>
      {cycles.length === 0 ? (
        <p className="text-gray-500">
          You currently do not have any cycles. Start by creating one.
        </p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search Cycle, Activity, or Task"
            className="w-full p-2 border rounded mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">No</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Start Date</th>
                <th className="border p-2">Duration (Days)</th>
                <th className="border p-2">Description</th>
                {/*<th className="border p-2">Activities</th>
                <th className="border p-2">Tasks</th>
                <th className="border p-2">Tags</th>*/}
              </tr>
            </thead>
            <tbody>
              {filteredCycles.map((cycle, index) => (
                <tr key={cycle.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{cycle.name}</td>
                  <td className="border p-2">{cycle.start_date}</td>
                  <td className="border p-2">{cycle.duration}</td>
                  <td className="border p-2">{cycle.description}</td>
                  {/*<td className="border p-2">{cycle.activities}</td>
                  <td className="border p-2">{cycle.tasks}</td>
                  <td className="border p-2">{cycle.tags.join(", ")}</td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button
        className="mt-4 p-2 bg-orange-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Create Cycle
      </button>
      {isModalOpen && <CycleModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
