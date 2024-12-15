import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/signup");
  };

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Welcome, {name || "User"}!
        </h1>
        <button
          onClick={handleLogout}
          className="p-2 bg-primary text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
