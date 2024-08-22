import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [activeTab, setActiveTab] = useState('signup');

  // Sign Up States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      name: name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(email),
      password: password.length < 6,
      confirmPassword: password !== confirmPassword,
    };

    setSignUpErrors(newErrors);

    // const isValid = !Object.values(newErrors).some((error) => error);
    // if (isValid) {
    //   // Submit form logic here
    //   console.log('Sign Up form submitted successfully!');
    // }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: !/^\S+@\S+\.\S+$/.test(loginEmail),
      password: loginPassword.length < 6,
    };

    setLoginErrors(newErrors);

    // const isValid = !Object.values(newErrors).some((error) => error);
    // if (isValid) {
    //   // Submit form logic here
    //   console.log('Log In form submitted successfully!');
    // }
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
