import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';
import '../../../styles/common.css';
import { path } from '../../../routes/RoutesConstant';
import { Table } from 'react-bootstrap';

export  function StudentAvidancePage() {
  const navigate = useNavigate();
  const randomImage = JSON.parse(localStorage.getItem('capturedImage'));
  const ssImage = JSON.parse(localStorage.getItem('ss'));

  return (
    <>
      <div className="w-100 h-100 overflow-auto">
        <div className=" w-100 d-flex justify-content-between align-items-center p-3 flex-wrap ">
          <div
            className=" d-flex align-items-center justify-content-center "
            style={{ width: '300px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
              className="img-thumbnail img-fluid rounded-circle   m-auto p-0 mt-1  border-dark border-3"
              alt="Student Image"
              style={{ width: '60px', height: '60px' }}
            />

            <p className="fw-bold m-0">
              <h5>Nikesh Jaiswal</h5>
              <p> nikesh.bca2020@ssism.org</p>
            </p>
          </div>
          <div className="fw-bold">
            <h5>Submited At: 28 dec 2023 at 10.30pm</h5>
          </div>
        </div>

        <div className="w-100 m-0 row gap-2 align-items-center justify-content-evenly text-center">
          <div className="col-6 col-md-2 bg-light rounded-3">
            <p className="white-box py-4 px-2 rounded-4 fw-bold mb-0 ">
              Rule violation
            </p>
          </div>
          <div className="col-6 col-md-2 bg-light rounded-3">
            <p className="white-box py-4 px-2 rounded-4 fw-bold mb-0 ">
              3 Tap switched
            </p>
          </div>
          <div className="col-6 col-md-2 bg-light rounded-3">
            <p className="white-box py-4 px-2  rounded-4 fw-bold mb-0 ">
              {randomImage.length} random photos
            </p>
          </div>
          <div className="col-6 col-md-2 bg-light rounded-3">
            <p className="white-box py-4  px-2 rounded-4 fw-bold mb-0 ">
              View Change
            </p>
          </div>
        </div>
        <div className="white-box overflow  p-4 m-4 border border-black ">
          <Table className="mt-3" striped bordered hover size="sm">
            <thead>
              <tr>
                <th className="text-center">#</th>
                <th className="text-center">Evidence type</th>
                <th className="text-center">Occurred At</th>
                <th className="text-center">Capture</th>
              </tr>
            </thead>
            <tbody>
              {randomImage &&
                randomImage?.map((image, index) => (
                  <tr key={index}>
                    <td className="p-5">1</td>
                    <td className="p-5">random image</td>
                    <td className="p-5">{image?.timestamp.toString()}</td>
                    <td className="p-5">
                      <img
                        key={index}
                        className="img-fluid"
                        style={{ height: '10rem' }}
                        src={image.base64Image}
                        alt={`Captured Image ${index + 1}`}
                      />
                    </td>
                  </tr>
                ))}
              {ssImage && (
                <tr>
                  <td className="p-5">2</td>
                  <td className="p-5">screenShot of tab Switch</td>
                  <td className="p-5">Thornton</td>
                  <td className="p-5">
                    <img
                      key={index}
                      src={URL.createObjectURL(ssImage)}
                      alt={`Captured ${index}`}
                    />
                  </td>
                </tr>
              )}
              <tr>
                <td className="p-5">5</td>
                <td className="p-5">Jacob</td>
                <td className="p-5">Larry the Bird</td>
                <td className="p-5">@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
