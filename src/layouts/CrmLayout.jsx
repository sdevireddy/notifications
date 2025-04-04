import React, { useState } from "react";
import { FaBars, FaBell, FaCog, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./Layout.css";

const modules = [
  { name: "CRM", items: ["Home", "Leads", "Contacts", "Accounts", "Deals", "Meetings", "Calls", "Tasks", "Reports", "Analytics"] },
  { name: "Campaigns", items: ["Email Campaigns", "SMS Campaigns", "Social Campaigns"] },
];

const Layout = () => {
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="layout-container">
        {/* Sidebar */}
        <motion.div
          className="sidebar"
          animate={{ x: sidebarOpen ? 0 : -256 }}
          onMouseLeave={() => setSidebarOpen(false)}
        >
          {modules.map((module) => (
            <div key={module.name} className="module">
              <h2 className="module-title" onClick={() => setActiveModule(module)}>
                {module.name}
              </h2>
            </div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="main-content">
          {/* Header */}
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

          {/* Content Area */}
          <main className="content-area">
            <Routes>
              {modules.flatMap(module => 
                module.items.map(item => (
                  <Route key={`${module.name}-${item}`} path={`/${module.name.toLowerCase()}/${item.toLowerCase().replace(/ /g, "-")}`} element={<h2>{module.name} - {item} Page</h2>} />
                ))
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default Layout;
