import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";

const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated() ? <Home /> : <Navigate to="/signup" />}
        />
        <Route path="*" element={<Navigate to="/signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
