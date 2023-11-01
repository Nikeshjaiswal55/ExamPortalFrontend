import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import {TiPlusOutline} from 'react-icons/ti'
import {AiOutlineMessage} from 'react-icons/ai'
import {FiFolderMinus} from 'react-icons/fi'
import {PiSquaresFour} from 'react-icons/pi'
import {FaRegMoon} from 'react-icons/fa'
import {SiSimpleanalytics} from 'react-icons/si'
import {IoSettingsOutline,IoBagOutline} from 'react-icons/io5'

export default function SideNavBar() {
    return (
        <>
            <div className=' position-fixed  top-50  col-sm-1 row rounded-3 w-auto d-flex flex-column justify-content-around align-items-baseline py-4 g-4 bg-black text-white m-auto my-3 d-lg-grid  d-none'
                style={{top: "16px",left: "21px",width: "90px",maxHeight: "1048px",transform: "translateY(-50%)"}}>
                <div className='d-flex flex-column  mb-3 py-1'>
                    <span className=' p-2 my-2 rounded-3' ><TiPlusOutline size={20} ></TiPlusOutline></span>
                </div>
                <div className='d-flex flex-column border-bottom border-light w-auto py-1'>
                    <span className=' p-2 my-2 rounded-3' style={{backgroundColor: "#31333b"}}><PiSquaresFour size={20} /></span>
                    <span className=' p-2 my-2 rounded-3'><AiOutlineMessage size={20} /></span>
                    <span className=' p-2 my-2 rounded-3'><FiFolderMinus size={20} /></span>
                </div>
                <div className='d-flex flex-column py-1 '>
                    <span className=' p-2 my-2 rounded-3'><IoBagOutline size={20} /></span>
                    <span className=' p-2 my-2 rounded-3'><SiSimpleanalytics size={20} /></span>
                    <span className=' p-2 my-2 rounded-3'><IoSettingsOutline size={20} /></span>
                </div>
                <div className='d-flex flex-column  mt-5 py-1'>
                    <span className='p-2   rounded-circle' style={{backgroundColor: "#31333b"}}><FaRegMoon size={20} /></span>
                </div>
            </div>
        </>
    )
}
