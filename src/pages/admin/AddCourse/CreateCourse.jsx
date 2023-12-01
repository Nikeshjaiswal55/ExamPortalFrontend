import React from 'react';
import { CreateComponent } from './CreateComponent';
import creatImg from '../assets/Webinar-pana.svg';
import { useNavigate } from 'react-router-dom';

export function CreateCourse() {
  const navigate = useNavigate();
  const courseData = {
    Img: creatImg,
    buttonText: 'add course',
    onButtonClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate('/admin/add-course');
    },
  };
  return (
    <>
      <CreateComponent {...courseData} />
    </>
  );
}
