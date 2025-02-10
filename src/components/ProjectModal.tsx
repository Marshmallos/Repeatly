import React, { useRef, useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export interface ProjectModalData {
  id: number;
  name: string;
  //   startDate: Date;
  //   endDate: Date;
  //   status: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  modalData: ProjectModalData;
  onClose: () => void;
  onSubmit: (data: ProjectModalData) => void;
}

export default function ProjectModal({
  isOpen,
  modalData,
  onClose,
  onSubmit,
}: ProjectModalProps) {
  const focusInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ProjectModalData>(modalData);

  // name Focus on field when opening modal
  useEffect(() => {
    if (isOpen && focusInputRef.current) {
      setTimeout(() => {
        focusInputRef.current!.focus();
      }, 0);
    }
  }, [isOpen]);

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onSubmit(formData);
  }

  function handleClose() {
    setFormData(modalData);
    onClose();
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      className="flex justify-center items-center"
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-white max-w-fit rounded-lg">
          <div className="p-8">
            <div>
              <label htmlFor="projectName">Project Name:</label>
              <input
                ref={focusInputRef}
                type="text"
                id="projectName"
                name="projectName"
                value={formData.name}
                placeholder="Enter project name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Start date: </label>
              <DatePicker />
            </div>
            <div>
              <label>End date: </label>
              <DatePicker />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="border border-green-500 bg-green-500 rounded-xl p-2 font-bold"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
