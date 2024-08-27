// import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/signUp';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/PrivateRoute';

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SignUp />} />
        {/* <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/dashboard" />
          }
        /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<SignUp />} />
        </Route>
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
