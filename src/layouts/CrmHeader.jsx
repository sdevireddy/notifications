import React from "react";
import { FaBars, FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ activeModule, sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-left">
        <FaBars className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)} />
        <img src="/logo.png" alt="Company Logo" className="logo" />
        <nav className="nav-menu">
          {activeModule.items.map((item) => (
            <Link key={item} to={`/${activeModule.name.toLowerCase()}/${item.toLowerCase().replace(/ /g, "-")}`} className="nav-item">
              {item}
            </Link>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <FaBell className="icon" />
        <FaCog className="icon" />
        <FaUserCircle className="user-icon" />
      </div>
    </header>
  );
};

export default Header;
