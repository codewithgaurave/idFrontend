import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./landScape.css";

const LandScape = () => {
  const location = useLocation();
  const { schoolData, student } = location.state;

  const [headerColor, setHeaderColor] = useState("#1e3a8a");
  const [bodyColor, setBodyColor] = useState("#e2ecf7");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontColor, setFontColor] = useState("#2c3e50");
  const [fieldBgColor, setFieldBgColor] = useState("#e2ecf7");

  return (
    <>
      <div className="controlPanel">
        <h2>Customize Template</h2>
        <label>
          Header Color:
          <input
            type="color"
            value={headerColor}
            onChange={(e) => setHeaderColor(e.target.value)}
          />
        </label>
        <label>
          Body Background Color:
          <input
            type="color"
            value={bodyColor}
            onChange={(e) => setBodyColor(e.target.value)}
          />
        </label>
        <label>
          Font Family:
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Courier New">Courier New</option>
          </select>
        </label>
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
          />
        </label>
        <label>
          Field Background Color:
          <input
            type="color"
            value={fieldBgColor}
            onChange={(e) => setFieldBgColor(e.target.value)}
          />
        </label>
      </div>
      <div className="main">
        <div
          className="idCard"
          style={{
            background: bodyColor,
            fontFamily: fontFamily,
            color: fontColor,
          }}
        >
          <div
            className="idCardHeader"
            style={{ backgroundColor: headerColor }}
          >
            <img
              src={`http://localhost:5000/${schoolData.logoUrl}`}
              alt="School Logo"
              className="schoolLogo"
            />
            <h1>{schoolData.name}</h1>
          </div>
          <div className="idCardBody">
            <div className="idCardPhoto">
              <img
                src={`http://localhost:5000/${student.studentImage.replace(
                  "\\",
                  "/"
                )}`}
                alt="Student"
              />
            </div>
            <div className="idCardDetails">
              {/* Applying background color to individual fields */}
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>ID:</strong> <span>{student._id}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>Name:</strong> <span>{student.name}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>Grade:</strong> <span>{student.grade}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>Section:</strong> <span>{student.section}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>Roll No:</strong> <span>{student.rollNo}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>DOB:</strong> <span>{student.dob}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>Blood Group:</strong> <span>{student.bloodGroup}</span>
              </p>
              <p style={{ backgroundColor: fieldBgColor }}>
                <strong>Contact:</strong> <span>{student.guardianContact}</span>
              </p>
              <p
                style={{ backgroundColor: fieldBgColor, gridColumn: "span 2" }}
              >
                <strong>Address:</strong> <span>{student.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandScape;
