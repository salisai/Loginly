import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Home/Hero';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Secure Authentication</h3>
              <p className="text-gray-600">Industry-standard security practices to keep your data safe.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Easy to Use</h3>
              <p className="text-gray-600">Simple and intuitive interface for all users.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-blue-700">Fast Performance</h3>
              <p className="text-gray-600">Optimized for quick loading and smooth experience.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;