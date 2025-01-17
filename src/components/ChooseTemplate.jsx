import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChooseTemplate.css";
import template1Img from "../assets/template1.png"; 
import template2Img from "../assets/template2.png";
import template3Img from "../assets/template3.png"; 

const ChooseTemplate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { schoolData, student } = location.state || {};

  if (!schoolData || !student) {
    return <p>No data available. Please go back to the dashboard.</p>;
  }

  const handleTemplateSelect = (template) => {
    navigate(template, { state: { schoolData, student } });
  };

  return (
    <div className="choose-template-container">
      <h2>Select Your ID Card Template</h2>
      <p>Choose a template for generating the student's ID card:</p>
      <div className="templates">
        <div className="template-card">
          <img src={template2Img} alt="Template 1 Preview" />
          <button
            className="template-button"
            onClick={() => handleTemplateSelect("/idcard")}
          >
            TEMPLATE FRONT AND BACK
          </button>
        </div>
        <div className="template-card">
          <img src={template1Img} alt="Template 2 Preview" />
          <button
            className="template-button"
            onClick={() => handleTemplateSelect("/idcardfront")}
          >
            TEMPLATE ONLY FRONT
          </button>
        </div>
        <div className="template-card">
          <img src={template3Img} alt="Template 3 Preview" />
          <button
            className="template-button"
            onClick={() => handleTemplateSelect("/landscapeId")}
          >
            TEMPLATE ONLY FRONT LANDSCAPE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseTemplate;
