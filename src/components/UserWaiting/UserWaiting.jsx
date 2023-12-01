import { Image } from 'react-bootstrap';
import gif from '../../assets/gif/waiting_user.gif';

export const UserWaiting = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center w-100 h-100">
      <Image
        //   src="https://i.stack.imgur.com/YG4bw.gif"
        src={gif}
        allowFullScreen
      />
      <h4 className="text-capitalize fw-bold">Just Wait A Moments...</h4>
    </div>
  );
};
