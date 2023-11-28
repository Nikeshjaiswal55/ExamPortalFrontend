import React from 'react';
import { Image } from 'react-bootstrap';
import loading from '../../assets/gif/loading.gif';

export const Loader = () => {
  return <Image src={loading} height={400} width={500} alt="loading.." />;
};
