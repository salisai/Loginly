import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChangePasswordPage from './pages/ChangePassword';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ArticlePage from './pages/ArticlePage';
import {Toaster} from "react-hot-toast"

function App() {
  return (
     <>

       <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* home, login and regiester pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path='/change-password'
          element = {
            <ProtectedRoute>
              <ChangePasswordPage/>
            </ProtectedRoute>
          }
        />
       
        <Route path='/article'
        element ={
          <ProtectedRoute>
            <ArticlePage/>
          </ProtectedRoute>
        }
        />

      </Routes>
     </>
  );
}

export default App;