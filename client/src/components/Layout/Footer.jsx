const Footer = () => {
  return (
    <footer className="relative mt-auto py-12 border-t border-white/5 bg-[#050505]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2 order-2 md:order-1">
            <div className="flex items-center gap-2 opacity-50 mb-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">System Operational</span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              © {new Date().getFullYear()} Loginly Enterprise. Built with integrity.
            </p>
          </div>

          <nav className="flex items-center gap-10 order-1 md:order-2" aria-label="Footer Navigation">
            {['Terms', 'Privacy', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-xs font-bold text-slate-400 hover:text-emerald-400 transition-colors tracking-widest uppercase"
              >
                {item}
              </a>
            ))}
          </nav>

        </div>
      </div>
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
    </footer>
  );
};

export default Footer;