import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20" aria-labelledby="hero-heading">
      {/* Advanced Mesh Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">
            v2.0 Interface Ready
          </span>
        </div>

        <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
          Welcome to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-blue-500 drop-shadow-sm">
            Loginly
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
          The next generation of <span className="text-slate-200">identity management</span>. 
          Built with precision, secured with industry-standard protocols, and designed for 
          unparalleled developer experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            to="/login"
            className="group relative w-full sm:w-auto px-10 py-4 rounded-2xl bg-white text-black font-bold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Get Started
          </Link>
          
          <Link
            to="/register"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-bold transition-all hover:border-emerald-500/50"
          >
            Create Account
          </Link>
        </div>

        {/* Floating Stats/Trust Elements */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            <div className="text-sm font-medium tracking-widest uppercase">AES-256 Encryption</div>
            <div className="text-sm font-medium tracking-widest uppercase">JWT Stateless</div>
            <div className="text-sm font-medium tracking-widest uppercase">Secure Storage</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;