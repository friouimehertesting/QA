import React, { useRef } from "react";
import useClickOutside from "../../hooks/use-click-outside";

import "./style.scss";

function ModalDelete({ setVisible, handleDelete }) {
  const ref = useRef();
  useClickOutside(ref, setVisible);
  return (
    <div className="modal-delete">
      <div className="modal-delete-container" ref={ref}>
        <div className="modal-delete-title">
          <h1 className="title">Are You sure want to delete this Post ?</h1>
        </div>
        <div className="action-btn">
          <button className="delete" onClick={() => handleDelete()}>
            Delete
          </button>
          <button className="cancel" onClick={() => setVisible(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
