import "./App.css"
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { doSignOut } from "./db"

import TodoApp from "./components/TodoApp";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";


const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};


function App() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.error("Faild to log out:", error);
    }
  };

  return (
    <div className="App">
      {currentUser && (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f0f0f0' }}>
          <span>Welcome, {currentUser.email}!</span>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}

      <Routes>
        <Route 
          path="/"
          element={
            <PrivateRoute>
              <TodoApp />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}


const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;