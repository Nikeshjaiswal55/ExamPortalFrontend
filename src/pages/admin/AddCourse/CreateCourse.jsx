import React from 'react'
import Header from '../components/Header'
import SideNavBar from '../components/SideNavBar'
import {CreateComponent} from './CreateComponent'
import creatImg from '../assets/Webinar-pana.svg'
import {changeDefaultButtonBehaviour} from '../components/changeDefaultBehaviourButton'
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
