import React, { useEffect, useState } from 'react';
import './sns.css';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/ssism-logo.png';
import bgCollege from '../../../src/assets/college-image.jpg';
import { toast } from 'react-toastify';
import {
  useSendOtpMutation,
  useStudentRegistrationMutation,
} from '../../apis/Service';
import { useNavigate } from 'react-router-dom';
import { setEncryptData } from '../../utils/getDecryptedResponse';
import axios from 'axios';

const LeadGenerationPage = () => {
  const navigate = useNavigate();
  const [postStudent, { isError, isSuccess, isLoading }] =
    useStudentRegistrationMutation();
  const [sendOtp] = useSendOtpMutation();
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    // Fetch districts
    axios
      .get('https://district-seven.vercel.app/api/districts')
      .then((response) => {
        setDistricts(response?.data?.districts);
      })
      .catch((error) => {
        console.error('Error fetching districts', error);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict) {
      // Fetch tehsils based on selected district
      axios
        .get(
          `https://district-seven.vercel.app/api/districts/${selectedDistrict}/tehsils`
        )
        .then((response) => {
          console.log(response);

          setTehsils(response?.data?.tehsils);
        })
        .catch((error) => {
          console.error('Error fetching tehsils', error);
        });
    }
  }, [selectedDistrict]);

    // State for toggling language
    const [isHindi, setIsHindi] = useState(false);


