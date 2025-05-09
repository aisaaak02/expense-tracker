// src/App.jsx

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import UserProvider from './context/UserContext';
import Login   from './pages/Auth/Login';
import SignUp  from './pages/Auth/SignUp';
import Home    from './pages/Dashboard/Home';
import Income  from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import { Toaster } from 'react-hot-toast';
/**
 * Redirects to /dashboard if a token exists in localStorage,
 * otherwise to /login. Uses `replace` to avoid polluting history.
 */
function Root() {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : <Navigate to="/login"    replace />;
}

const App = () => {
  return (
    
    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path="/"        element={<Root />}      />
          <Route path="/login"   element={<Login />}     />
          <Route path="/signup"  element={<SignUp />}    />
          <Route path="/dashboard" element={<Home />}    />
          <Route path="/income"    element={<Income />}  />
          <Route path="/expense"   element={<Expense />} />
        </Routes>
      </Router>
      </div>

      <Toaster 
        toastOptions={
          {
            className: "",
            style: {
              fontSize: "14px",

            },
          }
        }
      />

    </UserProvider>
  );
};

export default App;
