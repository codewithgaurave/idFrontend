import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import axios from "axios";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [schoolData, setSchoolData] = useState({
    name: "Sample School",
    email: "sample@school.com",
    phone: "123-456-7890",
    address: "123 School Lane, City, Country",
    logoUrl: "uploads/schoolLogos/1735479599273-logo1.png",
  });
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    grade: "",
    dob: "",
    bloodGroup: "",
    guardianContact: "",
    address: "",
    studentImage: null,
  });
  const [editingStudent, setEditingStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setUser({
        name: "John Doe",
        email: "johndoe@gmail.com",
      });

      const storedSchoolData = JSON.parse(localStorage.getItem("schoolData"));
      if (storedSchoolData) {
        const formattedLogoUrl = `${storedSchoolData.logoUrl.replace(
          "\\",
          "/"
        )}`;
        setSchoolData({
          ...storedSchoolData,
          logoUrl: formattedLogoUrl,
        });
      }

      fetchStudents(token);
    }
  }, [navigate]);

  const fetchStudents = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/students", {
        headers: { Authorization: token },
      });
      setSchoolData(response.data.school);
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, studentImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      if (editingStudent) {
        // Update existing student
        await axios.put(
          `http://localhost:5000/api/students/${editingStudent._id}`,
          data,
          {
            headers: {
              Authorization: token,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Student updated successfully!");
      } else {
        // Add new student
        await axios.post("http://localhost:5000/api/students", data, {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Student added successfully!");
      }

      // Reset form and fetch updated data
      setFormData({
        name: "",
        grade: "",
        dob: "",
        bloodGroup: "",
        guardianContact: "",
        address: "",
        studentImage: null,
      });
      setEditingStudent(null);
      fetchStudents(token);
    } catch (error) {
      console.error("Error submitting student:", error);
      alert("Failed to submit student.");
    }
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      grade: student.grade,
      dob: student.dob,
      bloodGroup: student.bloodGroup,
      guardianContact: student.guardianContact,
      address: student.address,
      studentImage: null, // Image file cannot be set directly
    });
  };

  const handleDelete = async (studentId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/students/${studentId}`, {
        headers: { Authorization: token },
      });
      alert("Student deleted successfully!");
      fetchStudents(token);
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Failed to delete student.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("schoolData");
    alert("You have logged out successfully!");
    navigate("/login");
  };
  const handlePrint = (student) => {
    navigate("/chooseTemplate", { state: { schoolData, student } });
  };

  // Export to Excel
  const handleExport = () => {
    const data = students.map((student) => ({
      Name: student.name,
      Grade: student.grade,
      DOB: student.dob,
      BloodGroup: student.bloodGroup,
      GuardianContact: student.guardianContact,
      Address: student.address,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    XLSX.writeFile(workbook, "students.xlsx");
    alert("Student data exported successfully!");
  };

  // Import from Excel
  const handleImport = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const binaryStr = event.target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Create FormData and append the Excel file
        const formData = new FormData();
        formData.append('excelFile', file);

        const token = localStorage.getItem("token");
        
        const response = await axios.post(
          "http://localhost:5000/api/students/import", 
          formData, 
          {
            headers: {
              Authorization: token,
              'Content-Type': 'multipart/form-data'
            },
          }
        );

        alert("Student data imported successfully!");
        fetchStudents(token); // Fetch updated students
      } catch (error) {
        console.error("Error importing students:", error);
        alert(error.response?.data?.message || "Failed to import student data.");
      }
    };

    reader.readAsBinaryString(file);
};
  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="school-name">
          <h2>Welcome to {schoolData.name}</h2>
        </div>
        <div className="school-logo" onClick={toggleDropdown}>
          <img
            src={`http://localhost:5000/${schoolData.logoUrl.replace(
              "\\",
              "/"
            )}`}
            alt="School Logo"
          />
        </div>
        <div className="subscription-button">
          <button onClick={() => navigate("/subscription")}>Subscription</button>
        </div>
      </div>
      {dropdownVisible && (
        <div className="dropdown-menu">
          <p>
            <strong>Email:</strong> {schoolData.email}
          </p>
          <p>
            <strong>Phone:</strong> {schoolData.phone}
          </p>
          <p>
            <strong>Address:</strong> {schoolData.address}
          </p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      <div className="import-export-buttons">
        <button onClick={handleExport}>Export to Excel</button>
        <label htmlFor="importFile" className="import-label">
          Import from Excel
        </label>
        <input
          type="file"
          id="importFile"
          accept=".xlsx, .xls"
          onChange={handleImport}
          hidden
        />
      </div>

      {/* Add/Update Student Form */}
      <div className="add-student-form">
        <h3>{editingStudent ? "Update Student" : "Add Student"}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Class"
            value={formData.grade}
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="guardianContact"
            placeholder="Guardian Contact"
            value={formData.guardianContact}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          <input
            type="file"
            name="studentImage"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit">
            {editingStudent ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
      {/* Students Table */}
      <div className="students-table">
        <h3>Students List</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Grade</th>
              <th>DOB</th>
              <th>Blood Group</th>
              <th>Guardian Contact</th>
              <th>Address</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>{student.dob}</td>
                <td>{student.bloodGroup}</td>
                <td>{student.guardianContact}</td>
                <td>{student.address}</td>
                <td>
                  <img
                    src={`http://localhost:5000/${student.studentImage.replace(
                      "\\",
                      "/"
                    )}`}
                    alt="Student"
                    className="student-image"
                  />
                </td>
                <td>
                  <button onClick={() => handleEditClick(student)}>Edit</button>
                  <button onClick={() => handleDelete(student._id)}>
                    Delete
                  </button>
                  <button onClick={() => handlePrint(student)}>Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Dashboard;
