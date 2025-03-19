import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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
        <dialog ref={dialog}>
          {children}
          <form method="dialog">
            <button onClick={open}>{buttonCaption}</button>
          </form>
        </dialog>,
        document.getElementById("modal-root")
      )}
    </>
  );
};
export default Modal;
