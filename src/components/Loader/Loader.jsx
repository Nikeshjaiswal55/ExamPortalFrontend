import React from 'react';
import { Image } from 'react-bootstrap';
import loading from '../../assets/gif/waiting_user2.gif';

export const Loader = () => {
  return <Image src={loading} alt="loading.." />;
};
