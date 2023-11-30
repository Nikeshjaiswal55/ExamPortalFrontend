import React from 'react';
import { StudentCard } from '../components/StudentCard/StudentCard';
import { TotalStudent } from '../components/TotalStudent/TotalStudent';

export default function AssignmentStudentPage() {
  return (
    <div className="h-100 w-100 m-0 p-0 ">
      <div className=" h-auto ">
        <TotalStudent />
      </div>
      <div
        className="card-div row w-100 overflow-auto"
        style={{ height: 'calc(100vh - 16rem)' }}
      >
        {[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ].map(() => (
          <StudentCard divBoxStyle={'col-lg-2 col-12'} />
        ))}
      </div>
    </div>
  );
}
