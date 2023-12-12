import React from 'react';
import result from '../../../assets/Pending.svg';

export const Pending = () => {
  return (
    <div>
      <div className="h-100 w-100 bg-white">
        <div className="h-100 w-100 result-bg d-flex justify-content-center align-items-center overflow-auto">
          <div className="result-container text-center">
            <h2 className="mb-3">Coming Soon: Your Results Await! 📈</h2>
            <img src={result} />
            <h5 className="mt-5">Results pending—anticipation builds! </h5>
            <h5 className="mt-3">Stay tuned for updates on your outcome.</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
