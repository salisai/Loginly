import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import ChangePassword from '../components/Auth/ChangePassword';

const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <ChangePassword/>
      </main>
      <Footer />
    </div>
  );
};

export default ChangePasswordPage;