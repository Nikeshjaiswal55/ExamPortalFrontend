import React from 'react';
import page from '../../assets/page.jpg';
import { Button } from 'react-bootstrap';

export function PageNotFound() {
  return (
    <div className='container-fluid'>
      <div className='row d-flex justify-content-center align-items-center mt-5  ps-5 pt-5'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <div className='p-4'>
            <h1>Ooops...</h1>
            <h3>Page not found</h3>
            <p>The page you are looking for doesn't exit or an<br/>
                 other error occurred, go to home page</p>
            <Button className='bg-warning text-black border-0'>Go Back</Button>
          </div>
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <img className='img-fluid' src={page} alt='PageNotFound' />
        </div>
      </div>
    </div>
  );
}
