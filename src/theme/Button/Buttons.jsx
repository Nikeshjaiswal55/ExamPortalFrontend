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
}) {
  return (
    <>
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
    </>
  );
}
