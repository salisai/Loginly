import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../assets/menu_icon.png"
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
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/50 backdrop-blur-xl transition-all">
      <div className="container mx-auto flex justify-between items-center h-16 px-4 md:px-6">
        <Link to="/" className="text-2xl font-bold text-white tracking-tighter hover:text-green-400 transition-colors">Loginly</Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-green-400 to-emerald-600 text-white text-sm font-medium transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
              >
                Register
              </Link>
            </>

          ) : (
            <>
              <Link to="/change-password" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Change Password</Link>
              <button
                onClick={logout}
                className="px-5 py-2 rounded-lg border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all"
              >
                Logout
              </button>
            </>
          )}
        </div>



        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
          onClick={toggleMobileMenu}
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
        <div className={`
          md:hidden bg-black/95 border-b border-white/10 overflow-hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-60 opacity-100 py-4' : 'max-h-0 opacity-0 py-0'}
        `}>
          <div className="px-4 space-y-3 flex flex-col items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block w-full text-center py-2 text-gray-300 hover:text-white font-medium"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full py-2 text-center rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium shadow-[0_4px_14px_0_rgba(34,197,94,0.39)]"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>

            ) : (
              <>
                <Link
                  to="/change-password"
                  className="block w-full text-center py-2 text-gray-300 hover:text-white font-medium"
                  onClick={toggleMobileMenu}
                >
                  Change Password
                </Link>

                {/* logout button */}
                <button
                  onClick={() => {
                    logout(); // call the logout function from your context
                    toggleMobileMenu(); // close the menu if needed
                    navigate('/login')
                  }}
                  className="block w-full py-2 text-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium"
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