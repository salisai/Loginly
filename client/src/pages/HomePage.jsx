import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Home/Hero';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <Navbar />
      <main className="flex-grow relative z-10">
        <Hero />

        {/* Features Section */}
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">Why Loginly?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need for a secure authentication system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-green-500/10 transition-all"></div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">Secure Authentication</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Industry-standard security implemented with end-to-end encryption, ensuring your data remains protected using advanced JWT protocols.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-green-500/10 transition-all"></div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">Intuitive Interface</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Designed with a focus on user experience, offering a seamless and intuitive navigation flow that feels natural.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-green-500/10 transition-all"></div>
              <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-300 transition-colors">High Performance</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Optimized for speed and efficiency, ensuring instant responses and a smooth, lag-free experience for all users.
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