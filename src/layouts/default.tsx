import Navbar from '../components/layouts/navbar';
import Footer from '../components/layouts/footer';
import { useEffect } from 'react';
import { useStore } from '@nanostores/react';

import '../utils/i18n';
import { ToastContainer } from 'react-toastify';
import { getCookie } from '../utils/cookie';
import { user } from '../store/user';
import AuthService from '../api/v1/auth';
// import { Partytown } from '@builder.io/partytown/react';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  const $user = useStore(user);
  const token = getCookie('token');

  useEffect(() => {
    import('flowbite').then((flowbite) => {
      flowbite.initFlowbite();
    });
    fetchUser();
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
      {/* header */}
      <Navbar />
      {import.meta.env.VITE_API_BASE_URL}
      {/* main */}
      <main className="max-w-screen-xl mx-auto p-[1rem] min-h-[80vh]">{children}</main>

      {/* footer */}
      <Footer />

      <ToastContainer />
      {/* <Partytown forward={['dataLayer.push']} /> */}
    </>
  );
};

export default DefaultLayout;
