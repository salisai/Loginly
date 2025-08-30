import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

//create povider 
export const AuthProvider =({children}) => {
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000/api"

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    //fetch current user
    const fetchCurrentUser = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_BASE}/auth/me`, {withCredentials: true});
            
            if(response.data.user){
                setUser(response.data.user);
                setIsAuthenticated(true);
            }else{
                setUser(null);
                setIsAuthenticated(false);
            }

        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    }

    //signup 
    const signup = async (formData) => {
        setLoading(true);
        try {
        await axios.post(`${API_BASE}/auth/signup`, formData, { withCredentials: true });
        
        await fetchCurrentUser();
        toast.success("Account created successfully!");
        navigate("/article");
        
        } catch (err) {
            toast.error(err.response?.data?.message || "Signup failed");
        
        } finally {
            setLoading(false);
        }
    };


    //login
    const login = async (formData) => {
        setLoading(true);
        try {
            await axios.post(`${API_BASE}/auth/login`, formData, { withCredentials: true });
            await fetchCurrentUser();
            
            toast.success("Login successful!");
            navigate("/article");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };


    //oauth
    const oauthLogin = (provider) => {
        //provider like github, google, etc
        window.location.href = `${API_BASE}/auth/${provider}`
    }


    //changepassword 
    const changePassword = async({currentPassword, newPassword}) => {
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE}/auth/change-password`, 
                {currentPassword, newPassword}, 
                {withCredentials: true}
            );
            toast.success("Password changed successfully")
        } catch (error) {
            toast.error("Error while changing password")
        } finally {
            setLoading(false);
        }
    }



    //logout 
    const logout = async () => {
        try{
            await axios.post(`${API_BASE}/auth/logout`, {}, {
                withCredentials: true
            });

            setUser(null);
            setIsAuthenticated(false);
            navigate("/login")
        }catch(error){
            console.log("Logout failed: ", error.response?.data || error.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user, 
                isAuthenticated,
                loading,
                signup,
                login,
                oauthLogin,
                logout,
                changePassword,
                fetchCurrentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}


//custom hook to use auth
export const useAuth = () => useContext(AuthContext);