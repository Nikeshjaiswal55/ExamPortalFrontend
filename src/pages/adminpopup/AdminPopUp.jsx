import React,{useEffect,useState} from 'react'
import PopUp from './components/PopUp'
import Example from './components/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function AdminPopUp() {
    const [show,setShow] = useState(false);
    useEffect(() => {
        handleShow();
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Example />
        </div>
    )
}

