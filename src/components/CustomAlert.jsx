const CustomAlert = ({ type, title, description }) => {
    let alertStyles = "p-4 mb-6 rounded-lg text-sm ";
    let icon = null;
  
    switch (type) {
      case "error":
        alertStyles += "bg-red-100 text-red-700 border-l-4 border-red-500";
        icon = "⚠️"; // Replace with a custom icon if needed
        break;
      case "success":
        alertStyles += "bg-green-100 text-green-700 border-l-4 border-green-500";
        icon = "✔️"; // Replace with a custom icon if needed
        break;
      case "info":
        alertStyles += "bg-blue-100 text-blue-700 border-l-4 border-blue-500";
        icon = "ℹ️"; // Replace with a custom icon if needed
        break;
      default:
        alertStyles += "bg-gray-100 text-gray-700 border-l-4 border-gray-500";
        icon = "ℹ️"; // Replace with a custom icon if needed
    }
  
    return (
      <div className={alertStyles}>
        <div className="flex items-center">
          <span className="mr-2">{icon}</span>
          <div>
            <p className="font-bold">{title}</p>
            <p>{description}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default CustomAlert;
  