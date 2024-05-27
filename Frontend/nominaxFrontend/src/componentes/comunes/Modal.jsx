import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, children }) => {
    return (
        <Dialog open={isOpen} handler={onClose} size="lg">
            <DialogHeader>Editar Empleado</DialogHeader>
            <DialogBody divider>
                {children}
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onClose} className="mr-1">
                    <span className='bg-red-600 text-lg px-5 py-2 text-lime-50 rounded-xl'>Cancelar</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
