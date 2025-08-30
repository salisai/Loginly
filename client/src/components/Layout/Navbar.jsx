import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../assets/menu_icon.png"
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  const {user, logout, loading} = useAuth();
  const navigate = useNavigate()

  useEffect(()=>{
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView)
  },[]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(event.target.closest('nav') ===  null){
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (isMobileMenuOpen){
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


  if (loading) {
    return (
      <nav className="p-4 bg-white shadow">
        <div className="container mx-auto text-center text-gray-600">
          Checking session...
        </div>
      </nav>
    );
  }

  

  return (
    <nav className="p-4 bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-black">Loginly</Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          {!user && (
            <>
              <Link 
                to="/login" 
                className="px-6 py-2 border border-black rounded-md font-medium text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Login
              </Link>

              <Link 
                to="/register" 
                className="px-6 py-2 border border-black rounded-md font-medium text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <>
              <Link
                  to="/blog"
                  className="px-6 py-2 border border-black rounded-md font-medium text-black hover:bg-black hover:text-white transition-colors duration-200"
                >
                Blog
              </Link>

              <Link
                to="/change-password"
                className="px-6 py-2 border border-black rounded-md font-medium text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Change Password
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-6 py-2 border border-black rounded-md font-medium text-black hover:bg-black hover:text-white transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>



        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 focus:outline-none cursor-pointer"
          onClick={toggleMobileMenu}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-black" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileView && (
        <div className={`
        fixed top-16 left-4 right-4 z-50
        md:hidden bg- rounded-lg 
        transition-all transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'max-h-96 opacity-100 scale-100 py-4' : 'max-h-0 opacity-0 scale-95 pointer-events-none'}
      `}>
          <div className="px-4 space-y-3">
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="block px-4 py-2 text-center rounded-md font-medium text-black hover:bg-[#101828] hover:text-white transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block px-4 py-2 text-center rounded-md font-medium text-black hover:bg-[#101828] hover:text-white transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
              {/* blog endpooint */}
               <Link 
                  to="/blog" 
                  className="block px-4 py-2 text-center rounded-md font-medium text-black hover:bg-[#101828] hover:text-white transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  Blog
                </Link>

                <Link 
                  to="/change-password" 
                  className="block px-4 py-2 text-center rounded-md font-medium text-black hover:bg-[#101828] hover:text-white transition-colors duration-200"
                  onClick={toggleMobileMenu}
                >
                  Change password
                </Link>

                {/* logout button */}
                <button
                  onClick={() => {
                    logout(); // call the logout function from your context
                    toggleMobileMenu(); // close the menu if needed
                    navigate('/login')
                  }}
                  className="block w-full px-4 py-2 text-center rounded-md font-medium text-black hover:bg-[#101828] hover:text-white transition-colors duration-200"
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