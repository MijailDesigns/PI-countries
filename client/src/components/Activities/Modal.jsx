import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({handleHide, handleDelete, id}) => {
    return ReactDOM.createPortal(
        <div className="counter" >
            <p>Are you sure to delete this activity?</p>
            <button id={id} onClick={handleDelete}>Yes, sure</button>
            <button onClick={handleHide}>No, I'm going think it for a while</button>
        </div>,
        document.getElementById("modal")
    )
}

export default Modal