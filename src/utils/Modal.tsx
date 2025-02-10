import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

// const modalStyle =
//   "max-w-[20rem] p-8 border-0 rounded-lg absolute shadow-[0_0_0.5rem_0.25rem_hsl(0_0%_0%_/_10%)] backdrop-blue-xl top";
const modalStyle =
  "absolute left-[51rem] top-[22rem] max-w-[20rem] p-8 rounded-lg backdrop-blue-xl";
const buttonStyle = "modal-close-btn text-xs absolute top-1 right-1";
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  function handleCloseModal() {
    if (onClose !== undefined) {
      onClose();
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "escape") {
      handleCloseModal();
    }
  }

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (isOpen) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={modalRef} className={modalStyle} onKeyDown={handleKeyDown}>
      {onClose !== undefined && (
        <button
          onClick={handleCloseModal}
          className={buttonStyle}
          aria-label="Close modal"
        >
          Close
        </button>
      )}
      {children}
    </dialog>
  );
}
