import React from 'react';
import { Button, Row } from 'react-bootstrap';

export const changeDefaultButtonBehaviour = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

export function CustomButton({
  onButtonClick,
  onButtonBlur,
  buttonText,
  className,
  rowClassName,
}) {
  return (
    <>
      {/* <Row className={`my-5 my-md-2 mx-3 p-3 p-md-5 ${rowClassName} `}> */}
        <Button
          variant="dark"
          type="submit"
          onClick={(e) => {
            changeDefaultButtonBehaviour(e);
            onButtonClick(e);
          }}
          onBlur={onButtonBlur}
        className={` ${className}`}
        >
          {buttonText}
        </Button>
      {/* </Row> */}
    </>
  );
}
