import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify';
const ModalConfirm = (props) => {
    const {show, handleClose, dataUserDelete, handleDelete} = props;
    const confirmDelete = () => {
        handleDelete(dataUserDelete);
        handleClose();
        toast.success("User deleted!");
    }
    return (
        <>
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal show={show} onHide={handleClose}  backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <h3>This action can't be undone!</h3>
                        Do you really want to delete {dataUserDelete.name}?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                    Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}
export default ModalConfirm;