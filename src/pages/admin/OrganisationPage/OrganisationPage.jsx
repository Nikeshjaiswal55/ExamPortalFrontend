import React, { useEffect, useState } from 'react';
import backgroundimg from '../assets/org-img.svg';
import { Button, Spinner } from 'react-bootstrap';
import { Form, Row } from 'react-bootstrap';
import './OrganisationPage.css';
import { Navigate, useNavigate } from 'react-router-dom';
import '../components/style.css';
import { ErrorMessage, Formik } from 'formik';
import { orgPageSchema } from './yup-schema/OrgPageSchema';
import {
  useGetOrgernizationQuery,
  usePostOrganisationDetailsMutation,
} from '../../../apis/Service';
import { InputField } from '../../../theme/InputField/InputField';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import { path } from '../../../routes/RoutesConstant';
import { toast } from 'react-toastify';

const initialValues = { 'org-name': '', 'org-type': '' };

export function OrganisationPage() {
  const navigate = useNavigate();
  const [postOrgDetails, { isLoading, isError, isSuccess: orgCreatedSuccess }] =
    usePostOrganisationDetailsMutation();
  const {
    data: getOrgdata,
    isLoading: orgLoading,
    isSuccess,
    isError: orgError,
  } = useGetOrgernizationQuery();

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('orgData', JSON.stringify(getOrgdata));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (orgCreatedSuccess) {
      toast.success('organization created successfully!!🎉', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      navigate(path.AdminDasboard.path)
    }
  }, [orgCreatedSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error('something went wrong!!😑', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [isError]);

  async function onGetStarted(values) {
    const users = JSON.parse(localStorage.getItem('users'));
    const accessToken = localStorage.getItem('accessToken');
    const storeData = {};
    storeData.orgnizationName = values['org-name'];
    storeData.orgnizationType = values['org-type'];
    storeData.userId = SubIdSplit(users.sub);
    storeData.user = {
      name: users.name,
      email: users.email,
      picture: users.picture,
      userId: SubIdSplit(users.sub),
      role: 'OG',
    };
    await postOrgDetails({ ...storeData, accessToken });
    localStorage.setItem('orgtype', storeData.orgnizationType);
  }
  const orgdata = JSON.parse(localStorage.getItem('orgData'));

  return (
    <>
      {orgdata ? (
        <Navigate to={path.AdminDasboard.path} />
      ) : (
        <div
          className="row m-0 p-0 w-100  bg-white "
          style={{ height: '90vh' }}
        >
          <img
            src={backgroundimg}
            id="org-img-top"
            className="org-img w-25 img-fluid position-absolute top-0  start-0"
            alt=""
          />
          <img
            src={backgroundimg}
            id="org-img-bottom"
            className="org-img w-25 img-fluid position-absolute   bottom-0 end-0 "
            alt=""
          />

          <div
            id="org-box"
            className="m-0 p-3 rounded-3 position-absolute top-50  start-50 translate-middle  "
          >
            <Formik
              initialValues={initialValues}
              validationSchema={orgPageSchema}
              onSubmit={onGetStarted}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <InputField
                    formGroupClassName={'my-1 my-md-5 mx-3 my-3'}
                    inputName={'org-name'}
                    inputId={'org-name'}
                    onInputBlur={handleBlur}
                    onInputChange={handleChange}
                    inputValue={values['org-name']}
                    formGroupId={'admin-organisation-name'}
                    placeholder={'Organisation Name'}
                    labelText={'Organization Name'}
                  />
                  {/* <Row className="my-3 mx-3"> */}
                  <Form.Group className="my-1 my-md-4 mx-3">
                    <Form.Label className=" fw-bold">
                      Organization Type :
                    </Form.Label>
                    <Form.Select
                      aria-label="Select Type "
                      onChange={handleChange}
                      value={values['org-type']}
                      onBlur={handleBlur}
                      style={{ borderColor: '#707070' }}
                      name="org-type"
                      className=" input-border p-2 border focus-ring focus-ring-light"
                    >
                      <option value="">Select Type</option>
                      <option value="company">Company</option>
                      <option value="college">College</option>
                    </Form.Select>
                    <ErrorMessage
                      component={'div'}
                      name="org-type"
                      className=" input-error"
                    />
                  </Form.Group>
                  {/* </Row> */}
                  <Row className="my-5 mx-3 p-3">
                    <Button
                      variant="dark"
                      type="submit"
                      className="btn m-auto d-block px-5 mb-3 rounded-5 "
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        'Get Started'
                      )}
                    </Button>
                  </Row>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
