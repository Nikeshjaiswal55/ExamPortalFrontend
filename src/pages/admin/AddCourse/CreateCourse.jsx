import React from 'react';
import Header from '../../../components/Header/Header';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';
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
      {/* <Header />
      <SideNavBar /> */}
      <CreateComponent {...courseData} />
    </>
  );
}
