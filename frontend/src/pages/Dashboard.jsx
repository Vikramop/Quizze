import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import QuizModal from '../components/QuizModal';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleCreateQuiz = (quizData) => {
    // Call your API to create the quiz here
    console.log('Creating quiz:', quizData);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token or authentication data
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');

    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>QUIZZIE</h2>
        <ul>
          <li
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => handleTabClick('dashboard')}
          >
            Dashboard
          </li>
          <li
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => handleTabClick('analytics')}
          >
            Analytics
          </li>
          <li
            className={activeTab === 'createQuiz' ? 'active' : ''}
            onClick={() => {
              handleTabClick('createQuiz');
              setIsModalOpen(true);
            }}
          >
            Create Quiz
          </li>
        </ul>
        <button className="logout" onClick={handleLogout}>
          LOGOUT
        </button>
      </aside>

      {activeTab === 'dashboard' && (
        <main className="content">
          <div className="statistics">
            <div className="stat-item">
              <h3>12</h3>
              <p>Quiz Created</p>
            </div>
            <div className="stat-item">
              <h3>110</h3>
              <p>Questions Created</p>
            </div>
            <div className="stat-item">
              <h3>1.4K</h3>
              <p>Total Impressions</p>
            </div>
          </div>

          <div className="trending-quizzes">
            <h3>Trending Quizzes</h3>
            <div className="quizzes-container">
              {[...Array(8)].map((_, index) => (
                <div className="quiz-card" key={index}>
                  <p>Quiz 1</p>
                  <p className="quiz-info">
                    667 <span className="timer-icon">⏱️</span>
                  </p>
                  <p>Created on: 04 Sep, 2023</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {activeTab === 'analytics' && <p>analytics</p>}
      {activeTab === 'createQuiz' && (
        <QuizModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreateQuiz={handleCreateQuiz}
        />
      )}
    </div>
  );
};

export default Dashboard;
