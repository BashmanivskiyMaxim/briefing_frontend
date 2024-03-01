import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [errorInfo, setErrorInfo] = useState(null);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:5000/user/find-by-username-and-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = await response.json();
      console.log("User data:", userData);
      navigate("/admin");
    } catch (error) {
      console.error("There was an error!", error);
      setErrorInfo("Неправильне ім'я користувача або пароль");
    }
  };

  return (
    <div style={styles.container}>
      {errorInfo && <p style={styles.error}>{errorInfo}</p>}
      <h2 style={styles.heading}>Автентифікація</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Ім'я користувача</label>
          <input
            {...register("username", { required: "Це поле обов'язкове" })}
            style={styles.input}
          />
          {errors.username && (
            <p style={styles.error}>{errors.username.message}</p>
          )}
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Пароль</label>
          <input
            {...register("password", { required: "Це поле обов'язкове" })}
            type="password"
            style={styles.input}
          />
          {errors.password && (
            <p style={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" style={styles.button}>
          Увійти
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "90%",
    padding: "8px",
    borderRadius: "3px",
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "3px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default AdminAuth;
