import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./IDCardFront.css";
import back1 from "../assets/backIcon1.png";
import back2 from "../assets/decor2.png";
import back3 from "../assets/decor3.png";

const IDCardFront = () => {
  const location = useLocation();
  const { schoolData, student } = location.state || {}; // Safely access state

  // State for dynamic customizations
  const [bgColor, setBgColor] = useState("#f8ecd4");
  const [decorColor, setDecorColor] = useState("#ffab91");
  const [fontFamily, setFontFamily] = useState("Roboto, sans-serif");
  const [textColor, setTextColor] = useState("#333");

  if (!schoolData || !student) {
    return <p>No data available. Please go back and select a student.</p>;
  }

  return (
    <>
      {/* Customization Controls */}
      <div className="customization-controls">
        <label>
          Background Color:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <label>
          Decoration Color:
          <input
            type="color"
            value={decorColor}
            onChange={(e) => setDecorColor(e.target.value)}
          />
        </label>
        <label>
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
        <label>
          Font Family:
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Roboto, sans-serif">Roboto</option>
            <option value="Arial, sans-serif">Arial</option>
            <option value="Georgia, serif">Georgia</option>
            <option value="'Courier New', monospace">Courier New</option>
          </select>
        </label>
      </div>

      <div
        className="mainFront"
        style={{ backgroundColor: bgColor, fontFamily }}
      >
        {/* Background decorations */}
        <div className="backgroundDecor">
          <div
            className="decor decor4"
            style={{ backgroundColor: decorColor }}
          ></div>
          <div className="decor decor1">
            <img src={back1} alt="Decoration 1" />
          </div>
          <div className="decor decor2">
            <img src={back2} alt="Decoration 2" />
          </div>
          <div className="decor decor3">
            <img src={back3} alt="Decoration 3" />
          </div>
        </div>

        {/* School Details */}
        <div className="schoolDetail">
          <img
            src={`http://localhost:5000/${schoolData.logoUrl}`}
            alt="School Logo"
          />
          <h3 className="schoolName" style={{ color: textColor }}>
            {schoolData.name}
          </h3>
        </div>

        {/* Student Details */}
        <div className="studentDetail">
          <div className="studentImage">
            <img
              src={`http://localhost:5000/${student.studentImage.replace(
                "\\",
                "/"
              )}`}
              alt="Student"
            />
          </div>
          <div className="personalDetail" style={{ color: textColor }}>
            <p>
              <strong>Student Name:</strong> {student.name}
            </p>
            <p>
              <strong>Student ID:</strong> {student._id}
            </p>
            <p>
              <strong>Class:</strong> {student.grade}
            </p>
            <p>
              <strong>DOB:</strong> {student.dob}
            </p>
            <p>
              <strong>Blood Group:</strong> {student.bloodGroup}
            </p>
            <p>
              <strong>Guardian Contact:</strong> {student.guardianContact}
            </p>
            <p>
              <strong>Address:</strong> {student.address}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDCardFront;
