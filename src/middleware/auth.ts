import AuthService from '../api/v1/auth';
import { getCookie } from '../utils/cookie';

const isAuth = async () => {
  const token = getCookie('token');

  if (!token) {
    return false;
  }

  try {
    const authService = new AuthService();
    const me = await authService.getMe();

    if (!me) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default isAuth;
