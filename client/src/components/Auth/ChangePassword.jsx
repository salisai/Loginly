import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const ChangePassword = () => {
    const { changePassword, loading } = useAuth();
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [formData, setFormData] = useState({
        currentPassword : '',
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
            [e.target.name] : e.target.value 
        }));
        // Clear error when user starts typing
        if(errors[e.target.name]) {
            setErrors(prev => ({
                ...prev,
                [e.target.name]: ""
            }));
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(!validateForm()) {
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
    <div className="max-w-2xl mx-auto bg-white px-10 py-8 rounded-lg shadow-sm border border-gray-100 mt-12 mb-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <div className="relative">
            <input
              type={showCurrentPass ? "text" : "password"}
              name="currentPassword"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${
                errors.currentPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPass(!showCurrentPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-xl"
            >
              {showCurrentPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          {errors.currentPassword && <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>}
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              name="newPassword"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-xl"
            >
              {showNewPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          {errors.newPassword && <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 text-xl"
            >
              {showConfirmPass ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 bg-[#101828] rounded-md text-sm font-medium text-white transition-opacity ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1a2332]"
          }`}
        >
          {loading ? "Changing password..." : "Change Password"}
        </button>
      </form>
    </div>
  );
};


export default ChangePassword