import { useState } from 'react';

export function TotalStudent({ totalStudent, selected, setSelected }) {
  return (
    <>
      <div className="card total-assissment-card h-25 d-flex flex-row rounded-3 p-3 gap-3  ">
        <div
          className={`w-100 py-3 ${
            selected ? 'total-assissment-card-selected text-dark' : 'text-light'
          } btn rounded-3 d-flex flex-column align-items-center justify-content-center cos`}
          onClick={() => setSelected(!selected)}
        >
          <h3>Total Student</h3>
          <h3 className="py-2">{totalStudent?.length}</h3>
        </div>
        <div
          className={`w-100 py-3  ${
            !selected ? 'total-assissment-card-selected' : 'text-light'
          } btn rounded-3 d-flex flex-column align-items-center justify-content-center`}
          onClick={() => setSelected(!selected)}
        >
          <h3>Attempted Student</h3>
          <h3 className="py-2">
            {
              totalStudent.filter(
                (studentdetail) => studentdetail._attempted === true
              ).length
            }
          </h3>
        </div>
      </div>
    </>
  );
}
