import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Usuario from "../Usuario"
import Login from "../login"
import Register from "../Register";
import Tema from "../Tema";
import Topbar from "./Topbar";
import Bloque from "../Bloque";
import Tablero from "../Tablero";
import Home from "../Home";
import AddUser from "../AddUser";
import UserProvider from "../../context/UserProvider";
import RequireAuth from "../ RequireAuth";
import EditUser from "../EditUser";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <UserProvider>
      <Routes>      
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Tablero" element={<Tablero />} />
        <Route exact path="/AddUser" element={<AddUser />} />
        <Route exact path="/about" element={() => "About"} />
        <Route exact path="/Pages" element={() => "Pages"} />
        <Route exact path="/Registrar" element={<Register />} />
        <Route exact path="/contact" element={() => "Contact"} />
        <Route exact 
            path="/Usuario" 
            element={
              <RequireAuth>
                <Usuario />
              </RequireAuth>
              } />
        <Route exact path="/Login" element={<Login />} />
        <Route exact 
            path="/editUser/:id" 
            element={
            
                <EditUser />
            
            } />
              
        <Route exact path="/Tema" element={
          <RequireAuth>
            <Tema />
          </RequireAuth>} />
        <Route exact 
            path="/Bloque" 
            element={
              <RequireAuth>
                <Bloque />
              </RequireAuth>
              } />
        <Route exact path="/Page-1" element={() => "Prueba"} />
        <Route exact path="/Page-2" element={() => "Page-2"} />
        <Route exact path="/page-1" element={() => "page-1"} />
        <Route exact path="/page-2" element={() => "page-2"} />
        <Route exact path="/page-3" element={() => "page-3"} />
        <Route exact path="/Home" element={<Home />} />
      </Routes>
    </UserProvider>
  </Container>
);

export default Content;
