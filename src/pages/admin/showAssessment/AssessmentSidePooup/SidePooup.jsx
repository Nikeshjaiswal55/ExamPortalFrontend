import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        BBA
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="end" style={{ width: 'calc(100vw - 50px)' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as a placeholder. In real life, you can have the elements you
          have chosen, like text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas> */}


      <div className='row w-100 m-0 p-0'  >
        <div className='row gap-3 mt-4  align-items-center'>
          <div className=' col-2 p-4 '>
       
<h3>    Test Configuration</h3>

<div className=' mx-1 bg-dark-subtle rounded-5' style={{width: "200px",height: "10px"}}><div className=' rounded-5' style={{width: "50%",height: "10px",backgroundColor: "blue"}}  ></div></div>

          </div>
          <div className=' col-9   shadow  rounded-4  '>
<h1 className=' p-4 '>Java Mastery challenge </h1>
          </div>

          </div>

        
 <div className='row gap-3 mt-4  align-items-center'>
          <div className=' col-2 p-4  '>
       
<h3>    </h3>

<div className=' mx-1  rounded-3 p-3 bg-primary ' style={{width: "200px",height: "10px"}}><div className=' rounded-5' style={{width: "50%",height: "10px"}}  ></div></div>

          </div>
          <div className=' col-9   shadow  rounded-4  '>
<div className='mb-0   align-text-top p-4' style={{width: "200px",height: "650px"}}> </div>
          </div>




        </div>
        
      </div>
    </>
  );
}

export default Example;
