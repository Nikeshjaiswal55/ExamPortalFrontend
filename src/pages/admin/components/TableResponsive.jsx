import Table from 'react-bootstrap/Table';
import React from 'react'
import TrOrganisation from './TrOrganisation';

const style = {backgroundColor: "#f6f6f6"}
const styleRow = {width: "150px",fontSize: "16px",color: "#4E4E4E"};

export default function TableResponsive() {
    return (
        <>
            <Table responsive className='row  w-100 '>
                <thead className='row m-0 p-0 '>
                    <tr className='d-flex p-2  text-center justify-content-md-around   justify-content-start align-items-baseline rounded-3  w-100 ' style={style}>
                        <th className=' text-capitalize flex-shrink-0   ' style={styleRow}>Assesment name</th>
                        <th className=' text-capitalize flex-shrink-0  ' style={styleRow}>Created at</th>
                        <th className=' text-capitalize flex-shrink-0  ' style={styleRow}>Assesment Date</th>
                        <th className=' text-capitalize  flex-shrink-0  ' style={styleRow}>created by</th>
                    </tr>
                </thead>
                <tbody className='row m-0 p-0'>

                    <TrOrganisation
                        assesmentName={"iteg interance exam"}
                        assesmentCreated={"31-10-2034"}
                        assesmentLastDate={"5-12-2034"}
                        createdBy={"ssism teacher"}
                    />
                    <TrOrganisation
                        assesmentName={"iteg interance exam"}
                        assesmentCreated={"31-10-2034"}
                        assesmentLastDate={"5-12-2034"}
                        createdBy={"ssism teacher"}
                    /><TrOrganisation
                        assesmentName={"iteg interance exam"}
                        assesmentCreated={"31-10-2034"}
                        assesmentLastDate={"5-12-2034"}
                        createdBy={"ssism teacher"}
                    /><TrOrganisation
                        assesmentName={"iteg interance exam"}
                        assesmentCreated={"31-10-2034"}
                        assesmentLastDate={"5-12-2034"}
                        createdBy={"ssism teacher"}
                    />
                </tbody>
            </Table>
        </>
    )
}
