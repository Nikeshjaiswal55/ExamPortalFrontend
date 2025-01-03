import React, { useEffect, useState } from 'react';
import ssismlogo from '../../assets/ssism-logo.png'
import { getDecryptedResponse, setEncryptData } from '../../utils/getDecryptedResponse';
import { maskPhoneNumber } from '../../utils/maskphonenumber';
import { useSendOtpMutation, useVerifyOtpMutation } from '../../apis/Service';
import { Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { path } from '../../routes/RoutesConstant';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    console.log('number')
    const number = getDecryptedResponse('m-num')
    console.log('number',number)
    const navigate = useNavigate()
    // const [timer, setTimer] = useState(166); // Example timer value in seconds

    // Function to format time
    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    // };

    const [verifyOtp, { isError, isSuccess, isLoading }] = useVerifyOtpMutation()
    const [reSendOtp] = useSendOtpMutation()

    const sendOtp = () => {
        verifyOtp({
            "mobileNumber": number,
            "otp": otp
        }).then((res) => {
            const data = {
                std_id: '676be0c9553a1d0d4f60d312',
                role: "Student"
            }
            if (res?.data?.success==true) {
                toast.success('Otp verify successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                const data = {
                    // std_id :'676be0c9553a1d0d4f60d312',
                    std_id: res?.data?.studentId,
                    role: "Student"
                }
                setEncryptData(data,'otp_data')
                navigate(path.ShowAllAssessmentToStudent.path)
            }else{
                console.log("inside if")
                toast.error(res?.data?.massage, {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        }).catch((error) => {
            toast.error('Something went wrong! Try again', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        })
    }

    const resendOtp = () => {
        reSendOtp({mobileNumber:number}).then(() => {
            if (res?.data) {
                toast.success('check your whatsapp for otp', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        }).catch((error) => {
            toast.error('Something went wrong! Try again', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        })
    }


    return (
        <>
        <div className='container'>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="card shadow" style={{ width: '400px' }}>
                    <div className="card-header py-3 text-center bg-white">
                        <h5 className="card-title mb-0 fw-bold">Verify OTP</h5>
                        <img
                            src={ssismlogo}
                            alt="logo"
                            style={{ height: '2rem', position: 'absolute', top: '10px', right: '10px' }}
                        />
                    </div>
                    <div className="card-body text-center">
                        <p className="mb-4">
                            Please enter the OTP sent to your registered mobile numbers on WhatsApp
                            <span className="text-success ms-1">
                                <i className="bi bi-whatsapp"></i> {number ? maskPhoneNumber(number) : ""}
                            </span>
                        </p>
                        <div className="mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <p className="small mb-4">
                            {/* OTP valid up to: <span className="text-danger">{formatTime(timer)}</span> */}
                            <span className="ms-2">
                                <p style={{cursor:'pointer'}} onClick={resendOtp} className="text-primary">
                                    Resend OTP?
                                </p>
                            </span>
                        </p>
                        <button className="btn fw-bold w-100 text-light" onClick={sendOtp} style={{ background: "#f75b05" }}>{isLoading ? (
                            <Spinner animation="border" size="sm" />
                        ) : (
                            'Verify OTP')}</button>
                    </div>
                </div>
            </div>
            <ToastContainer />

        </div>
</>
    );
};

export default OtpVerification;
