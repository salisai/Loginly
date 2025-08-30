import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


const ChangePassword = () => {
    const {ChangePassword} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        currentPassword : '',
        newPassword: '',
        confirmPassword: ''
    })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev, 
            [e.target.name] : e.target.value 
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.newPassword !== formData.confirmPassword){
            setError("New passwords do match match");
            return;
        }

        try {
            await ChangePassword(formData);
            setSuccess("Password changed successfully!")
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            //navigate somewhere
        } catch (error) {
            setError(error.message || "Something went wrong.")
        }
    }




  return (
    <div className="max-w-2xl mx-auto bg-white px-10 py-8 rounded-lg shadow-sm border border-gray-100 mt-12 mb-12">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-900">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            required
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 bg-[#101828] rounded-md text-sm font-medium text-white"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};


export default ChangePassword