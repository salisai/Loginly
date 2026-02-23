import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Home/Hero';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Subtle Grainy Overlay for texture */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-50"></div>
      
      <Navbar />
      
      <main className="relative">
        <Hero />

        {/* Features Section */}
        <section className="py-24 px-6 relative z-10" aria-labelledby="features-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-xl">
                <h2 id="features-heading" className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Security by <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">Design</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  We handle the complexities of authentication so you can focus on building your core product.
                </p>
              </div>
              <div className="hidden md:block pb-2 text-emerald-500 font-mono text-sm tracking-tighter">
                // Feature set v1.0.4
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Feature Cards with hover lift and glass effect */}
              <FeatureCard 
                title="Secure Authentication"
                desc="Industry-standard security implemented with end-to-end encryption, ensuring your data remains protected using advanced JWT protocols."
              />
              <FeatureCard 
                title="Intuitive Interface"
                desc="Designed with a focus on user experience, offering a seamless and intuitive navigation flow that feels natural."
              />
              <FeatureCard 
                title="High Performance"
                desc="Optimized for speed and efficiency, ensuring instant responses and a smooth, lag-free experience for all users."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

// Internal Helper for cleaner code
const FeatureCard = ({ title, desc }) => (
  <div className="group relative p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:from-white/[0.06] transition-all duration-500">
    <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
      <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
    </div>
    <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-sm">
      {desc}
    </p>
    {/* Subtle hover border glow */}
    <div className="absolute inset-0 rounded-3xl border border-emerald-500/0 group-hover:border-emerald-500/20 transition-colors duration-500" />
  </div>
);

export default HomePage;