import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./CrmContent.css";

const Content = ({ activeModule, modules }) => {
  return (
    <main className="content-area">
      <Routes>
        <Route path="/" element={<Navigate to="/crm/home" />} />
        {modules.flatMap(module => 
          module.items.map(item => (
            <Route 
              key={`${module.name}-${item}`} 
              path={`/${module.name.toLowerCase()}/${item.toLowerCase().replace(/ /g, "-")}`} 
              element={<h2>{module.name} - {item} Page</h2>} 
            />
          ))
        )}
      </Routes>
    </main>
  );
};

export default Content;
