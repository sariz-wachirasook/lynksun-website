import { FC } from 'react';
import { deleteCookie } from '../../utils/cookie';

const LogoutPage: FC = () => {
  deleteCookie('token');
  deleteCookie('refresh_token');
  return <></>;
};

export default LogoutPage;
