import React, { useEffect, useState } from 'react';

import { Spinner, Table } from 'react-bootstrap';
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

export default function ShowCourse() {
  const navigate = useNavigate();
  let userId = JSON.parse(localStorage.getItem('users'));
  userId = SubIdSplit(userId.sub);
  const { data, error, isLoading } = useGetAllCoursesQuery({
    accessToken: localStorage.getItem('accessToken'),
    userId,
  });

  const [updateCourse, { isLoading: updateLoading }] =
    useUpdateCourseMutation();
  const [deleteCourse, { isLoading: deleteLoading }] =
    useDeleteCourseMutation();
  function handleAddCourse() {
    navigate(path.AddCourse.path);
  }
  return (
    <>
      <div className="w-100 h-100 m-0 p-2 overflow-auto">
        <div className="m-0  p-2 d-flex justify-content-between">
          <h4 className="m-0"> Courses</h4>
          <CustomButton
            className={' rounded-4'}
            buttonText={'Add Course'}
            onButtonClick={handleAddCourse}
          />
        </div>
        {(isLoading || updateLoading || deleteLoading) && (
          <div className=" position-absolute top-50 start-50  translate-middle ">
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
          </div>
        )}
        {error &&
          alert(
            'error while fetching data on show courses :- ' +
              JSON.stringify(error)
          )}
        {data?.length == 0 && (
          <div>
            <h1> No data available</h1>
          </div>
        )}

        {data && data.length > 0 && (
          <Table striped responsive hover>
            <thead className="t-head ">
              <tr>
                <th className="text-center"> SrNo</th>
                <th>Course Name</th>
                <th>Created By</th>
                <th>Other</th>
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
