import React from "react";
import { motion } from "framer-motion";
import "./CrmSidebar.css";

const Sidebar = ({ modules, setActiveModule, sidebarOpen, setSidebarOpen }) => {
  return (
    <motion.div
      className="sidebar"
      animate={{ x: sidebarOpen ? 0 : -256 }}
      onMouseLeave={() => setSidebarOpen(false)}
    >
      {modules.map((module) => (
        <div key={module.name} className="module" onClick={() => setActiveModule(module)}>
          <h2 className="module-title">{module.name}</h2>
        </div>
      ))}
    </motion.div>
  );
};

export default Sidebar;
