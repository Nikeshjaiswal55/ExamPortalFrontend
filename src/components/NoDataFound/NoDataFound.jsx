import React from 'react';
import robot from '../../assets/gif/no_data_found.gif';

export const NoDataFound = ({ children }) => {
  return (
    <div className="d-flex justify-content-center flex-column align-items-center w-100">
      <img width={300} height={300} src={robot} alt="robot" />
      {children}
    </div>
  );
};

