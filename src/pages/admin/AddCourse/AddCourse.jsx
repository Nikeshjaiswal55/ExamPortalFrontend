import React,{useState} from 'react';
import {Button,Form,Modal,Spinner} from 'react-bootstrap';
import learning from '../assets/Learning-cuate.svg';
import { path } from '../../../routes/RoutesConstant';
import {json,useNavigate} from 'react-router-dom';
import {ErrorMessage,Formik} from 'formik';
import { InputField } from '../../../theme/InputField/InputField';
import { CustomButton } from '../../../theme/Button/Buttons';
import * as Yup from 'yup';
import { useAddCourseMutation } from '../../../apis/Service';
import { SubIdSplit } from '../../../utils/SubIdSplit';
import {ExcelDataReader} from '../../../utils/ExcelDataReader';
import {MdUpload} from 'react-icons/md';
import {FaEye} from "react-icons/fa";
import ExcelShower from '../../../theme/ExcelShower/ExcelShower';
import {useRef} from 'react';
import {copyWithStructuralSharing} from '@reduxjs/toolkit/query';

const SignupSchema = Yup.object().shape({
  'add-course-name': Yup.string()
    .min(2)
    .max(25)
    .required('Course name is required'),

  // 'add-course-email': Yup.string()
  //   .matches(
  //     /^(?=.*[a-zA-Z]).*^(?!.*@(email|yahoo)\.com).*[A-Za-z0-9]+@[A-Za-z0.9.-]+\.[A-Za-z]{2,4}$/,
  //     'Invalid email format'
  //   )
  //   .required('Required!')
  //   .test('email-provider', 'Email provider not allowed', (value) => {
  //     if (/(email|yahoo)\.com$/.test(value)) {
  //       return false;
  //     }
  //     return true;
  //   }),
  'excelFile': Yup.mixed()
    .required('File is required')
});

const InputFieldData = [
  {
    inputId: 'add-course-name',
    inputName: 'add-course-name',
    formGroupId: 'add-course-group-name',
    placeholder: 'enter course name',
    labelText: 'Course Name',
  },
  // {
  //   inputId: 'add-course-email',
  //   inputName: 'add-course-email',
  //   formGroupId: 'add-course-group-email',
  //   placeholder: `enter HOD's email`,
  //   labelText: 'HOD Email',
  // },
];

