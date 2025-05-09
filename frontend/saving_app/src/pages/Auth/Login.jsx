import React, { useState, useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import {UserContext} from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();

    // Handle Login form submit
    const handleLogin = async (e) => {
      e.preventDefault();
    
      // 1️⃣ Input validation
      if (!validateEmail(email)) {
        setError('Invalid email address');
        return;
      }
      if (!password) {
        setError('Password is required');
        return;
      }
      setError('');
    
      try {
        // 2️⃣ Send credentials
        console.log('🔄 Attempting login with', { email, password: '••••••' });
        const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
    
        // 3️⃣ Inspect the raw response
        console.log('🔑 LOGIN RESPONSE:', response.data);
    
        const { token, user } = response.data;
        console.log('→ Extracted token:', token);
        console.log('→ Extracted user:', user);
    
        if (token) {
          // 4️⃣ Persist and verify
          localStorage.setItem('authToken', token);
          console.log('✔️ Stored authToken in localStorage:', localStorage.getItem('authToken'));
    
          // 5️⃣ Attach to axios defaults
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          console.log('✔️ axios default Authorization header:', axiosInstance.defaults.headers.common['Authorization']);
    
          // 6️⃣ Update React context
          updateUser(user);
          console.log('✔️ React UserContext updated:', user);
    
          // 7️⃣ Navigate
          navigate('/dashboard');
          console.log('➡️ Navigating to /dashboard');
        } else {
          console.warn('❗️ Login succeeded but no token was returned.');
          setError('Something went wrong. Please try again.');
        }
      } catch (err) {
        console.error('🚨 Login error:', err.response?.status, err.response?.data || err.message);
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to log in
                </p>

                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="Enter your email address"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                    />

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary">
                        LOGIN
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account?{" "}
                        <Link className="font-medium text-primary underline" to="/signup">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
