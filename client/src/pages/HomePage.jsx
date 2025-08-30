import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Home/Hero';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
       
        {/* Features Section */}
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 ">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-xs border border-gray-100 hover:shadow-sm transition-all duration-300 hover:border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Secure Authentication</h3>
              <p className="text-gray-600 leading-relaxed">
                Industry-standard security with end-to-end encryption, using JWT
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-xs border border-gray-100 hover:shadow-sm transition-all duration-300 hover:border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Easy to Use</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive interface for seamless navigation.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-xs border border-gray-100 hover:shadow-sm transition-all duration-300 hover:border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Fast Performance</h3>
              <p className="text-gray-600 leading-relaxed">
                Optimized for instant responses.
              </p>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;