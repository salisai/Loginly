import Navbar from '../components/Layout/Navbar';
import Hero from '../components/Home/Hero';
import Footer from '../components/Layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-background)] text-white">
      <div className="page-backdrop" aria-hidden="true" />
      <div className="page-content flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />

        {/* Features Section */}
        <section className="container-wide section-spacing-lg" aria-labelledby="features-heading">
          <div className="text-center mb-14 md:mb-16 max-w-2xl mx-auto">
            <h2 id="features-heading" className="text-heading-1 text-white mb-4">Why Loginly?</h2>
            <p className="text-body-lg text-[var(--text-body)]">Everything you need for a secure authentication system</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1 */}
            <div className="group bg-white/[0.04] p-7 md:p-8 rounded-2xl border border-[var(--color-border)] hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-green-500/10 transition-all" aria-hidden="true" />
              <h3 className="text-heading-2 text-white mb-3 group-hover:text-[var(--color-primary-hover)] transition-colors">Secure Authentication</h3>
              <p className="text-caption text-[var(--text-body)] leading-relaxed">
                Industry-standard security implemented with end-to-end encryption, ensuring your data remains protected using advanced JWT protocols.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/[0.04] p-7 md:p-8 rounded-2xl border border-[var(--color-border)] hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-green-500/10 transition-all" aria-hidden="true" />
              <h3 className="text-heading-2 text-white mb-3 group-hover:text-[var(--color-primary-hover)] transition-colors">Intuitive Interface</h3>
              <p className="text-caption text-[var(--text-body)] leading-relaxed">
                Designed with a focus on user experience, offering a seamless and intuitive navigation flow that feels natural.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/[0.04] p-7 md:p-8 rounded-2xl border border-[var(--color-border)] hover:border-green-500/30 hover:bg-white/[0.07] transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-[50px] pointer-events-none group-hover:bg-green-500/10 transition-all" aria-hidden="true" />
              <h3 className="text-heading-2 text-white mb-3 group-hover:text-[var(--color-primary-hover)] transition-colors">High Performance</h3>
              <p className="text-caption text-[var(--text-body)] leading-relaxed">
                Optimized for speed and efficiency, ensuring instant responses and a smooth, lag-free experience for all users.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      </div>
    </div>
  );
};

export default HomePage;