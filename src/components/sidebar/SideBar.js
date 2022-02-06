import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
  faUniversity
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => {
  
  
  return(<div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      
      <h3>
        <FontAwesomeIcon icon={faUniversity} size="50" className="mr-2 ml-0 text-white" />
        INFOTEST
      </h3>
    </div>
    <div className="side-menu">
       <Nav vertical className="list-unstyled pb-3">
        <p>Configuración</p>
        <SubMenu title="Colecciones >" icon={faHome} items={submenus[0]} />
        <NavItem>
          <NavLink tag={Link} to={"/about"}>
            <FontAwesomeIcon icon={faBriefcase} className="mr-2 ml-0 text-white" />
            <span className="text-white"> Acerca </span>
          </NavLink>
        </NavItem>
        <SubMenu title="Pages >" icon={faCopy} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            <span className="text-white"> Portfolio</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2 text-white" />
            <span className="text-white"> FAQ</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2 text-white" />
            <span className="text-white"> Contacto</span>
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
)};

const submenus = [
  [
    {
      title: "Login",
      target: "/Login",
    },
    {
      title: "Usuarios",
      target: "/Usuario",
    },
    {
      title: "Temas",
      target: "/Tema",
    },
    {
      title: "Bloques",
      target: "/Bloque",
    },
    {
      title: "Preguntas",
      target: "Home-3",
    },
    {
      title: "Registrar",
      target: "/Register",
    }
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;
