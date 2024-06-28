import React from 'react';
import './css/verticallyCenteredModal.css';

const VerticallyCenteredModal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className='modal-title-bar'>
                    <button className="close-button" onClick={onClose}>ⓧ</button>
                    <h1 className="modal-title"> Complete Your Booking</h1>
                </div>
                {children}
            </div>
        </div>
    );
};

export default VerticallyCenteredModal;