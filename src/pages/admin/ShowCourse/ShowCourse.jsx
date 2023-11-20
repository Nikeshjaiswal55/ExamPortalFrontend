import React,{useEffect,useState} from 'react'

import {Spinner,Table} from 'react-bootstrap'
import {ShowCourseTr} from './showCourseTr';
import {useGetAllCoursesQuery} from '../../../apis/Service';



export default function ShowCourse() {

    const {data,error,isLoading} = useGetAllCoursesQuery(localStorage.getItem("accessToken"));

    console.log(data);
    return (
        <>
            <div className='w-100 h-100 m-0 p-2'>
                <div className='m-0  p-2' >
                    <h4 className='m-0'> Courses</h4>
                    <hr />
                </div>
                {isLoading && <div className=' position-absolute top-50 start-50  translate-middle '>
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                    <Spinner animation="grow" />
                </div>}
                {error &&
                    alert("error while fetching data on show courses :- " + JSON.stringify(error))
                }
                {data?.length == 0 && <div><h1> No data available</h1></div>}
                {data && data.length > 0 &&
                    <div className=' table-responsive overflow-auto rounded-1 m-0 ' style={{height: 'calc(100% - 95px)'}}>
                        <Table className="bg-white h-100 m-0 w-100 overflow-auto ">
                            <thead className=" m-0 p-0 w-100">
                            <tr
                                    className="d-flex p-2 border-bottom  text-center justify-content-md-around   justify-content-start align-items-baseline rounded-3 w-100  "
                            >
                                {[
                                    'Course name',

                                    'created by',
                                ].map((heading) => (
                                    <th className="custom-table-td-width text-capitalize flex-shrink-0 border-bottom-0  bg-transparent " >
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                            <tbody className="row m-0 p-0 w-100 ">
                                {data && data.map((rowdata) => {
                                return (
                                    <ShowCourseTr
                                        assesmentName={rowdata['course_name']}
                                        createdBy={rowdata["course_id"]}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                    </div>}
            </div>


        </>
    )
}
