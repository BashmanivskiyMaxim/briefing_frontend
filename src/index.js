import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./components/form";
import Success from "./components/success";
import Hello from "./components/hello";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Hello />} />
      <Route path="/success" element={<Success />} />
      <Route path="/form" element={<Form />} />
    </Routes>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
