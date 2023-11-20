import React from 'react'

const styleRow = {minWidth: "150px",color: "#4E4E4E",fontSize: "16px"};
export function ShowCourseTr(props) {
    return (
        <>
            <tr className='d-flex justify-content-md-around justify-content-start   gx-3 align-items-baseline py-1'>
                <td className='custom-table-td-width text-capitalize flex-shrink-0 border-0  text-nowrap  '>{props.assesmentName}</td>
                <td className='custom-table-td-width text-capitalize flex-shrink-0 border-0 '>{props.createdBy}</td>
            </tr>
        </>
    )
}