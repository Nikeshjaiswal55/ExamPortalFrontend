import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router';
import '../../../styles/common.css';
import { path } from '../../../routes/RoutesConstant';
import { Button, Spinner, Table } from 'react-bootstrap';
import {
  useGetStudentAvidenceImageQuery,
  useGetStudentAvidenceQuery,
  usePaperApprovedMutation,
  usePaperRejectedMutation,
} from '../../../apis/Service';
import { toast } from 'react-toastify';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import { Loader } from '../../../components/Loader/Loader';

export default function StudentAvidancePage() {
  const { paperId, stdId } = useParams();
  const [
    approved,
    {
      isError: approveError,
      isLoading: approveLoading,
      isSuccess: approveSuccess,
    },
  ] = usePaperApprovedMutation();
  const [
    rejected,
    {
      isError: rejectError,
      isLoading: rejectLoading,
      isSuccess: rejectSuccess,
    },
  ] = usePaperRejectedMutation();

  const { data, isLoading, isError } = useGetStudentAvidenceImageQuery({
    paperId,
    stdId,
  });
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

  useEffect(() => {
    if (rejectError) {
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
  }, [rejectError]);

  useEffect(() => {
    if (approveSuccess) {
      toast.success('result publish successfull !!😑', {
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
  }, [approveSuccess]);

  useEffect(() => {
    if (rejectSuccess) {
      toast.success('result rejected successfull !!😑', {
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
  }, [rejectSuccess]);

  useEffect(() => {
    if (approveError) {
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
  }, [approveError]);

  return (
    <>
      {isError ? (
        <div className="h-100">
          <SomethingWentWrong />
        </div>
      ) : isLoading ? (
        <div className=" position-absolute top-50 start-50  translate-middle ">
          <Loader />
        </div>
      ) : (
        <div className="w-100 h-100 overflow-auto">
          <div className=" w-100 d-flex justify-content-between align-items-center p-3 flex-wrap ">
            <div
              className=" d-flex align-items-center"
              style={{ width: '300px' }}
            >
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                className="img-thumbnail img-fluid rounded-circle mx-2   m-auto p-0 mt-1  border-dark border-3"
                alt="Student Image"
                style={{ width: '60px', height: '60px' }}
              />

              <p className="fw-bold mt-2 m-0">
                <p> {data?.result.student_email ?? 'user'}</p>
              </p>
            </div>
            {/* <div className="fw-bold">
              <h5>Publish Result</h5>
              <div className="d-flex gap-2 align-items-center justify-content-center">
                <Button
                  variant="primary"
                  style={{ width: '7rem' }}
                  onClick={async () => await approved({ paperId, stdId })}
                >
                  {approveLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    'Approved'
                  )}
                </Button>
                <Button
                  variant="danger"
                  style={{ width: '7rem' }}
                  onClick={async () => await rejected({ paperId, stdId })}
                >
                  {rejectLoading ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    'Rejected'
                  )}
                </Button>
              </div>
            </div> */}
          </div>

          <div className="w-100 m-0 row gap-2 align-items-center justify-content-evenly text-center">
            <div className="col-6 col-md-2 bg-light rounded-3">
              <p className="white-box py-4 px-2 rounded-4 fw-bold mb-0 ">
                Rule violation
              </p>
            </div>
            <div className="col-6 col-md-2 bg-light rounded-3">
              <p className="white-box py-4 px-2 rounded-4 fw-bold mb-0 ">
                Tap switched
              </p>
            </div>
            <div className="col-6 col-md-2 bg-light rounded-3">
              <p className="white-box py-4 px-2  rounded-4 fw-bold mb-0 ">
                {data?.cheating.images.length} random photos
                {/* {randomImage?.length} Random photos */}
              </p>
            </div>
            <div className="col-6 col-md-2 py-2 bg-light rounded-3">
              <p className="white-box px-2 rounded-4 fw-bold mb-0 ">
                Assessment Name
              </p>
              <p className="white-box px-2 rounded-4 fw-bold mb-0 ">
                {data?.result.assesment_Name}
              </p>
            </div>
          </div>
          <div className="white-box overflow  p-4 m-4 border border-black ">
            <Table className="mt-3" striped bordered hover size="sm">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Evidence type</th>
                  {/* <th className="text-center">Occurred At</th> */}
                  <th className="text-center">Capture</th>
                </tr>
              </thead>
              <tbody>
                {/* {randomImage &&
                  randomImage?.map((image, index) => ( */}
                {data?.cheating &&
                  data?.cheating.images?.map((image, index) => (
                    <tr key={index}>
                      <td className="p-5 text-center">1</td>
                      <td className="p-5 text-center">Random image</td>
                      {/* <td className="p-5">{image?.timestamp.toString()}</td> */}
                      <td className="p-5 text-center">
                        <img
                          key={index}
                          className="img-fluid"
                          style={{ height: '10rem' }}
                          src={`https://myexameasybucket.s3.ap-south-1.amazonaws.com/${image}`}
                          alt={`Captured Image ${index + 1}`}
                        />
                      </td>
                    </tr>
                  ))}
                {/* {ssImage && (
                  <tr>
                    <td className="p-5">2</td>
                    <td className="p-5">ScreenShot of tab Switch</td>
                    <td className="p-5">
                      <img
                        className="img-fluid"
                        style={{ height: '10rem' }}
                        src={ssImage}
                      />
                    </td>
                  </tr>
                )} */}
                {/* <tr>
                    <td className="p-5">5</td>
                    <td className="p-5">Jacob</td>
                    <td className="p-5">Larry the Bird</td>
                    <td className="p-5">@twitter</td>
                  </tr> */}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
}
