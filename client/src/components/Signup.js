import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, phone, password });
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-background text-text flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-6 text-primary text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-text rounded"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-text rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 text-text rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-primary text-white rounded hover:bg-red-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
