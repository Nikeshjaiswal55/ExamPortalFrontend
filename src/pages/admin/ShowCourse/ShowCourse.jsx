import React, { useEffect, useState } from 'react';

import { Table } from 'react-bootstrap';
import { ShowCourseTr } from './showCourseTr';
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
  useUpdateCourseMutation,
} from '../../../apis/Service';
import '../../../styles/common.css';
import { CustomButton } from '../../../theme/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import { path } from '../../../routes/RoutesConstant';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import { toast } from 'react-toastify';
import SomethingWentWrong from '../../../components/SomethingWentWrong/SomethingWentWrong';
import NoDataFound from '../../../components/NoDataFound/NoDataFound';
import { Loader } from '../../../components/Loader/Loader';

export default function ShowCourse() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const { data, isError, isLoading } = useGetAllCoursesQuery({
    accessToken: localStorage.getItem('accessToken'),
    userId,
  });

  const [
    updateCourse,
    {
      isLoading: updateLoading,
      isError: updateError,
      isSuccess: updateSuccess,
    },
  ] = useUpdateCourseMutation();

  const [
    deleteCourse,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteCourseMutation();
  function handleAddCourse() {
    navigate(path.AddCourse.path);
  }

  useEffect(() => {
    if (updateSuccess) {
      toast.success('course updated successfully!!🎉', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      toast.success('course deleted successfully!!🎉', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (isError || updateError || deleteError) {
      toast.error('something went wrong!!😑', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  }, [updateError, deleteError, isError]);

  return (
    <>
      <div className="w-100 h-100 m-0 p-2 overflow-auto">
        <div className="m-0  p-2 d-flex justify-content-between">
          <h4 className="m-0 text-capitalize fw-bold">All Courses</h4>
          <CustomButton
            className={' rounded-4'}
            buttonText={'Add Course'}
            onButtonClick={handleAddCourse}
          />
        </div>
        {isError && <SomethingWentWrong />}
        {(isLoading || updateLoading || deleteLoading) && (
          <div className=" position-absolute top-50 start-50  translate-middle ">
            <Loader />
          </div>
        )}

        <div className=" position-absolute top-50 start-50  translate-middle ">
          {data?.length == 0 && (
            <NoDataFound>
              <div>
                <h4 className="text-capitalize fw-bold text-center">
                  No Data Available!!
                </h4>
                <h6 className="text-capitalize fw-bold text-center">
                  create course by click on above right corner button
                </h6>
              </div>
            </NoDataFound>
          )}
        </div>

        {data && data.length > 0 && (
          <Table striped responsive hover>
            <thead className="t-head ">
              <tr>
                <th className="text-center"> SrNo</th>
                <th>Course Name</th>
                <th>Created By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((rowdata, index) => {
                  console.log(rowdata);
                  return (
                    <ShowCourseTr
                      updateCourse={updateCourse}
                      deleteCourse={deleteCourse}
                      srNo={index + 1}
                      courseId={rowdata['course_id']}
                      courseName={rowdata['course_name']}
                      createdBy={rowdata['userName']}
                    />
                  );
                })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}
