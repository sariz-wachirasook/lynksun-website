import { FC } from 'react';
import { deleteCookie } from '../../utils/cookie';

const LogoutPage: FC = () => {
  deleteCookie('token');
  deleteCookie('user');
  // TODO: integrate refresh token
  // deleteCookie('refresh_token');

  window.location.href = '/';
  return <></>;
};

export default LogoutPage;
