import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {StudentAvidancePage} from '../../student/StudentAvidence/StudentAvidancePage';

export const ReportCard = () => {
  const randomImage = JSON.parse(localStorage.getItem('capturedImage'));
  const ssImage = JSON.parse(localStorage.getItem('ss'));

  console.log(ssImage);

  return (
    // <div className="container pt-5">
    //   <div className="border-bottom">
    //     <h3>ProExaminator Summary!!</h3>
    //     <h5>Here is the list of all the violations you have committed...</h5>
    //   </div>
    //   <div className="row justify-content-between align-items-center py-3 border-bottom">
    //     <div className="col-4">
    //       <h5>Nikesh Jaiswal</h5>
    //       <h6>nikesh@gmail.com</h6>
    //     </div>
    //     <div className="col-6">
    //       <div className="border p-2">
    //         <h5>startedd At</h5>
    //         <h6>12:03pm</h6>
    //       </div>
    //       <div className="border p-2 mt-2">
    //         <h5>subbmitted At</h5>
    //         <h6>12:03pm</h6>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="row gap-3 justify-content-evenly py-3 mb-2 border-bottom">
    //     <VerifyInfo title={'Total Violations'} occurance={3} />
    //     <VerifyInfo title={'No Face Detected'} occurance={3} />
    //     <VerifyInfo title={'Tab Switched'} occurance={1} />
    //     <VerifyInfo title={'Random Photos'} occurance={randomImage.length} />
    //   </div>
    //   <div className="my-4">
    //     <h5>List of Evidence</h5>
    //     <Table className="mt-3" striped bordered hover size="sm">
    //       <thead>
    //         <tr>
    //           <th className="text-center">#</th>
    //           <th className="text-center">Evidence type</th>
    //           <th className="text-center">Occurred At</th>
    //           <th className="text-center">Capture</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {randomImage &&
    //           randomImage?.map((image, index) => (
    //             <tr key={index}>
    //               <td className="p-5">1</td>
    //               <td className="p-5">random image</td>
    //               <td className="p-5">{image?.timestamp.toString()}</td>
    //               <td className="p-5">
    //                 <img
    //                   key={index}
    //                   className="img-fluid"
    //                   style={{ height: '10rem' }}
    //                   src={image.base64Image}
    //                   alt={`Captured Image ${index + 1}`}
    //                 />
    //               </td>
    //             </tr>
    //           ))}
    //         {ssImage && (
    //           <tr>
    //             <td className="p-5">2</td>
    //             <td className="p-5">screenShot of tab Switch</td>
    //             <td className="p-5">Thornton</td>
    //             <td className="p-5">
    //               <img
    //                 key={index}
    //                 src={URL.createObjectURL(ssImage)}
    //                 alt={`Captured ${index}`}
    //               />
    //             </td>
    //           </tr>
    //         )}
    //         <tr>
    //           <td className="p-5">5</td>
    //           <td className="p-5">Jacob</td>
    //           <td className="p-5">Larry the Bird</td>
    //           <td className="p-5">@twitter</td>
    //         </tr>
    //       </tbody>
    //     </Table>
    //   </div>
    // </div>
    <StudentAvidancePage/>
  );
};

const VerifyInfo = ({ title, occurance }) => {
  return (
    <div className="border py-3 mt-3 col-2">
      <h5 className="text-center">{title}</h5>
      <h6 className="text-center">{occurance}</h6>
    </div>
  );
};
