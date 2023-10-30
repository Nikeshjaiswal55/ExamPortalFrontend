import {useEffect,useState} from 'react';
import {Col,Form,Row} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AdminModal() {
    // model properties
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    // admin modal input properties
    const [orgName,setOrgName] = useState("");
    const [orgType,setOrgType] = useState("");

    function onChangeName(e) {
        setOrgName(e.target.value);
    }
    function onChangeType(e) {
        setOrgType(e.target.value);
    }
    function onSubmit() {
        if(orgName.length > 0 && orgType.length > 0) {
            alert("Organisation Name :- " + orgName + "   " + "Organisation Type :- " + orgType);
            console.log("Organisation Name :- " + orgName + "   " + "Organisation Type :-  " + orgType);
            return handleClose();
        }
        else {
            alert("please fill all fileds");
            return false;
        }
    }

    useEffect(() => {
        setShow(true);
    },[]);

    return (
        <>

            {show && <Modal show={show} onHide={handleClose} backdrop={'static'} >
                <Modal.Body>
                    {/* validated={true} */}
                    <Form >

                        <Row className="my-5 mx-3">
                            <Form.Group controlId="admin-organisation">
                                <Form.Label>Organisation Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={onChangeName}
                                    defaultValue={orgName}
                                    placeholder="Organisation Name"
                                />
                                {/* <Form.Control.Feedback type="invalid" >
                                    provide a valid Organisation Name.
                                </Form.Control.Feedback> */}
                            </Form.Group>
                        </Row>
                        <Row className="my-5 mx-3">
                            <Form.Group controlId="admin-organisation">
                                <Form.Label>Organisation Type :</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Organisation Type "
                                    onChange={onChangeType}
                                    defaultValue={orgType}
                                />
                                {/* <Form.Control.Feedback type="invalid" >
                                    provide a valid Organisation Type.
                                </Form.Control.Feedback> */}

                            </Form.Group>
                        </Row>

                        <Button variant="primary"
                            type='submit'
                            className='m-auto d-block px-5'
                            onClick={() => {
                                return onSubmit();
                            }}>
                            Submit
                        </Button>
                    </Form >

                </Modal.Body>
            </Modal>}
        </>
    );
}

export default AdminModal;