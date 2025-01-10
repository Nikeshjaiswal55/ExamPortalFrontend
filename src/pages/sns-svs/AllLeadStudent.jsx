import Table from "react-bootstrap/Table";
import {
  useGetAllSnsStudentQuery,
  useGetAssignmentQuery,
} from "../../apis/Service";
import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Loader } from "../../components/Loader/Loader";
import SomethingWentWrong from "../../components/SomethingWentWrong/SomethingWentWrong";
import { useNavigate } from "react-router-dom";
import './sns.css'

export function AllLeadStudent() {
  const [selectedPaper, setSelectedPaper] = useState("all");
  const [paperStudent, setPaperStudent] = useState([]);
  const { data, isError, isLoading } = useGetAllSnsStudentQuery();
  const navigate = useNavigate();

  function formatDate(dateString) {
    if (!dateString) {
      return "null";
    }
    // Parse the input date string
    const date = new Date(dateString);

    // Define the month names
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, "0"); // Ensure 2-digit day
    const month = months[date.getMonth()]; // Get abbreviated month
    const year = date.getFullYear(); // Get the year

    // Return the formatted string
    return `${day} ${month} ${year}`;
  }

  function getTimeInIST(dateString) {
    if (!dateString) {
      return "null";
    }
    // Parse the input date string
    const date = new Date(dateString);

    // Adjust for IST (UTC+5:30)
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    };

    // Format the time in IST
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  }

  const exportExcel = () => {
    const tableData = selectedPaper === "all" ? data : paperStudent; // Adjust based on your structure

    const formattedData =
      selectedPaper === "all"
        ? tableData.map((item, index) => ({
            "#": index + 1,
            "Student Name": item?.name,
            "Father Name": item?.fatherName,
            "Mobile Number": `${item?.mobileNumber1} - ${item?.mobileNumber2}`,
            School: item?.school12,
            Stream: item?.subject12,
            Address: item?.village,
          }))
        : tableData.map((item, index) => ({
            "#": index + 1,
            "Student Name": item?.name,
            "Father Name": item?.fatherName,
            Address: item?.village,
            "Mobile Number": item?.mobileNumber,
            "Total Marks": item?.totalMarks,
            "Obtained Marks": item?.obtainedMarks,
            "Result Status": item?.resultStatus,
            Attempted: item?.attempted,
            date: formatDate(item?.date),
            time: getTimeInIST(item?.date),
          }));

    // Create a new workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");

    // Write the workbook to a file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save the file using file-saver
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      "students_data.xlsx"
    );
  };

  const { data: assignmentData } = useGetAssignmentQuery({
    id: "662a2d224da8ec45371ebfe6",
    publishDate: null,
    createdDate: null,
    paper_name: "",
    pageno: null,
    pageSize: null,
    sortOrder: "asc",
    Active: "",
  });

  useEffect(() => {
    if (selectedPaper && selectedPaper !== "all") {
      // Fetch tehsils based on selected district
      axios
        .get(
          ` https://examsapi.ssism.org/getFullDetails?paperId=${selectedPaper}`
        )
        .then((response) => {
          console.log("response", response);

          // setTehsils(response?.data?.tehsils);
          setPaperStudent(response?.data);
        })
        .catch((error) => {
          console.error("Error fetching tehsils", error);
        });
    }
  }, [selectedPaper]);

  return (
    <>
      {isError ? (
        <div className=" w-100 h-100 d-flex justify-content-center align-items-center">
          <SomethingWentWrong />
        </div>
      ) : isLoading ? (
        <div className=" position-absolute top-50 start-50  translate-middle ">
          <Loader />
        </div>
      ) : (
        <>
          <h5 className="fw-bold text-center  mt-1">
            All SNS-SVS Register Student List
          </h5>
          <div className="d-flex justify-content-center  my-3">
            <select
              as="select"
              className="form-control shadow-sm w-25"
              onChange={(e) => setSelectedPaper(e.target.value)}
            >
              <option value="">Select your exam</option>
              <option value="all" selected>
                All
              </option>
              {assignmentData?.data?.map((exam) => (
                <option key={exam?.paperId} value={exam?.paperId}>
                  {exam?.assessmentName}
                </option>
              ))}
            </select>
            <button className="btn btn-primary mx-2" onClick={exportExcel}>
              Export Excel
            </button>
            <button
              className="btn btn-primary mx-2"
              onClick={() =>
                navigate(
                  `/sns-svs-dashboard?paperID=${assignmentData?.data[0]?.paperId}`
                )
              }
            >
              View Dashboard
            </button>{" "}
          </div>
          {selectedPaper === "all" ? (
            <Table
              striped
              bordered
              hover
              style={{ overflow: "auto" }}
              className="custom-scrollbar"
            >
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
                    <td>{index + 1}</td>
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
          ) : (
            <Table striped bordered hover>
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
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {paperStudent?.map((item, index) => (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td>{item?.fatherName}</td>
                    <td>{item?.village}</td>
                    <td>
                      {item?.mobileNumber1} - {item?.mobileNumber2}
                    </td>
                    <td>{item?.totalMarks}</td>
                    <td>{item?.obtainMarks}</td>
                    <td>{item?.resultStatus}</td>
                    <td>{item?.is_attempted ? "true" : "false"}</td>
                    <td>{formatDate(item?.date)}</td>
                    <td>{getTimeInIST(item?.date)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
}
