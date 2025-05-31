"use client";

import { useState } from "react";
// import { Sidebar } from "./sidebar";
// import { Navbar } from "./navbar";

export function DashboardLayout({ children }) {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      {/* <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* <Navbar /> */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}