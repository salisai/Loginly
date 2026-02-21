import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden section-spacing-lg" aria-labelledby="hero-heading">
      {/* Ambient background */}
      <div className="absolute top-0 left-1/4 w-[480px] h-[480px] bg-green-500/15 rounded-full blur-[140px] pointer-events-none mix-blend-screen opacity-60" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-[var(--color-background)]/30 backdrop-blur-[1px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-20 container-wide max-w-4xl text-center">
        <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full border border-[var(--color-border)] bg-white/[0.04] backdrop-blur-sm">
          <span className="text-caption font-semibold tracking-widest text-[var(--color-primary)] uppercase">Secure • Fast • Modern</span>
        </div>

        <h1 id="hero-heading" className="text-display-lg mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500">Loginly</span>
        </h1>

        <p className="text-body-lg text-[var(--text-body)] max-w-xl mx-auto mb-10">
          A secure, high-performance authentication system built for the modern web.
          Experience seamless access management with industry-standard security.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-body transition-all shadow-[0_0_24px_rgba(34,197,94,0.3)] hover:shadow-[0_0_36px_rgba(34,197,94,0.45)] hover:-translate-y-0.5 overflow-hidden text-center"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[var(--color-border-strong)] bg-white/[0.04] hover:bg-white/[0.08] text-white font-semibold text-body transition-all hover:border-green-500/30 hover:-translate-y-0.5 text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;