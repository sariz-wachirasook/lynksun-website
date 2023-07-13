import Navbar from '../components/layouts/navbar';
import Footer from '../components/layouts/footer';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  useEffect(() => {
    import('flowbite').then((flowbite) => {
      flowbite.initFlowbite();
    });
  }, []);

  return (
    <>
      {/* header */}
      <Navbar />

      {/* main */}
      <main className="max-w-screen-xl mx-auto px-[1rem] min-h-[80vh] js-default-layout">
        {children}
      </main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default DefaultLayout;
