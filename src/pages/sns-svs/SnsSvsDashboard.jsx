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

export function SnsSvsDashboard() {
  const [selectedPaper, setSelectedPaper] = useState("all");
  const [paperStudent, setPaperStudent] = useState([]);
  console.log(
    "%c [ paperStudent ]-13",
    "font-size:13px; background:pink; color:#bf2c9f;",
    paperStudent
  );
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [selectedTehsil, setSelectedTehsil] = useState("all");
  const [selectedTehsilSchools, setSelectedTehsilSchools] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [districtCount, setDistrictCount] = useState({});
  const [tehsilCount, setTehsilCount] = useState({});
  const [selectedVillage, setSelectedVillage] = useState("all");
  const [villageList, setVillageList] = useState([]);
  const [tehsilTotalAttempted, setTehsilTotalAttempted] = useState(0);

  const [paperID, setPaperID] = useState("");
  console.log(
    "%c [ tehsilTotalAttempted ]-26",
    "font-size:13px; background:pink; color:#bf2c9f;",
    tehsilTotalAttempted
  );

  useEffect(() => {
    // Get the current URL's query parameters
    const queryParams = new URLSearchParams(window.location.search);
    const paperIDParam = queryParams.get("paperID");
    setPaperID(paperIDParam);
  }, []);

  const { data, isError, isLoading } = useGetAllSnsStudentQuery();

  useEffect(() => {
    // Fetch districts
    axios
      .get("https://district-seven.vercel.app/api/districts")
      .then((response) => {
        setDistricts(response?.data?.districts);
      })
      .catch((error) => {
        console.error("Error fetching districts", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDistrict && selectedDistrict !== "all") {
      // Fetch tehsils based on selected district
      axios
        .get(
          `https://district-seven.vercel.app/api/districts/${selectedDistrict}/tehsils`
        )
        .then((response) => {
          setTehsils(response?.data?.tehsils);
        })
        .catch((error) => {
          console.error("Error fetching tehsils", error);
        });
    } else {
      setTehsils([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // Ensure data is available before filtering
    if (!data) return;

    // Update filtered data based on district and tehsil
    let filteredData = data;

    if (selectedDistrict && selectedDistrict !== "all") {
      filteredData = filteredData.filter(
        (item) => item?.district === selectedDistrict
      );
    }
    if (selectedTehsil && selectedTehsil !== "all") {
      filteredData = filteredData.filter(
        (item) => item?.tehsil === selectedTehsil
      );
    }

    setFilteredData(filteredData);

    // Calculate counts for district and tehsil
    const districtCounts = {};
    const tehsilCounts = {};

    // Safely loop over filtered data and count occurrences
    if (filteredData && Array.isArray(filteredData)) {
      filteredData.forEach((item) => {
        // Count by district
        districtCounts[item?.district] =
          (districtCounts[item?.district] || 0) + 1;
        // Count by tehsil
        tehsilCounts[item?.tehsil] = (tehsilCounts[item?.tehsil] || 0) + 1;
      });
    }

    setDistrictCount(districtCounts);
    setTehsilCount(tehsilCounts);

    // Collect unique villages for dropdown
    const uniqueVillages = [
      ...new Set(filteredData.map((item) => item?.village)),
    ];
    setVillageList(uniqueVillages);
  }, [selectedDistrict, selectedTehsil, data]);

  const exportExcel = () => {
    const tableData =
      selectedPaper === "all" ? filteredData : paperStudent || [];

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
            "Mobile Number": item?.mobileNumber1,
            "Whatshap Mobile Number": item?.mobileNumber2,
            "Total Marks": item?.totalMarks,
            "Obtained Marks": item?.obtainMarks,
          }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
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
  console.log(
    "%c [ assignmentData ]-126",
    "font-size:13px; background:pink; color:#bf2c9f;",
    assignmentData?.data[0]?.paperId
  );

  useEffect(() => {
    if (paperID) {
      axios
        .get(`https://examsapi.ssism.org/getFullDetails?paperId=${paperID}`)
        .then((response) => {
          setPaperStudent(response?.data);
        })
        .catch((error) => {
          console.error("Error fetching paper student data", error);
        });
    }
  }, [paperID]);

  // Filter students by selected village
  const filteredByVillage =
    selectedVillage === "all"
      ? filteredData
      : filteredData.filter((student) => student?.village === selectedVillage);

  // Handle Tehsil card click
  const handleTehsilClick = (tehsil) => {
    setSelectedTehsil(tehsil);

    // Filter schools based on selected tehsil
    const schoolsInTehsil = filteredData.filter(
      (student) => student?.tehsil === tehsil
    );

    // Count students per school
    const schoolCounts = {};
    schoolsInTehsil.forEach((student) => {
      const school = student?.school12;
      schoolCounts[school] = (schoolCounts[school] || 0) + 1;
    });

    // Create an array of schools with their counts
    const schoolsWithCount = Object.keys(schoolCounts).map((school) => ({
      school,
      count: schoolCounts[school],
    }));

    setSelectedTehsilSchools(schoolsWithCount);
  };

  const getAttemptedSchoolWise = (schoolName) => {
    let paperStudentTotal;
    if (paperStudent && schoolName) {
      paperStudentTotal = paperStudent?.filter(
        (item) =>
          item?.school12 === schoolName && item?.tehsil === selectedTehsil
      );
    }
    return paperStudentTotal?.length;
  };

  useEffect(() => {
    let totalCOunt;
    if (paperStudent) {
      totalCOunt = paperStudent?.filter(
        (item) => item?.tehsil === selectedTehsil
      );
    }
    console.log(
      "%c [ totalCOunt ]-237",
      "font-size:13px; background:pink; color:#bf2c9f;",
      totalCOunt
    );
    setTehsilTotalAttempted(totalCOunt?.length)
  }, [paperStudent, selectedTehsil]);

  return (
    <>
      {isError ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <SomethingWentWrong />
        </div>
      ) : isLoading ? (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Loader />
        </div>
      ) : (
        <>
          <h5 className="fw-bold text-center mt-1">
            All SNS-SVS Register Student List
          </h5>

          {/* Dashboard summary with improved card UI */}
          <div className="dashboard-summary d-flex justify-content-between">
            <div className="district-summary">
              <h6
                style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
              >
                <strong>District-wise Summary:</strong>
              </h6>
              <div className="d-flex flex-wrap gap-3">
                <div
                  className="card"
                  style={{
                    width: "120px",
                    backgroundColor: "#eaf7ff",
                    color: "#0056b3",
                    padding: "8px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                    textAlign: "center",
                    height: "100px",
                  }}
                >
                  <h6 style={{ fontSize: "14px", fontWeight: "bold" }}>
                    Total
                  </h6>
                  <p style={{ fontSize: "12px" }}>{data?.length} Students</p>
                </div>
                {Object.entries(districtCount).map(([district, count]) => (
                  <div
                    key={district}
                    className="card"
                    style={{
                      width: "120px",
                      backgroundColor: "#eaf7ff",
                      color: "#0056b3",
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                      textAlign: "center",
                      height: "100px",
                    }}
                  >
                    <h6 style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {district}
                    </h6>
                    <p style={{ fontSize: "12px" }}>{count} Students</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="tehsil-summary">
              <h6
                style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
              >
                <strong>Tehsil-wise Summary:</strong>
              </h6>
              <div className="d-flex flex-wrap gap-3">
                {Object.entries(tehsilCount).map(([tehsil, count]) => (
                  <div
                    key={tehsil}
                    className="card"
                    onClick={() => handleTehsilClick(tehsil)}
                    style={{
                      width: "120px",
                      backgroundColor: "#d4f8d4",
                      color: "#28a745",
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                      textAlign: "center",
                      height: "100px",
                      cursor: "pointer",
                    }}
                  >
                    <h6 style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {tehsil}
                    </h6>
                    <p style={{ fontSize: "12px" }}>{count} students</p>
                    {tehsilTotalAttempted > 0 && <p style={{ fontSize: "12px" }}>{tehsilTotalAttempted} Attempted</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Display schools for selected tehsil with student count */}
          {selectedTehsil && selectedTehsil !== "all" && (
            <div className="schools-summary" style={{ marginTop: "20px" }}>
              <h6
                style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
              >
                <strong>Schools in {selectedTehsil}:</strong>
              </h6>
              <div className="d-flex flex-wrap gap-3">
                {selectedTehsilSchools.map((school, index) => (
                  <div
                    key={index}
                    className="card"
                    style={{
                      width: "200px",
                      backgroundColor: "#fff3cd",
                      color: "#856404",
                      padding: "8px",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                      fontSize: "12px",
                      textAlign: "center",
                      height: "auto",
                    }}
                  >
                    <h6 style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {school.school}
                    </h6>
                    <span style={{ fontSize: "12px" }}>
                      {school.count} students
                    </span>
                    <span style={{ fontSize: "12px" }}>
                      {getAttemptedSchoolWise(school.school)} Attempted
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between my-3">
            <div className="d-flex justify-content-start align-items-center w-50">
              <select
                className="form-control shadow-sm w-50"
                onChange={(e) => setSelectedPaper(e.target.value)}
              >
                <option value="all">Select your exam</option>
                <option value="all" selected>
                  All
                </option>
                {assignmentData?.data?.map((exam) => (
                  <option key={exam?.paperId} value={exam?.paperId}>
                    {exam?.assessmentName}
                  </option>
                ))}
              </select>

              <select
                className="form-control shadow-sm w-50"
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="all">District</option>
                <option value="all">All Districts</option>
                {districts?.map((district) => (
                  <option key={district?.id} value={district?.name}>
                    {district?.name}
                  </option>
                ))}
              </select>

              <select
                className="form-control shadow-sm w-50"
                onChange={(e) => setSelectedTehsil(e.target.value)}
              >
                <option value="all">Tehsil</option>
                <option value="all">All Tehsils</option>
                {tehsils?.map((tehsil) => (
                  <option key={tehsil?.id} value={tehsil?.name}>
                    {tehsil?.name}
                  </option>
                ))}
              </select>

              {/* Village selection */}
              <select
                className="form-control shadow-sm w-50"
                onChange={(e) => setSelectedVillage(e.target.value)}
              >
                <option value="all">Select Village</option>
                <option value="all">All Villages</option>
                {villageList?.map((village, index) => (
                  <option key={index} value={village}>
                    {village}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Render filtered data based on selected village */}
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
              {filteredByVillage?.map((item, index) => (
                <tr key={index}>
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

          <button onClick={exportExcel} className="btn btn-primary">
            Export to Excel
          </button>
        </>
      )}
    </>
  );
}
