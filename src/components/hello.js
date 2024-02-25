import React from "react";
import { Link } from "react-router-dom";

const Hello = () => {
  return (
    <div>
      <h1>Вітаємо!</h1>
      <Link to={"/form"}>Заповнити форму</Link>
    </div>
  );
};

export default Hello;