const validationSchema = Yup.object().shape({
  name: Yup.string().required(isHindi ? 'नाम आवश्यक है' : 'Name is required'),
  fatherName: Yup.string().required(isHindi ? 'पिता का नाम आवश्यक है' : 'Father Name is required'),
  village: Yup.string().required(isHindi ? 'गाँव आवश्यक है' : 'Village is required'),
  district: Yup.string().required(isHindi ? 'जिला आवश्यक है' : 'District is required'),
  tehsil: Yup.string().required(isHindi ? 'तहसील आवश्यक है' : 'Tehsil is required'),
  mobileNumber: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      isHindi ? 'मोबाइल नंबर 10 अंकों का होना चाहिए' : 'Mobile number must be 10 digits'
    )
    .required(isHindi ? 'मोबाइल नंबर आवश्यक है' : 'Mobile number is required'),
  whatsappNumber: Yup.string()
    .matches(
      /^[0-9]{10}$/,
      isHindi ? 'व्हाट्सएप नंबर 10 अंकों का होना चाहिए' : 'Whatsapp number must be 10 digits'
    )
    .required(isHindi ? 'व्हाट्सएप नंबर आवश्यक है' : 'Whatsapp number is required'),
  school: Yup.string().required(isHindi ? 'कक्षा 12 स्कूल आवश्यक है' : 'Class 12 School is required'),
  stream: Yup.string().required(isHindi ? 'कक्षा 12 स्ट्रीम आवश्यक है' : 'Class 12 Stream is required'),
});


  

  const handleSubmit = (values) => {
    console.log('values', values);
    const payload = {
      name: values.name,
      fatherName: values.fatherName,
      mobileNumber1: values.mobileNumber,
      mobileNumber2: values.whatsappNumber,
      school12: values.school,
      tehsil: values.tehsil,
      subject12: values.stream,
      district: values.district,
      village: values.village,
    };
    try {
      postStudent(payload).then((res) => {
        console.log('resss', res?.data?.data);
        if (res?.data?.data) {
          const payload = {
            mobileNumber: res?.data?.data.WP_MobileNumber,
          };
          sendOtp(payload).then((otpRes) => {
            if (otpRes.data?.success == true) {
              setEncryptData(res?.data?.data.WP_MobileNumber, 'm-num');
              setEncryptData(res?.data?.data, 's-data');
              sessionStorage.setItem('otp', true);
              navigate('/otp');
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    if (sessionStorage.getItem('otp')) {
      navigate('/otp');
    }
  }, []);

  // const toggleLanguage = (language) => {
  //     setIsHindi(language === "hi");
  // };

  // console.log(tehsil)

  const toggleLanguage = () => {
    setIsHindi((prev) => !prev);
  };

  const streamOptions = [
    { value: 'Maths', label: 'Maths (गणित)' },
    { value: 'Biology', label: 'Biology (जीव विज्ञान)' },
    { value: 'Commerce', label: 'Commerce (वाणिज्य)' },
    { value: 'Agriculture', label: 'Agriculture (कृषि)' },
    { value: 'Arts', label: 'Arts (कला)' },
  ];

  return (
    <div className="image-bg overflow" style={{ height: '100vh' }}>
      <div className="container svs_layout">
        <div className="mt-2 mb-3 m-0 p-0">
          <img src={logo} alt="logo" className="img-fluid image-svs" />
        </div>
        <h3 className="fw-bold text-center mt-3 my-2">
          Welcome Folks to SNS-SVS Exam Portal{' '}
        </h3>
        <h6 className="fw-bold text-center mb-5" style={{ color: '#f75b05' }}>
          Empower rural youth for a brighter future
        </h6>

        <div className="mb-5">
          {/* <Form.Group className="mb-3 d-flex">
                        <Form.Label className="fw-bold">Language</Form.Label>
                        <Form.Control
                            as="select"
                            className="form-control"
                            style={{width:'6rem'}}
                            value={isHindi ? "hi" : "en"}
                            onChange={(e) => toggleLanguage(e.target.value)}
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                        </Form.Control>
                    </Form.Group> */}
          <div className="d-flex justify-content-end">
            <Button
              className="mb-3 fw-bold"
              style={{ background: '#007bff' }}
              onClick={toggleLanguage}
            >
              {isHindi ? 'Switch to English' : 'हिंदी में बदलें'}
            </Button>
          </div>

          <Formik
            initialValues={{
              name: '',
              fatherName: '',
              village: '',
              mobileNumber: '',
              school: '',
              stream: '',
              district: '',
              tehsil: '',
              whatsappNumber: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3 gap-2 gap-lg-0">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'नाम' : 'Name'}
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        name="name"
                        placeholder={
                          isHindi ? 'अपना नाम दर्ज करें' : 'Enter your name'
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="shadow-sm"
                        value={values.name}
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'पिता का नाम' : "Father's Name"}
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        name="fatherName"
                        placeholder={
                          isHindi
                            ? 'पिता का नाम दर्ज करें'
                            : "Enter father's name"
                        }
                        onChange={handleChange}
                        className="shadow-sm"
                        onBlur={handleBlur}
                        value={values.fatherName}
                      />
                      <ErrorMessage
                        name="fatherName"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3 gap-2 gap-lg-0">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi
                          ? 'व्हाट्सएप नंबर (ओटीपी सत्यापन के लिए)'
                          : 'WhatsApp Number (for OTP verification)'}
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        name="whatsappNumber"
                        placeholder={
                          isHindi
                            ? 'अपना व्हाट्सएप नंबर दर्ज करें'
                            : 'Enter your WhatsApp number'
                        }
                        onChange={handleChange}
                        className="shadow-sm"
                        onBlur={handleBlur}
                        value={values.whatsappNumber}
                      />
                      <ErrorMessage
                        name="whatsappNumber"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'मोबाइल नंबर' : 'Mobile Number'}
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        name="mobileNumber"
                        placeholder={
                          isHindi
                            ? 'अपना मोबाइल नंबर दर्ज करें'
                            : 'Enter your mobile number'
                        }
                        onChange={handleChange}
                        className="shadow-sm"
                        onBlur={handleBlur}
                        value={values.mobileNumber}
                      />
                      <ErrorMessage
                        name="mobileNumber"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3 gap-2 gap-lg-0">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'कक्षा 12 विद्यालय' : 'Class 12th School'}
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        name="school"
                        placeholder={
                          isHindi
                            ? 'अपना विद्यालय का नाम दर्ज करें'
                            : 'Enter your school name'
                        }
                        onChange={handleChange}
                        className="shadow-sm"
                        onBlur={handleBlur}
                        value={values.school}
                      />
                      <ErrorMessage
                        name="school"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                      {isHindi ? 'कक्षा 12 विषय':'Class 12th Stream'}
                      </Form.Label>
                      <Field
                        as="select"
                        name="stream"
                        className="form-control shadow-sm"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.stream}
                      >
                        <option value="">Select your stream</option>
                        {streamOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="stream"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {/* 
                                <Row className="mb-3 gap-2 gap-lg-0">
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'जिला' : 'District'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="district"
                                                placeholder={isHindi ? 'अपना जिला दर्ज करें' : 'Enter your district'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.district}
                                            />
                                            <ErrorMessage
                                                name="district"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={12} md={6}>
                                        <Form.Group>
                                            <Form.Label className="fw-bold">
                                                {isHindi ? 'तहसील' : 'Tehsil'}
                                            </Form.Label>
                                            <Field
                                                as={Form.Control}
                                                name="tehsil"
                                                placeholder={isHindi ? 'अपनी तहसील दर्ज करें' : 'Enter your tehsil'}
                                                onChange={handleChange}
                                                className="shadow-sm"
                                                onBlur={handleBlur}
                                                value={values.tehsil}
                                            />
                                            <ErrorMessage
                                                name="tehsil"
                                                component="div"
                                                className="text-danger"
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row> */}

                <Row className="mb-3 gap-2 gap-lg-0">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'जिला' : 'District'}
                      </Form.Label>
                      <Field
                        as="select"
                        name="district"
                        className="form-control shadow-sm custom-dropdown"
                        onChange={(e)=>{handleChange(e);setSelectedDistrict(e.target.value)}}
                        onBlur={handleBlur}
                        value={values.district}

                      >
                        <option value="">Select your district</option>
                        {districts.map((district) => (
                          <option key={district.id} value={district.name}>
                            {district.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="district"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'तहसील' : 'Tehsil'}
                      </Form.Label>
                      <Field
                        as="select"
                        name="tehsil"
                        className="form-control shadow-sm custom-dropdown"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tehsil}
                      >
                        <option value="">Select your tehsil</option>
                        {tehsils?.map((tehsil) => (
                          <option key={tehsil.id} value={tehsil.name}>
                            {tehsil.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="tehsil"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3 gap-2 gap-lg-0">
                  <Col xs={12} md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">
                        {isHindi ? 'पता' : 'Local Address'}
                      </Form.Label>
                      <Field
                        as={Form.Control}
                        name="village"
                        placeholder={
                          isHindi
                            ? 'अपना पता दर्ज करें'
                            : 'Enter your local address'
                        }
                        onChange={handleChange}
                        className="shadow-sm"
                        onBlur={handleBlur}
                        value={values.village}
                      />
                      <ErrorMessage
                        name="village"
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-center mt-5">
                  <Button
                    type="submit"
                    className="w-25 fw-bold"
                    style={{ background: '#f75b05' }}
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : isHindi ? (
                      'आगे बढ़ें'
                    ) : (
                      'Next'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* <div className='d-flex justify-content-center'>
            < h6 className='position-fixed bottom-0 fw-bold ' style={{color:'#f75b05'}}>Empower rural youth for a brighter future</h6>
            </div> */}
      </div>
    </div>
  );
};

export default LeadGenerationPage;
