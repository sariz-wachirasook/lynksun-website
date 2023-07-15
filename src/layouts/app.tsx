const token = getCookie('token');
if (!token) {
  window.location.href = '/login';
}

import Navbar from '../components/layouts/navbar';
import Aside from '../components/layouts/aside';
import { useEffect } from 'react';

import '../utils/i18n';
import { ToastContainer } from 'react-toastify';
import { user } from '../store/user';
import { getCookie } from '../utils/cookie';
import AuthService from '../api/v1/auth';
import { Partytown } from '@builder.io/partytown/react';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  const token = getCookie('token');

  useEffect(() => {
    fetchUser();
    import('flowbite').then((flowbite) => {
      flowbite.initFlowbite();
    });
  }, []);

  const fetchUser = async () => {
    if (token) {
      try {
        const authService = new AuthService();
        const response = await authService.getMe();
        user.set(response);
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
      <Partytown forward={['dataLayer.push']} />
    </>
  );
};

export default AppLayout;
