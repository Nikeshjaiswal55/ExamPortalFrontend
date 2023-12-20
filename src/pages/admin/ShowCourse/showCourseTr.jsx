import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegEdit } from 'react-icons/fa';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { InputField } from '../../../theme/InputField/InputField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const editValidation = Yup.object({
  courseName: Yup.string().min(2).required('course name required'),
});
export function ShowCourseTr({
  deleteCourse,
  updateCourse,
  updateLoading,
  deleteLoading,
  ...props
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showDelete, setShowDelete] = useState(false);
  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);
  const accessToken = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('users'));

  function handleEdit() {
    handleShow();
  }
  async function updateData(courseName, id) {
    if (accessToken) {
      if (user) {
        let updateCourseDetail = {
          accessToken,
          course_id: id,
          course_name: courseName,
          userId: user.sub.split('|')[1],
          userName: user.name,
        };
        updateCourse(updateCourseDetail)
          .then((resp) => console.log(resp))
          .catch((err) => alert(JSON.stringify(err)));
      } else {
        alert('user not present or login');
      }
    } else {
      alert('user access token not present ');
    }
  }

  function handleDelete() {
    handleDeleteShow();
  }
  async function handleDeleteCourse(id) {
    if (accessToken) {
      deleteCourse({ accessToken, id });
    } else {
      alert('user access token not present ');
    }
  }

  useEffect(() => {
    if (props.updateSuccess) {
      toast.success('course updated successfully!!🎉', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    if (props.deleteSuccess) {
      toast.success('course deleted successfully!!🎉', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      handleClose();
    }
  }, [props.deleteSuccess]);

  return (
    <>
      <tr>
        <td className="custom-table-td-width text-center">{props.srNo}</td>
        <td className="custom-table-td-width">{props.courseName}</td>
        <td className="custom-table-td-width">{props.createdBy}</td>
        <td
          className="custom-table-td-width d-flex justify-content-evenly"
          style={{ paddingBottom: '12px' }}
        >
          {' '}
          <RiDeleteBin6Line
            className=" mx-2"
            onClick={handleDelete}
            color="red"
            cursor={'pointer'}
            size={20}
            height="41px"
          />
          <FaRegEdit
            cursor={'pointer'}
            size={20}
            onClick={handleEdit}
            height="41px"
          />{' '}
        </td>
      </tr>

      {show && (
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Course Name
            </Modal.Title>
          </Modal.Header>

          <Formik
            initialValues={{ courseName: props.courseName }}
            validationSchema={editValidation}
            onSubmit={(values) => {
              console.log('submit form', values);
              updateData(values.courseName, props.courseId);
            }}
          >
            {({ values, handleBlur, handleChange, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Modal.Body>
                  <InputField
                    // formGroupClassName={'my-1 my-md-5 mx-3 my-3'}
                    inputName={'courseName'}
                    inputId={'courseName'}
                    onInputBlur={handleBlur}
                    onInputChange={handleChange}
                    inputValue={values['courseName']}
                    formGroupId={'admin-organisation-name'}
                    placeholder={'Course Name'}
                    labelText={'Course Name'}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <div className="d-flex w-100 gap-3">
                    <Button
                      variant="danger"
                      className="rounded-4 w-100"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="dark"
                      className="rounded-4 w-100"
                      type="submit"
                    >
                      {updateLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        'Edit'
                      )}
                    </Button>
                  </div>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal>
      )}

      {showDelete && (
        <Modal
          show={showDelete}
          onHide={handleDeleteClose}
          backdrop="static"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {' '}
              Are You Sure ?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>do you want to delete the course</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex w-100 gap-3">
              <Button
                variant="dark"
                className="rounded-4 w-100"
                onClick={handleDeleteClose}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                className="rounded-4 w-100"
                onClick={() => {
                  handleDeleteCourse(props.courseId);
                  handleDeleteClose();
                }}
              >
                {deleteLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  'Delete'
                )}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
