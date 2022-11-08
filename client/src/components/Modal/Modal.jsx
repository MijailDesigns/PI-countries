import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const Modal = ({handleHide, handleDelete, id, name}) => {
    return ReactDOM.createPortal(
        <div className='modal' >
            <h2>Are you sure to delete the activity with the name of {name}?</h2>
            <button className='button' id={id} onClick={handleDelete}>Yes, sure</button>
            <button className='button' onClick={handleHide}>No, I'm going think it for a while</button>
        </div>,
        document.getElementById("modal")
    )
}

const styles = {
    wrapper: {
        position: 'absolute',
        top: '0',
        left: 0,
        // width: '100%',
        // heigth: '100%',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    // window: {
    //     position: 'relative',
    //     background: '#fff',
    //     borderRadius: 5,
    //     padding: 15,
    //     boxShadow: '2px 2px 10px rgba(0,0,0,0.3',
    //     zIndex: 10, 
    //     minWidth: 320,
    // },
    // closeBtn: {
    //     position: 'absolute',
    //     top: 0,
    //     right: 0
    // },
    // background: {
    //     position: 'absolute',
    //     width: '100%',
    //     heigth: '100%',
    //     top: '50%',
    //     left: 0,
    //     background: '#000',
    //     // opacity: 0.4,
    // }
}

export default Modal