import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = ({ children, buttonCaption, onOpen }) => {
  const dialog = useRef(null);

  const open = () => {
    dialog.current?.showModal();
  };

  useEffect(() => {
    if (onOpen) {
      onOpen(open);
    }
  }, []);

  return (
    <>
      {createPortal(
        <dialog
          className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
          ref={dialog}
        >
          {children}
          <form method="dialog" className="mt-4 text-right">
            <Button onClick={open}>{buttonCaption}</Button>
          </form>
        </dialog>,
        document.getElementById("modal-root")
      )}
    </>
  );
};
export default Modal;
