import { Navigate, replace } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({children}) => {
    const {isAuthenticated, loading} = useAuth();

    if(loading){
        return <p className="text-center mt-10">Loading ...</p>
    }

    if (!isAuthenticated){
        return <Navigate to="/login" replace/>;
    }

    return children;
}

export default ProtectedRoute;