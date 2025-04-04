import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./layouts/CrmSidebar";
import Header from "./layouts/CrmHeader";
import Content from "./layouts/CrmContent";
import "./CrmApp.css";

const modules = [
  { name: "CRM", items: ["Home", "Leads", "Contacts", "Accounts", "Deals", "Meetings", "Calls", "Tasks", "Reports", "Analytics"] },
  { name: "Campaigns", items: ["Email Campaigns", "SMS Campaigns", "Social Campaigns"] },
];

const App = () => {
  const [activeModule, setActiveModule] = useState(modules[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="app-container">
        <Sidebar modules={modules} setActiveModule={setActiveModule} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="main-content">
          <Header activeModule={activeModule} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <Content activeModule={activeModule} modules={modules} />
        </div>
      </div>
    </Router>
  );
};

export default App;
