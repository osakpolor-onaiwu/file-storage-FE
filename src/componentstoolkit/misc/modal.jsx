import React, { useState } from "react";


const Modal=({})=> {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="my-modal">
      {isOpen && (
        <>
          <div className="overlay"></div>
          <div className="modal">
            <header className="modal__header">
              <h2>Modal Title</h2>
              <button onClick={closeModal} className="close-button">&times;</button>
            </header>
            <main className="modal__main">
              <p>Some content here!</p>
            </main>
          </div>
        </>
      )}

      <button className="button" onClick={openModal}>Open Modal</button>
    </div>
  );
}

export default Modal;