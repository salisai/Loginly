import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ChangePassword = () => {
  const { changePassword, loading } = useAuth();
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      // Error handled in context via toast
    }
  }


  return (
    <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
      {/* Background gradient blob */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-white tracking-tight">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPass ? "text" : "password"}
                name="currentPassword"
                id="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className={`block w-full px-4 py-3 text-sm bg-black/20 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 ${errors.currentPassword ? "border-red-500/50 focus:border-red-500" : "border-white/10"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showCurrentPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.currentPassword && <p className="mt-1 text-xs text-red-400 font-medium ml-1">{errors.currentPassword}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPass ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className={`block w-full px-4 py-3 text-sm bg-black/20 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 ${errors.newPassword ? "border-red-500/50 focus:border-red-500" : "border-white/10"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showNewPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className="mt-1 text-xs text-red-400 font-medium ml-1">{errors.newPassword}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className={`block w-full px-4 py-3 text-sm bg-black/20 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 ${errors.confirmPassword ? "border-red-500/50 focus:border-red-500" : "border-white/10"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1 text-xs text-red-400 font-medium ml-1">{errors.confirmPassword}</p>}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_30px_rgba(22,163,74,0.5)] transform hover:-translate-y-0.5 ${loading ? "opacity-50 cursor-not-allowed transform-none shadow-none" : ""
                }`}
            >
              {loading ? "Changing password..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default ChangePassword