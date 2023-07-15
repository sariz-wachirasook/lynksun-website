const token = getCookie('token');
if (!token) {
  window.location.href = '/login';
}

import Navbar from '../components/layouts/navbar';
import Aside from '../components/layouts/aside';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/app.css';
import '../assets/css/tailwind.css';
import '../utils/i18n';
import { ToastContainer } from 'react-toastify';
import { user } from '../store/user';
import { getCookie } from '../utils/cookie';
import AuthService from '../api/v1/auth';

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

      <div className="sm:grid sm:grid-cols-[auto,1fr] relative h-full">
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
