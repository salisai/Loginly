import Navbar from '../components/Layout/Navbar';
import Register from '../components/Auth/Register';
import Footer from '../components/Layout/Footer';

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <Register />
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;