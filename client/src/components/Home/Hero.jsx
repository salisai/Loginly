import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const Hero = () => {
  const {isAuthenticated} = useAuth();

  return (
    <section
      className="min-h-[85vh] bg-cover bg-center bg-no-repeat flex items-center justify-center py-12 relative">

      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Welcome to <span className="block mt-2">AuthApp</span>
        </h1>
        <p className="text-[16px] md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
          A secure authentication system built with the MERN stack.
          Manage your account and enjoy our services.
        </p>

        {isAuthenticated ? (
          <Link
            to="/article"
            className="inline-block px-18 py-3 border-1 border-black rounded-md font-medium bg-[#101828] text-white"
          >
            Read Article
          </Link>
        ) : (
          <Link
            to="/login"
            className="inline-block px-18 py-3 border-1 border-black rounded-md font-medium bg-[#101828] text-white"
          >
            Join
          </Link>
        )}
        
      </div>
    </section>

  );
};

export default Hero;