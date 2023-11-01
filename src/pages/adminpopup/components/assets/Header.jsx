import React from 'react'
import Example from '../../Example'
import {FaUserAlt} from 'react-icons/fa'
export default function Header() {
    return (
        <>
            <div className='offset-lg-1 col-lg-11 row m-0 h-auto mt-3 d-flex'>
                {/* user part */}
                <div className='d-flex justify-content-between  justify-content-lg-end' >
                    <span className='d-lg-none'><Example /></span>
                    <span ><FaUserAlt size={30} cursor={"pointer"} /></span>
                </div>
            </div>
        </>
    )
}
