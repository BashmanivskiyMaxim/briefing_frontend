import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.css";

const Admin = () => {
  //const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [sortedFormData, setSortedFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPDF, setLoadingPDF] = useState(false);
  const [sortByNewest, setSortByNewest] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://lab1pm-production.up.railway.app/form/getAll`
      );
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

  const sortFormData = (data) => {
    const sorted = [...data].sort((a, b) =>
      sortByNewest
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
    setSortedFormData(sorted);
  };

  const toggleSortOrder = () => {
    setSortByNewest((prevSortByNewest) => !prevSortByNewest);
    sortFormData(formData);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://lab1pm-production.up.railway.app/form/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  const downloadPDF = async (id) => {
    try {
      setLoadingPDF(true);
      const response = await fetch(
        `https://lab1pm-production.up.railway.app/form/${id}/pdf`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `form_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setLoadingPDF(false);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="admin-panel">
      <Link to={"/"}>На головну</Link>
      <h1>Адмін панель</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={toggleSortOrder}>
            Sort by Date {sortByNewest ? "(Newest First)" : "(Oldest First)"}
          </button>
          <table>
            <thead>
              <tr>
                <th>Проект</th>
                <th>Дата</th>
                <th>Змінити</th>
                <th>Видалити</th>
                <th>PDF</th>
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
                  <td>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </td>
                  <td>
                    {loadingPDF === true ? "Loading..." : ""}
                    <button onClick={() => downloadPDF(item._id)}>pdf</button>
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
