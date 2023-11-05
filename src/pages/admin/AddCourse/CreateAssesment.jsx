import React from 'react';
import Header from '../../../components/Header/Header';
import SideNavBar from '../../../components/SideNavBar/SideNavBar';
import creatImg from '../assets/Online test-amico.svg';
import '../components/style.css';
import { CreateComponent } from './CreateComponent';
import { useNavigate } from 'react-router-dom';

export default function CreateAssesment() {
  const navigate = useNavigate();
  const assesmentData = {
    Img: creatImg,
    onButtonClick: (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigate('/add-assessment');
    },
    buttonText: 'create assesment',
  };
  return (
    <>
      <Header />
      <SideNavBar />
      <CreateComponent {...assesmentData} />
    </>
  );
}
