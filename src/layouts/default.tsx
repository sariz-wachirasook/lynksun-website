import Navbar from '../components/navbar';
import Footer from '../components/footer';

interface Props {
  children: React.ReactNode;
}

const Default = ({ children }: Props) => {
  return (
    <>
      {/* header */}
      <Navbar />

      {/* main */}
      <main className="max-w-screen-xl mx-auto px-[1rem] min-h-[80vh]">{children}</main>

      {/* footer */}
      <Footer />
    </>
  );
};

export default Default;
