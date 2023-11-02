import React from 'react'

const styleRow = {width: "150px",color: "#4E4E4E",fontSize: "16px"};
export default function TrOrganisation(props) {
    return (
        <>
            <tr className='d-flex justify-content-md-around justify-content-start text-center  gx-3 align-items-baseline py-1'>
                <td className='text-capitalize flex-shrink-0 border-0  text-nowrap  ' style={styleRow}>{props.assesmentName}</td>
                <td className='text-capitalize flex-shrink-0 border-0 ' style={styleRow}  >{props.assesmentCreated}</td>
                <td className='text-capitalize flex-shrink-0  border-0' style={styleRow}>{props.assesmentLastDate}</td>
                <td className='text-capitalize flex-shrink-0 border-0 ' style={styleRow}>{props.createdBy}</td>
            </tr>
        </>
    )
}
