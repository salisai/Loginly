import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const { login, loading } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    // Clear error when user starts typing
    if(errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!validateForm()) {
      return;
    }
    
    try {
      await login(formData);
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white px-10 py-8 rounded-lg shadow-sm border border-gray-100 mt-12 mb-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`block w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-xl"
            >
              {showPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 bg-[#101828] rounded-md text-sm font-medium text-white transition-opacity ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1a2332]"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-sm text-black hover:underline">
            Register here
          </Link>
        </p>
      </div>

      {/* Socials */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-2 bg-white text-gray-500">Or login with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center py-2 px-3 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/google`}
         >
            <FcGoogle className="h-4 w-4" />
            <span className="ml-2">Google</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-center py-2 px-3 border border-gray-300 rounded-md bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
            onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/github`}
          >
            <FaGithub className="h-4 w-4" />
            <span className="ml-2">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
