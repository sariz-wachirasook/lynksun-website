import Navbar from '../components/layouts/navbar';
import Aside from '../components/layouts/aside';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  useEffect(() => {
    import('flowbite').then((flowbite) => {
      flowbite.initFlowbite();
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="sm:grid sm:grid-cols-[auto,1fr] relative h-full">
        <Aside />
        <main className="w-full min-w-0 max-w-screen-xl mx-auto p-[1rem] min-h-[80vh]">{children}</main>
      </div>
    </>
  );
};

export default AppLayout;
