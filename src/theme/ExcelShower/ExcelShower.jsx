import {useState} from 'react';
import '../../styles/common.css'
import Modal from 'react-bootstrap/Modal';
import {Table} from 'react-bootstrap';
import {CustomButton} from '../Button/Buttons';
import {ExcelDataWritter} from '../../utils/ExcelDataWritter';

function ExcelShower({excelData,setShowPreview,showFlag}) {
    const [fullscreen,setFullscreen] = useState(true);
    const [show,setShow] = useState(showFlag);


    return (
        <>

            <Modal show={show} fullscreen={fullscreen} onHide={() => {setShow(false); setShowPreview(false)}}>
                <Modal.Header closeButton>
                    <Modal.Title>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className=' my-2 d-flex align-items-center justify-content-between'>
                        <h4 className='d-block' >Your Students Record</h4>

                        <CustomButton className=" rounded-4"
                            onButtonClick={() => ExcelDataWritter(excelData)} buttonText={"Download "} />
                    </div>
                    <Table striped responsive hover >
                        <thead className=' t-head'>
                            <tr>
                                {
                                    excelData && excelData[0] && Object?.keys(excelData[0]).map((key) => {
                                        return (
                                            <th key={key} style={{width: "200px"}}> {key}</th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                excelData && excelData.map((data,ind) => {
                                    return (
                                        <tr key={ind}>
                                            {
                                                excelData && Object?.keys(data).map((key) => (
                                                    <td key={key}>{data[key]} </td>
                                                ))
                                            }
                                        </tr>
                                    )

                                })
                            }
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default ExcelShower;