import Table from 'react-bootstrap/Table';
import { useGetAllSnsStudentQuery } from '../../apis/Service';

export function AllLeadStudent() {
  const { data, isError, isLoading, isFetching } = useGetAllSnsStudentQuery();
  console.log('data', data);
  return (
    <>
    <h6 className='fw-bold text-center my-3'>All SNS-SVS Register Student List</h6>
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
            <td>{index}</td>
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
