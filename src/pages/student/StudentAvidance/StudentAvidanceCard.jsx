import React from 'react';
import { useNavigate } from 'react-router-dom';
import StudentAvidancePage from './StudentAvidancepage';

export default function StudentAvidanceCard() {
    const navigate = useNavigate();
  
    
  
    return (
      <>
      <div>
      <StudentAvidancePage/>
      </div>
      </>
    );
  }
  