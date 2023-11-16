import React from 'react';
import { ExamPortalLandingPage } from './components/ExamPortalLandingPage';
import { ExamVerification } from './components/ExamVerification';
import './ExamPortal.css';

export const ExamPortal = () => {
  function preventCopy(event) {
    event.preventDefault();
  }

  document.addEventListener('copy', preventCopy);
  return (
    <div className="container vh-100 no-select">
      <ExamPortalLandingPage />
    </div>
  );
};
