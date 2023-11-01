import React from 'react'
import SideNavBar from './components/assets/SideNavBar'
import {FaUserAlt} from 'react-icons/fa'
import {Form} from 'react-bootstrap'
// import {BiMenu} from 'react-icons/bi'
import TableResponsive from './components/TableResponsive'
import Example from './Example'
import Header from './components/assets/Header'

const style = {backgroundColor: "#f6f6f6"}

export default function OrgDashBoard() {
    return (
        <div className='row w-100 rounded-5 m-0 p-0 justify-content-end'>

            <SideNavBar />
            <Header />

            <div className='offset-lg-1 col-lg-11 row m-0 h-auto mt-3 d-flex'>

                {/* div where item contain comes  */}
                <div className='row d-flex  p-2 g-1' style={style}>
                    <div className='row d-flex  justify-content-around  p-2 g-1'>
                        <div className='col  col-xl-3 p-3 bg-white rounded-3' style={{minHeight: "240px"}}>
                            <h1> Your Created  Exams </h1>
                        </div> <div className='col col-xl-3  offset-sm-1 p-3 bg-white rounded-3' style={{minHeight: "240px"}}>
                            <h1> Number of  Students</h1>
                        </div> <div className='col col-xl-3 offset-sm-1 p-3 bg-white rounded-3' style={{minHeight: "240px"}}>
                            <h1> Number of maintors  </h1>
                            <h1> in your </h1>
                            <h1> organisation</h1>
                        </div>
                    </div>
                    {/*  div where table format data come  */}
                    <div className='row m-0  d-flex justify-content-between bg-white rounded-3 '>
                        <div className='row w-100 d-flex justify-content-around  align-items-center p-3'>
                            <div className='col-6  text-center  '>
                                <p className=' text-capitalize  text-break fw-bold '>Upcoming assesment</p>
                            </div>
                            <div className=' col-6 col-lg-3 offset-lg-3   '>
                                <Form.Select aria-label="Table view "
                                    style={{borderColor: "#707070"}}
                                    className='p-1 border focus-ring focus-ring-light '>
                                    <option value=''>Table view</option>
                                    <option value="company">Row view </option>
                                    <option value="college">Coloumn view </option>
                                </Form.Select>
                            </div>
                        </div>

                        <div className=' row  w-100 p-2 g-1 bg-white rounded-3 pb-5'>
                            <TableResponsive />
                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}
