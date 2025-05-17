// src/pages/Auth.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';

const Auth = () => {
  return (
    <div className="">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Auth;