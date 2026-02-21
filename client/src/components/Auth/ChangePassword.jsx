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
    <div className="w-full max-w-md mx-auto bg-white/[0.04] backdrop-blur-xl border border-[var(--color-border)] rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-500/10 rounded-full blur-[80px] pointer-events-none" aria-hidden="true" />

      <div className="relative z-10">
        <h2 className="text-heading-1 text-center mb-8 text-white">Change Password</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="currentPassword" className="block text-caption font-medium text-[var(--text-body)] mb-2">
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
                className={`block w-full px-4 py-3.5 pr-12 text-body bg-black/20 border rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 ${errors.currentPassword ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-[var(--color-border)]"}`}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPass(!showCurrentPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-body)] hover:text-white transition-colors p-1"
                aria-label={showCurrentPass ? "Hide password" : "Show password"}
              >
                {showCurrentPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.currentPassword && <p className="mt-1.5 text-caption text-red-400 font-medium">{errors.currentPassword}</p>}
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-caption font-medium text-[var(--text-body)] mb-2">
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
                className={`block w-full px-4 py-3.5 pr-12 text-body bg-black/20 border rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 ${errors.newPassword ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-[var(--color-border)]"}`}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-body)] hover:text-white transition-colors p-1"
                aria-label={showNewPass ? "Hide password" : "Show password"}
              >
                {showNewPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.newPassword && <p className="mt-1.5 text-caption text-red-400 font-medium">{errors.newPassword}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-caption font-medium text-[var(--text-body)] mb-2">
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
                className={`block w-full px-4 py-3.5 pr-12 text-body bg-black/20 border rounded-xl text-white placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50 focus:border-[var(--color-primary)] transition-all duration-200 ${errors.confirmPassword ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20" : "border-[var(--color-border)]"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-body)] hover:text-white transition-colors p-1"
                aria-label={showConfirmPass ? "Hide password" : "Show password"}
              >
                {showConfirmPass ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="mt-1.5 text-caption text-red-400 font-medium">{errors.confirmPassword}</p>}
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3.5 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl text-body transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_28px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 ${loading ? "opacity-50 cursor-not-allowed transform-none shadow-none" : ""}`}
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