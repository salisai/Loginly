import Navbar from '../components/Layout/Navbar';
import Login from '../components/Auth/Login';
import Footer from '../components/Layout/Footer';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <Login />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;