import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
    <nav className="p-4 shadow-md bg-transparent">
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