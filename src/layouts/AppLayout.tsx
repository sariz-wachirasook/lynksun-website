const token = getCookie('token');
if (!token) {
  window.location.href = '/login';
}

import Navbar from '../components/layouts/Navbar';
import Aside from '../components/layouts/Aside';
import { useEffect } from 'react';

import '../utils/i18n';
import { ToastContainer } from 'react-toastify';
import { user } from '../store/user';
import { getCookie, setCookie } from '../utils/cookie';
import AuthService from '../api/v1/auth';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const token = getCookie('token');
  const userCookie = getCookie('user') ? JSON.parse(getCookie('user')) : null;

  if (userCookie) {
    console.log(userCookie);
    user.set(userCookie);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    if (token) {
      try {
        const authService = new AuthService();
        const response = await authService.getMe();
        user.set(response);
        setCookie({
          name: 'user',
          value: JSON.stringify(response),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Navbar />

      <div className="sm:grid sm:grid-cols-[auto,1fr] relative min-h-full">
        <Aside />
        <main className="w-full min-w-0 max-w-screen-xl mx-auto p-[1rem] min-h-[80vh]">
          {children}
        </main>
      </div>

      <ToastContainer />
    </>
  );
};

export default AppLayout;
