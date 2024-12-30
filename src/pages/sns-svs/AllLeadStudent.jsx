import Table from 'react-bootstrap/Table';
import { useGetAllSnsStudentQuery, useGetAssignmentQuery } from '../../apis/Service';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function AllLeadStudent() {
  const [selectedPaper,setSelectedPaper]=useState('all')
  const [paperStudent,setPaperStudent]=useState([])

  const { data, isError, isLoading, isFetching } = useGetAllSnsStudentQuery(); 
   const {
       data: assignmentData
     } = useGetAssignmentQuery({
       id: '662a2d224da8ec45371ebfe6',
       publishDate:null,
       createdDate:null,
       paper_name: '',
       pageno: null,
       pageSize: null,
       sortOrder: 'asc',
       Active: '',
     });

     console.log("assignmentData",assignmentData?.data)
     useEffect(() => {
      if (selectedPaper && selectedPaper!=='all') {
        // Fetch tehsils based on selected district
        axios
          .get(
            ` https://examsapi.ssism.org/getFullDetails?paperId=${selectedPaper}`
          )
          .then((response) => {
            console.log('response',response);
  
            // setTehsils(response?.data?.tehsils);
            setPaperStudent(response?.data)
          })
          .catch((error) => {
            console.error('Error fetching tehsils', error);
          });
      }
    }, [selectedPaper]);
    return (
    <>
    <h5 className='fw-bold text-center  mt-1'>All SNS-SVS Register Student List</h5>
    <div className='d-flex justify-content-center'>
       <select
                              as="select"
                              className="form-control shadow-sm w-25 my-3"
                              onChange={(e)=>setSelectedPaper(e.target.value)}
                            >
                              <option value="">Select your exam</option>
                              <option value="all" selected>All</option>
                              {assignmentData?.data?.map((exam) => (
                                <option key={exam?.paperId} value={exam?.paperId}>
                                  {exam?.assessmentName}
                                </option>
                              ))}
                            </select>
    </div>
   {selectedPaper==='all'? <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Father Name</th>
          <th>Mobile Number</th>
          <th>School</th>
          <th>Stream</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item, index) => (
          <tr>
            <td>{index+1}</td>
            <td>{item?.name}</td>
            <td>{item?.fatherName}</td>
            <td>
              {item?.mobileNumber1} - {item?.mobileNumber2}
            </td>
            <td>{item?.school12}</td>
            <td>{item?.subject12}</td>
            <td>{item?.village}</td>
          </tr>
        ))}
      </tbody>
    </Table>:<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Student Name</th>
          <th>Father Name</th>
          <th>Address</th>

          <th>Mobile Number</th>
          <th>Total Marks</th>

          <th>Obtain Marks</th>
          <th>Result Status</th>
          <th>Attempted</th>
        </tr>
      </thead>
      <tbody>
        {paperStudent?.map((item, index) => (
          <tr>
            <td>{index+1}</td>
            <td>{item?.name}</td>
            <td>{item?.fatherName}</td>
            <td>{item?.village}</td>
            <td>
              {item?.mobileNumber1} - {item?.mobileNumber2}
            </td>
            <td>{item?.totalMarks}</td>

            <td>{item?.obtainMarks}</td>
            <td>{item?.resultStatus}</td>
            <td>{item?._attempted?'true':"false"}</td>
          </tr>
        ))}
      </tbody>
    </Table>}
    </>
  );
}
