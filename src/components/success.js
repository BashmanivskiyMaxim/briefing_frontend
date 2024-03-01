import React from "react";

const Success = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <p>Форму успішно відправлено!</p>
        <a href="/" style={styles.link}>
          Повернутися на головну
        </a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  content: {
    textAlign: "center",
  },
  link: {
    textDecoration: "underline",
    color: "blue",
  },
};

export default Success;
