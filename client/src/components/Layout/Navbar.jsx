import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../assets/menu_icon.png"

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

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

  return (
    
    <nav className="p-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AuthApp</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-200 font-semibold transition">Login</Link>
          <Link to="/register" className="hover:text-blue-200 font-semibold transition">Register</Link>
        </div>
      </div>

      {/* {isMobileView && (
        {isMobileMenuOpen} && (

        )
      )} */}

      {/* mobile menu */}
      <div className='' onClick={toggleMobileMenu}>
        <img 
        src="" 
        alt=""
        className='' 
        />
      </div>
    </nav>

  );
};

export default Navbar;