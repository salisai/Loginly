import Navbar from '../components/Layout/Navbar';
import Login from '../components/Auth/Login';
import Footer from '../components/Layout/Footer';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-white">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="page-content flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center section-spacing-lg">
          <div className="container-narrow w-full">
            <Login />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;