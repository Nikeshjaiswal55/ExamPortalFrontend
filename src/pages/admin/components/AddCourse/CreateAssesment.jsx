import React from 'react'
import Header from '../assets/Header'
import SideNavBar from '../assets/SideNavBar'
import creatImg from '../image/Online test-amico.svg'
import '../assets/style.css'
import {changeDefaultButtonBehaviour} from '../assets/changeDefaultBehaviourButton'
import {CreateComponent} from './CreateComponent'
import {useNavigate} from 'react-router-dom'



export default function CreateAssesment() {
    const navigate = useNavigate();
    const assesmentData = {
        Img: creatImg,
        onButtonClick: (e) => {
            changeDefaultButtonBehaviour(e); navigate('/add-assessment')
        },
        buttonText: "create assesment"
    }
    return (
        <>
            <Header />
            <SideNavBar />
            <CreateComponent {...assesmentData} />
        </>
    )
}
