import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChangePasswordPage from './pages/ChangePassword';
import ProtectedRoute from "./components/Auth/ProtectedRoute"
import Articles from './pages/ArticlePage';

function App() {
  return (
      <Routes>
        {/* home, login and regiester pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/change-password" element={<ChangePasswordPage/>} />
        
        <Route path='/articles' element={
          <ProtectedRoute>
            <Articles/>
          </ProtectedRoute>
        }/>
        
      </Routes>
  );
}

export default App;