export default function AddCourse() {
  const navigate = useNavigate();
  const inputFile = useRef(null);
  const [selectedFile,setSelectedFile] = useState(null);
  const [showPreview,setShowPreview] = useState(false);
  const [showError,setShowError] = useState(false);

  const handleErrorClose = () => setShowError(false);
  const handleErrorShow = () => setShowError(true);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if(inputFile.current) {
      console.log(inputFile);
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  const [postAddCourse, { isLoading, data, error }] = useAddCourseMutation(
    localStorage.getItem('accessToken')
  );
  const [excel,setExcel] = useState([])

  async function onSubmits(values) {

    let users = JSON.parse(localStorage.getItem('users'));
    // console.log('users ', users);
    if(excel.length) {
      if(users) {
      let addCourseName = {
        course_name: `${values['add-course-name']}`,
        userId: SubIdSplit(users.sub),
        mails: ['nik@gmail.com'],
      };

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const promise = await postAddCourse({ ...addCourseName, accessToken });
        if (promise.data) {
          navigate(path.CreateAssessment.path);
        } else {
          alert('sorry your connection lost or api failed ');
        }
      } else {
        alert('user not login or signup');
      }
    } else {
      alert('user not present');
    }
    } else {
      alert("please provide a excel file or data in valid form ");
    }
  }

  return (
    <>
      <div className="row h-100 m-0 p-0">
        <div className=" col-md-6 h-100 m-0 p-0 ">
          <div className="p-3 pe-lg-5 mt-lg-2">
            <p className="text-capitalize fw-bold fs-4 ">Add course</p>
            <p>
              Adding a course is easy! Just provide the course name and the Head
              of Department's (HOD) email, and you're good to go.
            </p>
          </div>
          <Formik
            initialValues={{'add-course-name': '','add-course-email': '','excelFile': ''}}
            validationSchema={SignupSchema}
            onSubmit={onSubmits}
          >
            {(props) => (
              <Form className=" d-flex flex-column justify-content-evenly ">
                {InputFieldData.map((inputData) => (
                  <InputField
                    inputId={inputData.inputId}
                    inputName={inputData.inputName}
                    formGroupId={inputData.formGroupId}
                    formGroupClassName={'my-1 my-md-4 mx-5 '}
                    placeholder={inputData.placeholder}
                    labelText={inputData.labelText}
                    onInputBlur={props.handleBlur}
                    onInputChange={props.handleChange}
                  />
                ))}

                <div className=" my-3 py-1 d-flex justify-content-center align-items-center border border-dark-subtle   my-1 my-md-2 mx-5  w-auto  ps-3 pe-2 text-center rounded-5 ">
                  <>  <label for="files" className=' cursor-pointer' > Upload student email excel list</label>
                    <input id="files" style={{visibility: "hidden",width: "1px",height: "1px"}}
                      name="excelFile"
                      ref={inputFile}
                      accept=".xlsx, .xls, .xlsm, .xlsb, .csv,.xlam ,.xltx , .xltm"
                      onChange={async (e) => {
                        handleFileChange(e);
                        props.handleChange(e);
                        let arr = await ExcelDataReader(e.target.files[0]);
                        if(arr instanceof String) {
                          console.log(arr);
                          setExcel(arr);
                          handleErrorShow();
                        } else {
                          setExcel([...arr]);
                          console.log("excel data =========",arr);
                        }

                      }}
                      onBlur={props.handleBlur}
                      type="file"
                    /></>
                  <MdUpload size={30} className=" p-1" />

                </div>
                <div className="my-0 py-1 d-flex justify-content-center  ">
                  {selectedFile ? <div style={{display: 'flex',alignItems: 'center'}}>
                    <span>{selectedFile.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className=' fw-bold cursor-pointer ms-2 px-1 border-0 text-danger rounded-circle'
                      title='remove file'
                    >
                      &#x2715;
                    </button >
                    <button type='button' title='Show Preview '
                      className=' cursor-pointer border border-0 ms-2 px-1'
                      onClick={() => {
                        if(excel.length && selectedFile) {
                          console.log("======================= onclick show previw");
                          setShowPreview(true);
                        } else {
                          alert(excel);
                        }
                      }}
                    > <FaEye /> </button>
                  </div>
                    : null}
                </div>

                <ErrorMessage component={"div"} className=' input-error  my-1  mx-5 ' name='excelFile' />
                {/* {!props.touched['excelFile'] && excel ? null : <p className=' input-error text-center'> Please provide  a excel</p>} */}
                <CustomButton
                  buttonText={
                    isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      'Submit'
                    )
                  }
                  onButtonClick={props.handleSubmit}
                  className={
                    'm-auto d-block px-5 m-3 mx-5 mt-3  text-capitalize  rounded-4'
                  }
                />
              </Form> 
            )}
          </Formik>
        </div>

        <div className="col-md-6 m-0 p-0 h-100 d-none d-md-flex  align-items-center  justify-content-center">
          <img src={learning} alt="" className="img-fluid w-75" />
        </div>
        {error && alert('connection lost ' + JSON.stringify(error))}
      </div>
      {excel instanceof String ?
        <>
          <Modal show={showError} onHide={handleErrorClose}>
            <Modal.Header >
              <Modal.Title>Invalid File Error </Modal.Title>
            </Modal.Header>
            <Modal.Body>{JSON.stringify(excel).replaceAll('"'," ")}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={
                () => {handleRemoveFile(); handleErrorClose()}}>
                Ok
              </Button>
            </Modal.Footer>
          </Modal>
        </> : null}
      {showPreview && excel.length > 0 && <ExcelShower showFlag={true} setShowPreview={setShowPreview} excelData={excel} />}
    </>
  );
}
