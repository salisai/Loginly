import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    
    <nav className="p-4 bg-transparent">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">AuthApp</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:text-blue-200 font-semibold transition">Login</Link>
          <Link to="/register" className="hover:text-blue-200 font-semibold transition">Register</Link>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;