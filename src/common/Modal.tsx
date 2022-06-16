import React from "react";
import style from "styles/Modal.module.scss";

interface props {
  showModal: any;
  setShowModal: any;
  children: any;
}

const Modal: React.FC<props> = ({ showModal, setShowModal, children }) => {
  const cancelHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <div
        onClick={cancelHandler}
        className={showModal ? style.backdrop : ""}
      ></div>
      <div className={`${style.modalBox} ${showModal && style.showModal}`}>
        {children}
      </div>
    </>
  );
};

export default Modal;
