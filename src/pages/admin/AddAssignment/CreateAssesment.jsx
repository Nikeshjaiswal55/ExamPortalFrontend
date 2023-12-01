import React from 'react';
import creatImg from '../assets/Online test-amico.svg';
import '../components/style.css';
import { CreateComponent } from '../AddCourse/CreateComponent';
import { useNavigate } from 'react-router-dom';

export default function CreateAssesment() {
  const navigate = useNavigate();
  const assesmentData = {
    Img: creatImg,
    onButtonClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate('/admin/add-assessment');
    },
    buttonText: 'create assesment',
  };
  return (
    <>
      <CreateComponent {...assesmentData} />
    </>
  );
}
