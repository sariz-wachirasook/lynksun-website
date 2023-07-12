import Navbar from '../components/layouts/navbar';
import Footer from '../components/layouts/footer';

interface Props {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      {/* header */}
      <Navbar />

      {/* main */}
      <main className="max-w-screen-xl mx-auto px-[1rem] min-h-[80vh] ">{children}</main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default DefaultLayout;
