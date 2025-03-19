import { useRef } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAdd }) {
  const modal = useRef();
  const modalOpenRef = useRef(null);

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const handleSave = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modalOpenRef.current();
      return;
    }

    onAdd({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };

  const handleCancel = () => {
    return undefined;
  };

  return (
    <>
      <Modal
        buttonCaption="okay"
        onOpen={(open) => (modalOpenRef.current = open)}
      >
        <h2>Invalid Input</h2>
        <p>Upps... looks like you forgot to enter a value</p>
        <p>Please make sure you provide a valid value for every input field.</p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={handleSave}
            >
              Save
            </button>
          </li>
        </menu>
        <Input ref={title} type="text" label="Title" />
        <Input ref={description} label="Description" textarea />
        <Input ref={dueDate} label="Due Date" type="date" />
      </div>
    </>
  );
}
