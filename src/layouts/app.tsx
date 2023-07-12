import Navbar from '../components/layouts/navbar';
import Aside from '../components/layouts/aside';

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <>
      <div className="sm:grid sm:grid-cols-[auto,1fr] relative">
        <Aside />
        <div>
          <Navbar />
          <main className="max-w-screen-xl mx-auto px-[1rem] min-h-[80vh] ">{children}</main>
        </div>
      </div>
    </>
  );
};

export default AppLayout;
