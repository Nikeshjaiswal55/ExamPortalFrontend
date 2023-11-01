import React,{useEffect,useState} from 'react'
import backgroundimg from '../image/background-assets.svg'
import {Button} from 'react-bootstrap';
import {Form,Row} from 'react-bootstrap';
import './OrganisationPage.css'
import {useNavigate} from 'react-router-dom';
export default function OrganisationPage() {
    let navigate = useNavigate();
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
            navigate("/admin-dashboard");
        }
        else {
            alert("please fill all fileds");
        }
    }

    return (
        <>
            {/* backgroundImage: `url(${backgroundimg})`,backgroundRepeat: "no-repeat",backgroundAttachment: "fixed",backgroundPosition: "50% 50%" */}
            <div className='row m-0 p-0 ' style={{width: "100%",height: "90vh",backgroundColor: "white"}}>

                <img src={backgroundimg} className=' object-fit-fill img-fluid' height="90vh" alt="" />

                <div id='org-box' className='m-0 p-3 rounded-3 position-absolute top-50 start-50 translate-middle  '>
                    <Form >
                        <Row className="my-5 mx-3">
                            <Form.Group controlId="admin-organisation">
                                <Form.Label className=' fw-bold'>Organisation Name :</Form.Label>
                                <Form.Control

                                    type="text"
                                    style={{borderColor: "#707070"}}
                                    className='p-1 border focus-ring focus-ring-light '
                                    onChange={onChangeName}
                                    defaultValue={orgName}
                                    placeholder="Organisation Name"
                                />
                            </Form.Group>
                        </Row>
                        <Row className="my-5 mx-3">
                            <Form.Group controlId="admin-organisation">
                                <Form.Label className=' fw-bold'>Organisation Type :</Form.Label>
                                <Form.Select aria-label="Select Type "
                                    onChange={onChangeType}
                                    style={{borderColor: "#707070"}}
                                    className='p-1 border focus-ring focus-ring-light '>
                                    <option value=''>Select Type</option>
                                    <option value="company">Company</option>
                                    <option value="college">College</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="my-5 mx-3 p-3">
                            <Button variant='dark'
                                type='submit'
                                className='m-auto d-block px-5 mb-3 '
                                onClick={() => {
                                    return onSubmit();
                                }}>
                                Get Started
                            </Button>
                        </Row>
                    </Form >

                </div>
            </div>
        </>
    )
}
