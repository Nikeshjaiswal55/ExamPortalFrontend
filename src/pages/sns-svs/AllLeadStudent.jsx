import Table from 'react-bootstrap/Table';
import { useGetAllSnsStudentQuery, useGetAssignmentQuery } from '../../apis/Service';

export function AllLeadStudent() {
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
    return (
    <>
    <h6 className='fw-bold text-center my-3'>All SNS-SVS Register Student List</h6>
    <div>
       {/* <select
                              as="select"
                              className="form-control shadow-sm "
                              onChange={}
                              onBlur={}
                              value={}
                            >
                              <option value="">Select your exam</option>
                              {[]?.map((exam) => (
                                <option key={} value={}>
                                  {}
                                </option>
                              ))}
                            </select> */}
    </div>
    <Table striped bordered hover>
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
    </Table>
    </>
  );
}
