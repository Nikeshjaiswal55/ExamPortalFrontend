import {useState} from 'react';
import {Button,Modal} from 'react-bootstrap';


export function ErrorModal(props) {
    const [show,setShow] = useState(true);
    const handleClose = () => setShow(false);


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    here is title
                </Modal.Header>
                <Modal.Body>
                    {props.errorModalText}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
