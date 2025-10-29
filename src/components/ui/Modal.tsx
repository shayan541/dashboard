import React, { type ReactNode } from "react";

const Modal: React.FC<{ showModal: boolean; children: ReactNode; closeModalHandler: () => void }> = ({
  showModal,
  children,
  closeModalHandler,
}) => {
  return (
    <>
      {showModal && (
        <div onClick={closeModalHandler} className="fixed bg-black/50 inset-0 flex justify-center items-center">
          <div className="min-w-8 min-h-12 bg-white" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
