import React, { useState } from 'react';
import ssismlogo from '../../assets/ssism-logo.png'
import { getDecryptedResponse } from '../../utils/getDecryptedResponse';
import { maskPhoneNumber } from '../../utils/maskphonenumber';

const OtpVerification = () => {
    const [otp, setOtp] = useState('');
    const number = getDecryptedResponse('m-num')
    // const [timer, setTimer] = useState(166); // Example timer value in seconds

    // Function to format time
    // const formatTime = (seconds) => {
    //     const minutes = Math.floor(seconds / 60);
    //     const secs = seconds % 60;
    //     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    // };

    return (
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
                            <i className="bi bi-whatsapp"></i> {maskPhoneNumber(number)}
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
                            <a href="#" className="text-primary">
                                Resend OTP?
                            </a>
                        </span>
                    </p>
                    <button className="btn fw-bold w-100 text-light" style={{background:"#f75b05"}}>Verify OTP</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default OtpVerification;
