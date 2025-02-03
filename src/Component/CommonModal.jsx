import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const CommonModal = ({ show, handleClose, title, body, footer, size }) => {
    return (
        <Modal show={show} onHide={handleClose} dialogClassName={size ? `modal-${size}` : ''}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                {footer ? (
                    footer
                ) : (
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default CommonModal;