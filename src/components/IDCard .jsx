import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./IDCard.css";

const IDCard = () => {
  const location = useLocation();
  const { schoolData, student } = location.state;

  // State for color and font customization
  const [headerColor, setHeaderColor] = useState("#2C3E50");
  const [logoBgColor, setLogoBgColor] = useState("#E74C3C");
  const [cardBgColor, setCardBgColor] = useState("#FFFFFF");
  const [photoBorderColor, setPhotoBorderColor] = useState("#3498DB");
  const [textColor, setTextColor] = useState("#34495E");
  const [barcodeColor, setBarcodeColor] = useState("#34495E");
  const [fontFamily, setFontFamily] = useState("Poppins");

  return (
    <>
      {/* Customization Controls */}
        <h3>Customize ID Card</h3>
      <div className="customization-panel">
        <div className="customization-options">
          <div>
            <label>Header Color:</label>
            <input
              type="color"
              value={headerColor}
              onChange={(e) => setHeaderColor(e.target.value)}
            />
          </div>
          <div>
            <label>Logo Background:</label>
            <input
              type="color"
              value={logoBgColor}
              onChange={(e) => setLogoBgColor(e.target.value)}
            />
          </div>
          <div>
            <label>Card Background:</label>
            <input
              type="color"
              value={cardBgColor}
              onChange={(e) => setCardBgColor(e.target.value)}
            />
          </div>
          <div>
            <label>Photo Border Color:</label>
            <input
              type="color"
              value={photoBorderColor}
              onChange={(e) => setPhotoBorderColor(e.target.value)}
            />
          </div>
          <div>
            <label>Text Color:</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
          <div>
            <label>Barcode Color:</label>
            <input
              type="color"
              value={barcodeColor}
              onChange={(e) => setBarcodeColor(e.target.value)}
            />
          </div>
          <div>
            <label>Font Style:</label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
            >
              <option value="Poppins">Poppins</option>
              <option value="Roboto">Roboto</option>
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
            </select>
          </div>
        </div>
      </div>

      {/* ID Card */}
      <div
        className="IdMain"
        style={{
          backgroundColor: cardBgColor,
          color: textColor,
          fontFamily: fontFamily,
        }}
      >
        <div className="id-card-container">
          {/* Front Side */}
          <div className="id-card id-card-front">
            <div
              className="id-card-header"
              style={{ backgroundColor: headerColor }}
            >
              <h1 className="school-name">{schoolData.name}</h1>
              <div
                className="school-logo"
                style={{ backgroundColor: logoBgColor }}
              >
                <img
                  src={`http://localhost:5000/${schoolData.logoUrl}`}
                  alt="School Logo"
                />
              </div>
            </div>
            <div className="id-card-body">
              <div
                className="student-photo"
                style={{
                  borderColor: photoBorderColor,
                }}
              >
                <img
                  src={`http://localhost:5000/${student.studentImage.replace(
                    "\\",
                    "/"
                  )}`}
                  alt="Student"
                />
              </div>
              <h2>{student.name}</h2>
              <p>Student ID: {student._id}</p>
              <div className="id-details">
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

          {/* Back Side */}
          <div className="id-card id-card-back">
            <div className="back-header">
              <h2>Important Information</h2>
            </div>
            <div className="guidelines">
              <p>This card is the property of {schoolData.name}.</p>
              <p>If found, please return to the main office.</p>
              <p>Valid for the 2024-2025 school year.</p>
            </div>
            <div className="contact-info">
              <h3>Contact:</h3>
              <p>
                <strong>Phone:</strong> {schoolData.phone}
              </p>
              <p>
                <strong>Email:</strong> {schoolData.email}
              </p>
              <p>
                <strong>Address:</strong> {schoolData.address}
              </p>
            </div>
            <div
              className="barcode"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  ${barcodeColor} 0px,
                  ${barcodeColor} 3px,
                  #ddd 3px,
                  #ddd 6px
                )`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDCard;