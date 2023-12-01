import Table from 'react-bootstrap/Table';
import React from 'react';
import TrOrganisation from './TrOrganisation';

const style = { backgroundColor: 'var(--white-100)' };
const styleRow = { width: '150px', fontSize: '16px', color: 'var(--grey)' };

const rowData = [
  {
    assesmentName: 'iteg interance exam',
    assesmentCreated: '31-10-2034',
    assesmentLastDate: '5-12-2034',
    createdBy: 'ssism teacher',
  },
  {
    assesmentName: 'iteg interance exam',
    assesmentCreated: '31-10-2034',
    assesmentLastDate: '5-12-2034',
    createdBy: 'ssism teacher',
  },
  {
    assesmentName: 'iteg interance exam',
    assesmentCreated: '31-10-2034',
    assesmentLastDate: '5-12-2034',
    createdBy: 'ssism teacher',
  },
  {
    assesmentName: 'iteg interance exam',
    assesmentCreated: '31-10-2034',
    assesmentLastDate: '5-12-2034',
    createdBy: 'ssism teacher',
  },
];

export default function TableResponsive() {
  return (
    <>
      <Table responsive className="row  w-100 ">
        <thead className="row m-0 p-0 ">
          <tr
            className="d-flex p-2  text-center justify-content-md-around   justify-content-start align-items-baseline rounded-3  w-100 "
            style={style}
          >
            {[
              'Assesment name',
              'Created at',
              'Assesment Date',
              'created by',
            ].map((heading) => (
              <th className=" text-capitalize flex-shrink-0  " style={styleRow}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="row m-0 p-0">
          {rowData.map((rowdata) => (
            <TrOrganisation
              assesmentName={rowdata.assesmentName}
              assesmentCreated={rowdata.assesmentCreated}
              assesmentLastDate={rowdata.assesmentLastDate}
              createdBy={rowdata.createdBy}
            />
          ))}
        </tbody>
      </Table>
    </>
  );
}
