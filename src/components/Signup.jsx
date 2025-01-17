import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    subscriptionPlan: "", // New field for subscription plan
  });
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSchoolLogo(e.target.files[0]);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "School name is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Invalid email.";
    if (formData.password.length < 6) errors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match.";
    if (!/^\d{10}$/.test(formData.phone)) errors.phone = "Phone must be 10 digits.";
    if (!formData.address.trim()) errors.address = "Address is required.";
    if (!schoolLogo) errors.schoolLogo = "Please upload a school logo.";
    if (!formData.subscriptionPlan) errors.subscriptionPlan = "Please select a subscription plan.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setError({});
    setSuccess("");
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      formDataToSend.append("schoolLogo", schoolLogo);

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccess(response.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        subscriptionPlan: "", // Reset subscription plan
      });
      setSchoolLogo(null);
      navigate("/login");
    } catch (error) {
      setError({ general: error.response?.data?.message || "Error during signup" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="main">
      <div className="container">
        <h2>School Signup</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow">
          {error.general && <div className="alert alert-danger">{error.general}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {/* School Name */}
          <div className="mb-3">
            <label className="form-label">
              School Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="name"
              className={`form-control ${error.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your school name"
            />
            {error.name && <div className="invalid-feedback">{error.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${error.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {error.email && <div className="invalid-feedback">{error.email}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">
              Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password"
            />
            {error.password && <div className="invalid-feedback">{error.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label className="form-label">
              Confirm Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${error.confirmPassword ? "is-invalid" : ""}`}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
            />
            {error.confirmPassword && <div className="invalid-feedback">{error.confirmPassword}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">
              Phone <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="phone"
              className={`form-control ${error.phone ? "is-invalid" : ""}`}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
            {error.phone && <div className="invalid-feedback">{error.phone}</div>}
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">
              Address <span className="text-danger">*</span>
            </label>
            <input
              name="address"
              className={`form-control ${error.address ? "is-invalid" : ""}`}
              rows="3"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
            />
            {error.address && <div className="invalid-feedback">{error.address}</div>}
          </div>

          {/* Subscription Plan */}
          <div className="mb-3">
            <label className="form-label">
              Subscription Plan <span className="text-danger">*</span>
            </label>
            <select
              name="subscriptionPlan"
              className={`form-control ${error.subscriptionPlan ? "is-invalid" : ""}`}
              value={formData.subscriptionPlan}
              onChange={handleChange}
            >
              <option value="">Select a plan</option>
              <option value="Beginner">Beginner - 100 Students</option>
              <option value="Intermediate">Intermediate - 500 Students</option>
              <option value="Standard">Standard - 1000 Students</option>
            </select>
            {error.subscriptionPlan && <div className="invalid-feedback">{error.subscriptionPlan}</div>}
          </div>

          {/* School Logo */}
          <div className="mb-3">
            <label className="form-label">
              School Logo <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              name="schoolLogo"
              className={`form-control ${error.schoolLogo ? "is-invalid" : ""}`}
              accept="image/*"
              onChange={handleFileChange}
            />
            {error.schoolLogo && <div className="invalid-feedback">{error.schoolLogo}</div>}
          </div>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Signup"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <label className="form-label">
            Already signed up?
            <span>
              {" "}
              <Link to="/login" style={{ textDecoration: "none", color: "#00ff99" }}>
                Login
              </Link>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Signup;
