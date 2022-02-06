import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;

  return (
    <div>
      <NavItem
        onClick={toggle}
        className={classNames({ "menu-open": !collapsed })}
      >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={icon} className="mr-2 text-white" />
          <a className="text-white"> {title}</a>
        </NavLink>
      </NavItem>
      <Collapse
        isOpen={!collapsed}
        navbar
        className={classNames("items-menu", { "mb-1": !collapsed })}
      >
        <div className="card ml-4 mr-3 submenu">
        {items.map((item, index) => (
          <NavItem key={index} className="pl-1">
            <NavLink tag={Link} to={item.target}>
              <span className="text-white">{item.title} </span>
            </NavLink>
          </NavItem>
        ))}
        </div>
      </Collapse>
    </div>
  );
};

export default SubMenu;
