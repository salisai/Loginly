import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Axios instance with interceptors
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Request interceptor to add tokens
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried refreshing yet
        // Skip refresh attempt for login/signup endpoints to avoid infinite loops
        const isAuthEndpoint = originalRequest.url?.includes('/login') || 
                              originalRequest.url?.includes('/signup') ||
                              originalRequest.url?.includes('/refresh-token');

        if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const refreshResponse = await axios.post(`${API_URL}/api/auth/refresh-token`, {}, {
                    withCredentials: true
                });

                // If refresh successful, retry the original request
                if (refreshResponse.status === 200) {
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed - clear auth state
                // Don't reject here, let the original error propagate
                console.log("Token refresh failed");
            }
        }

        return Promise.reject(error);
    }
);

//create provider 
export const AuthProvider =({children}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    //signup 
    const signup = async (formData) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/signup", formData);
    
            if(response.data.success) {
                setUser(response.data.data);
                setIsAuthenticated(true);
                toast.success(response.data.message || "Account created successfully!");
                navigate("/");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }


    //login
    const login = async (formData) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/login", formData);

            if(response.data.success) {
                setUser(response.data.data.user);
                setIsAuthenticated(true);
                toast.success(response.data.message || "Logged in successfully!");
                navigate("/");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    //changepassword 
    const changePassword = async({currentPassword, newPassword}) => {
        try {
            setLoading(true);
            const response = await api.post("/api/auth/change-password", 
                {oldPassword: currentPassword, newPassword}
            );
            
            if(response.data.success) {
                toast.success(response.data.message || "Password changed successfully!");
                return true;
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to change password. Please try again.";
            toast.error(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    //logout 
    const logout = async () => {
        try{
            await api.post("/api/auth/logout");
            setUser(null);
            setIsAuthenticated(false);
            toast.success("Logged out successfully!");
            navigate("/login");
        }catch(error){
            // Even if logout fails, clear local state
            setUser(null);
            setIsAuthenticated(false);
            const errorMessage = error.response?.data?.message || "Logout failed";
            toast.error(errorMessage);
        }
    };

    // Check authentication status
    useEffect(() => {
        const checkAuth = async () => {
            try {
                setCheckingAuth(true);
                const response = await api.get("/api/auth/me");
                if(response.data && response.data.user) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (error) {
                // If 401, token refresh will be attempted by interceptor
                // If refresh fails or other error, clear auth state
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setCheckingAuth(false);
                setLoading(false);
            }
        };

        checkAuth();
    },[]);

    // Handle OAuth callback
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if(urlParams.get("oauth") === "success") {
            toast.success("OAuth login successful!");
            // Check auth status after OAuth
            setTimeout(() => {
                window.location.href = "/";
            }, 1000);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user, 
                isAuthenticated,
                loading,
                checkingAuth,
                signup,
                login,
                logout,
                changePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


//custom hook to use auth
export const useAuth = () => useContext(AuthContext);
