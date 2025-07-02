import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useEffect, useRef, useState } from "react";

import {    Sidebar } from "@/sidebar/Sidebar";
import { Header } from "@/header/Header";
import { cn } from "../utils/cn";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";


export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const Layout = () => {
    const isDesktopDevice = useMediaQuery("(min-width: 768px)");
    const [collapsed, setCollapsed] = useState(true);
    const [activeModule, setActiveModule] = useState("CRM"); // Stores the selected module

    const sidebarRef = useRef(null);

    useEffect(() => {
        setCollapsed(!isDesktopDevice);
    }, [isDesktopDevice]);

    useClickOutside([sidebarRef], () => {
        if (!isDesktopDevice && !collapsed) {
            setCollapsed(true);
        }
    });

    return (
      <div className="min-h-screen flex bg-slate-100 transition-colors dark:bg-slate-950 w-auto">
  {/* Sidebar */}
  
  <div className={cn(
    "transition-all duration-300 sticky top-0 h-[100vh] z-10"
  )}
        onMouseEnter={() => isDesktopDevice && setCollapsed(false)}
        onMouseLeave={() => isDesktopDevice && setCollapsed(true)}>
    <Sidebar
      ref={sidebarRef}
      collapsed={collapsed}
      activeModule={activeModule}
    />
    {/* <NewSidebar/> */}
  </div>

  {/* Main Content Area */}
  <div className={`flex-1 flex flex-col px-3 w-full gap-1`}>

    <ScrollToTop/>
    <Header
      collapsed={collapsed}
      setCollapsed={setCollapsed}
      setActiveModule={setActiveModule}
    />
    <div className="flex-1 overflow-scroll">
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={300}
        theme="colored"
        hideProgressBar={false}
      />
    </div>
  </div>
</div>

    );
};

export default Layout;
