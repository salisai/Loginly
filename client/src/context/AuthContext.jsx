import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//create context 
const AuthContext = createContext();
//used to wrap your app and pass data down component tree without prop drilling. 

//create povider 
export const AuthProvider =({children}) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);

    //signup 
    const signup = async (formData) => {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/signup", formData, {
                withCredentials: true
            });
    
            setUser(response.data.user);
            setIsAuthenticated(true);
            navigate("/");
        } catch (error) {
            console.log("Signup failed: ", error.response?.data || error.message);
        
        }finally{
            setLoading(false);
        }
    }


    //login
    const login = async (formData) => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/api/auth/login", formData, {
                withCredentials: true
            });

            setUser(response.data.user);
            setIsAuthenticated(true);
            navigate("/");

        } catch (error) {
            console.log("Login failed: ", error.response?.data || error.message);
        }finally {
            setLoading(false);
        }
    };


    //changepassword 
    const changePassword = async({currentPassword, newPassword}) => {
        try {
            setLoading(true)
            const response = await axios.post("http://localhost:8000/api/auth/change-password", 
                {currentPassword, newPassword}, 
                {withCredentials: true}
            );
        } catch (error) {
            console.log("Password change failed", error.response?.data || error.message)
        } finally {
            setLoading(false);
        }
    }



    //logout 
    const logout = async () => {
        try{
            await axios.post("http://localhost:8000/api/auth/logout", {}, {
                withCredentials: true
            });

            setUser(null);
            setIsAuthenticated(false);
            navigate("/login")
        }catch(error){
            console.log("Logout failed: ", error.response?.data || error.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user, 
                isAuthenticated,
                loading,
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