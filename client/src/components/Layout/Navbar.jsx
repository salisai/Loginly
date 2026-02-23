import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkMobileView = () => setIsMobileView(window.innerWidth <= 768);
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.closest('nav') === null) setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  return (
    // Background updated to match Hero (Transparent -> Glass)
    <nav className="sticky top-0 z-[100] w-full transition-all duration-500 bg-transparent" role="navigation">
      {/* Glossy Backdrop Filter Layer */}
      <div className="absolute inset-0 bg-[#050505]/40 backdrop-blur-md border-b border-white/5" />
      
      <div className="relative max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Brand Logo */}
        <Link to="/" className="group flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
             <span className="text-black font-black text-sm">L</span>
          </div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-emerald-400 transition-colors">
            Loginly<span className="text-emerald-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-xs font-black text-slate-400 hover:text-white transition-colors tracking-[0.2em] uppercase">
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] active:scale-95"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/change-password" title="Security Settings" className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-emerald-400 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
              </Link>
              <button
                onClick={logout}
                className="px-5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Improved Animated Hamburger */}
        <button
          className="md:hidden relative h-10 w-10 flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white overflow-hidden group"
          onClick={toggleMobileMenu}
        >
          <div className="flex flex-col gap-1 w-5">
            <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-0.5 w-full bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Drawer - Styled as a floating panel */}
      {isMobileView && (
        <div
          className={`
            absolute top-[calc(100%+10px)] left-6 right-6 bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden
            transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
            ${isMobileMenuOpen ? 'opacity-100 translate-y-0 shadow-2xl shadow-emerald-500/10' : 'opacity-0 -translate-y-4 pointer-events-none'}
          `}
        >
          <div className="p-4 space-y-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="block text-center py-4 text-slate-400 font-bold hover:text-white transition-colors" onClick={toggleMobileMenu}>
                  Login to Account
                </Link>
                <Link to="/register" className="block text-center py-4 bg-emerald-500 text-black font-black rounded-2xl" onClick={toggleMobileMenu}>
                  Get Started Free
                </Link>
              </>
            ) : (
              <>
                <Link to="/change-password" className="block text-center py-4 text-slate-300 font-bold border border-white/5 rounded-2xl" onClick={toggleMobileMenu}>
                  Security Settings
                </Link>
                <button
                  onClick={() => { logout(); toggleMobileMenu(); navigate('/login'); }}
                  className="w-full py-4 text-red-400 font-bold bg-red-500/5 rounded-2xl"
                >
                  Logout Session
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;