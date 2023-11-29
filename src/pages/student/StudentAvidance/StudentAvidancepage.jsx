import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import '../../../styles/common.css'
import { path } from '../../../routes/RoutesConstant';

export default function StudentAvidancePage() {
    const navigate = useNavigate();
    return (
        <>
        <div className='light-box w-100 h-100 overflow-auto' >
            <div className=' w-100 d-flex justify-content-between align-items-center p-3 flex-wrap '>
                <div className=' d-flex align-items-center justify-content-center ' style={{width:"300px"}} >
                    <img src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                        className="img-thumbnail img-fluid rounded-circle   m-auto p-0 mt-1  border-dark border-3" alt="Student Image" style={{ width: '60px', height: '60px' }} />

                    <p className="fw-bold m-0">
                        <h5>Nikesh Jaiswal</h5>
                        <p> nikesh.bca2020@ssism.org</p>
                    </p>
                   
                </div> 
                <div className="fw-bold">
                        <h5>Submited At: 28 dec 2023 at 10.30pm</h5>
                    </div>
            </div>

            <div className='w-100 m-0 row align-items-center text-center'>
                <div className='col-6 col-md-3'><p className="white-box py-4 px-2 rounded-4 fw-bold ">Rule violation</p></div>
                <div className='col-6 col-md-3'><p className="white-box py-4 px-2 rounded-4 fw-bold ">3 Tap switched</p></div>
                <div className='col-6 col-md-3'><p className="white-box py-4 px-2  rounded-4 fw-bold ">View Change</p></div>
                <div className='col-6 col-md-3'><p className="white-box py-4  px-2 rounded-4 fw-bold ">View Change</p></div>

            </div>
            <div className='white-box   p-4 m-4 border border-black ' style={{height:"400px"}} >
                <h5></h5>
                </div>
            </div>
        </>
    );
}