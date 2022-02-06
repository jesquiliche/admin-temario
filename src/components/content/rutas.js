import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Usuario from "../../components/Usuario"
import Login from "../login"
import Register from "../Register";
import Tema from "../Tema";
import Topbar from "./Topbar";
import Bloque from "../Bloque";
import Tablero from "../Tablero";
import Home from "../Home";

const Rutas = ({ sidebarIsOpen, toggleSidebar }) => (
    <Routes>      
      <Route exact path="/" element={<Login />} />
      <Route exact path="/about" element={() => "About"} />
      <Route exact path="/Pages" element={() => "Pages"} />
      <Route exact path="/faq" element={() => "FAQ"} />
      <Route exact path="/contact" element={() => "Contact"} />
      <Route exact path="/Usuario" element={<Usuario />} />
      <Route exact path="/Login" element={<Login />} />
      <Route exact path="/Register" element={<Register />} />
      <Route exact path="/Tema" element={<Tema />} />
      <Route exact path="/Bloque" element={<Bloque />} />
      <Route exact path="/Page-1" element={() => "Prueba"} />
      <Route exact path="/Page-2" element={() => "Page-2"} />
      <Route exact path="/page-1" element={() => "page-1"} />
      <Route exact path="/page-2" element={() => "page-2"} />
      <Route exact path="/page-3" element={() => "page-3"} />
      <Route exact path="/Home" element={<Home />} />
    </Routes>
  
);

export default Rutas;
