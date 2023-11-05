import React,{useEffect,useState} from 'react'
import backgroundimg from '../assets/org-img.svg'
import {Button,Spinner} from 'react-bootstrap';
import {Form,Row} from 'react-bootstrap';
import './OrganisationPage.css'
import {useNavigate} from 'react-router-dom';
import '../components/style.css'
import {useFormik} from 'formik';
import {orgPageSchema} from './yup-schema/OrgPageSchema';
import {usePostOrganisationDetailsMutation} from '../../../apis/Service';
import {InputField} from '../components/InputField';
import {useAuth0} from '@auth0/auth0-react';
import {getAccessToken} from '../../../auth/Private';

const initialValues = {"org-name": "","org-type": ""};
export default function OrganisationPage() {
    const navigate = useNavigate();
    const [scroller,setScroller] = useState();
    const {user,isAuthenticated,getAccessTokenSilently,loginWithRedirect} =
        useAuth0();

    useEffect(() => {
        if(isAuthenticated) {
            getAccessToken(getAccessTokenSilently,user);
        }
    },[isAuthenticated,getAccessTokenSilently]);
    // rtk query part start 
    // const storeData = {
    //     // you can remove id only for json-server checking purpose
    //     "orgnizationName": "",
    //     "orgnizationType": "ssism-type",
    //     "user": {
    //         "userId": "",
    //         "email": "piyushd.bca2022@ssism.org",
    //         "name": "Piyush Dixit",
    //         "picture": "https://lh3.googleusercontent.com/a/ACg8ocKoVOXfDkej7HRaj5t4h6CsFCbKcXJxkuI0oly88bqLRw=s96-c",
    //         "sub": "google-oauth2|115619680420997183545",
    //         "updatedAt": "2023-11-02T09:39:48.885Z"
    //     }
    // };

    const [postOrgDetails,responseInfo] = usePostOrganisationDetailsMutation();

    async function onGetStarted(values) {
        const users = JSON.parse(localStorage.getItem('users'))
        const storeData = {};
        storeData.orgnizationName = values['org-name'];
        storeData.orgnizationType = values['org-type'];
        storeData.user = {name: users.name,email: users.email,picture: users.picture,sub: users.sub};
        if(localStorage.getItem('accessToken')) {
            console.log("response info :- ",responseInfo)
            const accessToken = localStorage.getItem("accessToken");
            // post org details 
            setScroller(true);
            const promise = await postOrgDetails({...storeData,accessToken});

            if(promise.data) {
                console.log("Organisation Name :- " + values['org-name'] + "   " + "Organisation Type :-  " + values['org-type']);
                navigate("/create-course");
            }
            else {
                setScroller(false);
                // <ErrorModal errorModalText={"sorry your connection lost or api failed "} />
                alert("sorry your connection lost or api failed ")

            }
        } else {
            loginWithRedirect()
        }

    }

    // ===============formik ==================
    const {values,errors,touched,handleBlur,handleChange,handleSubmit} =
        useFormik({
            initialValues: initialValues,
            validationSchema: orgPageSchema,
            onSubmit: onGetStarted,
        });


    return (
        <>

            {<div className='row m-0 p-0 w-100  bg-white ' style={{height: "90vh"}}>


                <img src={backgroundimg} id='org-img-top' className='org-img w-25 img-fluid position-absolute top-0  start-0' alt="" />
                <img src={backgroundimg} id='org-img-bottom' className='org-img w-25 img-fluid position-absolute   bottom-0 end-0 ' alt="" />

                <div id='org-box' className='m-0 p-3 rounded-3 position-absolute top-50  start-50 translate-middle  '>

                    <Form onSubmit={handleSubmit} >
                        <InputField
                            rowClassName={"my-3"}
                            inputName={'org-name'}
                            inputId={'org-name'}
                            onInputBlur={handleBlur}
                            onInputChange={handleChange}
                            inputValue={values['org-name']}
                            formGroupId={"admin-organisation-name"}
                            placeholder={"Organisation Name"}
                            labelText={"Organisation Name"}
                            invalidCondition={errors['org-name'] && touched['org-name']}
                            invalidText={"please provide a name"}
                        />
                        <Row className="my-3 mx-3">
                            <Form.Group>
                                <Form.Label className=' fw-bold'>Organisation Type :</Form.Label>
                                <Form.Select aria-label="Select Type "
                                    onChange={handleChange}
                                    value={values['org-type']}
                                    onBlur={handleBlur}
                                    style={{borderColor: "#707070"}}
                                    name='org-type'
                                    className=' input-border p-2 border focus-ring focus-ring-light'>
                                    <option value=''>Select Type</option>
                                    <option value="company">Company</option>
                                    <option value="college">College</option>
                                </Form.Select>
                                {errors['org-type'] && touched['org-type'] ? <p className=" text-capitalize text-danger px-2">please select option</p> : null}
                            </Form.Group>
                        </Row>
                        <Row className="my-5 mx-3 p-3">
                            <Button variant='dark'
                                type='submit'
                                className='btn m-auto d-block px-5 mb-3 rounded-5 '
                            >
                                {scroller && <Spinner animation='border' size='sm' />}     Get Started
                            </Button>
                        </Row>
                    </Form >
                </div>
            </div>}

        </>
    )
}
