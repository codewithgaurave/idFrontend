// SubscriptionPage.js
import React from 'react';
import './package.css';

const PackagesPage = () => {
  return (
    <div className="subscription-page">
      <h2 className="subscription-title">Subscribe to Our Service</h2>
      <p className="subscription-description">
        Choose your preferred subscription plan and start enjoying our services!
      </p>
      <div className="subscription-cards">
        <div className="subscription-card">
          <h3 className="plan-name">Beginner Plan</h3>
          <p className="plan-description">
            Add up to 100 students. Perfect for small schools and institutions.
          </p>
          <ul className="plan-benefits">
            <li>100 Student Additions</li>
            <li>Email Support</li>
            <li>Basic Features Access</li>
          </ul>
          <button className="choose-plan-btn">Choose Plan</button>
        </div>

        <div className="subscription-card">
          <h3 className="plan-name">Intermediate Plan</h3>
          <p className="plan-description">
            Add up to 500 students. Ideal for mid-sized schools and institutions.
          </p>
          <ul className="plan-benefits">
            <li>500 Student Additions</li>
            <li>Priority Email Support</li>
            <li>Intermediate Features Access</li>
          </ul>
          <button className="choose-plan-btn">Choose Plan</button>
        </div>

        <div className="subscription-card">
          <h3 className="plan-name">Standard Plan</h3>
          <p className="plan-description">
            Add up to 1000 students. Best for large schools and institutions.
          </p>
          <ul className="plan-benefits">
            <li>1000 Student Additions</li>
            <li>24/7 Support</li>
            <li>All Features Access</li>
          </ul>
          <button className="choose-plan-btn">Choose Plan</button>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
