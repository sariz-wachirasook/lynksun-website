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
      <div className="sm:grid sm:grid-cols-[auto,1fr] relative h-full">
        <Aside />
        <div className="min-w-0">
          <Navbar />
          <main className="max-w-screen-xl mx-auto p-[1rem] min-h-[80vh] js-app-layout">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
