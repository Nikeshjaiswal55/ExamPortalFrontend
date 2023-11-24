import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Cardassessment(props) {
  return (
   
    <div className={"col-12 col-md-6"}>
      <div className="card bg-light py-1 px-4 rounded-3  ">
        <div className="py-2">
          <p className="text-black"><strong>ExamName:</strong> {props.ExamName}</p>
        </div>
        <div className="d-flex justify-content-between bg-white rounded-3 p-3">
          <div>
            <p><strong>Exam Mode:</strong> {props.ExamMode}</p>
            <p><strong>Exam Duration:</strong> {props.ExamDuration}</p>
          </div>
          <div>
            <p><strong>Exam Round:</strong> {props.ExamRound}</p>
           <p><strong>Session:</strong> {props.Session}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between py-2 ">
        <p className="text-black"><strong>ExamDate:</strong> {props.ExamDate}</p>
          <div className="text-black m-0 mx-5 position-relative h-100 " style={{ width: "50px" }}>

            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="img-thumbnail img-fluid rounded-circle p-0 position-absolute top-0 start-25   " style={{ width: "30px", height: "30px" }} />
            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="img-thumbnail img-fluid rounded-circle p-0 position-absolute top-0 start-50 " style={{ width: "30px", height: "30px" }} />
            <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="img-thumbnail img-fluid rounded-circle p-0 position-absolute  top-0 start-100 " style={{ width: "30px", height: "30px" }} />

          </div>
        </div>
      </div>

    </div>
  );
}
