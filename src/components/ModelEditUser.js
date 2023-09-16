import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify';
const ModelEditUser = (props) => {
    const {show, handleClose, dataUserEdit, handleEditTable} = props;
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const handleEditUser = () => {
        const user = {
            id: dataUserEdit.id,
            name: name,
            username: username,
            email: email
        }
        handleEditTable(user, dataUserEdit.id);
        toast.success("A user is updated successfully!");
        handleClose();
    }
    useEffect(() => {
        if (show) {
            setName(dataUserEdit.name);
            setUsername(dataUserEdit.username);
            setEmail(dataUserEdit.email);
        }
    }, [dataUserEdit])
    return (
        <>
            <div className="modal show" style={{ display: 'block', position: 'initial' }}>
            <Modal show={show} onHide={handleClose}  backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="body-add-new">
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleEditUser}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </>
    )
}
export default ModelEditUser;