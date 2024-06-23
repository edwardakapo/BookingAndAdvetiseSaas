import React from 'react';
import './css/verticallyCenteredModal.css';

const VerticallyCenteredModal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    );
};

export default VerticallyCenteredModal;