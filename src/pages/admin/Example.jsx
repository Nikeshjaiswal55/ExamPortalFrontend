import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { BiMenu } from 'react-icons/bi';
import SideNavBar from '../../components/SideNavBar/SideNavBar';

const style = {
  backgroundColor: 'transparent!important',
  opacity: '0!important',
  transition: 'none!important',
};
function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="light" onClick={handleShow}>
        <BiMenu size={30}></BiMenu>
      </Button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header
          closeButton
          style={{ backgroundColor: 'transparent' }}
        ></Offcanvas.Header>
        <Offcanvas.Body style={style}>
          <SideNavBar></SideNavBar>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Example;
