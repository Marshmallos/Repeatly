import React, { useRef, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const modalStyle =
  "absolute left-[50%] top-[50%] -translate-[50%] rounded-lg p-2";
// const modalStyle = "";
const buttonStyle =
  "text-xs bg-red-500 rounded-lg text-white hover:bg-red-800 p-1";

const divStyle =
  "fixed top-0 left-0 z-30 h-screen w-screen bg-black opacity-70";

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  // export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
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
    <div className={isOpen ? divStyle : ""}>
      <dialog ref={modalRef} className={modalStyle} onCancel={onClose}>
        {children}
        <button
          onClick={onClose}
          className={buttonStyle}
          aria-label="Close modal"
        >
          Cancel
        </button>
      </dialog>
    </div>
  );
}
