import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
  
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
  
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("schoolData", JSON.stringify(response.data.school));
  
      setSuccess("Login successful!");
      setError("");
      navigate("/dashboard");

    } catch (error) {
      setError(error.response?.data?.message || "Error during login");
      setSuccess("");
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="main">
      <div className="container mt-5">
        <h2 className="text-center mb-4">School Login</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p style={{color:"#00ff99" , textAlign:"right"}}>
            Don’t have an account?{" "}
            <a href="/" style={{ textDecoration: "none", color: "#00ff99" }}>
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;