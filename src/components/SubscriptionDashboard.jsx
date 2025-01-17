import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import CustomAlert from "./CustomAlert";
import './subscription.css';

const SubscriptionDashboard = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [subscription, setSubscription] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      setError("Failed to fetch dashboard data");
    }
  };

  const handlePurchase = async () => {
    if (!selectedPlan) {
      setError("Please select a plan first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5000/api/subscription/purchase",
        {
          method: "POST",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            packageName: selectedPlan,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Subscription purchased successfully!");
        setSubscription(data.subscription);
        fetchDashboardData();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to purchase subscription");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const plans = [
    {
      name: "Beginner",
      maxStudents: 100,
      pricePerCard: 20,
      totalPrice: 2000,
      features: ["Up to 100 ID Cards", "Basic Support", "Standard Templates"],
    },
    {
      name: "Intermediate",
      maxStudents: 500,
      pricePerCard: 20,
      totalPrice: 10000,
      features: ["Up to 500 ID Cards", "Priority Support", "Premium Templates"],
    },
    {
      name: "Standard",
      maxStudents: 1000,
      pricePerCard: 20,
      totalPrice: 20000,
      features: ["Up to 1000 ID Cards", "24/7 Support", "Custom Templates"],
    },
  ];

  return (
    <div>
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          {/* Alerts */}
          {error && <CustomAlert type="error" title="Error" description={error} />}
          {success && <CustomAlert type="success" title="Success" description={success} />}

          {/* Dashboard Stats */}
          {dashboardData && (
            <div className="grid-cols-4">
              <div className="card">
                <h3>Total Students</h3>
                <p>{dashboardData.totalStudents}</p>
              </div>
              <div className="card">
                <h3>Cards Generated</h3>
                <p>{dashboardData.cardsGenerated}</p>
              </div>
              <div className="card">
                <h3>Pending Cards</h3>
                <p>{dashboardData.pendingCards}</p>
              </div>
              <div className="card">
                <h3>Cards Remaining</h3>
                <p>{dashboardData.subscription?.cardsRemaining || 0}</p>
              </div>
            </div>
          )}

          {/* Subscription Plans */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h2>
          <div className="plan-container">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`plan-card ${
                  selectedPlan === plan.name ? "selected" : ""
                }`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                <h3 className="plan-title">{plan.name}</h3>
                <p className="price">₹{plan.totalPrice}</p>
                <p className="secondary-text">₹{plan.pricePerCard} per card</p>
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button>
                  {selectedPlan === plan.name ? "Selected" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>

          <div className="plan-button">
            <button
              className="purchase-btn"
              onClick={handlePurchase}
              disabled={loading || !selectedPlan}
            >
              {loading ? "Processing..." : "Purchase Subscription"}
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionDashboard;
