import '../assets/css/app.css';
import '../assets/css/tailwind.css';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
