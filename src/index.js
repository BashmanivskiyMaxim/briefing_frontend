import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/form";
import Success from "./components/success";
import Hello from "./components/hello";
import "./index.css";
import AdminAuth from "./components/adminAuth";
import Admin from "./components/admin";
import { useParams } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/success" element={<Success />} />
      <Route path="/form" element={<Form />} />
      <Route path="/adminAuth" element={<AdminAuth />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/edit/:id" element={<EditForm />} />
    </Routes>
  );
};

const EditForm = () => {
  const params = useParams();
  const { id } = params;
  return <Form itemId={id} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
