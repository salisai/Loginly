import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

      {/* Dynamic Background */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse duration-[4000ms] opacity-50"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen opacity-50"></div>
      {/* Overlay to ensure smooth fadeout at edges */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none"></div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <span className="text-xs font-semibold tracking-wider text-green-400 uppercase">Secure • Fast • Modern</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70 tracking-tight">
          Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">Loginly</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          A secure, high-performance authentication system built for the modern web.
          Experience seamless access management with industry-standard security.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold text-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:-translate-y-1 overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-lg transition-all backdrop-blur-md shadow-lg hover:shadow-xl hover:border-green-500/30 hover:-translate-y-1"
          >
            Create Account
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;