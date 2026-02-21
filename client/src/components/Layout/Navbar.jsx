import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView)
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('nav') === null) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobileMenuOpen]);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-xl transition-all" role="navigation" aria-label="Main">
      <div className="container-wide flex justify-between items-center h-[4.25rem]">
        <Link to="/" className="text-xl font-bold text-white tracking-tight hover:text-[var(--color-primary-hover)] transition-colors">Loginly</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-caption font-medium text-[var(--text-body)] hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-caption font-semibold transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_28px_rgba(34,197,94,0.4)] hover:-translate-y-0.5"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/change-password" className="text-caption font-medium text-[var(--text-body)] hover:text-white transition-colors">Change Password</Link>
              <button
                onClick={logout}
                className="px-5 py-2.5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-strong)] bg-white/[0.04] hover:bg-white/[0.08] text-white text-caption font-medium transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2.5 text-[var(--text-body)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 rounded-lg"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileView && (
        <div
          id="mobile-menu"
          className={`
            md:hidden bg-[var(--color-surface)]/98 border-b border-[var(--color-border)] overflow-hidden
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-64 opacity-100 py-5' : 'max-h-0 opacity-0 py-0'}
          `}
        >
          <div className="container-wide space-y-1 flex flex-col">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center py-3 text-[var(--text-body)] hover:text-white font-medium rounded-lg hover:bg-white/[0.04]"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full py-3 text-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-[0_4px_14px_rgba(34,197,94,0.3)]"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/change-password"
                  className="block w-full text-center py-3 text-[var(--text-body)] hover:text-white font-medium rounded-lg hover:bg-white/[0.04]"
                  onClick={toggleMobileMenu}
                >
                  Change Password
                </Link>
                <button
                  onClick={() => {
                    logout();
                    toggleMobileMenu();
                    navigate('/login');
                  }}
                  className="block w-full py-3 text-center rounded-xl border border-[var(--color-border)] bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium"
                >
                  Logout
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