import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [sortedFormData, setSortedFormData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/form/getAll");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const formData = await response.json();
      setFormData(formData);
      setSortedFormData(
        [...formData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
      );
      setLoading(false);
      console.log("Form data fetched:", formData);
    } catch (error) {
      console.error("Error fetching form data:", error);
      setLoading(false);
    }
  };

  const sortByDate = () => {
    const sorted = [...formData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setSortedFormData(sorted);
  };

  return (
    <div className="admin-panel">
      <h1>Адмін панель</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={sortByDate}>Sort by Date</button>
          <table>
            <thead>
              <tr>
                <th>Проект</th>
                <th>Дата</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              {sortedFormData.map((item) => (
                <tr key={item._id}>
                  <td>{item.data?.["product-name"]}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                  <td>
                    <Link to={`/admin/edit/${item._id}`}>Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Admin;
