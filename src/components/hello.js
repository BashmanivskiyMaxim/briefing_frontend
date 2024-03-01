import React from "react";
import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Вітаємо!</h1>
      <Link to={"/form"} style={styles.link}>
        Заповнити форму
      </Link>
      <Link to={"/adminAuth"} style={styles.link}>
        Адміністратор
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  heading: {
    marginBottom: "20px",
  },
  link: {
    textDecoration: "none",
    color: "blue",
    margin: "10px",
  },
};

export default Hello;
