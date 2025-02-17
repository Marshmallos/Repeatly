import { Modal } from "../utils";
import { useState, useRef, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";

const buttonStyle = "border bg-red-100 hover:bg-blue-100";

interface TaskFormData {
  name: string;
  notes: string;
  createdDate: Dayjs;
}

const inputStyle = "border border-gray-300 p-1 rounded-lg";

export default function Task() {
  const initialData = {
    id: 1,
    name: "Buy bottle",
    notes: "For drinking",
    createdDate: new Date("2025-01-07"),
  };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("Buy bottle");
  const [notes, setNotes] = useState<string>("For drinking");
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [formData, setFormData] = useState<TaskFormData>();
  function handleOpenModal() {
    setIsOpen(true);
  }
  const focusInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  function handleCloseModal() {
    setIsOpen(false);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleNoteChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNotes(event.target.value);
  }

  function handleOnSubmit() {
    setFormData({ name: name, notes: notes, createdDate: startDate });
    console.log(formData);
  }

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleOpenModal} className={buttonStyle}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <form action="localhost:8000/task/add">
          <div className="flex flex-col p-4 gap-4">
            <TextField
              id="taskName"
              label="Task Name"
              name="name"
              variant="outlined"
              required
              onChange={handleNameChange}
              value={name}
            />
            <TextField
              id="taskNotes"
              label="Notes"
              name="notes"
              variant="outlined"
              onChange={handleNoteChange}
              multiline
            />
            <DatePicker
              label="Select start date"
              name="startDate"
              value={startDate}
              onChange={(date) => date !== null && setStartDate(date)}
            />
          </div>
        </form>
        <button
          className="bg-green-500 hover:bg-green-800 text-white rounded-lg text-xs p-1"
          type="submit"
        >
          Submit
        </button>
      </Modal>
    </div>
  );
}
