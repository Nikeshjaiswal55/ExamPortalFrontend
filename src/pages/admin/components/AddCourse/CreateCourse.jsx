import React from 'react'
import Header from '../assets/Header'
import SideNavBar from '../assets/SideNavBar'
import {CreateComponent} from './CreateComponent'
import creatImg from '../image/Webinar-pana.svg'
import {changeDefaultButtonBehaviour} from '../assets/changeDefaultBehaviourButton'
import {useNavigate} from 'react-router-dom'

export function CreateCourse() {
    const navigate = useNavigate();
    const courseData = {
        Img: creatImg,
        buttonText: "add course",
        onButtonClick: (e) => {changeDefaultButtonBehaviour(e); navigate('/add-course')}
    }
    return (
        <>
            <Header />
            <SideNavBar />
            <CreateComponent {...courseData} />
        </>
    )
}
