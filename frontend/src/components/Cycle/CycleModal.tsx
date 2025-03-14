import { useState } from "react";
import { apiUrl } from "../../constants";
import { useMutation } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
}

interface CycleFormData {
  name: string;
  start_date: string;
  duration: number;
  description: string;
}

async function createCycle(formData: CycleFormData) {
  const url = `${apiUrl.server}/cycle/create`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Error creating cycle");
  }

  return response.json();
}

export default function CycleModal({ onClose }: Props) {
  // const [templates, setTemplates] = useState<string[]>([]);
  const [templates] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [formData, setFormData] = useState<CycleFormData>({
    name: "",
    start_date: "",
    duration: 0,
    description: "",
  });

  function handleInputChange(key: string, value: string | number) {
    setFormData({ ...formData, [key]: value });
  }

  const createCycleMutation = useMutation({
    mutationFn: createCycle,
    onSuccess: (res) => {
      const cycleData = res.data;
      console.log(cycleData);
    },
    onError: (error) => {
      // alert(error);
      console.log(error);
    },
  });

  function handleSubmit() {
    createCycleMutation.mutate(formData);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4">Create Cycle</h2>
        <label className="block mb-2">Create from Existing Template:</label>
        <select
          className="w-full p-2 border rounded mb-2"
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
        >
          <option value="">Select an Existing Cycle Template</option>
          {templates.map((template) => (
            <option key={template} value={template}>
              {template}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Cycle Name"
          className="w-full p-2 border rounded mb-2"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          className="w-full p-2 border rounded mb-2"
          value={formData.start_date}
          onChange={(e) => {
            console.log("Raw date value:", e.target.value);
            handleInputChange("start_date", e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Days Duration"
          className="w-full p-2 border rounded mb-2"
          value={formData.duration}
          onChange={(e) =>
            handleInputChange("duration", Number(e.target.value))
          }
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="p-2 bg-gray-400 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="p-2 bg-orange-500 text-white rounded"
            onClick={handleSubmit}
          >
            Create Cycle
          </button>
        </div>
      </div>
    </div>
  );
}
