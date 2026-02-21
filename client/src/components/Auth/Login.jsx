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
    <div className="w-full max-w-md mx-auto bg-white/[0.04] backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 -left-10 w-40 h-40 bg-green-500/15 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <h2 className="text-heading-1 text-center mb-2 text-white">Welcome Back</h2>
        <p className="text-caption text-center mb-8 text-[var(--text-body)]">Please enter your details using the form below</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-caption font-medium text-[var(--text-body)] mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`block w-full px-4 py-3.5 text-body bg-black/20 border rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 ${errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-[var(--color-border)]"}`}
            />
            {errors.email && <p className="mt-1.5 text-caption text-red-400 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-caption font-medium text-[var(--text-body)] mb-2">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`block w-full px-4 py-3.5 pr-12 text-body bg-black/20 border rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 ${errors.password ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-[var(--color-border)]"}`}
              />
              {errors.password && <p className="mt-1.5 text-caption text-red-400 font-medium">{errors.password}</p>}
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-body)] hover:text-white transition-colors p-1"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3.5 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl text-body transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_28px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 ${loading ? "opacity-50 cursor-not-allowed transform-none shadow-none" : ""}`}
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-caption text-[var(--text-body)]">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors">
            Create account
          </Link>
        </p>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[var(--color-surface)] text-[var(--text-muted)] uppercase tracking-widest font-semibold text-caption">Or continue with</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 border border-[var(--color-border)] rounded-xl bg-white/[0.04] text-caption font-medium text-[var(--text-body)] hover:bg-white/[0.08] hover:text-white hover:border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/google`}
            >
              <FcGoogle className="h-5 w-5 mr-2 shrink-0" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center py-3 px-4 border border-[var(--color-border)] rounded-xl bg-white/[0.04] text-caption font-medium text-[var(--text-body)] hover:bg-white/[0.08] hover:text-white hover:border-[var(--color-border-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 transition-all"
              onClick={() => window.location.href = `${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/auth/github`}
            >
              <FaGithub className="h-5 w-5 mr-2 shrink-0" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
