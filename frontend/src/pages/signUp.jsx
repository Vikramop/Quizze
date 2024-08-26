import React, { useState } from 'react';
import './SignUp.css';
import { register, login } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('signup');

  const switchToLoginTab = () => {
    setActiveTab('login');
  };
  const navigate = useNavigate();
  // Sign Up States
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const [errorMessage, setErrorMessage] = useState('');
  const [signUpErrors, setSignUpErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Log In States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [loginErrors, setLoginErrors] = useState({
    email: false,
    password: false,
  });

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: userData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(userData.email),
      password: userData.password.length < 6,
      confirmPassword: userData.password !== userData.confirmPassword,
    };

    setSignUpErrors(newErrors);

    // If there are no errors
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const { name, email, password, confirmPassword } = userData;

        const response = await register({
          name,
          email,
          password,
          confirmPassword,
        });

        console.log(response.data);

        // Clear form fields after successful registration
        setUserData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });

        toast.success('Registration successful! Please log in.');

        switchToLoginTab();

        setErrorMessage(''); // Clear any existing error message
      } catch (error) {
        // Use the error response message
        const errorMsg = error.response
          ? error.response.data.message
          : error.message;

        if (errorMsg === 'User already exists') {
          setErrorMessage('User already registered. Please login.');
        } else {
          setErrorMessage('An error occurred. Please try again.');
        }
        console.error('Error:', errorMsg);
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !/^\S+@\S+\.\S+$/.test(loginEmail),
      password: loginPassword.length < 4,
    };

    setLoginErrors(newErrors);

    // If there are no errors
    if (Object.values(newErrors).every((error) => !error)) {
      try {
        const response = await login({
          email: loginEmail,
          password: loginPassword,
        });

        console.log(response.data);

        // Handle successful login
        toast.success('Login successful!');

        navigate('/dashboard');
      } catch (error) {
        const errorMsg = error.response
          ? error.response.data.message
          : error.message;

        // Show appropriate toast message based on error
        if (errorMsg.includes('User not registered')) {
          toast.error('User not registered. Please register first.');
        } else if (errorMsg.includes('Incorrect email or password')) {
          toast.error('Incorrect email or password. Please try again.');
        } else {
          toast.error('An error occurred. Please try again.');
        }

        console.error('Error:', errorMsg);
      }
    }
  };

  return (
    <div className="signup-container">
      <div>
        <div className="signup-box">
          <h1 className="title">QUIZZIE</h1>
          <div className="tabs">
            <button
              className={`tab ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
            <button
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
          </div>

          {activeTab === 'signup' && (
            <form onSubmit={handleSignUpSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    className={signUpErrors.name ? 'error-input' : ''}
                  />
                  {signUpErrors.name && (
                    <p className="error-message">Invalid name</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    className={signUpErrors.email ? 'error-input' : ''}
                  />
                  {signUpErrors.email && (
                    <p className="error-message">Invalid Email</p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    className={signUpErrors.password ? 'error-input' : ''}
                  />
                  {signUpErrors.password && (
                    <p className="error-message">Weak password</p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div>
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    className={
                      signUpErrors.confirmPassword ? 'error-input' : ''
                    }
                  />
                  {signUpErrors.confirmPassword && (
                    <p className="error-message">Password doesn’t match</p>
                  )}
                </div>
              </div>
              <div className="btn">
                <button type="submit" className="signup-button">
                  Sign-Up
                </button>
              </div>
            </form>
          )}

          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <div>
                  <input
                    type="email"
                    id="login-email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={loginErrors.email ? 'error-input' : ''}
                  />
                  {loginErrors.email && (
                    <p className="error-message">Invalid Email</p>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="login-password">Password</label>
                <div>
                  <input
                    type="password"
                    id="login-password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={loginErrors.password ? 'error-input' : ''}
                  />
                  {loginErrors.password && (
                    <p className="error-message">Invalid password</p>
                  )}
                </div>
              </div>
              <div className="btn">
                <button type="submit" className="signup-button">
                  Log In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
