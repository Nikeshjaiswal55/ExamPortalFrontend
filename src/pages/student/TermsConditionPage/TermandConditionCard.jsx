import React from 'react';
import { useNavigate } from 'react-router-dom';
import TermandConditionPage from './TermandConditionPage';

export default function TermandConditionCard() {
  const navigate = useNavigate();

  

  return (
    <>
    <div>
    <TermandConditionPage/>
    </div>
    </>
  );
}
