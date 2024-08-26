// import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/signUp';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/dashboard" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

{
  /* <Route path="/dashboard" element={<Dashboard />} /> */
}
{
  /* <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        /> */
}
