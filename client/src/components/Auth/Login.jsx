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
    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
    } catch (error) {
      // Error handled in context
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute top-0 -left-10 w-40 h-40 bg-green-500/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2 text-white tracking-tight">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Please enter your details using the form below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`block w-full px-4 py-3 text-sm bg-black/20 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 ${errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"
                }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400 font-medium ml-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`block w-full px-4 py-3 text-sm bg-black/20 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 ${errors.password ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-white/10"
                  }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-400 font-medium ml-1">{errors.password}</p>}

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transform hover:-translate-y-0.5 ${loading ? "opacity-50 cursor-not-allowed transform-none shadow-none" : ""
                }`}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-green-400 hover:text-green-300 transition-colors">
              Create account
            </Link>
          </p>
        </div>

        {/* Socials */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-black text-gray-500 uppercase tracking-widest font-semibold text-[10px]">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2.5 px-4 border border-white/10 rounded-xl bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500/50 transition-all duration-200"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/google`}
            >
              <FcGoogle className="h-5 w-5 mr-2" />
              <span>Google</span>
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center py-2.5 px-4 border border-white/10 rounded-xl bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-green-500/50 transition-all duration-200"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/github`}
            >
              <FaGithub className="h-5 w-5 mr-2" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
