import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return React.createElement(
    "nav",
    { className: "navbar" },
    React.createElement(
      "div",
      { className: "logo" },
      React.createElement(Link, { to: "/" }, "Eco-Shop")
    ),
    React.createElement(
      "ul",
      { className: "nav-links" },
      ["Inicio", "Productos", "Nosotros", "Contacto", "Iniciar Sesión"].map(
        (item, index) =>
          React.createElement(
            "li",
            { key: index },
            React.createElement(Link, { to: `/${item.toLowerCase()}` }, item)
          )
      )
    )
  );
};

export default Navbar;
