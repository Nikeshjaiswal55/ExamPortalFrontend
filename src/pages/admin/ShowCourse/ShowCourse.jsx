import React,{useEffect,useState} from 'react'

import {Table} from 'react-bootstrap'
import {ShowCourseTr} from './showCourseTr';
import {useGetCoursesQuery} from '../../../apis/Service';
const styleRow = {width: '150px',fontSize: '16px'};


export default function ShowCourse() {
    const {data} = useGetCoursesQuery();
    const [rowData,setRowData] = useState([]);
    useEffect(() => {
        console.log(data)
        setRowData(data);
    },[data]);
    return (
        <>
            <div className='w-100 h-100 m-0 p-2'>
                <div className='m-0 ps-5 p-2' >
                    <h4 className='m-0'>Your Courses</h4>
                </div>
                <div className=' table-responsive overflow-auto rounded-1 m-0 ' style={{height: 'calc(100% - 45px)'}}>
                    <Table className="bg-white h-100 m-0 w-100 ">
                        <thead className="row m-0 p-0  ">
                            <tr
                                className="d-flex p-2 border-bottom  text-center justify-content-md-around   justify-content-start align-items-baseline rounded-3  w-100 "
                            >
                                {[
                                    'Course name',

                                    'created by',
                                ].map((heading) => (
                                    <th className=" text-capitalize flex-shrink-0 border-bottom-0  bg-transparent " style={styleRow}>
                                        {heading}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="row m-0 p-0 ">
                            {rowData && rowData.map((rowdata) => {
                                console.log(rowData)
                                return (
                                    <ShowCourseTr
                                        assesmentName={rowdata['course_name']}
                                        createdBy={rowdata["course_id"]}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>


        </>
    )
}
